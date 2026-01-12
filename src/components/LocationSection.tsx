import { MapPin, Phone, Clock, InstagramLogo } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { contactInfo } from '@/lib/data'

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Encuéntranos en Mexicali
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Visítanos en nuestra clínica, fácil acceso y ubicación céntrica
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.123!2d-115.456!3d32.654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM5JzE0LjQiTiAxMTXCsDI3JzIxLjYiVw!5e0!3m2!1ses!2smx!4v1234567890!5m2!1ses!2smx"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Podoskin Solutions"
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={24} weight="fill" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">
                    Dirección
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.city}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={24} weight="fill" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">
                    Teléfono
                  </h3>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock size={24} weight="fill" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">
                    Horarios
                  </h3>
                  <p className="text-sm text-muted-foreground">{contactInfo.schedule}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Consulta horarios específicos por teléfono o chatbot
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <InstagramLogo size={24} weight="fill" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">
                    Instagram
                  </h3>
                  <a
                    href={contactInfo.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground hover:text-accent"
                  >
                    {contactInfo.instagram}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
