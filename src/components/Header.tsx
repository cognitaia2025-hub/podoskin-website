import { Button } from '@/components/ui/button'
import { Phone } from '@phosphor-icons/react'
import { contactInfo } from '@/lib/data'
import logoPodoskin from '@/assets/images/logo_podoskin.png'

interface HeaderProps {
  onOpenChat: () => void
}

export function Header({ onOpenChat }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={logoPodoskin} 
              alt="Podoskin Solutions Logo" 
              className="h-32 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading text-3xl font-bold leading-none text-foreground">Podoskin</span>
              <span className="text-lg text-muted-foreground">Solutions</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('inicio')}
              className="text-base font-medium"
            >
              Inicio
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('servicios')}
              className="text-base font-medium"
            >
              Servicios
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('galeria')}
              className="text-base font-medium"
            >
              Galería
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('ubicacion')}
              className="text-base font-medium"
            >
              Ubicación
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('contacto')}
              className="text-base font-medium"
            >
              Contacto
            </Button>
            <Button 
              onClick={onOpenChat} 
              className="ml-4 bg-accent hover:bg-accent/90"
            >
              🩺 Consultar en Línea
            </Button>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                <Phone weight="fill" size={20} />
                {contactInfo.phone}
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
