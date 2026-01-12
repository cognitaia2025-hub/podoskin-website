const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const CHATBOT_ENDPOINT = '/api/chatbot/message'
const MAX_RETRIES = 3
const RETRY_DELAY = 2000

export const SESSION_KEY = 'podoskin_chat_session'
export const SESSION_CREATED_KEY = 'podoskin_chat_created'
export const MESSAGES_KEY = 'podoskin_chat_messages'
export const MAX_MESSAGES = 50
export const SESSION_DURATION = 86400000

export function getOrCreateSession(): string {
  let sessionId = localStorage.getItem(SESSION_KEY)
  const sessionCreated = localStorage.getItem(SESSION_CREATED_KEY)

  if (!sessionId || !sessionCreated || Date.now() - new Date(sessionCreated).getTime() > SESSION_DURATION) {
    sessionId = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, sessionId)
    localStorage.setItem(SESSION_CREATED_KEY, new Date().toISOString())
  }

  return sessionId
}

export function saveMessage(message: any) {
  let messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]')
  messages.push(message)
  if (messages.length > MAX_MESSAGES) {
    messages = messages.slice(-MAX_MESSAGES)
  }
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
}

export function loadMessages(): any[] {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]')
}

export function clearMessages() {
  localStorage.removeItem(MESSAGES_KEY)
}

async function sendMessageAttempt(message: string, sessionId: string, messageCount: number) {
  const response = await fetch(`${BACKEND_URL}${CHATBOT_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-ID': sessionId,
      'X-Client-Type': 'web'
    },
    body: JSON.stringify({
      message,
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      user_context: {
        page: window.location.pathname,
        previous_messages: messageCount,
        user_agent: navigator.userAgent
      }
    }),
    signal: AbortSignal.timeout(30000)
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json()
}

export async function sendMessage(message: string, sessionId: string, messageCount: number, retryCount = 0): Promise<any> {
  try {
    return await sendMessageAttempt(message, sessionId, messageCount)
  } catch (error) {
    console.error('Error sending message:', error)
    
    if (retryCount < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)))
      return sendMessage(message, sessionId, messageCount, retryCount + 1)
    }

    return {
      response: `Disculpa, estoy teniendo problemas de conexión. 😔\n\nPor favor intenta:\n• Refrescar la página\n• Llamar al: 686 108 3647\n• Intentar de nuevo en unos momentos`,
      session_id: sessionId,
      timestamp: new Date().toISOString()
    }
  }
}
