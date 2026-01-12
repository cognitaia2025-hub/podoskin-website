# Podoskin Solutions - Professional Podiatry Clinic Website with Chatbot

A professional podiatry clinic website showcasing services, location, and contact information with an integrated chatbot for patient assistance and appointment scheduling.

**Experience Qualities:**
1. **Trustworthy** - Medical professionalism through clean design and verified information builds patient confidence
2. **Accessible** - Clear navigation and responsive design ensures patients can easily find what they need on any device
3. **Helpful** - Integrated chatbot provides immediate assistance and guides patients toward booking appointments

**Complexity Level**: Light Application (multiple features with basic state)
This is a multi-section marketing website with interactive chatbot functionality, session management, and localStorage persistence for conversation history.

## Essential Features

### Service Showcase
- **Functionality**: Display 7 specialized podiatry services with detailed descriptions
- **Purpose**: Educate patients about available treatments and build trust through transparent information
- **Trigger**: User scrolls to services section or clicks "Servicios" in navigation
- **Progression**: View service grid → Read service card → Click "Consultar Disponibilidad" → Chatbot opens with pre-filled message
- **Success criteria**: All 7 services visible with complete descriptions, clickable cards that trigger chatbot

### Integrated Chatbot
- **Functionality**: Floating chat interface with backend API connectivity for real-time patient assistance
- **Purpose**: Provide immediate help, answer questions, and facilitate appointment booking 24/7
- **Trigger**: Click floating chat button or service inquiry button
- **Progression**: Click chat button → See welcome message → Choose quick reply or type message → Send to backend → Receive AI response → Continue conversation
- **Success criteria**: Persistent session across page refresh, message history saved, successful API calls with error handling

### Location & Contact
- **Functionality**: Embedded Google Maps, contact information, and social media links
- **Purpose**: Make it easy for patients to find and contact the clinic
- **Trigger**: User scrolls to location section or clicks "Ubicación" in navigation
- **Progression**: View map → See address details → Click WhatsApp/phone link → External app opens
- **Success criteria**: Interactive map loads correctly, all contact links functional

### Contact Form
- **Functionality**: Basic inquiry form with service selection
- **Purpose**: Capture patient interest and provide alternative contact method
- **Trigger**: User scrolls to contact section or clicks "Contacto" in navigation
- **Progression**: Fill name/phone/service → Submit → See confirmation → Suggested to use chatbot for immediate response
- **Success criteria**: Form validation works, submission shows success message, data stored in localStorage

### Session Management
- **Functionality**: UUID-based session tracking with 24-hour expiration and conversation persistence
- **Purpose**: Maintain conversation context and provide seamless user experience across visits
- **Trigger**: First chatbot interaction creates session
- **Progression**: Open chat → Generate/retrieve session ID → Load previous messages → Continue conversation
- **Success criteria**: Session persists across page refreshes, expires after 24 hours, last 50 messages stored

## Edge Case Handling

- **API Failure**: Display friendly error message with fallback WhatsApp/phone contact options and automatic retry logic
- **No Internet**: Show offline indicator in chatbot, queue messages for when connection restored
- **Long Messages**: Truncate at 500 characters with warning, enable multiline input with scroll
- **Empty Form Submission**: Show validation errors with clear instructions for required fields
- **Session Expiration**: Automatically renew after 24 hours, notify user that new conversation started
- **Mobile Navigation**: Hamburger menu for small screens, fullscreen chatbot modal on mobile devices

## Design Direction

The design should evoke **medical professionalism with approachable warmth** - clean lines and clinical blues convey expertise and trustworthiness, while friendly spacing and rounded elements make the clinic feel welcoming rather than sterile. The interface should feel modern and tech-forward to suggest advanced treatment options.

## Color Selection

Medical-inspired blue palette with energizing accent colors to balance clinical precision with human care.

- **Primary Color**: Medical Blue (oklch(0.54 0.15 235)) - Communicates trust, professionalism, and healthcare expertise
- **Secondary Colors**: Light Blue (oklch(0.68 0.12 235)) for hover states and accents, Soft Teal (oklch(0.72 0.14 180)) for success states
- **Accent Color**: Vibrant Teal (oklch(0.70 0.16 175)) - Draws attention to CTAs and important interactive elements like chatbot
- **Foreground/Background Pairings**:
  - Background White (oklch(0.98 0 0)): Dark Gray text (oklch(0.30 0 0)) - Ratio 12.5:1 ✓
  - Primary Blue (oklch(0.54 0.15 235)): White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓
  - Accent Teal (oklch(0.70 0.16 175)): White text (oklch(0.98 0 0)) - Ratio 4.8:1 ✓
  - Light Background (oklch(0.96 0 0)): Medium Gray text (oklch(0.48 0 0)) - Ratio 6.8:1 ✓

## Font Selection

Typography should convey modern medical professionalism with excellent readability for patients of all ages - geometric sans-serif for clean authority paired with approachable spacing.

- **Typographic Hierarchy**:
  - H1 (Main Hero): Plus Jakarta Sans Bold/48px/tight tracking/-0.02em
  - H2 (Section Headers): Plus Jakarta Sans Semibold/36px/normal tracking
  - H3 (Service Titles): Plus Jakarta Sans Semibold/24px/normal tracking
  - Body Text: Inter Regular/16px/1.6 line-height
  - Small Text (timestamps): Inter Regular/13px/muted color
  - Button Text: Inter Medium/15px/0.01em tracking

## Animations

Animations should reinforce the feeling of responsive, intelligent care - subtle micro-interactions on buttons and cards provide tactile feedback, while the chatbot slides up smoothly to suggest helpful presence. Avoid medical sterility by adding gentle easing and natural timing that feels human rather than mechanical.

Key animations: floating chat button pulse (3s interval), service card lift on hover (200ms), chatbot slide-up entrance (300ms ease-out), typing indicator bounce, smooth scroll to sections (600ms).

## Component Selection

- **Components**:
  - Card: Service showcase with hover states and shadows for depth
  - Button: Primary CTA buttons (appointments), secondary (learn more), with distinct visual hierarchy
  - Dialog: Chatbot modal with custom styling, backdrop blur for focus
  - Input/Textarea: Contact form fields with floating labels and validation states
  - ScrollArea: Message history in chatbot with smooth scrolling
  - Badge: Service tags or status indicators (online/offline)
  - Separator: Visual breaks between sections
  
- **Customizations**:
  - Custom floating chat button with pulse animation (not standard shadcn)
  - Message bubbles with tail pointers (custom design)
  - Quick reply button grid below chatbot welcome message
  - Google Maps iframe integration (custom component)
  - Typing indicator animation (custom)

- **States**:
  - Buttons: Default, hover (lift + shadow), active (scale down), disabled (reduced opacity)
  - Inputs: Empty, focused (border accent color), filled, error (red border + message)
  - Chat: Closed, open, minimized, sending message (disabled input), error state
  - Cards: Default, hover (elevated shadow + slight scale), pressed

- **Icon Selection**:
  - Navigation: List for hamburger menu, X for close
  - Contact: Phone, WhatsApp (custom logo), MapPin, Clock, Instagram
  - Chatbot: ChatCircle for main button, PaperPlaneRight for send, Minus/X for minimize/close
  - Services: Footprints, FirstAid, Scissors, Sparkle, Virus, Eraser, Lightning for laser
  - Quick Actions: Calendar, List, MapPin, Info, Question

- **Spacing**:
  - Section padding: py-16 (desktop), py-12 (mobile)
  - Container max-width: max-w-7xl mx-auto px-4
  - Card gap: gap-8 (desktop), gap-6 (mobile)
  - Component spacing: space-y-6 for vertical stacks
  - Button padding: px-6 py-3 (large CTA), px-4 py-2 (secondary)

- **Mobile**:
  - Navigation: Hamburger menu with slide-in drawer at <768px
  - Service grid: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
  - Chatbot: Fixed 420x650px (desktop) → fullscreen modal (mobile)
  - Hero text: Reduced font sizes at mobile breakpoint (H1: 48px → 32px)
  - Footer: 4 columns → 2 columns → 1 column stacked
  - Touch targets: Minimum 44x44px for mobile usability
