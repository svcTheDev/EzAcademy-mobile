# EzAcademy Mobile — Copilot Instructions

## 1. Contexto del proyecto

EzAcademy Mobile es la aplicación móvil de EzAcademy, una plataforma educativa para pequeñas academias tecnológicas.

La aplicación móvil se está construyendo como un proyecto independiente utilizando React Native + Expo + TypeScript.

Existe una aplicación web/backend previa denominada **EzAcademy V1**. Mobile debe consumir el backend existente siempre que sea posible y no debe crear un backend paralelo.

### Backend V1

```text
React + Vite + TypeScript
        │
      Axios
        │
      HTTP
        │
Express + TypeScript
        │
    Mongoose
        │
     MongoDB
```

El backend actualmente contiene funcionalidades relacionadas con:

* Authentication
* Users
* Roles
* Courses
* Enrollments
* Sessions

Los roles existentes son:

* Student
* Instructor
* Admin

---

# 2. Alcance de EzAcademy Mobile V1

El objetivo inicial de Mobile NO es reproducir toda la aplicación web.

La primera versión móvil estará enfocada principalmente en el flujo de estudiante:

```text
Login / Register
       ↓
     Home
       ↓
    Courses
       ↓
 Course Detail
       ↓
     Enroll
       ↓
    Sessions
```

Inicialmente:

### Incluido

* Authentication
* Login
* Register
* Student Home
* Course list
* Course detail
* Enrollment
* Sessions

### No incluido inicialmente

* Instructor dashboard
* Instructor management
* Admin dashboard
* Admin CRUD
* Funcionalidades administrativas completas

Estas funcionalidades pueden incorporarse posteriormente.

No asumir que una funcionalidad debe implementarse solamente porque existe en V1 Web.

---

# 3. Stack tecnológico

El stack inicial es:

* Expo SDK 57
* React 19.2.3
* React Native 0.86.3
* TypeScript 6
* Expo Router
* Axios

TypeScript utiliza:

```json
{
  "strict": true
}
```

Las dependencias iniciales deben mantenerse mínimas.

## Regla fundamental sobre dependencias

NO instalar una dependencia nueva simplemente porque:

* es popular;
* facilita ligeramente una tarea;
* Copilot está acostumbrado a utilizarla;
* existe una alternativa nativa;
* aparece en un tutorial;
* es considerada "best practice" en otro proyecto.

Antes de introducir una dependencia, debe existir una necesidad concreta.

Si una funcionalidad puede resolverse razonablemente con React Native, Expo o TypeScript sin una dependencia adicional, preferir la solución existente.

---

# 4. Arquitectura general

La aplicación utilizará una arquitectura sencilla, orientada a features y separada por responsabilidades.

Conceptualmente:

```text
EzAcademy Mobile
│
├── Presentation
│   ├── Screens
│   ├── Components
│   └── Navigation
│
├── Application / Logic
│   ├── Auth logic
│   ├── Feature logic
│   └── State
│
├── Data
│   ├── API services
│   ├── HTTP client
│   └── Types
│
└── Utilities
```

La organización concreta debe ser suficientemente simple para que un desarrollador que está aprendiendo React Native pueda comprenderla.

No implementar Clean Architecture, Hexagonal Architecture, DDD, Repository Pattern, Dependency Injection u otros patrones complejos salvo que exista una necesidad concreta y explícita.

La prioridad es:

1. Correctitud
2. Comprensibilidad
3. Separación de responsabilidades
4. Mantenibilidad
5. Simplicidad

No optimizar prematuramente.

---

# 5. Arquitectura orientada a features

Las funcionalidades principales deben estar organizadas conceptualmente por feature.

Ejemplo:

```text
features/
├── auth/
├── courses/
├── enrollments/
└── sessions/
```

Cada feature puede contener los elementos necesarios para esa funcionalidad.

No crear una arquitectura basada exclusivamente en carpetas globales como:

```text
components/
services/
hooks/
screens/
utils/
```

si eso termina mezclando funcionalidades diferentes.

Los elementos realmente compartidos pueden permanecer en carpetas globales.

---

# 6. Navegación

Expo Router es el sistema de navegación oficial del proyecto.

Actualmente existe:

```text
app/
├── _layout.tsx
├── index.tsx
└── login.tsx
```

Expo Router utiliza file-based routing.

No sustituir Expo Router por React Navigation directamente.

La navegación debe evolucionar hacia una separación conceptual entre:

```text
Public routes
    ↓
Authentication
    ↓
Protected routes
```

Las rutas deben reflejar la estructura real de la aplicación.

No crear navegación innecesariamente compleja.

---

# 7. UI y componentes

La UI debe utilizar inicialmente componentes nativos de React Native:

* View
* Text
* TextInput
* Pressable
* ScrollView
* FlatList
* Image
* ActivityIndicator
* etc.

Crear componentes reutilizables únicamente cuando exista reutilización real o cuando el componente represente una pieza claramente independiente de UI.

No crear abstracciones prematuras.

Por ejemplo, no crear:

```text
UniversalButton
UniversalInput
UniversalCard
UniversalContainer
```

si solo se utilizan una vez y no aportan una abstracción útil.

---

# 8. Estado

Inicialmente utilizar React state/hooks.

Ejemplo:

```text
useState
useEffect
useContext
custom hooks
```

cuando corresponda.

## Redux Toolkit

NO introducir Redux Toolkit inicialmente.

La aplicación web V1 utiliza Redux Toolkit, pero Mobile no debe asumir que debe replicar esa arquitectura.

Solo introducir estado global cuando exista una necesidad clara que React state/context no resuelva adecuadamente.

## TanStack Query

NO introducir TanStack Query inicialmente.

Podrá evaluarse posteriormente si el manejo de datos remotos crece lo suficiente como para justificarlo.

---

# 9. Comunicación con el backend

La aplicación móvil consumirá el backend existente de EzAcademy V1.

Conceptualmente:

```text
Screen
   ↓
Feature logic
   ↓
Service
   ↓
Axios
   ↓
Backend API
```

Las pantallas NO deben realizar directamente llamadas HTTP complejas.

Evitar:

```tsx
const response = await axios.post(...)
```

directamente dentro de una pantalla si esa llamada pertenece a la lógica de una feature.

La comunicación con API debe estar centralizada en servicios apropiados.

---

# 10. Axios

Axios será el cliente HTTP.

Debe existir una configuración centralizada del cliente HTTP cuando comencemos la integración con el backend.

La configuración debe permitir posteriormente manejar:

* Base URL
* Headers
* Authentication token
* Errores
* Interceptors si realmente son necesarios

No implementar interceptors complejos antes de necesitarlos.

---

# 11. Authentication

El flujo previsto es:

```text
Login
 ↓
Axios POST
 ↓
Backend
 ↓
JWT
 ↓
Persistencia segura
 ↓
Requests autenticados
 ↓
x-token
 ↓
Protected API
```

La autenticación debe tener una responsabilidad centralizada.

Las pantallas no deben gestionar manualmente el JWT en múltiples lugares.

Evitar:

```text
Screen A → token
Screen B → token
Screen C → token
```

Preferir:

```text
Authentication layer
        ↓
     token/session
        ↓
      API client
```

La estrategia exacta de almacenamiento del token se decidirá antes de implementar persistencia.

No asumir automáticamente que `localStorage` existe en React Native.

---

# 12. Login

El login inicialmente será solo frontend.

Debe utilizar:

```text
TextInput
    ↓
controlled state
    ↓
onChangeText
```

Para contraseña:

```text
secureTextEntry
```

La implementación inicial debe limitarse al formulario.

NO agregar simultáneamente:

* Axios
* JWT
* almacenamiento
* interceptors
* navegación protegida
* recuperación de contraseña
* registro

hasta que esas funcionalidades hayan sido diseñadas explícitamente.

---

# 13. Tipos TypeScript

TypeScript debe utilizarse estrictamente.

Evitar:

```typescript
any
```

salvo que exista una razón técnica explícita.

Los modelos de datos del backend utilizados por Mobile deben representarse mediante tipos/interfaces adecuados.

Ejemplos conceptuales:

```text
User
Course
Enrollment
Session
AuthResponse
```

No duplicar tipos innecesariamente.

---

# 14. Manejo de errores

Toda funcionalidad que interactúe con API debe considerar al menos:

```text
Loading
Success
Error
Empty state
```

cuando esos estados sean aplicables.

No asumir que una petición HTTP siempre tendrá éxito.

Los errores deben presentarse al usuario de forma comprensible.

No mostrar automáticamente errores técnicos internos del backend al usuario final.

---

# 15. Android

La aplicación está orientada inicialmente a Android.

Debe considerarse:

* Android Back
* teclado
* comportamiento de TextInput
* diferentes tamaños de pantalla
* loading states
* errores de red
* permisos cuando sean necesarios

No agregar permisos Android que no correspondan a una funcionalidad real.

---

# 16. Responsive design

No asumir dimensiones específicas de un único teléfono.

La UI debe funcionar razonablemente en diferentes tamaños de pantalla.

Preferir:

* Flexbox
* dimensiones relativas
* `ScrollView`
* `FlatList`
* `SafeAreaView` / APIs equivalentes cuando corresponda

Evitar layouts rígidos basados excesivamente en valores absolutos.

---

# 17. Código

El código debe ser:

* claro;
* pequeño;
* explícito;
* tipado;
* fácil de leer;
* consistente.

Preferir código sencillo sobre abstracciones sofisticadas.

No generar código innecesariamente largo.

No agregar comentarios que simplemente describan literalmente lo que hace una línea.

Los comentarios deben explicar decisiones o comportamientos que no sean obvios.

---

# 18. Regla contra el vibecoding

Esta regla es especialmente importante.

Copilot NO debe tomar decisiones arquitectónicas importantes por iniciativa propia.

Antes de implementar algo que implique una decisión estructural, explicar:

1. Qué problema se está resolviendo.
2. Qué opciones existen.
3. Qué opción se recomienda.
4. Por qué.
5. Qué archivos se verían afectados.

Después de que la decisión esté clara, implementar.

---

# 19. Alcance de cada tarea

Cada solicitud debe mantenerse acotada.

Si se solicita:

> Crear el formulario de login

NO hacer simultáneamente:

* autenticación;
* Axios;
* JWT;
* persistencia;
* navegación protegida;
* registro;
* manejo global de errores.

Implementar únicamente el alcance solicitado.

Si una funcionalidad adicional parece necesaria, señalarla pero no implementarla automáticamente.

---

# 20. No modificar arquitectura sin autorización

NO:

* cambiar Expo Router;
* introducir Redux;
* introducir TanStack Query;
* introducir otra librería HTTP;
* cambiar TypeScript configuration;
* modificar la arquitectura de carpetas;
* crear nuevos patrones arquitectónicos;
* agregar dependencias importantes;

sin explicar primero la razón y obtener aprobación.

---

# 21. Archivos existentes

El proyecto actualmente conserva algunos archivos provenientes del template inicial de Expo.

No eliminar archivos únicamente porque parezcan innecesarios.

Antes de eliminar un archivo:

1. comprobar si está siendo utilizado;
2. determinar si Expo Router lo necesita;
3. explicar por qué puede eliminarse;
4. eliminarlo solo cuando sea seguro.

---

# 22. Uso de IA

Copilot es un asistente de implementación, no el arquitecto principal del proyecto.

El desarrollador debe entender:

* qué se está implementando;
* por qué;
* dónde está ubicado;
* cómo funciona;
* qué dependencias utiliza.

Cuando sea posible, proporcionar primero una implementación simple y explicable.

No ocultar complejidad detrás de abstracciones generadas automáticamente.

---

# 23. Proceso obligatorio de implementación

Para cada nueva funcionalidad:

### Paso 1 — Comprender

Identificar exactamente qué se quiere construir.

### Paso 2 — Revisar

Inspeccionar el código existente antes de crear nuevos archivos.

### Paso 3 — Planificar

Determinar:

* archivos afectados;
* componentes necesarios;
* estado necesario;
* servicios necesarios;
* tipos necesarios;
* navegación afectada.

### Paso 4 — Implementar

Realizar únicamente los cambios necesarios.

### Paso 5 — Revisar

Comprobar:

* TypeScript;
* imports;
* arquitectura;
* errores;
* código innecesario;
* dependencias nuevas.

### Paso 6 — Probar

Probar manualmente la funcionalidad antes de continuar.

### Paso 7 — Explicar

Ser capaz de explicar qué cambió y por qué.

---

# 24. Reglas de dependencias

Antes de agregar una dependencia:

```text
¿Realmente necesitamos una dependencia?
        ↓
¿React Native/Expo ya resuelve esto?
        ↓
¿Podemos resolverlo con código sencillo?
        ↓
¿La dependencia aporta suficiente valor?
```

Si la respuesta no justifica claramente la dependencia, no instalarla.

---

# 25. Testing

El testing se incorporará progresivamente.

Priorizar inicialmente las funcionalidades críticas:

* Authentication
* Navigation
* API integration
* Enrollment
* Course data

No introducir un sistema de testing excesivamente complejo antes de que exista una necesidad real.

---

# 26. Seguridad

Nunca:

* hardcodear secretos;
* incluir API keys privadas en el código;
* almacenar credenciales de forma insegura;
* asumir que el almacenamiento del navegador funciona igual en Android.

La autenticación y persistencia deben diseñarse teniendo en cuenta el entorno móvil.

---

# 27. Preparación para futuras versiones

La arquitectura inicial debe permitir agregar posteriormente:

```text
Student
Instructor
Admin
```

sin tener que reconstruir completamente la aplicación.

Sin embargo, NO implementar ahora infraestructura para funcionalidades futuras que todavía no existen.

Diseñar para extensión, pero no sobrearquitecturar.

---

# 28. Principio fundamental

Cuando existan varias soluciones técnicamente válidas:

> Preferir la solución más sencilla que resuelva correctamente el problema actual y que Sergio pueda entender completamente.

La aplicación debe crecer de forma incremental.

No intentar construir toda la arquitectura futura desde el primer día.

---

# 29. Estado actual del proyecto

Actualmente:

```text
Expo
  ↓
React Native
  ↓
Expo Router
  ↓
Home
  ↓
Login
```

El flujo de navegación inicial funciona:

```text
EzAcademy
   ↓
Ingresar
   ↓
Login
   ↓
Android Back
   ↓
EzAcademy
```

El siguiente objetivo inmediato es:

```text
Login
├── Email
├── Password
└── Ingresar
```

Inicialmente solo frontend.

Después se continuará progresivamente con:

```text
Login UI
   ↓
Backend integration
   ↓
JWT
   ↓
Secure persistence
   ↓
Authenticated requests
   ↓
Protected navigation
   ↓
Student Home
   ↓
Courses
   ↓
Course Detail
   ↓
Enrollment
   ↓
Sessions
```

---

# 30. Regla final

**No implementar más de lo solicitado.**

**No introducir arquitectura que no haya sido acordada.**

**No agregar dependencias sin necesidad.**

**No asumir decisiones de producto.**

**No reemplazar una solución simple por una solución sofisticada.**

**No ocultar complejidad.**

**No convertir una tarea pequeña en una refactorización completa.**

El objetivo no es únicamente producir una aplicación funcional.

El objetivo es construir una aplicación funcional mientras el desarrollador comprende progresivamente React Native, Expo, navegación, consumo de APIs, autenticación, estado y desarrollo Android.

