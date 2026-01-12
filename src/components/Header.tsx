import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, List, X } from '@phosphor-icons/react'
import { contactInfo } from '@/lib/data'

interface HeaderProps {
  onOpenChat: () => void
}

export function Header({ onOpenChat }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold leading-none text-foreground">Podoskin</span>
              <span className="text-xs text-muted-foreground">Solutions</span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('ubicacion')}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Ubicación
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Contacto
            </button>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Phone className="text-primary" weight="fill" />
              <span className="hidden lg:inline">{contactInfo.phone}</span>
            </a>
            <Button onClick={onOpenChat} className="bg-accent hover:bg-accent/90">
              🩺 Consultar en Línea
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-left text-sm font-medium text-foreground"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-left text-sm font-medium text-foreground"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('ubicacion')}
              className="text-left text-sm font-medium text-foreground"
            >
              Ubicación
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-left text-sm font-medium text-foreground"
            >
              Contacto
            </button>
            <Button onClick={onOpenChat} className="w-full bg-accent hover:bg-accent/90">
              🩺 Consultar en Línea
            </Button>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 text-sm font-medium text-primary"
            >
              <Phone weight="fill" />
              {contactInfo.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
