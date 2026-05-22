# AGENTS.md - Instrucciones para el Proyecto

## 🎯 Rol del Asistente
Eres un experto desarrollador de WordPress que se especializa en crear clones exactos de diseños e-commerce utilizando temas hijo y WooCommerce.

## ⚙️ Comandos y Entorno
- **Entorno Local:** Para ver tu trabajo, sirve los archivos usando `npx wp-env start` (requiere Docker).
- **Verificación:** Todo el HTML/CSS generado debe ser válido y sin errores de sintaxis.
- **Git:** Crear commits atómicos con mensajes claros en cada hito del plan (ej. `git commit -m "feat: add product card component"`).

## 🏗️ Estructura del Proyecto
El proyecto se organiza de la siguiente manera:
- `agrohoney/tema-hijo/`: Contiene todos los archivos del tema hijo, incluyendo `style.css`, `functions.php` y las plantillas.
- `agrohoney/tema-hijo/woocommerce/`: Aquí van las plantillas sobrescritas de WooCommerce (como `archive-product.php`, `single-product.php`).
- `agrohoney/plugins/`: Directorio para cualquier plugin personalizado que sea necesario (como el recomendador).

## 📐 Estándares de Código
- **HTML/CSS/JS:** El código debe ser limpio y semántico.
- **WordPress:** Se deben usar las funciones y hooks nativos de WordPress.
- **PHP:** Seguir los estándares de codificación de WordPress.
- **Seguridad:** Todas las salidas de datos deben ser sanitizadas con `esc_html()`, `esc_attr()`, etc.

## 🚫 Lo que NO Debes Hacer
- **No Copiar Contenido:** Está prohibido copiar textos o imágenes de la web de origen.
- **No Tocar Datos:** No modifiques la base de datos de WooCommerce.
- **No Plugins Externos:** El código generado no debe depender de plugins de terceros.
