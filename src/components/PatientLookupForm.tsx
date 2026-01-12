import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PatientData } from '@/lib/types'
import { lookupPatient } from '@/lib/chatbot'
import { savePatientData } from '@/lib/patient'
import { toast } from 'sonner'

interface PatientLookupFormProps {
  onComplete: (patientData: PatientData) => void
  onCancel: () => void
}

export function PatientLookupForm({ onComplete, onCancel }: PatientLookupFormProps) {
  const [lookupMethod, setLookupMethod] = useState<'id' | 'data'>('id')
  const [patientId, setPatientId] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    firstLastName: '',
    day: '',
    month: '',
    year: ''
  })
  const [isSearching, setIsSearching] = useState(false)

  const handleLookupById = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!patientId.trim()) {
      toast.error('Por favor ingresa tu ID de paciente')
      return
    }

    setIsSearching(true)

    try {
      const response = await lookupPatient({ patient_id: patientId.trim() })

      if (response.found && response.patient_id && response.first_name && response.first_last_name) {
        const patientData: PatientData = {
          firstName: response.first_name,
          firstLastName: response.first_last_name,
          birthDate: { day: 1, month: 1, year: 2000 }, // Placeholder
          fullId: response.patient_id,
          isRegistered: true
        }

        savePatientData(patientData)
        toast.success('¡Paciente encontrado!', {
          description: `Bienvenido de nuevo, ${response.first_name}`
        })
        onComplete(patientData)
      } else {
        toast.error('Paciente no encontrado', {
          description: 'Verifica tu ID o intenta con tus datos personales'
        })
      }
    } catch (error) {
      console.error('Error looking up patient:', error)
      toast.error('Error en la búsqueda', {
        description: 'No se pudo buscar el paciente. Por favor intenta de nuevo.'
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleLookupByData = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.firstLastName || !formData.day || !formData.month || !formData.year) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setIsSearching(true)

    try {
      const birthDate = `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`
      
      const response = await lookupPatient({
        first_name: formData.firstName,
        first_last_name: formData.firstLastName,
        birth_date: birthDate
      })

      if (response.found && response.patient_id && response.first_name && response.first_last_name) {
        const patientData: PatientData = {
          firstName: response.first_name,
          firstLastName: response.first_last_name,
          birthDate: {
            day: parseInt(formData.day),
            month: parseInt(formData.month),
            year: parseInt(formData.year)
          },
          fullId: response.patient_id,
          isRegistered: true
        }

        savePatientData(patientData)
        toast.success('¡Paciente encontrado!', {
          description: `Bienvenido de nuevo, ${response.first_name}`
        })
        onComplete(patientData)
      } else {
        toast.error('Paciente no encontrado', {
          description: 'No encontramos un registro con esos datos. ¿Deseas registrarte como nuevo paciente?'
        })
      }
    } catch (error) {
      console.error('Error looking up patient:', error)
      toast.error('Error en la búsqueda', {
        description: 'No se pudo buscar el paciente. Por favor intenta de nuevo.'
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold">Identificación de Paciente</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Busca tu registro existente
        </p>
      </div>

      <div className="flex gap-2 border-b">
        <Button
          type="button"
          variant={lookupMethod === 'id' ? 'default' : 'ghost'}
          onClick={() => setLookupMethod('id')}
          className="flex-1 rounded-b-none"
          size="sm"
        >
          Por ID
        </Button>
        <Button
          type="button"
          variant={lookupMethod === 'data' ? 'default' : 'ghost'}
          onClick={() => setLookupMethod('data')}
          className="flex-1 rounded-b-none"
          size="sm"
        >
          Por Datos
        </Button>
      </div>

      {lookupMethod === 'id' ? (
        <form onSubmit={handleLookupById} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="patientId" className="text-xs">
              ID de Paciente
            </Label>
            <Input
              id="patientId"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="VA-AM-0504-0009"
              required
              disabled={isSearching}
              className="h-9 text-sm font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Formato: XX-XX-MMDD-####
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSearching}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSearching}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleLookupByData} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="lookupFirstName" className="text-xs">
              Primer Nombre
            </Label>
            <Input
              id="lookupFirstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Abraham"
              required
              disabled={isSearching}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="lookupFirstLastName" className="text-xs">
              Primer Apellido
            </Label>
            <Input
              id="lookupFirstLastName"
              value={formData.firstLastName}
              onChange={(e) => setFormData({ ...formData, firstLastName: e.target.value })}
              placeholder="Córdova"
              required
              disabled={isSearching}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Fecha de Nacimiento</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                placeholder="Día"
                min="1"
                max="31"
                required
                disabled={isSearching}
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
                disabled={isSearching}
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
                disabled={isSearching}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSearching}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSearching}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
