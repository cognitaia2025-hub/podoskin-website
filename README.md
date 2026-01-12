# Podoskin Solutions - Website with Integrated Chatbot

Professional podiatry clinic website for Podoskin Solutions in Mexicali, Baja California, featuring an intelligent chatbot for patient assistance and appointment scheduling.

## 🏥 About Podoskin Solutions

**Location:** Avenida Electricistas #1978, Colonia Libertad, Mexicali, B.C.  
**Contact:** 686 108 3647 | WhatsApp: +52 1 686 108 3647  
**Hours:** Monday - Saturday  
**Instagram:** @podoskin.solutions

## ✨ Features

### Website
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Hero Section**: Compelling introduction with clear calls-to-action
- **Services Showcase**: 7 specialized podiatry services with detailed descriptions
- **Benefits Section**: 4 key advantages of choosing Podoskin
- **Location Map**: Embedded Google Maps with complete contact information
- **Contact Form**: Simple inquiry form with service selection
- **Professional Footer**: Complete navigation and social media links

### Services Offered
1. **Pie de Atleta** - Fungal infection treatment
2. **Onicomicosis** - Nail fungus treatment with advanced techniques
3. **Uñas Enterradas** - Ingrown toenail correction surgery
4. **Pedicure Clínico** - Professional medical foot care
5. **Verrugas Plantares** - Plantar wart removal
6. **Retiro de Callosidades** - Callus and corn removal
7. **Tratamientos Láser** - Advanced laser treatments

### Chatbot
- **Floating Button**: Always accessible with pulse animation
- **Welcome Message**: Automatic greeting with quick reply options
- **Session Management**: UUID-based sessions with 24-hour expiration
- **Message Persistence**: Last 50 messages saved in localStorage
- **Backend Integration**: Ready to connect to API endpoint
- **Error Handling**: Automatic retry with fallback contact options
- **Typing Indicator**: Visual feedback during bot responses
- **Quick Replies**: 5 common actions for faster interaction
- **Responsive**: Fullscreen on mobile, fixed size on desktop

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🔌 Backend Integration

The chatbot is designed to connect to a backend API. Set the backend URL in your environment:

```bash
# .env
VITE_BACKEND_URL=http://localhost:8000
```

### Expected API Endpoint
**POST** `/api/chatbot/message`

**Request Body:**
```json
{
  "message": "User message text",
  "session_id": "uuid-v4-session-id",
  "timestamp": "2026-01-15T10:00:00.000Z",
  "user_context": {
    "page": "/",
    "previous_messages": 5,
    "user_agent": "Mozilla/5.0..."
  }
}
```

**Response:**
```json
{
  "response": "Bot response text",
  "session_id": "uuid-v4-session-id",
  "timestamp": "2026-01-15T10:00:05.000Z",
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

### Error Handling
- Automatic retry (3 attempts with exponential backoff)
- Graceful fallback to contact information
- Session persistence across page refreshes

## 📱 Contact Information

All real contact information is centralized in `src/lib/data.ts`:

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

## 🎨 Design System

### Colors
- **Primary Blue**: Medical trust and professionalism
- **Accent Teal**: Interactive elements and CTA buttons
- **Success Green**: Positive actions and confirmations
- **Muted Gray**: Secondary information

### Typography
- **Headings**: Plus Jakarta Sans (Bold, Semibold)
- **Body**: Inter (Regular, Medium)
- **Scale**: 13px - 48px with responsive adjustments

### Animations
- Floating button pulse (3s interval)
- Chat slide-up entrance (300ms)
- Service card hover lift (200ms)
- Typing indicator bounce
- Smooth scroll to sections (600ms)

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn components (40+ pre-installed)
│   ├── Header.tsx       # Navigation with mobile menu
│   ├── HeroSection.tsx  # Main landing section
│   ├── ServicesSection.tsx
│   ├── BenefitsSection.tsx
│   ├── LocationSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── Chatbot.tsx      # Main chat interface
│   └── ChatButton.tsx   # Floating chat button
├── lib/
│   ├── chatbot.ts       # API integration & session management
│   ├── data.ts          # Services, benefits, contact info
│   ├── types.ts         # TypeScript interfaces
│   └── utils.ts         # Utility functions
├── App.tsx              # Main application component
└── index.css            # Global styles & animations
```

## 🔧 Customization

### Adding Images
Replace placeholder comments with actual images:

```tsx
// In HeroSection.tsx
<img src={heroImage} alt="Podoskin Clinic" />

// In ServicesSection.tsx
<img src={serviceImage} alt="Service Name" />
```

Import images from assets:
```typescript
import heroImage from '@/assets/images/clinic-hero.jpg'
```

### Modifying Services
Edit `src/lib/data.ts` to add/remove/modify services:

```typescript
export const services = [
  {
    id: 'new-service',
    name: 'New Service Name',
    description: 'Detailed description...',
    icon: 'IconName' // Must exist in iconMap
  }
]
```

### Changing Contact Info
Update `contactInfo` object in `src/lib/data.ts`

### Adjusting Colors
Modify CSS variables in `src/index.css`:

```css
:root {
  --primary: oklch(0.54 0.15 235);
  --accent: oklch(0.70 0.16 175);
  /* ... */
}
```

## 📊 Data Storage

The application uses localStorage for:
- **Chat sessions**: 24-hour expiration
- **Message history**: Last 50 messages
- **Contact form submissions**: Temporary storage
- **User preferences**: Future feature

## 🌐 Deployment

The site is ready for deployment to any static hosting service:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

Remember to set environment variables for production backend URL.

## 📝 Notes

- Contact form does not send emails (shows confirmation message only)
- Chatbot requires backend API to function fully
- Google Maps embed uses placeholder coordinates (update with exact location)
- All text content is in Spanish (Mexican market)
- No dark mode implemented (single theme by default)

## 🤝 Support

For technical support or questions about the website:
- Call: 686 108 3647
- WhatsApp: wa.me/5216861083647
- Instagram: @podoskin.solutions

---

© 2026 Podoskin Solutions. Todos los derechos reservados.
