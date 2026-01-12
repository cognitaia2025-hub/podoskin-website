# 🔐 NOTAS TÉCNICAS - Podoskin Solutions

## 📡 Integración Backend - Chatbot

### Endpoint Principal

```typescript
POST {VITE_BACKEND_URL}/api/chatbot/message
```

### Request Schema

```typescript
interface ChatbotRequest {
  message: string              // Mensaje del usuario
  session_id: string           // UUID v4 de sesión
  timestamp: string            // ISO 8601 (ejemplo: "2026-01-12T10:30:00.000Z")
  user_context: {
    page: string              // Pathname actual (ej: "/", "/servicios")
    previous_messages: number // Cantidad de mensajes en la conversación
    user_agent: string        // Navigator.userAgent
  }
}
```

### Response Schema Esperado

```typescript
interface ChatbotResponse {
  response: string             // Mensaje de respuesta del agente
  session_id: string          // Mismo session_id del request
  timestamp: string           // Timestamp del servidor
  
  // Opcionales
  actions?: Array<{
    type: 'schedule' | 'call' | 'whatsapp' | 'redirect'
    label: string             // Texto del botón
    data: any                 // Data específica de la acción
  }>
  
  suggestions?: string[]      // Sugerencias de siguiente mensaje
}
```

### Ejemplo de Request Real

```json
{
  "message": "Me interesa el servicio de Uñas Enterradas",
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2026-01-12T15:30:45.123Z",
  "user_context": {
    "page": "/",
    "previous_messages": 3,
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"
  }
}
```

### Ejemplo de Response Esperado

```json
{
  "response": "¡Excelente! El servicio de Uñas Enterradas es uno de nuestros más solicitados.\n\nIncluye:\n- Anestesia local\n- Procedimiento quirúrgico menor\n- Técnica de fenolización\n- Alivio inmediato del dolor\n\n¿Te gustaría agendar una cita?",
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2026-01-12T15:30:46.789Z",
  "actions": [
    {
      "type": "schedule",
      "label": "Sí, agendar cita",
      "data": {
        "service_id": "unas-enterradas"
      }
    },
    {
      "type": "whatsapp",
      "label": "Contactar por WhatsApp",
      "data": {
        "phone": "+5216861083647",
        "message": "Hola, me interesa el servicio de Uñas Enterradas"
      }
    }
  ],
  "suggestions": [
    "¿Cuál es el costo del tratamiento?",
    "¿Cuánto dura el procedimiento?",
    "¿Necesito cita previa?"
  ]
}
```

### Códigos de Error

```typescript
// 400 Bad Request - Request inválido
{
  "error": "Invalid request",
  "message": "session_id is required",
  "code": "INVALID_REQUEST"
}

// 429 Too Many Requests - Rate limit excedido
{
  "error": "Rate limit exceeded",
  "message": "Too many requests from this session",
  "code": "RATE_LIMIT",
  "retry_after": 60  // segundos
}

// 500 Internal Server Error - Error del servidor
{
  "error": "Internal server error",
  "message": "Failed to process message",
  "code": "INTERNAL_ERROR"
}
```

### Headers Requeridos

```typescript
{
  'Content-Type': 'application/json',
  'X-Session-ID': session_id,      // UUID de sesión
  'X-Client-Type': 'web',           // Tipo de cliente
  'Accept': 'application/json'
}
```

---

## 🔄 Gestión de Sesiones

### Generación de Session ID

```typescript
// src/lib/chatbot.ts - línea 11
function getOrCreateSession(): string {
  let sessionId = localStorage.getItem(SESSION_KEY)
  const sessionCreated = localStorage.getItem(SESSION_CREATED_KEY)
  
  // Verificar expiración (24 horas)
  const isExpired = !sessionCreated || 
    Date.now() - new Date(sessionCreated).getTime() > SESSION_DURATION
  
  if (!sessionId || isExpired) {
    sessionId = crypto.randomUUID()  // UUID v4
    localStorage.setItem(SESSION_KEY, sessionId)
    localStorage.setItem(SESSION_CREATED_KEY, new Date().toISOString())
  }
  
  return sessionId
}
```

### LocalStorage Keys

```typescript
const SESSION_KEY = 'podoskin_chat_session'        // UUID de sesión
const SESSION_CREATED_KEY = 'podoskin_chat_created' // ISO timestamp
const MESSAGES_KEY = 'podoskin_chat_messages'       // Array de mensajes
```

### Persistencia de Mensajes

```typescript
// Máximo 50 mensajes guardados
const MAX_MESSAGES = 50

// Estructura de cada mensaje
interface ChatMessage {
  id: string           // UUID del mensaje
  content: string      // Texto del mensaje
  sender: 'user' | 'bot'
  timestamp: string    // ISO 8601
}
```

---

## 🔁 Reintentos Automáticos

### Configuración

```typescript
// src/lib/chatbot.ts
const MAX_RETRIES = 3           // Máximo 3 intentos
const RETRY_DELAY = 2000        // 2 segundos base
```

### Estrategia de Backoff

```typescript
async function sendMessage(
  message: string,
  sessionId: string,
  messageCount: number,
  retryCount = 0
): Promise<any> {
  try {
    return await sendMessageAttempt(message, sessionId, messageCount)
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      // Backoff exponencial: 2s, 4s, 6s
      await sleep(RETRY_DELAY * (retryCount + 1))
      return sendMessage(message, sessionId, messageCount, retryCount + 1)
    }
    
    // Fallback después de 3 intentos
    return getFallbackResponse(sessionId)
  }
}
```

### Timeout

```typescript
// Timeout de 30 segundos por request
signal: AbortSignal.timeout(30000)
```

---

## 🎨 Personalización de Estilos

### Variables CSS Principales

```css
/* src/main.css */
:root {
  /* Colores Primarios */
  --primary: oklch(0.54 0.15 235);      /* Azul médico #0077B6 */
  --secondary: oklch(0.70 0.16 175);    /* Verde-azul #00B4D8 */
  --accent: oklch(0.72 0.18 165);       /* Teal #06D6A0 */
  
  /* Colores de Estado */
  --success: oklch(0.65 0.15 145);      /* Verde #10B981 */
  --error: oklch(0.55 0.22 25);         /* Rojo #EF4444 */
  --warning: oklch(0.70 0.19 75);       /* Amarillo #F59E0B */
  
  /* Fondos */
  --background: oklch(1 0 0);           /* Blanco */
  --muted: oklch(0.97 0 0);             /* Gris claro */
  
  /* Texto */
  --foreground: oklch(0.145 0 0);       /* Negro */
  --muted-foreground: oklch(0.556 0 0); /* Gris medio */
  
  /* Bordes */
  --border: oklch(0.922 0 0);           /* Gris claro */
  --radius: 0.625rem;                   /* 10px */
}
```

### Breakpoints Responsivos

```typescript
// tailwind.config.js
screens: {
  'sm': '640px',    // Tablet pequeña
  'md': '768px',    // Tablet
  'lg': '1024px',   // Desktop
  'xl': '1280px',   // Desktop grande
  '2xl': '1536px',  // Desktop extra grande
  
  // Custom breakpoints
  'mobile': '320px',
  'phablet': '480px'
}
```

### Animaciones Personalizadas

```css
/* src/index.css */

/* Pulso del botón flotante */
@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

/* Indicador "escribiendo..." */
@keyframes typing-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-typing-bounce {
  animation: typing-bounce 1.4s ease-in-out infinite;
}
```

---

## 🔒 Seguridad y Privacidad

### CORS Configuration (Backend)

```typescript
// Express.js example
app.use(cors({
  origin: ['https://podoskinsolutions.com', 'http://localhost:5173'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Session-ID', 'X-Client-Type'],
  credentials: true
}))
```

### Rate Limiting (Recomendado)

```typescript
// Backend - Express Rate Limit
import rateLimit from 'express-rate-limit'

const chatbotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,                   // 100 requests por ventana
  message: {
    error: 'Too many requests',
    code: 'RATE_LIMIT'
  },
  standardHeaders: true,
  legacyHeaders: false
})

app.post('/api/chatbot/message', chatbotLimiter, handleChatbot)
```

### Sanitización de Input

```typescript
// Backend - Sanitizar mensajes
import DOMPurify from 'isomorphic-dompurify'

function sanitizeMessage(message: string): string {
  return DOMPurify.sanitize(message, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim().substring(0, 500)  // Max 500 caracteres
}
```

---

## 📊 Logging y Monitoreo

### Frontend Logging

```typescript
// src/lib/chatbot.ts
export function logChatEvent(
  event: string,
  data: any,
  level: 'info' | 'warn' | 'error' = 'info'
) {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    level,
    session_id: localStorage.getItem(SESSION_KEY),
    data
  }
  
  // En desarrollo: console
  if (import.meta.env.DEV) {
    console[level]('[Chatbot]', log)
  }
  
  // En producción: enviar a servicio de logging
  if (import.meta.env.PROD) {
    // Ejemplo: Sentry, LogRocket, etc.
    // analytics.track('chatbot_event', log)
  }
}
```

### Eventos a Loggear

```typescript
// Apertura del chat
logChatEvent('chat_opened', { timestamp: Date.now() })

// Mensaje enviado
logChatEvent('message_sent', { message_length: message.length })

// Respuesta recibida
logChatEvent('response_received', { response_time: responseTime })

// Error
logChatEvent('api_error', { error: error.message }, 'error')

// Cierre del chat
logChatEvent('chat_closed', { messages_count: messages.length })
```

---

## 🧪 Testing

### Tests Unitarios (Ejemplo con Vitest)

```typescript
// src/lib/__tests__/chatbot.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { getOrCreateSession, saveMessage, loadMessages } from '../chatbot'

describe('Chatbot Utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  
  it('should create a new session', () => {
    const sessionId = getOrCreateSession()
    expect(sessionId).toBeDefined()
    expect(sessionId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })
  
  it('should reuse existing session', () => {
    const sessionId1 = getOrCreateSession()
    const sessionId2 = getOrCreateSession()
    expect(sessionId1).toBe(sessionId2)
  })
  
  it('should save and load messages', () => {
    const message = {
      id: '123',
      content: 'Test',
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    
    saveMessage(message)
    const messages = loadMessages()
    
    expect(messages).toHaveLength(1)
    expect(messages[0]).toEqual(message)
  })
})
```

### Tests E2E (Ejemplo con Playwright)

```typescript
// e2e/chatbot.spec.ts
import { test, expect } from '@playwright/test'

test('chatbot flow', async ({ page }) => {
  await page.goto('http://localhost:5173')
  
  // Abrir chatbot
  await page.click('[data-testid="chat-button"]')
  await expect(page.locator('[data-testid="chatbot-modal"]')).toBeVisible()
  
  // Verificar mensaje de bienvenida
  await expect(page.locator('text=¡Hola! 👋')).toBeVisible()
  
  // Enviar mensaje
  await page.fill('[data-testid="chat-input"]', 'Hola')
  await page.click('[data-testid="send-button"]')
  
  // Verificar indicador "escribiendo..."
  await expect(page.locator('text=escribiendo')).toBeVisible()
})
```

---

## 🚀 Optimizaciones de Performance

### Code Splitting

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-scroll-area'],
          icons: ['@phosphor-icons/react']
        }
      }
    }
  }
})
```

### Lazy Loading de Componentes

```typescript
// App.tsx
import { lazy, Suspense } from 'react'

const Chatbot = lazy(() => import('@/components/Chatbot'))
const GallerySection = lazy(() => import('@/components/GallerySection'))

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Chatbot />
      <GallerySection />
    </Suspense>
  )
}
```

### Optimización de Imágenes

```bash
# Comprimir imágenes antes de cargar
npm install -g @squoosh/cli

# Comprimir JPG
squoosh-cli --mozjpeg auto src/assets/images/*.jpg

# Comprimir PNG
squoosh-cli --oxipng auto src/assets/images/*.png
```

---

## 📦 Variables de Entorno

### Desarrollo (.env)

```env
# Backend URL
VITE_BACKEND_URL=http://localhost:8000

# Modo de desarrollo
VITE_DEV_MODE=true

# Logging
VITE_ENABLE_LOGGING=true
```

### Producción (.env.production)

```env
# Backend URL
VITE_BACKEND_URL=https://api.podoskinsolutions.com

# Google Analytics (opcional)
VITE_GA_ID=G-XXXXXXXXXX

# Sentry DSN (opcional)
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

---

**Última actualización:** 12 de enero de 2026  
**Versión del proyecto:** 1.0.0  
**Mantenedor:** Equipo de desarrollo Podoskin
