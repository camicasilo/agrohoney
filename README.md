# AgroHoney Ecosystem v2

AgroHoney.com es un marketplace ecosistémico diseñado para conectar a pequeños y medianos productores agrícolas colombianos (miel, café, etc.) directamente con consumidores y la cadena de valor.

## 🏗️ Nueva Arquitectura (Headless / CQRS)

El proyecto ha pivotado desde una arquitectura monolítica (WordPress/WooCommerce) hacia una solución de comercio electrónico de grado empresarial utilizando una arquitectura Headless de 5 capas:

1. **Capa 1: Backend & Core E-commerce**
   - **Tecnología:** [Medusa.js v2](https://medusajs.com/)
   - **Responsabilidad:** Motor de comercio electrónico, gestión de órdenes, catálogo, y panel de administración nativo (Admin Dashboard integrado en v2 con Vite).

2. **Capa 2: Base de Datos Relacional (Escritura)**
   - **Tecnología:** PostgreSQL
   - **Responsabilidad:** Persistencia transaccional de datos y migraciones gestionadas por Medusa.

3. **Capa 3: Caché y Bus de Eventos**
   - **Tecnología:** Redis
   - **Responsabilidad:** Gestión rápida de sesiones, almacenamiento en caché y comunicación asíncrona entre módulos.

4. **Capa 4: Motores de Búsqueda (Lectura Rápida / AI)**
   - **Lexical Search:** Meilisearch (búsqueda ultrarrápida y filtrado para el Storefront).
   - **Semantic/Vector Search:** Qdrant (búsqueda impulsada por IA para recomendaciones de productos).

5. **Capa 5: Frontend Storefront (Clon UI/UX)**
   - **Tecnología:** [Next.js](https://nextjs.org/) + Tailwind CSS
   - **Responsabilidad:** Consumo directo de Meilisearch/Backend para servir un clon exacto de la experiencia de usuario (UI/UX) de alta conversión (inspirado en líderes del sector como newzealandhoneyco.com), garantizando velocidad, SEO dinámico y arquitectura SSR/SSG.

## 🚀 Despliegue

La infraestructura se despliega utilizando **Dokploy** (basado en Docker) sobre servidores Cloud (ej. Oracle Cloud), garantizando que cada componente de la arquitectura esté aislado y sea escalable de forma independiente.