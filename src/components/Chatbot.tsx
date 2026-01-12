import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Minus, PaperPlaneRight, ChatCircle } from '@phosphor-icons/react'
import { ChatMessage } from '@/lib/types'
import { getOrCreateSession, sendMessage, saveMessage, loadMessages } from '@/lib/chatbot'
import { quickReplies } from '@/lib/data'

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      const savedMessages = loadMessages()
      if (savedMessages.length > 0) {
        setMessages(savedMessages)
      } else {
        const welcomeMessage: ChatMessage = {
          id: crypto.randomUUID(),
          content: `¡Hola! 👋 Bienvenido a Podoskin Solutions.\n\nSoy tu asistente virtual y puedo ayudarte con:\n\n🩺 Agendar una cita\n📋 Información sobre servicios\n📍 Ubicación y horarios\n💬 Resolver dudas sobre tratamientos\n📞 Conectarte con un especialista\n\n¿En qué puedo asistirte hoy?`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        }
        setMessages([welcomeMessage])
        saveMessage(welcomeMessage)
      }

      if (initialMessage) {
        setTimeout(() => {
          handleSendMessage(initialMessage)
        }, 500)
      }
    }
  }, [isOpen])

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
            </ScrollArea>

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
          </>
        )}
      </div>
    </div>
  )
}
