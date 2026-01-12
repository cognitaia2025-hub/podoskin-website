# 🦶 Podoskin Solutions - Página Web Oficial

Sitio web profesional para **Podoskin Solutions**, clínica de podología en Mexicali, Baja California. Incluye chatbot integrado para atención al cliente en línea.

---

## 🏥 Sobre Podoskin Solutions

**Dirección:** Avenida Electricistas #1978, Colonia Libertad, Mexicali, B.C.  
**Teléfono:** 686 108 3647  
**WhatsApp:** +52 1 686 108 3647  
**Horarios:** Lunes a Sábado  
**Instagram:** [@podoskin.solutions](https://instagram.com/podoskin.solutions)

---

## ✨ Características Principales

### Página Web Completa
✅ **Diseño Responsive** - Mobile First (320px - 1920px+)  
✅ **Hero Section** - Presentación atractiva con CTAs  
✅ **7 Servicios** de podología con descripciones completas  
✅ **Sección Beneficios** - 4 razones para elegir Podoskin  
✅ **Mapa de Ubicación** - Google Maps integrado  
✅ **Formulario de Contacto** - Con validación  
✅ **Footer Profesional** - Enlaces y redes sociales  
✅ **SEO Optimizado** - Meta tags completos  
✅ **Accesibilidad** - WCAG 2.1 AA compliant

### Chatbot Integrado
✅ **Botón Flotante** - Siempre visible  
✅ **Modal Profesional** - Diseño médico  
✅ **Mensaje de Bienvenida** - Automático  
✅ **5 Respuestas Rápidas** - Navegación fácil  
✅ **Persistencia** - LocalStorage  
✅ **Gestión de Sesión** - UUID único  
✅ **Reintentos Automáticos** - Manejo de errores  
✅ **Preparado para Backend** - API lista

### Servicios de Podología
1. **Pie de Atleta** - Tratamiento especializado para infecciones fúngicas
2. **Onicomicosis** - Tratamiento de hongos en las uñas con técnicas avanzadas
3. **Uñas Enterradas** - Procedimiento quirúrgico menor con anestesia local
4. **Pedicure Clínico** - Cuidado profesional más allá de lo estético
5. **Verrugas Plantares** - Eliminación mediante criocirugía o láser
6. **Retiro de Callosidades** - Remoción de durezas y helomas
7. **Tratamientos Láser** - Tecnología de última generación

---

## 🚀 Instalación y Uso

### Requisitos Previos
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 o **pnpm** ≥ 8.0.0

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/podoskin-website.git
cd podoskin-website

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tu configuración
nano .env
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Disponible en: http://localhost:5173
```

### Producción

```bash
# Compilar para producción
npm run build

# Previsualizar build
npm run preview
```

---

## 🔌 Integración con Backend

El chatbot está preparado para conectarse a un backend. Configura la URL en tu archivo `.env`:

```env
VITE_BACKEND_URL=http://localhost:8000
```

### Endpoint del Chatbot
**POST** `/api/chatbot/message`

**Request Body:**
```json
{
  "message": "Texto del mensaje del usuario",
  "session_id": "uuid-v4-de-sesion",
  "timestamp": "2026-01-12T10:00:00.000Z",
  "user_context": {
    "page": "/",
    "previous_messages": 5,
    "user_agent": "Mozilla/5.0..."
  }
}
```

**Response Esperada:**
```json
{
  "response": "Respuesta del bot",
  "session_id": "uuid-v4-de-sesion",
  "timestamp": "2026-01-12T10:00:05.000Z",
  "actions": [
    {
      "type": "schedule",
      "label": "Agendar Cita",
      "data": {}
    }
  ],
  "suggestions": ["¿Cuál es el costo?", "¿Dónde están ubicados?"]
}
```

### Manejo de Errores
- Reintentos automáticos (3 intentos con backoff exponencial)
- Fallback a información de contacto
- Persistencia de sesión entre recargas

---

## 📱 Información de Contacto

Toda la información de contacto está centralizada en [`src/lib/data.ts`](src/lib/data.ts):

```typescript
export const contactInfo = {
  phone: '686 108 3647',
  whatsapp: '+52 1 686 108 3647',
  whatsappLink: 'https://wa.me/5216861083647',
  address: 'Avenida Electricistas #1978, Colonia Libertad',
  city: 'Mexicali, Baja California',
  schedule: 'Lunes a Sábado',
  instagram: '@podoskin.solutions',
  instagramLink: 'https://instagram.com/podoskin.solutions'
}
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primary Blue (#0077B6)**: Azul médico profesional
- **Accent Teal (#06D6A0)**: Elementos interactivos y CTAs
- **Success Green (#10B981)**: Acciones positivas y confirmaciones
- **Muted Gray**: Información secundaria

### Tipografía
- **Headings**: Plus Jakarta Sans (Bold, Semibold)
- **Body**: Inter (Regular, Medium)
- **Escala**: 13px - 48px con ajustes responsive

### Animaciones
- Botón flotante con pulso (3s)
- Entrada del chat slide-up (300ms)
- Hover en tarjetas de servicio (200ms)
- Indicador "escribiendo..." con bounce
- Scroll suave a secciones (600ms)

---

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes Shadcn (40+ pre-instalados)
│   ├── Header.tsx       # Navegación con menú móvil
│   ├── HeroSection.tsx  # Sección principal
│   ├── ServicesSection.tsx  # 7 servicios de podología
│   ├── BenefitsSection.tsx  # 4 beneficios
│   ├── GallerySection.tsx   # Galería de fotos
│   ├── LocationSection.tsx  # Mapa y contacto
│   ├── ContactSection.tsx   # Formulario
│   ├── Footer.tsx           # Pie de página
│   ├── Chatbot.tsx          # Interfaz del chat
│   └── ChatButton.tsx       # Botón flotante
├── lib/
│   ├── chatbot.ts       # API y gestión de sesiones
│   ├── data.ts          # Servicios, beneficios, contacto
│   ├── types.ts         # Interfaces TypeScript
│   └── utils.ts         # Funciones utilitarias
├── assets/
│   └── images/          # Imágenes de la clínica
├── App.tsx              # Componente principal
└── main.css             # Estilos globales

---

## 🔧 Personalización

### Agregar Imágenes

Coloca tus imágenes en `src/assets/images/`:

```
src/assets/images/
├── logo_podoskin.png           # Logo de la clínica
├── Podologo_principal.jpg      # Hero section
└── gallery/
    ├── consultorio_1.jpg
    ├── consultorio_2.jpg
    ├── tratamiento_1.jpg
    └── equipo_laser.jpg
```

### Modificar Servicios

Edita [`src/lib/data.ts`](src/lib/data.ts) para agregar/remover/modificar servicios:

```typescript
export const services = [
  {
    id: 'nuevo-servicio',
    name: 'Nombre del Servicio',
    description: 'Descripción detallada...',
    icon: 'Footprints' // Debe existir en iconMap
  }
]
```

### Cambiar Información de Contacto

Actualiza el objeto `contactInfo` en [`src/lib/data.ts`](src/lib/data.ts)

### Ajustar Colores

Modifica variables CSS en [`src/main.css`](src/main.css):

```css
:root {
  --primary: oklch(0.54 0.15 235);
  --accent: oklch(0.70 0.16 175);
  /* ... */
}
```

---

## 📊 Almacenamiento de Datos

La aplicación usa localStorage para:
- **Sesiones de chat**: Expiración de 24 horas
- **Historial de mensajes**: Últimos 50 mensajes
- **Envíos de formulario**: Almacenamiento temporal
- **Preferencias de usuario**: Función futura

**Keys utilizados:**
- `podoskin_chat_session` - ID de sesión
- `podoskin_chat_created` - Timestamp de creación
- `podoskin_chat_messages` - Array de mensajes
- `podoskin_contact_form` - Último formulario enviado

---

## 🌐 Despliegue

El sitio está listo para desplegarse en cualquier servicio de hosting estático:

### Vercel (Recomendado)
```bash
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Sube la carpeta dist/
```

### Cloudflare Pages
Conecta tu repositorio y configura:
- **Build command:** `npm run build`
- **Output directory:** `dist`

**⚠️ Importante:** Configura `VITE_BACKEND_URL` en las variables de entorno del servicio de hosting.

---

## 📝 Notas Importantes

- El formulario de contacto NO envía emails (solo muestra confirmación)
- El chatbot requiere backend API para funcionar completamente
- El mapa de Google Maps puede necesitar ajuste de coordenadas exactas
- Todo el contenido de texto está en español (mercado mexicano)
- No incluye modo oscuro (tema único por defecto)
- Las imágenes son placeholders - debes reemplazarlas con imágenes reales

---

## ✅ Checklist Pre-Lanzamiento

Antes de lanzar a producción:

- [ ] Reemplazar todas las imágenes placeholder
- [ ] Probar en dispositivos móviles reales (iOS + Android)
- [ ] Validar formularios y chatbot
- [ ] Revisar meta tags y SEO
- [ ] Configurar variables de entorno de producción
- [ ] Conectar backend del chatbot
- [ ] Ajustar coordenadas exactas del mapa
- [ ] Verificar enlaces de redes sociales
- [ ] Ejecutar Lighthouse audit (Performance, SEO, A11y)
- [ ] Probar en diferentes navegadores (Chrome, Safari, Firefox, Edge)
- [ ] Configurar Google Analytics (opcional)
- [ ] Configurar dominio personalizado
- [ ] Habilitar HTTPS
- [ ] Probar velocidad de carga (PageSpeed Insights)
- [ ] Verificar responsiveness (320px - 2560px)

---

## 🤝 Soporte y Contacto

Para soporte técnico o preguntas sobre el sitio web:

**Podoskin Solutions**
- 📞 Teléfono: 686 108 3647
- 📱 WhatsApp: [wa.me/5216861083647](https://wa.me/5216861083647)
- 📸 Instagram: [@podoskin.solutions](https://instagram.com/podoskin.solutions)
- 📍 Dirección: Av. Electricistas #1978, Col. Libertad, Mexicali, B.C.

---

## 🛠 Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Framework de estilos
- **Shadcn/ui** - Componentes accesibles
- **Phosphor Icons** - Iconografía
- **Sonner** - Notificaciones toast
- **Radix UI** - Primitivos accesibles

---

## 📄 Licencia

Este proyecto es propiedad de **Podoskin Solutions**.  
Todos los derechos reservados © 2026.

---

**🦶 Hecho con ❤️ para Podoskin Solutions - Cuidamos la salud de tus pies**
