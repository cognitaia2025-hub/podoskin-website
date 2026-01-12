export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
}

export interface PatientData {
  firstName: string
  secondName?: string
  firstLastName: string
  secondLastName?: string
  birthDate: {
    day: number
    month: number
    year: number
  }
  partialId?: string  // ID generado en frontend (ej: "VA-AM-0504")
  fullId?: string     // ID completo del backend (ej: "VA-AM-0504-0009")
  isRegistered: boolean
}

export interface ChatbotRequest {
  message: string
  session_id: string
  timestamp: string
  patient_info?: {
    patient_id?: string
    first_name?: string
    first_last_name?: string
    is_registered: boolean
    partial_id?: string
  }
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
  patient_id?: string  // ID completo del paciente retornado por el backend
  actions?: Array<{
    type: string
    label: string
    data: any
  }>
  suggestions?: string[]
}

export interface PatientRegistrationRequest {
  first_name: string
  second_name?: string
  first_last_name: string
  second_last_name?: string
  birth_date: string  // formato ISO: YYYY-MM-DD
  partial_id: string  // ID generado por frontend
}

export interface PatientRegistrationResponse {
  success: boolean
  patient_id: string  // ID completo (ej: "VA-AM-0504-0009")
  message: string
}

export interface PatientLookupRequest {
  patient_id?: string
  first_name?: string
  first_last_name?: string
  birth_date?: string
}

export interface PatientLookupResponse {
  found: boolean
  patient_id?: string
  first_name?: string
  first_last_name?: string
  registration_date?: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
}
