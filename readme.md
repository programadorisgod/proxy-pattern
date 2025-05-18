GitHub Copilot: # Instagram Video Downloader with Proxy Pattern

Este proyecto implementa un servicio de descarga de videos de Instagram utilizando el patrón de diseño Proxy para optimizar las descargas mediante caché. El sistema se compone de una API REST basada en Express que permite descargar videos de Instagram y almacenarlos localmente, evitando descargas redundantes mediante un sistema de caché.

## Características

- 📥 Descarga de videos desde Instagram
- 🔄 Implementación del patrón Proxy para cache
- 🚀 API REST basada en Express
- 📁 Servidor de archivos estáticos para acceder a los videos
- ✅ Cliente de prueba incluido

## Requisitos previos

- Node.js (v14 o superior)
- npm o bun

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/instagram-downloader-proxy.git
```

### 2. Entrar al directorio del proyecto

```bash
cd instagram-downloader-proxy
```

### 3. Instalar las dependencias

```bash
npm install
```

O si prefieres usar bun:

```bash
bun install
```

### 4. Ejecutar el servidor

```bash
npm run dev
```

O si estás usando bun:

```bash
bun run dev
```

Verás un mensaje indicando que el servidor está corriendo en http://localhost:4000.

### 5. Ejecutar el cliente de prueba

En otra terminal, ejecuta:

```bash
npm run client
```

O con bun:

```bash
bun run client
```

## Cómo funciona

El cliente enviará tres solicitudes consecutivas al servidor:

1. **Primera solicitud:** Descargará el video desde Instagram y lo almacenará en la carpeta videos.
2. **Segunda solicitud:** Comprobará si el video ya existe en el caché y lo recuperará.
3. **Tercera solicitud:** Confirmará que el sistema de caché funciona correctamente.

## Estructura del proyecto

```
instagram-downloader-proxy/
├── src/
│   ├── app.ts               # Configuración de Express
│   ├── index.ts             # Punto de entrada del servidor
│   ├── client.ts            # Cliente de prueba
│   ├── controller/          # Controladores de la API
│   ├── Domain/              # Lógica de negocio
│   ├── interface/           # Interfaces y tipos
│   ├── lib/                 # Implementaciones concretas
│   └── proxy/               # Implementación del patrón Proxy
├── videos/                  # Carpeta donde se almacenan los videos
├── package.json
└── README.md
```

## Patrón de diseño Proxy

Este proyecto implementa el patrón Proxy para:

1. **Control de acceso:** Verifica la validez del usuario antes de permitir descargas.
2. **Caché:** Evita descargas redundantes almacenando resultados previos.
3. **Logging:** Registra información sobre las operaciones de descarga.

El proxy actúa como intermediario entre el cliente y el servicio real de descarga de Instagram, permitiendo optimizar el rendimiento y controlar el acceso.

## API Endpoints

- **POST /api/download**
  - Cuerpo de la solicitud: `{ "url": "https://www.instagram.com/reel/..." }`
  - Respuesta exitosa: `{ "status": "success", "message": "...", "data": { "filename": "...", "url": "..." } }`

## Acceso a los videos

Los videos descargados están disponibles en:

```
http://localhost:4000/videos/nombre-del-archivo.mp4
```

---

Si encuentras algún problema o tienes sugerencias, por favor [abre un issue](https://github.com/tu-usuario/instagram-downloader-proxy/issues).
