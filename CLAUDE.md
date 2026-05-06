@AGENTS.md

# Reglas operativas — pagina-web (RDMD & Co.)

## Regla #1 — Revisar TODAS las skills disponibles antes de actuar

Antes de **responder, sugerir, o modificar** cualquier cosa en este chat, releer la lista de skills disponibles (aparece en `<system-reminder>` de cada turno) y evaluar cuáles aplican.

**Por qué:** En sesiones largas pierdo de vista qué tengo a mano y termino construyendo desde cero algo que ya está resuelto por una skill. A Luis le ha pasado varias veces que tuvo que recordarme. No debe pasar más.

**Cómo aplicarlo:**
- Pedido nuevo → escanear skills, listar las que apliquen, invocar las que sumen valor real
- Decisión de UI → `ui-ux-pro-max`, `design-ui-designer`
- Decisión de arquitectura/CSS → `design-ux-architect`
- Decisión de UX/comportamiento usuario → `design-ux-researcher`
- Decisión de backend/API → `engineering-backend-architect`
- Tokens / sistema de diseño → `design-system`
- Componentes shadcn/Tailwind → `ui-styling`

## Skills clave de este proyecto

### Diseño & UX (tier 1 — invocar siempre que aplique)

| Skill | Para qué |
|-------|----------|
| `ui-ux-pro-max` | Design intelligence con BM25 sobre 14 CSVs (estilos, paletas, fuentes, landing patterns, ux-guidelines, ui-reasoning). Generador de design system. |
| `design-ui-designer` | Specs visuales pixel-perfect, sistema de componentes |
| `design-ux-architect` | Arquitectura CSS, fundaciones técnicas, guía de implementación |
| `design-ux-researcher` | Análisis de comportamiento del usuario, usabilidad, decisiones data-driven |
| `design-system` | Tokens primitive → semantic → component |

### Polish y taste (instaladas Mayo 2026)

| Skill | Para qué |
|-------|----------|
| `emil-design-eng` | Filosofía Emil Kowalski (sonner, vaul). Polish, microinteracciones, decisiones de animación, los detalles invisibles que hacen que el software se sienta bien. |
| `impeccable` | Audit/redesign de UI. Visual hierarchy, IA, cognitive load, anti-patterns, theming. Usar para auditar después de construir. |
| `high-end-visual-design` | Bloquea defaults baratos. Define fonts, spacing, shadows, cards, animations que se ven "expensive". |
| `gpt-taste` | AIDA strict + GSAP ScrollTriggers, editorial typography wide, gapless bento grids. Layout variance via Python randomization. |
| `design-taste-frontend` | Senior UI/UX engineer con métricas estrictas, hardware acceleration, design engineering balanceado. |
| `minimalist-ui` | Editorial-style monochrome, typographic contrast, flat bento, no gradients ni shadows pesados. |
| `redesign-existing-projects` | Audita y eleva sitios existentes a nivel premium. Funciona con cualquier framework. |
| `industrial-brutalist-ui` | Swiss + military terminal. Para si queremos romper hacia un lado más crudo y editorial. |
| `stitch-design-taste` | Genera DESIGN.md anti-genérico para coding agents. |
| `brandkit` | Brand-kit boards, identity decks, mockups premium. Para cuando hagamos brand assets extendidos. |

### Imagen & assets

| Skill | Para qué |
|-------|----------|
| `imagegen-frontend-web` | Una imagen por sección de landing, composición variada, paleta consistente. Para references previas a build. |
| `imagegen-frontend-mobile` | Mobile screens en mockup de iPhone. |
| `image-to-code` | Genera design refs y los traduce a código. |

### Engineering (cuando aplique)

| Skill | Para qué |
|-------|----------|
| `engineering-backend-architect` | APIs, server-side, integraciones (form contacto, webhooks). En esta landing probablemente no aplica — Cal.com cubre la captura. |
| `ui-styling` | shadcn/ui sobre Radix + Tailwind |
| `brand` | Voz, copy, consistencia |
| `design` | Logo, CIP, identity completa |
| `full-output-enforcement` | Anti-truncation. Útil cuando pida outputs largos completos. |

## Stack actual

- Next.js 16.2.5 + Turbopack + App Router + TypeScript
- Tailwind v4 — `@theme` dentro de [globals.css](src/app/globals.css), NO existe `tailwind.config.js`
- Motion — usar `motion/react-client` para animaciones dentro de Server Components
- Fuentes vía `next/font/google` (Cormorant Garamond + DM Sans)

### Brand tokens activos en Tailwind
```
bg-rdmd-bg      #0A0A0A   (fondo)
text-rdmd-text  #F5F0E8   (texto principal, hueso)
text-rdmd-gold  #C8973B   (acento dorado)
font-display              (Cormorant Garamond)
font-sans                 (DM Sans)
```

## Cliente target — "Carlos"

Fundador de agencia de marketing pequeña (3-10 personas) en MX/CO/AR. Factura $800K–$3M MXN/año. Quiere escalar sin contratar más gente. Estética old money, confianza tranquila, no guru.

**Copy:** español, sin guiones tipográficos, sin emojis, sin exclamaciones, sin promesas vacías. Tono directo y específico.

## Decisiones de la landing (vs sitio actual rdmdco.com en Lovable)

Aplican estas decisiones de Luis (2026-05-06):

1. **Hero afilado a agencias.** Carlos es el target del hero. Los otros 3 perfiles (e-commerce, procesos repetitivos, emprendedores) viven en sección secundaria "¿Tu negocio está listo para automatizar?", no compiten por el headline.
2. **Precios:** mantener los **6 productos llave en mano con precio fijo** ($397–$997). Quitar los 3 tiers de retainer ($497/$997/custom) — no van con marca premium. El retainer se descubre en la conversación post-diagnóstico, no en pricing tiers tipo SaaS.
3. **Testimoniales del sitio actual son placeholder.** En la V1 de la nueva landing **NO se reusan testimoniales fake**. Se reemplaza esa sección con:
   - "Por qué confiar en RDMD" — narrativa breve del fundador (Luis) y filosofía de trabajo
   - Resultados típicos de cada producto llave en mano (sin nombres falsos)
   - Cuando Luis tenga testimoniales reales, se reactiva la sección.

**Captura de leads:** Cal.com ya integrado en rdmdco.com → reusar `https://cal.com/rdmdco/30min` como destino de todos los CTAs principales. Secondary: WhatsApp `wa.me/18299056168`.

## Anti-patrones — NUNCA hacer

- Colores neón brillantes
- Animaciones agresivas o rápidas (>400ms para transiciones de UI)
- Emojis como iconos (usar SVG: Heroicons, Lucide)
- Gradientes morado/rosa de "AI bro"
- Toggle de dark mode (la marca es dark por defecto, light no existe)
- Decoración sin función
- Stock photos genéricas
- Buzzwords ("revolucionario", "disruptivo", "synergy")

## Antes de cada feature visual

1. Consultar `ui-ux-pro-max` con la pregunta concreta
2. Validar contra anti-patrones
3. Implementar con tokens, no valores hardcoded
4. Verificar contraste WCAG AA mínimo
5. Probar en breakpoints 375 / 768 / 1024 / 1440
