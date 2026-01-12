## 📊 INFORMACIÓN REAL EXTRAÍDA:

### De la Base de Datos del Proyecto:
- **Servicios reales** en la BD del catálogo de tratamientos
- **Información de pacientes** estructurada
- **Sistema de citas y consultas** completo
- **Expedientes médicos** digitales

### De la Página de Facebook (Imagen):
- **Ubicación:** Avenida Electricistas 1978, Colonia Libertad, Mexicali, B.C. 
- **Teléfonos:** 686 108 3647 / +52 1 686 108 3647
- **WhatsApp:** wa.me/5216861083647
- **Horarios:** Lunes a Sábado
- **Instagram:** @podoskin.solutions
- **Servicios listados:**
  - Pie de Atleta
  - Onicomicosis
  - Uñas Enterradas
  - Pedicure Clínico
  - Verrugas Plantares
  - Retiro de Callosidades
  - Expertos en Tratamientos Láser

---

# 🎯 PROMPT REAL PARA GITHUB SPARK - PÁGINA WEB PODOSKIN + CHATBOT

```markdown
# Crear Página Web Profesional Clínica Podoskin con Chatbot Integrado

## 📋 INFORMACIÓN REAL DE LA CLÍNICA

**Nombre:** Podoskin Solutions  
**Tipo:** PODOLOGÍA CLÍNICA  
**Instagram:** @podoskin.solutions

**Ubicación:**
- Dirección: Avenida Electricistas #1978, Colonia Libertad
- Ciudad: Mexicali, Baja California

**Contacto:**
- Teléfono principal: 686 108 3647
- WhatsApp: +52 1 686 108 3647
- Enlace WhatsApp: wa.me/5216861083647

**Horarios de Atención:**
- Lunes a Sábado
- (Mostrar como "Consulta horarios específicos por WhatsApp")

---

## 🏥 SERVICIOS MÉDICOS REALES

La clínica ofrece 7 servicios principales de podología:

### 1. Pie de Atleta
**Descripción:** Tratamiento especializado para infecciones fúngicas en los pies.  Utilizamos protocolos clínicos efectivos para eliminar el hongo y prevenir recurrencias.  Incluye diagnóstico dermatológico y tratamiento antimicótico profesional.

### 2. Onicomicosis  
**Descripción:** Tratamiento de hongos en las uñas mediante técnicas avanzadas. Ofrecemos evaluación completa del estado de la uña, tratamiento con medicamentos de grado médico y seguimiento hasta la recuperación total de la uña saludable.

### 3. Uñas Enterradas
**Descripción:** Procedimiento quirúrgico menor para corregir uñas encarnadas de forma definitiva. Realizamos técnicas de fenolización parcial o total según el caso, con anestesia local y recuperación rápida.  Aliviamos el dolor inmediatamente. 

### 4. Pedicure Clínico
**Descripción:** Cuidado profesional de los pies más allá de lo estético. Incluye limpieza profunda, eliminación de callosidades, corte correcto de uñas, hidratación especializada y valoración del estado general de los pies por profesionales de la salud.

### 5. Verrugas Plantares
**Descripción:** Eliminación de verrugas en los pies causadas por el Virus del Papiloma Humano (VPH). Tratamiento mediante criocirugía, electrofulguración o láser según el caso, garantizando remoción efectiva sin daño al tejido sano circundante.

### 6. Retiro de Callosidades
**Descripción:** Remoción especializada de durezas, callos y helomas (ojos de pescado) que causan dolor al caminar. Utilizamos instrumental de precisión quirúrgica para eliminar el tejido hiperqueratósico, seguido de recomendaciones para prevenir su reaparición.

### 7. Tratamientos Láser
**Descripción:** Procedimientos avanzados con tecnología láser de última generación para:  onicomicosis resistente, verrugas plantares rebeldes, cicatrización de heridas y tratamientos dermatológicos del pie. Técnica no invasiva, precisa y con excelentes resultados.

---

## 🎨 DISEÑO DE LA PÁGINA WEB

### Estructura General

**1. Header/Navbar (Fijo en scroll):**
```
Logo:  "Podoskin" (texto profesional con tipografía médica)
Menú:  Inicio | Servicios | Ubicación | Contacto
Botón destacado: "🩺 Consultar en Línea" (abre chatbot)
Teléfono visible: 📞 686-108-3647
```

**2. Hero Section (Primera impresión):**
```
Fondo: Imagen de consultorio podológico profesional (usa las imágenes que cargarás)
Título principal: "Podoskin Solutions"
Subtítulo: "Podología Clínica Profesional en Mexicali"
Descripción breve: "Especialistas en salud de tus pies con más de [X] años de experiencia"
Botones CTA: 
  - "📅 Agendar Cita" (abre chatbot)
  - "📲 WhatsApp Directo" (link a wa.me/5216861083647)
```

**3. Sección de Servicios:**

Mostrar los 7 servicios en tarjetas (grid 3 columnas en desktop, 1 en mobile):

```html
Cada tarjeta debe tener:
- Icono médico representativo
- Nombre del servicio (ej: "Pie de Atleta")
- Descripción completa (la que escribí arriba)
- Botón:  "Consultar Disponibilidad" (abre chatbot precargado con:  "Me interesa el servicio de [nombre]")
```

**4. Sección "Por Qué Elegirnos":**

Mostrar 4 beneficios en columnas: 
```
✅ Atención Profesional Certificada
   Podólogos con cédula profesional y experiencia comprobada

✅ Tecnología de Vanguardia  
   Equipo láser y instrumental de última generación

✅ Atención Personalizada
   Cada paciente recibe un plan de tratamiento individualizado

✅ Ubicación Accesible
   En pleno corazón de Mexicali, fácil acceso y estacionamiento
```

**5. Sección Ubicación:**
```
Título: "Encuéntranos en Mexicali"

Mapa embebido de Google Maps con la dirección: 
Avenida Electricistas 1978, Colonia Libertad, Mexicali, B.C. 

Información de contacto visible: 
📍 Av. Electricistas #1978, Col. Libertad, Mexicali, B.C.
📞 Teléfono: 686 108 3647
📱 WhatsApp: +52 1 686 108 3647
🕒 Horarios: Lunes a Sábado
```

**6. Sección Contacto:**
```
Formulario simple con:
- Nombre completo
- Teléfono
- Servicio de interés (dropdown con los 7 servicios)
- Mensaje (opcional)
- Botón: "Enviar Consulta"

Nota: Este formulario NO envía a backend real por ahora, 
solo muestra mensaje:  "Gracias, pronto nos comunicaremos contigo" 
y sugiere usar el chatbot para atención inmediata. 
```

**7. Footer:**
```
Columna 1 - Información: 
  Podoskin Solutions
  Podología Clínica
  Mexicali, Baja California

Columna 2 - Enlaces Rápidos:
  Inicio
  Servicios
  Ubicación
  Contacto

Columna 3 - Contacto:
  686 108 3647
  wa.me/5216861083647
  
Columna 4 - Redes Sociales:
  Instagram: @podoskin.solutions
  Facebook: (link de la imagen que proporcionaste)

Copyright:  © 2026 Podoskin Solutions.  Todos los derechos reservados. 
```

---

## 💬 CHATBOT FLOTANTE - CONFIGURACIÓN

### Botón Flotante
```css
Posición: fixed, bottom:  24px, right: 24px
Tamaño: 64px x 64px (círculo)
Color: #0077B6 (azul médico)
Icono: 💬 o ícono de chat médico
Animación:  Pulso sutil cada 3 segundos
Z-index: 9999
Sombra: 0 4px 12px rgba(0,0,0,0.15)
```

### Ventana de Chat
```
Dimensiones: 
  - Desktop: 420px ancho x 650px alto
  - Mobile: 100vw x 100vh (fullscreen)
Posición: Bottom-right corner (desktop), fullscreen (mobile)
Animación entrada: Slide-up + fade-in (300ms)
```

### Header del Chat
```
Fondo: Gradiente azul (#0077B6 a #00B4D8)
Altura: 80px
Contenido:
  - Avatar:  Icono de podólogo/clínica
  - Título: "Asistente Virtual Podoskin"
  - Subtítulo: "Te ayudamos a cuidar tus pies"
  - Estado: 🟢 En línea
  - Botones:  Minimizar | Cerrar
```

### Mensaje de Bienvenida (Auto-enviado al abrir)
```
"¡Hola! 👋 Bienvenido a Podoskin Solutions. 

Soy tu asistente virtual y puedo ayudarte con: 

🩺 Agendar una cita
📋 Información sobre servicios
📍 Ubicación y horarios
💬 Resolver dudas sobre tratamientos
📞 Conectarte con un especialista

¿En qué puedo asistirte hoy?"
```

### Botones de Respuesta Rápida (Después del saludo)
```
Mostrar 5 botones debajo del mensaje de bienvenida: 

[📅 Agendar Cita]
[🦶 Ver Servicios]
[📍 Ubicación]
[💰 Información de Contacto]
[❓ Preguntas Frecuentes]

Al hacer clic en cada uno, envía automáticamente ese texto al chat.
```

### Área de Mensajes
```css
Altura: 480px (desktop), calc(100vh - 180px) (mobile)
Overflow: auto scroll
Padding: 16px
Background: #F8F9FA

Mensajes del bot:
  - Align: left
  - Background: white
  - Border-radius: 16px 16px 16px 4px
  - Color texto: #333
  - Max-width: 80%

Mensajes del usuario:
  - Align: right
  - Background: #0077B6
  - Border-radius: 16px 16px 4px 16px
  - Color texto: white
  - Max-width: 80%

Timestamp:  Mostrar hora (HH:MM) debajo de cada mensaje en gris claro
```

### Input de Texto
```
Altura: 60px
Background: white
Border-top: 1px solid #E5E7EB

Componentes:
- Input text multilinea (max 3 líneas, luego scroll)
- Placeholder: "Escribe tu mensaje..."
- Botón enviar: Icono de avión de papel, color #0077B6
- Caracteres permitidos: 500 máximo
```

### Indicador "Escribiendo..."
```
Cuando el bot está procesando: 
Mostrar burbujaanimada con 3 puntos saltando
Texto:  "El asistente está escribiendo..."
Duración:  Mientras se espera respuesta del backend
```

---

## 🔌 CONEXIÓN AL BACKEND PODOSKIN

### URL del Backend
```javascript
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8000';
const CHATBOT_ENDPOINT = '/api/chatbot/message';
```

### Request Format (POST)
```typescript
interface ChatbotRequest {
  message: string;              // Mensaje del usuario
  session_id: string;           // UUID de sesión (localStorage)
  timestamp: string;            // ISO 8601 timestamp
  user_context: {
    page:  string;              // "homepage", "services", etc.
    previous_messages: number; // Cantidad de mensajes previos
    user_agent: string;        // Navegador del usuario
  }
}
```

### Response Format Esperado
```typescript
interface ChatbotResponse {
  response:  string;             // Mensaje de respuesta del agente
  session_id: string;           // Mismo session_id
  timestamp: string;            // Timestamp del servidor
  actions?:  Array<{            // Acciones sugeridas (opcional)
    type: string;              // "schedule", "call", "whatsapp"
    label: string;             // Texto del botón
    data:  any;                 // Data asociada
  }>;
  suggestions?: string[];      // Sugerencias de siguiente pregunta
}
```

### Gestión de Sesión
```javascript
// Al abrir el chat por primera vez: 
let sessionId = localStorage.getItem('podoskin_chat_session');
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem('podoskin_chat_session', sessionId);
  localStorage.setItem('podoskin_chat_created', new Date().toISOString());
}

// Expiración:  24 horas
const sessionCreated = localStorage.getItem('podoskin_chat_created');
if (Date.now() - new Date(sessionCreated) > 86400000) {
  // Renovar sesión
  sessionId = crypto.randomUUID();
  localStorage.setItem('podoskin_chat_session', sessionId);
  localStorage.setItem('podoskin_chat_created', new Date().toISOString());
}
```

### Persistencia de Conversación
```javascript
// Guardar últimos 50 mensajes en localStorage
const MESSAGES_KEY = 'podoskin_chat_messages';
const MAX_MESSAGES = 50;

function saveMessage(message) {
  let messages = JSON.parse(localStorage. getItem(MESSAGES_KEY) || '[]');
  messages.push(message);
  if (messages.length > MAX_MESSAGES) {
    messages = messages.slice(-MAX_MESSAGES);
  }
  localStorage. setItem(MESSAGES_KEY, JSON.stringify(messages));
}

// Cargar al abrir chat
function loadMessages() {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
}
```

### Manejo de Errores
```javascript
async function sendMessage(message) {
  try {
    const response = await fetch(`${BACKEND_URL}${CHATBOT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId,
        'X-Client-Type': 'web'
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        user_context: {
          page: window.location.pathname,
          previous_messages: getMessageCount(),
          user_agent: navigator.userAgent
        }
      }),
      timeout: 30000 // 30 segundos
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error sending message:', error);
    
    // Mostrar mensaje de error amigable
    return {
      response: `Disculpa, estoy teniendo problemas de conexión. 😔\n\n` +
                `Por favor intenta:\n` +
                `• Refrescar la página\n` +
                `• Contactarnos por WhatsApp:  wa.me/5216861083647\n` +
                `• Llamar al:  686 108 3647`,
      session_id: sessionId,
      timestamp: new Date().toISOString()
    };
  }
}
```

### Reintentos Automáticos
```javascript
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 segundos

async function sendMessageWithRetry(message, retryCount = 0) {
  try {
    return await sendMessage(message);
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
      return sendMessageWithRetry(message, retryCount + 1);
    }
    throw error;
  }
}
```

---

## 🎨 PALETA DE COLORES

```css
/* Colores Principales */
--primary-blue: #0077B6;        /* Azul médico principal */
--primary-light: #00B4D8;       /* Azul claro acentos */
--secondary-teal: #06D6A0;      /* Verde-azul para éxitos */

/* Fondos */
--background-main: #FFFFFF;      /* Fondo principal */
--background-alt: #F8F9FA;       /* Fondo alterno secciones */
--background-chat: #F3F4F6;      /* Fondo área de chat */

/* Texto */
--text-primary: #1F2937;         /* Texto principal oscuro */
--text-secondary:  #6B7280;       /* Texto secundario gris */
--text-light: #9CA3AF;           /* Texto claro (timestamps) */

/* Estados */
--success: #10B981;              /* Verde éxito */
--error: #EF4444;                /* Rojo error */
--warning: #F59E0B;              /* Amarillo advertencia */
--info: #3B82F6;                 /* Azul información */

/* Bordes */
--border-color: #E5E7EB;         /* Bordes sutiles */
--border-dark: #D1D5DB;          /* Bordes más visibles */
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
```css
/* Mobile First Approach */
--mobile:  320px - 767px        /* 1 columna */
--tablet: 768px - 1023px       /* 2 columnas */
--desktop: 1024px - 1439px     /* 3 columnas */
--desktop-xl: 1440px+          /* 3-4 columnas */
```

### Ajustes por Dispositivo

**Mobile (< 768px):**
- Navbar:  Hamburger menu
- Servicios: 1 columna, tarjetas full-width
- Chatbot:  Fullscreen modal
- Footer: 1 columna apilada
- Fuentes: 16px base (legible sin zoom)

**Tablet (768px - 1023px):**
- Navbar: Menu horizontal completo
- Servicios: 2 columnas
- Chatbot: 90% ancho de pantalla
- Footer: 2 columnas

**Desktop (1024px+):**
- Layout completo según diseño
- Servicios: 3 columnas
- Chatbot: 420px x 650px fijo
- Footer: 4 columnas

---

## ✅ CHECKLIST DE FEATURES

**Página Web:**
- [ ] Header con logo y navegación
- [ ] Hero section con call-to-action
- [ ] Sección de 7 servicios con descripciones completas
- [ ] Sección "Por qué elegirnos"
- [ ] Mapa de ubicación embebido
- [ ] Información de contacto real
- [ ] Footer con redes sociales
- [ ] Diseño responsive (mobile, tablet, desktop)
- [ ] Optimización SEO básica (meta tags)
- [ ] Accesibilidad (ARIA labels, contraste)

**Chatbot:**
- [ ] Botón flotante siempre visible
- [ ] Modal de chat con diseño profesional
- [ ] Mensaje de bienvenida automático
- [ ] Botones de respuesta rápida
- [ ] Input de texto funcional
- [ ] Envío de mensajes
- [ ] Área de mensajes con scroll
- [ ] Timestamps en cada mensaje
- [ ] Indicador "escribiendo..."
- [ ] Gestión de sesión (UUID)
- [ ] Persistencia en localStorage
- [ ] Conexión HTTP al backend preparada
- [ ] Manejo de errores robusto
- [ ] Reintentos automáticos
- [ ] Responsive (fullscreen en mobile)

**Configuración:**
- [ ] Variables de entorno (. env)
- [ ] README con instrucciones
- [ ] Código limpio y comentado
- [ ] Sin información placeholder (solo real)

---

## 📝 NOTAS FINALES

1. **Imágenes:** Deja espacios claramente marcados como: 
   ```html
   <!-- IMAGEN:  Logo Podoskin - Salvador cargará el archivo real -->
   <!-- IMAGEN: Hero background - Consultorio - Salvador cargará -->
   <!-- IMAGEN: Servicio Pie de Atleta - Salvador cargará -->
   ```

2. **Backend:** El endpoint `/api/chatbot/message` NO existe todavía en el backend.  La página debe estar LISTA para cuando se implemente el agente de WhatsApp adaptado para web.

3. **Formulario de contacto:** Por ahora NO envía datos al backend, solo muestra confirmación y sugiere usar chatbot. 

4. **Google Maps:** Usar iframe embebido con la dirección real: 
   ```html
   <iframe 
     src="https://www.google.com/maps/embed? pb=!1m18!1m12!1m3!1d3359.123! 2d-115.456!3d32.654!..."
     width="100%"
     height="400"
     frameborder="0"
     allowfullscreen>
   </iframe>
   ```
   (Spark generará el embed correcto con la dirección)

5. **No inventar:** Si falta algún dato que no tengo (como horarios específicos de apertura/cierre), mostrar:  "Consulta horarios vía WhatsApp" o similar.

---

## 🎯 OBJETIVO FINAL

Crear una página web profesional que: 
1. Presente la clínica real con información verificada
2. Tenga chatbot listo para conectar al backend cuando esté el agente
3. Sea desplegable y compartible en Facebook inmediatamente
4. Sea 100% responsive y accesible
5. Tenga diseño médico profesional y confiable
```

---