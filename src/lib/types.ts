export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
}

export interface ChatbotRequest {
  message: string
  session_id: string
  timestamp: string
  user_context: {
    page: string
    previous_messages: number
    user_agent: string
  }
}

export interface ChatbotResponse {
  response: string
  session_id: string
  timestamp: string
  actions?: Array<{
    type: string
    label: string
    data: any
  }>
  suggestions?: string[]
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
}
