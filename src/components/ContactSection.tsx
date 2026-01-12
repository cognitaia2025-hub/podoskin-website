import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { services } from '@/lib/data'
import { toast } from 'sonner'

interface ContactSectionProps {
  onOpenChat: () => void
}

export function ContactSection({ onOpenChat }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    localStorage.setItem('podoskin_contact_form', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString()
    }))

    toast.success('¡Gracias por tu interés!', {
      description: 'Para atención inmediata, usa nuestro chatbot en línea'
    })

    setFormData({ name: '', phone: '', service: '', message: '' })
    
    setTimeout(() => {
      onOpenChat()
    }, 2000)
  }

  return (
    <section id="contacto" className="bg-muted py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Contáctanos
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Envíanos tu consulta y nos pondremos en contacto contigo pronto
          </p>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Formulario de Contacto</CardTitle>
            <CardDescription>
              Llena el formulario o usa nuestro chatbot para atención inmediata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="686 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Servicio de interés *</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje (opcional)</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos más sobre tu consulta..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Enviar Consulta
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                * Campos requeridos
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
