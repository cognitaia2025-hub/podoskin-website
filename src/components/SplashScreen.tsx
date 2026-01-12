import { useState, useEffect, useRef } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

// Ruta del video
const VIDEO_PATH = '/src/assets/videos/Video_Background_Adjustment_Request.mp4'

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Si hay error con el video, saltar el splash
    if (videoError) {
      onComplete()
      return
    }

    // Reproducir video automáticamente cuando esté listo
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error)
        // Si el autoplay es bloqueado, continuar después de 3 segundos
        setTimeout(handleVideoEnd, 3000)
      })
    }
  }, [onComplete, videoError])

  const handleVideoEnd = () => {
    // Ya no hacer fade out aquí, ya se hizo en onTimeUpdate
    setIsVisible(false)
    
    // Llamar onComplete después de un pequeño delay
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime
      
      // Iniciar fade out cuando falten 2 segundos
      if (timeLeft <= 2 && timeLeft > 0 && !isFadingOut) {
        setIsFadingOut(true)
      }
    }
  }

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    console.warn('Video de splash no encontrado. Continúa normalmente.')
    setVideoError(true)
  }

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsFadingOut(true)
    setTimeout(() => {
      handleVideoEnd()
    }, 2000)
  }

  // Si hay error con el video o no es visible, no renderizar nada
  if (!isVisible || videoError) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black transition-opacity duration-[2000ms] ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video de bienvenida */}
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        playsInline
        onEnded={handleVideoEnd}
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={VIDEO_PATH} type="video/mp4" />
      </video>

      {/* Botón para saltar (opcional) */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
      >
        Saltar
      </button>

      {/* Loader mientras carga el video */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            <p className="text-sm font-medium text-white">Cargando...</p>
          </div>
        </div>
      )}
    </div>
  )
}
