import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Footprints, 
  FirstAid, 
  Scissors, 
  Sparkle, 
  Virus, 
  Eraser, 
  Lightning 
} from '@phosphor-icons/react'
import { services } from '@/lib/data'

const iconMap = {
  Footprints,
  FirstAid,
  Scissors,
  Sparkle,
  Virus,
  Eraser,
  Lightning
}

interface ServicesSectionProps {
  onOpenChat: (message?: string) => void
}

export function ServicesSection({ onOpenChat }: ServicesSectionProps) {
  return (
    <section id="servicios" className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Ofrecemos tratamientos especializados de podología con tecnología avanzada 
            y atención profesional personalizada
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card
                key={service.id}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={28} weight="duotone" />
                  </div>
                  <CardTitle className="font-heading text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => onOpenChat(`Me interesa el servicio de ${service.name}`)}
                  >
                    Consultar Disponibilidad
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
