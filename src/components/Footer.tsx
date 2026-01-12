import { InstagramLogo, Phone, MapPin } from '@phosphor-icons/react'
import { contactInfo } from '@/lib/data'

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold leading-none">Podoskin</span>
                <span className="text-xs text-muted-foreground">Solutions</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Podología Clínica
            </p>
            <p className="text-sm text-muted-foreground">
              Mexicali, Baja California
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('ubicacion')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Ubicación
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone size={16} weight="fill" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} weight="fill" className="mt-0.5 shrink-0" />
                <span className="text-xs">
                  {contactInfo.address}, {contactInfo.city}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold text-foreground">Redes Sociales</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contactInfo.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                >
                  <InstagramLogo size={16} weight="fill" />
                  {contactInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Podoskin Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
