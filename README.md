# Enanos App

App en **React Native (Expo)** que consume la API de Enanos. Muestra un `FlatList`
de Tarjetas con nombre y edad de cada enano, un formulario para agregar uno nuevo
(nombre + edad) y un botón **Eliminar** en cada Tarjeta.

## Cómo correrla

1. Cloná el repo e instalá las dependencias:

   ```bash
   git clone <URL-DE-ESTE-REPO>
   cd enanos-app
   npm install
   ```

2. **Configurá la URL del backend** en `src/config.ts`:

   ```ts
   export const API_URL = 'http://TU_IP_O_DOMINIO:3000';
   ```

   - Emulador Android + backend en tu PC → `http://10.0.2.2:3000`
   - Dispositivo físico con Expo Go (misma red WiFi) → `http://<IP-local-de-tu-PC>:3000`
   - Backend desplegado (Render, Railway, etc.) → la URL pública que te dieron

3. Iniciá el proyecto:

   ```bash
   npx expo start
   ```

   Escaneá el QR con la app **Expo Go** (Android/iOS) o abrí un emulador.

## Requisito previo

El backend (repositorio `enanos-backend`) tiene que estar corriendo y accesible
desde el dispositivo/emulador donde se prueba esta app.

## Estructura

```
App.tsx
src/
  config.ts               -> URL del backend (configurable)
  api.ts                  -> funciones fetch: obtenerEnanos, crearEnano, eliminarEnano
  components/EnanoCard.tsx -> Tarjeta con nombre, edad y botón Eliminar
  screens/EnanosScreen.tsx -> Formulario + FlatList
```
