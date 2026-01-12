import { PatientData } from './types'

export const PATIENT_KEY = 'podoskin_patient_data'
export const PATIENT_SESSION_KEY = 'podoskin_patient_session'

/**
 * Genera el ID parcial del paciente basado en nombre, apellido y fecha de nacimiento
 * Formato: [2 últimas letras apellido]-[2 últimas letras nombre]-[MMDD]
 * Ejemplo: Abraham Córdova, 05/04/1996 -> "VA-AM-0504"
 */
export function generatePartialId(
  firstName: string,
  firstLastName: string,
  day: number,
  month: number
): string {
  // Obtener las 2 últimas letras del apellido
  const lastNamePart = firstLastName.slice(-2).toUpperCase()
  
  // Obtener las 2 últimas letras del nombre
  const firstNamePart = firstName.slice(-2).toUpperCase()
  
  // Formatear mes y día con ceros a la izquierda
  const monthStr = month.toString().padStart(2, '0')
  const dayStr = day.toString().padStart(2, '0')
  
  return `${lastNamePart}-${firstNamePart}-${monthStr}${dayStr}`
}

/**
 * Guarda los datos del paciente en localStorage
 */
export function savePatientData(patientData: PatientData): void {
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patientData))
  localStorage.setItem(PATIENT_SESSION_KEY, new Date().toISOString())
}

/**
 * Carga los datos del paciente desde localStorage
 */
export function loadPatientData(): PatientData | null {
  const data = localStorage.getItem(PATIENT_KEY)
  if (!data) return null
  
  try {
    return JSON.parse(data) as PatientData
  } catch (error) {
    console.error('Error parsing patient data:', error)
    return null
  }
}

/**
 * Elimina los datos del paciente de localStorage
 */
export function clearPatientData(): void {
  localStorage.removeItem(PATIENT_KEY)
  localStorage.removeItem(PATIENT_SESSION_KEY)
}

/**
 * Verifica si hay un paciente registrado en la sesión actual
 */
export function hasPatientSession(): boolean {
  return localStorage.getItem(PATIENT_KEY) !== null
}

/**
 * Valida que los campos requeridos estén completos
 */
export function validatePatientData(
  firstName: string,
  firstLastName: string,
  day: number,
  month: number,
  year: number
): { valid: boolean; error?: string } {
  if (!firstName.trim()) {
    return { valid: false, error: 'El primer nombre es obligatorio' }
  }
  
  if (!firstLastName.trim()) {
    return { valid: false, error: 'El primer apellido es obligatorio' }
  }
  
  if (!day || day < 1 || day > 31) {
    return { valid: false, error: 'El día debe estar entre 1 y 31' }
  }
  
  if (!month || month < 1 || month > 12) {
    return { valid: false, error: 'El mes debe estar entre 1 y 12' }
  }
  
  const currentYear = new Date().getFullYear()
  if (!year || year < 1900 || year > currentYear) {
    return { valid: false, error: `El año debe estar entre 1900 y ${currentYear}` }
  }
  
  // Validar que el nombre y apellido tengan al menos 2 caracteres
  if (firstName.trim().length < 2) {
    return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' }
  }
  
  if (firstLastName.trim().length < 2) {
    return { valid: false, error: 'El apellido debe tener al menos 2 caracteres' }
  }
  
  return { valid: true }
}

/**
 * Formatea la fecha de nacimiento a formato ISO (YYYY-MM-DD)
 */
export function formatBirthDate(day: number, month: number, year: number): string {
  const monthStr = month.toString().padStart(2, '0')
  const dayStr = day.toString().padStart(2, '0')
  return `${year}-${monthStr}-${dayStr}`
}

/**
 * Actualiza el ID completo del paciente después de recibirlo del backend
 */
export function updatePatientFullId(fullId: string): void {
  const patientData = loadPatientData()
  if (patientData) {
    patientData.fullId = fullId
    patientData.isRegistered = true
    savePatientData(patientData)
  }
}
