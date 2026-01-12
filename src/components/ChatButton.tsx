import { Button } from '@/components/ui/button'
import { ChatCircle } from '@phosphor-icons/react'

interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 z-[9998] h-16 w-16 animate-pulse-soft rounded-full bg-accent shadow-2xl hover:bg-accent/90 hover:shadow-xl"
    >
      <ChatCircle size={32} weight="fill" />
    </Button>
  )
}
