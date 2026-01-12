import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PatientData } from '@/lib/types'
import { generatePartialId, validatePatientData, formatBirthDate, savePatientData } from '@/lib/patient'
import { registerPatient } from '@/lib/chatbot'
import { toast } from 'sonner'

interface PatientRegistrationFormProps {
  onComplete: (patientData: PatientData) => void
  onCancel: () => void
}

export function PatientRegistrationForm({ onComplete, onCancel }: PatientRegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    day: '',
    month: '',
    year: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const day = parseInt(formData.day)
    const month = parseInt(formData.month)
    const year = parseInt(formData.year)

    // Validar datos
    const validation = validatePatientData(
      formData.firstName,
      formData.firstLastName,
      day,
      month,
      year
    )

    if (!validation.valid) {
      toast.error(validation.error)
      return
    }

    setIsSubmitting(true)

    try {
      // Generar ID parcial
      const partialId = generatePartialId(
        formData.firstName,
        formData.firstLastName,
        day,
        month
      )

      // Enviar al backend para registrar
      const response = await registerPatient({
        first_name: formData.firstName,
        second_name: formData.secondName || undefined,
        first_last_name: formData.firstLastName,
        second_last_name: formData.secondLastName || undefined,
        birth_date: formatBirthDate(day, month, year),
        partial_id: partialId
      })

      if (response.success) {
        // Crear objeto de datos del paciente
        const patientData: PatientData = {
          firstName: formData.firstName,
          secondName: formData.secondName || undefined,
          firstLastName: formData.firstLastName,
          secondLastName: formData.secondLastName || undefined,
          birthDate: { day, month, year },
          partialId,
          fullId: response.patient_id,
          isRegistered: true
        }

        // Guardar en localStorage
        savePatientData(patientData)

        toast.success('¡Registro exitoso!', {
          description: `Tu ID de paciente es: ${response.patient_id}`
        })

        onComplete(patientData)
      }
    } catch (error) {
      console.error('Error registering patient:', error)
      toast.error('Error al registrar', {
        description: 'No se pudo completar el registro. Por favor intenta de nuevo.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold">Registro de Paciente</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Para brindarte un mejor servicio, necesitamos algunos datos básicos para tu registro de privacidad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="firstName" className="text-xs">
              Primer Nombre *
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Abraham"
              required
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="secondName" className="text-xs">
              Segundo Nombre
            </Label>
            <Input
              id="secondName"
              value={formData.secondName}
              onChange={(e) => setFormData({ ...formData, secondName: e.target.value })}
              placeholder="Salvador"
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="firstLastName" className="text-xs">
              Primer Apellido *
            </Label>
            <Input
              id="firstLastName"
              value={formData.firstLastName}
              onChange={(e) => setFormData({ ...formData, firstLastName: e.target.value })}
              placeholder="Córdova"
              required
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="secondLastName" className="text-xs">
              Segundo Apellido
            </Label>
            <Input
              id="secondLastName"
              value={formData.secondLastName}
              onChange={(e) => setFormData({ ...formData, secondLastName: e.target.value })}
              placeholder="Soto"
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Fecha de Nacimiento *</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              placeholder="Día"
              min="1"
              max="31"
              required
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
            <Input
              type="number"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              placeholder="Mes"
              min="1"
              max="12"
              required
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
            <Input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="Año"
              min="1900"
              max={new Date().getFullYear()}
              required
              disabled={isSubmitting}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          * Campos obligatorios
        </p>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
