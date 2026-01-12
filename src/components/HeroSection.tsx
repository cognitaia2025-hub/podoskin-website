import { Button } from '@/components/ui/button'
import { ChatCircle } from '@phosphor-icons/react'

interface HeroSectionProps {
  onOpenChat: () => void
}

export function HeroSection({ onOpenChat }: HeroSectionProps) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,119,182,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,214,160,0.1),transparent_50%)]" />
      
      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 backdrop-blur">
            <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-sm font-medium text-muted-foreground">Atendiendo en Mexicali</span>
          </div>

          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Podoskin Solutions
          </h1>
          
          <p className="mb-4 text-xl font-semibold text-primary md:text-2xl">
            Podología Clínica Profesional en Mexicali
          </p>
          
          <p className="mb-10 text-base text-muted-foreground md:text-lg">
            Especialistas en salud de tus pies con atención personalizada y tecnología de vanguardia. 
            Tratamientos profesionales para pie de atleta, hongos en uñas, verrugas plantares y más.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={onOpenChat}
              className="w-full bg-primary text-base font-semibold hover:bg-primary/90 sm:w-auto"
            >
              📅 Agendar Cita
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onOpenChat}
              className="w-full border-2 text-base font-semibold sm:w-auto"
            >
              <ChatCircle size={24} weight="fill" className="mr-2" />
              Consultar en Línea
            </Button>
          </div>

          <div className="mt-12 grid gap-6 text-sm sm:grid-cols-3">
            <div className="rounded-lg border bg-card/50 p-4 backdrop-blur">
              <div className="mb-1 font-heading text-2xl font-bold text-primary">7+</div>
              <div className="text-muted-foreground">Servicios Especializados</div>
            </div>
            <div className="rounded-lg border bg-card/50 p-4 backdrop-blur">
              <div className="mb-1 font-heading text-2xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Profesionales Certificados</div>
            </div>
            <div className="rounded-lg border bg-card/50 p-4 backdrop-blur">
              <div className="mb-1 font-heading text-2xl font-bold text-primary">★★★★★</div>
              <div className="text-muted-foreground">Atención Personalizada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
