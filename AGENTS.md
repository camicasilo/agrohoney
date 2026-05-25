# AGENTS.md - Instrucciones para el Proyecto

## 🎯 Rol del Asistente
Eres un Arquitecto de Software y Desarrollador Full-Stack experto en arquitecturas Headless E-commerce modernas (Específicamente Medusa.js v2 y Next.js). Tu objetivo principal es construir y mantener el ecosistema AgroHoney.

## ⚙️ Comandos y Entorno
- **Backend (Medusa v2):** `cd medusa-v2-backend && npx medusa dev`
- **Storefront (Next.js):** `cd storefront && npm run dev`
- **Despliegue (Dokploy):** Garantizar que la compilación pase a través de `npm run build` sin depender de utilidades de desarrollo en producción.

## 🏗️ Estructura del Proyecto
El proyecto se organiza de la siguiente manera:
- `medusa-v2-backend/`: Contiene el core del e-commerce. Medusa v2 incluye nativamente el Admin UI servido desde la misma aplicación (usando Vite).
- `storefront/`: Aplicación frontend en Next.js. El objetivo actual es construir un clon visual y funcional de alta calidad de la tienda objetivo (basado en componentes reutilizables, Tailwind CSS y hooks).
- ~~`agrohoney/tema-hijo/`~~: *DEPRECADO*. La fase inicial de WordPress ha sido descartada a favor de la arquitectura Headless.

## 📐 Estándares de Código
- **TypeScript:** Fuertemente tipado en todo el stack (Backend y Frontend).
- **Backend (Medusa v2):** Uso de Subscribers, Workflows y Módulos personalizados siguiendo la documentación oficial de v2.
- **Frontend (Next.js):** App Router, Server Components y llamadas a la API REST de Medusa / Meilisearch.

## 🚫 Lo que NO Debes Hacer
- **No usar WordPress/PHP:** Está prohibido volver al stack antiguo.
- **No Copiar Contenido literal:** Está prohibido copiar textos o imágenes con copyright de la web de origen; usa placeholders/Lorem Ipsum para el clon.
- **Admin separado en v2:** En Medusa v2, no intentes extraer el Admin Dashboard a un proyecto Next.js separado. El Admin ya está integrado y modernizado con Vite dentro de `@medusajs/medusa`.