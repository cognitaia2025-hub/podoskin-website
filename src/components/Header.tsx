import { Button } from '@/components/ui/button'
import { Phone } from '@phosphor-icons/react'
import { contactInfo } from '@/lib/data'
import logoPodoskin from '@/assets/images/logo_podoskin.png'

interface HeaderProps {
  onOpenChat: () => void
}

export function Header({ onOpenChat }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-24 items-center justify-center">
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
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <Button 
          onClick={onOpenChat} 
          size="lg"
          className="bg-accent hover:bg-accent/90 shadow-2xl transition-transform hover:scale-105"
        >
          🩺 Consultar en Línea
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 shadow-2xl transition-transform hover:scale-105"
        >
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
            <Phone weight="fill" size={20} />
            {contactInfo.phone}
          </a>
        </Button>
      </div>
    </header>
  )
}
