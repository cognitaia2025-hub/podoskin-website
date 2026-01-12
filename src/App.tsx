import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ServicesSection } from '@/components/ServicesSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { GallerySection } from '@/components/GallerySection'
import { LocationSection } from '@/components/LocationSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { Chatbot } from '@/components/Chatbot'
import { ChatButton } from '@/components/ChatButton'
import { SplashScreen } from '@/components/SplashScreen'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>()
  const [showSplash, setShowSplash] = useState(true)

  const handleOpenChat = (message?: string) => {
    if (message) {
      setChatInitialMessage(message)
    }
    setIsChatOpen(true)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
    setChatInitialMessage(undefined)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className="min-h-screen bg-background">
        <Header onOpenChat={() => handleOpenChat()} />
        <main>
          <HeroSection onOpenChat={() => handleOpenChat()} />
          <ServicesSection onOpenChat={handleOpenChat} />
          <BenefitsSection />
          <GallerySection />
          <LocationSection />
          <ContactSection onOpenChat={() => handleOpenChat()} />
        </main>
        <Footer />
        
        {!isChatOpen && <ChatButton onClick={() => handleOpenChat()} />}
        <Chatbot
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          initialMessage={chatInitialMessage}
        />
        
        <Toaster position="top-center" richColors />
      </div>
    </>
  )
}

export default App
