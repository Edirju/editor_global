# Editor Web Clone | Professional Markdown Editor

![alt text](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)

![alt text](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![alt text](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![alt text](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![alt text](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Un editor de texto Markdown de alto rendimiento inspirado en la estética y funcionalidad de Obsidian. Este proyecto demuestra la implementación de arquitecturas modernas de frontend, gestión de estado compleja y persistencia de datos local-first.

🚀 **[Ver Demo en Vivo](https://tu-proyecto.vercel.app)**

## 🌟 Características Principales

- **Arquitectura de Islas (Astro):** Optimización extrema del rendimiento cargando interactividad de React solo donde es necesaria.
- **Motor de Edición Profesional:** Implementación de **CodeMirror 6**, ofreciendo resaltado de sintaxis, ajuste de línea y una experiencia de escritura fluida.
- **Local-First & Persistencia:** Integración con **IndexedDB mediante Dexie.js**, garantizando que las notas se conserven localmente incluso tras cerrar el navegador.
- **Soporte Markdown Avanzado:**
  - **GFM (GitHub Flavored Markdown):** Tablas, checklists y tachado.
  - **Matemáticas LaTeX:** Renderizado de fórmulas científicas mediante **KaTeX**.
  - **Obsidian Syntax:** Soporte para resaltado (`==resaltado==`) y comentarios (`%%comentario%%`).
- **Modo Lectura vs. Modo Código:** Sistema de Toggle con **Sincronización de Scroll** para una transición fluida entre edición y visualización.
- **Exportación Dual:** Capacidad de descargar notas en formatos `.md` (Markdown puro) y `.html` (documento web listo para usar).
- **Interfaz Premium:** Modo Oscuro/Claro dinámico utilizando la **API de View Transitions** para animaciones circulares fluidas.

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Astro 5** | Framework base para routing y optimización de entrega de JS. |
| **React 18** | Desarrollo de componentes interactivos (Editor, Toolbar). |
| **TypeScript** | Tipado estricto para garantizar la robustez del código. |
| **Zustand** | Gestión de estado global ligera y eficiente. |
| **Tailwind CSS v4** | Estilizado moderno con variables dinámicas de diseño. |
| **CodeMirror 6** | Motor de edición de código altamente modular. |
| **Dexie.js** | Capa de abstracción sobre IndexedDB para persistencia de datos. |
| **Remark / Rehype** | Pipeline de procesamiento y transformación de Markdown a HTML. |

## 📐 Decisiones de Arquitectura

1. **Gestión de Estado Centralizada:** Se utilizó **Zustand** para sincronizar la instancia del editor con la Toolbar, permitiendo inserciones de Markdown quirúrgicas y manipulación del DOM del editor desde componentes externos.
2. **Procesamiento de Markdown:** En lugar de usar parsers simples, se implementó una cadena de procesamiento basada en **Unified.js**, lo que permite una extensibilidad total para futuros plugins (como diagramas de Mermaid o Backlinks).
3. **UX & Accesibilidad:** Implementación de menús contextuales mediante **Radix UI**, asegurando que los componentes sigan las mejores prácticas de accesibilidad (A11y) y comportamiento de teclado.

## 🚀 Instalación y Uso Local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/obsidian-web-clone.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre `http://localhost:4321` en tu navegador.

## 🛣️ Roadmap de Desarrollo

- [ ] Soporte para gestión de múltiples notas (Sidebar).
- [ ] Integración de IA para autocompletado semántico de notas.
- [ ] Vista de Grafo para visualizar conexiones entre notas.
- [ ] Soporte para adjuntar imágenes mediante Drag & Drop.

---
Desarrollado con ❤️ enfocado en la productividad y el rendimiento.
