# 🆕 Sistema de Registro de Pacientes - Resumen de Implementación

## 📋 ¿Qué se implementó?

Se agregó un **sistema completo de registro e identificación de pacientes** al chatbot de Podoskin Solutions.

---

## ✨ Características Principales

### 1. **Flujo Automático al Abrir el Chat**
- Al abrir el chatbot, se pregunta automáticamente: *"¿Ya eres paciente registrado?"*
- **Opción SÍ** → Formulario de búsqueda de paciente
- **Opción NO** → Formulario de registro de nuevo paciente

### 2. **Registro de Paciente Nuevo**
Campos del formulario:
- ✅ **Primer Nombre** (obligatorio)
- ⚪ Segundo Nombre (opcional)
- ✅ **Primer Apellido** (obligatorio)
- ⚪ Segundo Apellido (opcional)
- ✅ **Fecha de Nacimiento**: Día, Mes, Año (obligatorio)

### 3. **Generación de ID Único**

#### **Frontend (ID Parcial)**
Formato: `[2 últimas letras apellido]-[2 últimas letras nombre]-[MMDD]`

**Ejemplo:**
```
Nombre: Abraham Salvador Córdova Soto
Fecha: 05 de abril de 1996

Cálculo:
- Córdova → últimas 2 letras → VA
- Abraham → últimas 2 letras → AM
- Abril → 04, Día 5 → 0504

ID Parcial: "VA-AM-0504"
```

#### **Backend (ID Completo)**
El backend agrega un contador secuencial de 4 dígitos:
- Primer paciente con ese ID parcial → `-0001`
- Segundo paciente → `-0002`
- Noveno paciente → `-0009`

**ID Completo Final:** `VA-AM-0504-0009`

### 4. **Búsqueda de Paciente Existente**

Dos métodos de búsqueda:

**Método 1: Por ID**
- Input: `VA-AM-0504-0009`
- Búsqueda directa en la base de datos

**Método 2: Por Datos Personales**
- Primer Nombre
- Primer Apellido
- Fecha de Nacimiento
- Búsqueda por coincidencia exacta

### 5. **Persistencia de Sesión**
- Los datos del paciente se guardan en `localStorage`
- **No vuelve a preguntar** en futuras visitas
- Detecta automáticamente si el usuario ya está registrado
- La sesión persiste incluso si cierra el navegador

### 6. **Contexto Enriquecido en el Chat**
Cada mensaje al backend incluye:
```json
{
  "message": "¿Cuánto cuesta el tratamiento?",
  "patient_info": {
    "patient_id": "VA-AM-0504-0009",
    "first_name": "Abraham",
    "first_last_name": "Córdova",
    "is_registered": true
  }
}
```

El bot puede personalizar respuestas:
> "El tratamiento cuesta $800 MXN, **Abraham**. ¿Te gustaría agendar una cita?"

---

## 📁 Archivos Creados/Modificados

### **Nuevos Archivos:**
1. [`src/lib/patient.ts`](src/lib/patient.ts) - Funciones de generación de ID y gestión de datos
2. [`src/components/PatientRegistrationForm.tsx`](src/components/PatientRegistrationForm.tsx) - Formulario de registro
3. [`src/components/PatientLookupForm.tsx`](src/components/PatientLookupForm.tsx) - Formulario de búsqueda
4. [`BACKEND_INSTRUCTIONS.md`](BACKEND_INSTRUCTIONS.md) - Documentación completa para el backend

### **Archivos Modificados:**
1. [`src/lib/types.ts`](src/lib/types.ts) - Nuevas interfaces TypeScript
2. [`src/lib/chatbot.ts`](src/lib/chatbot.ts) - Nuevos endpoints y lógica
3. [`src/components/Chatbot.tsx`](src/components/Chatbot.tsx) - Flujo de registro integrado
4. [`README.md`](README.md) - Documentación actualizada de endpoints

---

## 🔌 Endpoints del Backend

### 1. **POST** `/api/patient/register`
Registra un nuevo paciente y retorna el ID completo.

**Request:**
```json
{
  "first_name": "Abraham",
  "first_last_name": "Córdova",
  "birth_date": "1996-04-05",
  "partial_id": "VA-AM-0504"
}
```

**Response:**
```json
{
  "success": true,
  "patient_id": "VA-AM-0504-0009"
}
```

### 2. **POST** `/api/patient/lookup`
Busca un paciente existente.

**Request (por ID):**
```json
{
  "patient_id": "VA-AM-0504-0009"
}
```

**Response:**
```json
{
  "found": true,
  "patient_id": "VA-AM-0504-0009",
  "first_name": "Abraham",
  "first_last_name": "Córdova"
}
```

### 3. **POST** `/api/chatbot/message`
Envía mensajes del chat con contexto del paciente.

**Request:**
```json
{
  "message": "¿Cuánto cuesta?",
  "session_id": "uuid-v4",
  "patient_info": {
    "patient_id": "VA-AM-0504-0009",
    "first_name": "Abraham",
    "first_last_name": "Córdova",
    "is_registered": true
  }
}
```

---

## 🎯 Flujo Completo de Usuario

### **Escenario 1: Usuario Nuevo**

1. **Usuario abre el chat**
   - Bot: *"¿Ya eres paciente registrado?"*

2. **Usuario selecciona: "No, soy nuevo"**
   - Aparece formulario de registro

3. **Usuario completa el formulario:**
   - Primer Nombre: Abraham
   - Primer Apellido: Córdova
   - Fecha: 05/04/1996

4. **Frontend genera ID parcial:**
   - `VA-AM-0504`

5. **Frontend envía al backend:**
   - Backend busca contadores existentes para `VA-AM-0504`
   - Si es el noveno, genera: `VA-AM-0504-0009`

6. **Backend retorna ID completo:**
   - Frontend guarda en localStorage
   - Usuario ya puede chatear

7. **Próxima visita:**
   - Chat se abre directamente ✅
   - No vuelve a preguntar ✅

### **Escenario 2: Usuario Existente**

1. **Usuario abre el chat**
   - Bot: *"¿Ya eres paciente registrado?"*

2. **Usuario selecciona: "Sí, ya soy paciente"**
   - Aparece formulario de búsqueda

3. **Usuario ingresa su ID:** `VA-AM-0504-0009`

4. **Backend busca en base de datos:**
   - Encuentra al paciente
   - Retorna datos básicos

5. **Frontend guarda en localStorage:**
   - Usuario puede chatear inmediatamente
   - Futuras visitas no requieren identificación

---

## 🔐 Seguridad y Privacidad

### **Frontend:**
- ✅ Validación de campos requeridos
- ✅ Validación de formato de fecha
- ✅ Sanitización de inputs
- ✅ Datos guardados solo en localStorage (local al navegador)

### **Backend (Requerido):**
- ✅ Validación de unicidad de IDs
- ✅ Prevención de SQL injection
- ✅ Rate limiting por sesión
- ✅ Encriptación de conexión (HTTPS)
- ✅ Logs de acceso y auditoría

---

## 📊 Base de Datos Requerida

El backend necesita crear la tabla `patients`:

```sql
CREATE TABLE patients (
    patient_id VARCHAR(20) PRIMARY KEY,        -- "VA-AM-0504-0009"
    partial_id VARCHAR(15) NOT NULL,           -- "VA-AM-0504"
    counter INTEGER NOT NULL,                  -- 9
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100),
    first_last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    birth_date DATE NOT NULL,
    registration_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active'
);
```

---

## 🧪 Pruebas Recomendadas

### **Frontend:**
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir http://localhost:5173
# Clic en botón flotante del chat
# Probar flujo de registro
```

### **Backend:**
Ver archivo [`BACKEND_INSTRUCTIONS.md`](BACKEND_INSTRUCTIONS.md) para:
- Casos de prueba completos
- Ejemplos de código
- Scripts de testing

---

## 📞 Próximos Pasos

### **Para el Equipo de Backend:**
1. Leer [`BACKEND_INSTRUCTIONS.md`](BACKEND_INSTRUCTIONS.md)
2. Crear base de datos con la estructura especificada
3. Implementar los 3 endpoints
4. Probar con Postman/curl
5. Configurar CORS para permitir requests del frontend

### **Para el Equipo de Frontend:**
1. ✅ Todo implementado y listo
2. Configurar `VITE_BACKEND_URL` en `.env` cuando backend esté listo
3. Probar integración completa

### **Para Testing:**
1. Probar registro de múltiples pacientes
2. Verificar generación correcta de IDs
3. Probar búsqueda por ID y por datos
4. Verificar persistencia en localStorage
5. Probar flujo completo end-to-end

---

## 📝 Notas Técnicas

### **Algoritmo de Generación de ID:**
```typescript
// Ejemplo: Abraham Córdova, 05/04/1996
const lastName = "Córdova";
const firstName = "Abraham";
const month = 4;
const day = 5;

// Últimas 2 letras
const lastNamePart = lastName.slice(-2).toUpperCase();  // "VA"
const firstNamePart = firstName.slice(-2).toUpperCase(); // "AM"

// Formatear fecha
const monthStr = month.toString().padStart(2, '0');     // "04"
const dayStr = day.toString().padStart(2, '0');         // "05"

// ID Parcial
const partialId = `${lastNamePart}-${firstNamePart}-${monthStr}${dayStr}`;
// Resultado: "VA-AM-0504"
```

### **Posibles Colisiones de ID:**
- Dos personas con nombres similares y misma fecha de nacimiento podrían tener el mismo ID parcial
- **Solución:** El contador secuencial los diferencia automáticamente
- Ejemplo: Dos "Abraham Córdova" nacidos el 05/04 tendrían:
  - Primero: `VA-AM-0504-0001`
  - Segundo: `VA-AM-0504-0002`

---

## ✅ Checklist de Implementación

### **Frontend:** ✅ COMPLETADO
- [x] Interfaces TypeScript definidas
- [x] Funciones de generación de ID
- [x] Componente de registro
- [x] Componente de búsqueda
- [x] Integración con chatbot
- [x] Persistencia en localStorage
- [x] Detección automática de sesión
- [x] Actualización de endpoints
- [x] Documentación completa

### **Backend:** ⏳ PENDIENTE
- [ ] Crear base de datos
- [ ] Endpoint `/api/patient/register`
- [ ] Endpoint `/api/patient/lookup`
- [ ] Actualizar endpoint `/api/chatbot/message`
- [ ] Pruebas unitarias
- [ ] Pruebas de integración
- [ ] Documentación de API

---

**Implementado por:** GitHub Copilot  
**Fecha:** Enero 12, 2026  
**Versión:** 1.0
