import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Minus, PaperPlaneRight, ChatCircle } from '@phosphor-icons/react'
import { ChatMessage, PatientData } from '@/lib/types'
import { getOrCreateSession, sendMessage, saveMessage, loadMessages } from '@/lib/chatbot'
import { quickReplies } from '@/lib/data'
import { hasPatientSession, loadPatientData } from '@/lib/patient'
import { PatientRegistrationForm } from './PatientRegistrationForm'
import { PatientLookupForm } from './PatientLookupForm'

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
  initialMessage?: string
}

export function Chatbot({ isOpen, onClose, initialMessage }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [sessionId] = useState(() => getOrCreateSession())
  const [chatStep, setChatStep] = useState<'welcome' | 'lookup' | 'register' | 'chat'>('welcome')
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Verificar si ya hay un paciente registrado
      if (hasPatientSession()) {
        const existingPatient = loadPatientData()
        if (existingPatient) {
          setPatientData(existingPatient)
          setChatStep('chat')
          loadChatMessages(existingPatient.firstName)
        } else {
          showWelcomeMessage()
        }
      } else {
        showWelcomeMessage()
      }

      if (initialMessage && chatStep === 'chat') {
        setTimeout(() => {
          handleSendMessage(initialMessage)
        }, 500)
      }
    }
  }, [isOpen])

  const showWelcomeMessage = () => {
    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: `¡Hola! 👋 Bienvenido a **Podoskin Solutions**.\n\nSoy tu asistente virtual. Para brindarte un mejor servicio y cumplir con las normas de privacidad, necesito saber:\n\n¿Ya eres paciente registrado con nosotros?`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
    setMessages([welcomeMessage])
    setChatStep('welcome')
  }

  const loadChatMessages = (firstName?: string) => {
    const savedMessages = loadMessages()
    if (savedMessages.length > 0) {
      setMessages(savedMessages)
    } else {
      const welcomeBackMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: `¡Hola${firstName ? ` ${firstName}` : ''}! 👋 Bienvenido de nuevo a Podoskin Solutions.\n\n¿En qué puedo ayudarte hoy?\n\n🩺 Agendar una cita\n📋 Información sobre servicios\n📍 Ubicación y horarios\n💬 Resolver dudas sobre tratamientos\n📞 Conectarte con un especialista`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeBackMessage])
      saveMessage(welcomeBackMessage)
    }
  }

  const handlePatientChoice = (isRegistered: boolean) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: isRegistered ? 'Sí, ya soy paciente' : 'No, soy nuevo',
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    setMessages((prev) => [...prev, userMessage])
    
    if (isRegistered) {
      setChatStep('lookup')
    } else {
      setChatStep('register')
    }
  }

  const handlePatientRegistered = (data: PatientData) => {
    setPatientData(data)
    setChatStep('chat')
    loadChatMessages(data.firstName)
  }

  const handleCancelRegistration = () => {
    showWelcomeMessage()
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText || isTyping) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, userMessage])
    saveMessage(userMessage)
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await sendMessage(messageText, sessionId, messages.length)
      
      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: response.response,
        sender: 'bot',
        timestamp: response.timestamp
      }

      setMessages((prev) => [...prev, botMessage])
      saveMessage(botMessage)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickReply = (message: string) => {
    handleSendMessage(message)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] md:inset-auto md:bottom-6 md:right-6 md:h-[650px] md:w-[420px]">
      <div className="flex h-full flex-col overflow-hidden rounded-none border bg-background shadow-2xl md:rounded-2xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <ChatCircle size={24} weight="fill" />
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold leading-tight">
                Asistente Virtual Podoskin
              </h3>
              <p className="text-xs opacity-90">Te ayudamos a cuidar tus pies</p>
              <div className="mt-1 flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
                <span className="text-xs">En línea</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
            >
              <Minus size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 bg-muted/30 p-4" ref={scrollRef}>
              {chatStep === 'welcome' && (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-card px-4 py-3 text-card-foreground shadow-sm">
                          <p className="whitespace-pre-line text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      onClick={() => handlePatientChoice(true)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Sí, ya soy paciente registrado
                    </Button>
                    <Button
                      onClick={() => handlePatientChoice(false)}
                      variant="outline"
                      className="w-full"
                    >
                      No, soy paciente nuevo
                    </Button>
                  </div>
                </div>
              )}

              {chatStep === 'lookup' && (
                <PatientLookupForm
                  onComplete={handlePatientRegistered}
                  onCancel={handleCancelRegistration}
                />
              )}

              {chatStep === 'register' && (
                <PatientRegistrationForm
                  onComplete={handlePatientRegistered}
                  onCancel={handleCancelRegistration}
                />
              )}

              {chatStep === 'chat' && (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                  <div key={message.id}>
                    <div
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'rounded-br-sm bg-primary text-primary-foreground'
                            : 'rounded-bl-sm bg-card text-card-foreground shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`mt-1 text-xs ${
                            message.sender === 'user'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>

                    {index === 0 && message.sender === 'bot' && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {quickReplies.map((reply) => (
                          <Button
                            key={reply.label}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply.message)}
                            className="text-xs"
                          >
                            {reply.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-card px-4 py-3 text-card-foreground shadow-sm">
                      <div className="flex items-center gap-1">
                        <div
                          className="h-2 w-2 animate-typing-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: '0ms' }}
                        />
                        <div
                          className="h-2 w-2 animate-typing-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: '200ms' }}
                        />
                        <div
                          className="h-2 w-2 animate-typing-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: '400ms' }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        El asistente está escribiendo...
                      </p>
                    </div>
                  </div>
                )}
              </div>
              )}
            </ScrollArea>

            {chatStep === 'chat' && (
              <div className="border-t bg-background p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    maxLength={500}
                    disabled={isTyping}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="shrink-0 bg-primary hover:bg-primary/90"
                  >
                    <PaperPlaneRight size={20} weight="fill" />
                  </Button>
                </form>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {inputValue.length}/500 caracteres
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
