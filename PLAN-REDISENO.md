# Plan de rediseño rdmdco.com — nivel trycore, identidad RDMD

> Referencia analizada: trycore.com (competidor objetivo). Empresa colombiana de
> hiperautomatización enfocada en banca. Lo que admiramos: su profundidad de
> contenido, estructura por servicio y sector, blog editorial, y señales de
> confianza. Lo que NO copiamos: su estética SaaS azul genérica.
>
> Principio rector: **adoptar la estructura de trycore, conservar la estética
> premium de RDMD** (negro #0A0A0A, Cormorant Garamond, gold #C8973B, editorial).
> El resultado debe verse más caro que trycore, con la misma seriedad estructural.

---

## 1. Decisiones tomadas (Luis, 2026-05-21)

1. **Modelo híbrido de oferta:**
   - **Servicios** (consultoría, sin precio público, cotización a medida) — estilo trycore.
   - **Sistemas llave en mano** (productos con precio fijo $397–$997, para empresas pequeñas) — sección propia.
2. **5 servicios** (los 6 de trycore menos "acompañamiento de talento TI"):
   1. Gestión inteligente de procesos
   2. Desarrollo de software a medida
   3. Arquitectura tecnológica
   4. Tecnologías emergentes (IA, agentes, automatización)
   5. Pruebas de software (QA)
3. **Artículos/blog** con la estructura editorial de trycore.
4. Mantener estética RDMD. No copiar el look azul de trycore.

---

## 2. Qué hace trycore que genera confianza (los 5 pilares)

1. **Cada servicio tiene página propia** con plantilla fija: hero, sub-servicios en
   cards, ventajas en tabs, FAQ acordeón, CTA + formulario.
2. **Páginas por sector** — el mismo servicio traducido al lenguaje de cada
   industria ("automatizamos el KYC de tu banco", no "hacemos RPA").
3. **Números concretos** en todo el sitio ("75% menos costos", "fraude -65%").
4. **Blog editorial serio** — artículos de ~1.300 palabras con hook, tabla de
   contenidos, datos, caso de éxito embebido, metadata (autor + revisor, tiempo de
   lectura), CTA final, artículos relacionados.
5. **Empresa robusta** — valores, liderazgo con fotos, reconocimientos en prensa,
   alianzas, sala de prensa.

---

## 3. Arquitectura del sitio nuevo

### Navegación principal

```
[RDMD & Co.]   Servicios   Sistemas   Sectores   Recursos   Empresa   [Conversemos]
                  │            │           │           │          │
   ┌──────────────┘            │           │           │          │
   │ Mega-menú / dropdown      │           │           │          │
   ├ Gestión de procesos       │           │           │          │
   ├ Desarrollo de software    │           │           │          │
   ├ Arquitectura tecnológica  │           │           │          │
   ├ Tecnologías emergentes    │           │           │          │
   └ Pruebas de software (QA)  │           │           │          │
                               │           │           │          │
        ┌──────────────────────┘           │           │          │
        │ 6 sistemas llave en mano          │           │          │
        │ (con precio)                      │           │          │
                                            │           │          │
             ┌──────────────────────────────┘           │          │
             │ Sectores (a quién servimos)               │          │
             ├ Agencias de marketing (especialización)   │          │
             ├ Servicios profesionales                   │          │
             └ E-commerce / retail                       │          │
                                                         │          │
                  ┌──────────────────────────────────────┘          │
                  │ Recursos                                         │
                  ├ Blog / Artículos                                 │
                  ├ Casos de éxito                                   │
                  └ Guías descargables                               │
                                                                     │
                       ┌─────────────────────────────────────────────┘
                       │ Empresa
                       ├ Por qué RDMD (filosofía + fundador)
                       ├ Cómo trabajamos (proceso)
                       └ Contacto
```

### Mapa de rutas (Next.js App Router)

```
/                              Home (rediseñar la actual)
/servicios                     Índice de servicios (overview)
/servicios/gestion-procesos    Página servicio 1
/servicios/desarrollo-software Página servicio 2
/servicios/arquitectura        Página servicio 3
/servicios/tecnologias-emergentes  Página servicio 4
/servicios/pruebas-qa          Página servicio 5
/sistemas                      Los 6 llave en mano con precio
/sectores                      Índice de sectores
/sectores/agencias-marketing   Página sector 1 (especialización)
/sectores/servicios-profesionales  Página sector 2
/sectores/ecommerce            Página sector 3
/blog                          Índice de artículos
/blog/[slug]                   Artículo individual
/casos                         Casos de éxito
/empresa                       Sobre RDMD
/contacto                      Contacto (o seguir usando Cal.com)
```

---

## 4. Plantilla de PÁGINA DE SERVICIO (las 5 iguales)

Estructura fija, estética RDMD. Orden de arriba a abajo:

### 4.1 Hero
- Eyebrow gold: nombre corto del servicio
- H1 Cormorant: título completo
- Subtítulo DM Sans: una frase de qué resuelve
- CTA primary "Agenda tu diagnóstico" + secondary "Ver cómo funciona"
- Fondo: imagen editorial Higgsfield o gradiente sutil (NO ilustración flat)

### 4.2 Sub-servicios (lo que incluye)
- Grid de 4-6 cards, cada una con icono Lucide + título + 1 línea
- Estética: cards oscuras con borde rule, hover sutil (como la sección Services actual)

### 4.3 Ventajas en tabs
- 4 tabs horizontales: Personalización / Precisión / Velocidad / Escala
- Cada tab: headline Cormorant + párrafo + visual al lado
- (Es el patrón de trycore que más profesionalismo transmite)

### 4.4 Cómo trabajamos (proceso del servicio)
- 3-4 pasos numerados con la estética de números gold grandes
- Diagnóstico → Diseño → Construcción → Soporte

### 4.5 Stat / prueba
- Un número grande gold (estilo casos de éxito que ya tenemos en Trust.tsx)
- Ej: "36 hrs/mes ahorradas en reportería"

### 4.6 FAQ acordeón
- 6-8 preguntas reales del servicio
- Responde dudas de precio, alcance, tiempo, garantía

### 4.7 CTA de cierre
- "¿Listo para [beneficio]?" + botón Cal.com

---

## 5. Copy base por servicio (borrador, refinar antes de publicar)

### 5.1 Gestión inteligente de procesos
- **Eyebrow:** Procesos
- **H1:** Gestión inteligente de procesos de negocio
- **Sub:** Mapeamos, optimizamos y automatizamos los procesos manuales que consumen
  el tiempo de tu equipo, para que se dediquen a lo que de verdad mueve el negocio.
- **Sub-servicios:** Mapeo de procesos · Optimización · Automatización ·
  Minería de procesos · Reglas de negocio · Documentación
- **Tabs:** A medida / Sin fricción / Escalable / Medible

### 5.2 Desarrollo de software a medida
- **Eyebrow:** Software
- **H1:** Desarrollo de software a medida
- **Sub:** Código estable, seguro y escalable. Aplicaciones, integraciones y
  sistemas internos diseñados para tu operación específica, no plantillas genéricas.
- **Sub-servicios:** Aplicaciones web · Integraciones de sistemas · Dashboards y BI ·
  Migración a la nube · APIs · Automatización de flujos
- **Tabs:** A medida / Bien hecho / Entrega ágil / Arquitectura que escala

### 5.3 Arquitectura tecnológica
- **Eyebrow:** Arquitectura
- **H1:** Arquitectura tecnológica que escala
- **Sub:** Diseñamos el sistema que conecta tus herramientas y soporta el
  crecimiento, sin que se rompa cuando la operación se multiplica.
- **Sub-servicios:** Diseño de arquitectura · Integración de sistemas ·
  Infraestructura cloud · Seguridad · Escalabilidad · Documentación técnica

### 5.4 Tecnologías emergentes
- **Eyebrow:** IA
- **H1:** Tecnologías emergentes aplicadas a tu negocio
- **Sub:** Agentes de IA, automatización con modelos de lenguaje y herramientas
  que hace dos años no existían, aplicadas a problemas concretos de tu operación.
- **Sub-servicios:** Agentes conversacionales · Automatización con IA ·
  Procesamiento de documentos · Análisis predictivo · Integraciones con LLMs

### 5.5 Pruebas de software (QA)
- **Eyebrow:** Calidad
- **H1:** Pruebas de software que evitan errores costosos
- **Sub:** Validamos que tu software funcione, sea seguro y aguante carga antes de
  que llegue a producción. Porque un error en vivo cuesta más que prevenirlo.
- **Sub-servicios:** Pruebas funcionales · Carga y rendimiento · Seguridad ·
  Usabilidad · Regresión · Automatización de pruebas

> Todo el copy sigue la regla RDMD: español neutro, sin guiones tipográficos,
> sin emojis, sin exclamaciones, sin buzzwords. Tono Casio→Suizo: aspiracional,
> nunca de dolor.

---

## 6. Sección SISTEMAS LLAVE EN MANO (los 6 con precio)

Página `/sistemas` + bloque en la home. Mantiene los 6 productos actuales:

| Sistema | Precio | Para |
|---|---|---|
| Seguimiento de Leads con IA | $597 | El más vendido |
| Atención al Cliente 24/7 | $897 | Ahorra más tiempo |
| Reportes Automáticos | $397 | Más fácil de entender |
| Procesamiento de Documentos | $697 | Para operaciones |
| Secuencia de Nutrición | $797 | Cierra más ventas |
| Reactivación de Base de Datos | $997 | ROI inmediato |

Posicionamiento: "Para empresas pequeñas que quieren un sistema funcionando
rápido, sin proyecto de consultoría. Precio fijo, entrega en días."

Diferencia clara vs Servicios: Servicios = a medida, cotización. Sistemas =
producto, precio fijo, rápido.

---

## 7. Páginas de SECTOR

Trycore va a banca. RDMD va a empresas pequeñas, especializado en agencias de
marketing. Sectores propuestos:

1. **Agencias de marketing** (especialización declarada — la página más fuerte)
2. **Servicios profesionales** (consultoras, despachos, estudios, clínicas)
3. **E-commerce / retail pequeño**

Cada página de sector: hero específico + 3 problemas del sector + cómo los
servicios RDMD los resuelven + caso/stat + CTA. Es el "mismo servicio traducido
al lenguaje del cliente".

---

## 8. Sistema de BLOG / ARTÍCULOS

### 8.1 Índice `/blog`
- Grid de cards: imagen + categoría (chip gold) + título Cormorant + autor + fecha + extracto
- Categorías: Automatización · Procesos · IA aplicada · Casos de éxito
- Hero del blog: "Historias y conocimiento" (como trycore)

### 8.2 Artículo individual `/blog/[slug]`
Estructura editorial (copiada de trycore, estética RDMD):
1. **Hero:** categoría + título + metadata (autor, fecha, tiempo de lectura)
2. **Hook:** pregunta o problema concreto en las primeras 2 líneas
3. **Tabla de contenidos** (anclas a las secciones)
4. **Cuerpo:** subtítulos numerados, listas, datos/stats, imágenes
5. **Caso de éxito embebido** (callout con borde gold)
6. **CTA al final:** "¿Quieres aplicar esto en tu empresa? Conversemos"
7. **Artículos relacionados** (3 cards)
- Longitud objetivo: 1.000-1.400 palabras
- Tono: educativo + comercial. Enseña algo real, cierra ofreciendo el servicio.

### 8.3 Implementación técnica
- Opción A (recomendada): archivos MDX en `/content/blog/*.mdx` + render con
  next-mdx-remote o el soporte nativo de MDX de Next. Escribes en Markdown, el
  layout es un componente fijo.
- Opción B: CMS headless (Sanity / Contentful) si quieres editar sin tocar código.
  Más trabajo inicial, más cómodo a futuro.
- Recomendación: empezar con MDX (cero costo, control total, git-versionado), migrar
  a CMS solo si publicas mucho.

### 8.4 Primeros 3 artículos sugeridos
1. "Cómo saber qué procesos de tu agencia deberías automatizar primero"
2. "Por qué tu equipo no es lento: es tu proceso" (ya tenemos este tema en carruseles)
3. "Qué es un agente de IA y para qué sirve en una empresa pequeña"

---

## 9. Página EMPRESA

Estructura (estética RDMD, sin las fotos corporativas genéricas de trycore):
1. Filosofía: la metáfora Casio→reloj suizo
2. Cómo trabajamos: construimos no consultamos / transparentes / soporte real
   (ya existe en Trust.tsx, reusar)
3. Fundador: Luis, República Dominicana, por qué RDMD
4. (Futuro) Reconocimientos / casos cuando existan

---

## 10. HOME rediseñada (orden de secciones)

1. Hero (ya está, con el video del orbe)
2. Servicios (5 cards que linkean a cada página de servicio) — evolución de Services.tsx
3. Sistemas llave en mano (6 productos con precio) — Solutions.tsx actual
4. Sectores (3 cards: a quién servimos)
5. Por qué RDMD + casos de éxito (Trust.tsx actual)
6. Blog preview (últimos 3 artículos)
7. CTA cierre (CtaClosing.tsx actual)
8. Footer

---

## 11. Orden de construcción recomendado

**Fase 1 — Fundación de servicios (mayor impacto):**
1. Componente plantilla `ServicePage` reutilizable (hero + sub-servicios + tabs + proceso + stat + FAQ + CTA)
2. Las 5 páginas de servicio con su copy
3. Índice `/servicios`
4. Actualizar la sección Services de la home para que linkee a cada página

**Fase 2 — Sistemas + Sectores:**
5. Página `/sistemas` (los 6 con precio)
6. Las 3 páginas de sector

**Fase 3 — Blog:**
7. Infraestructura MDX + plantilla de artículo
8. Índice `/blog`
9. Primeros 3 artículos
10. Bloque blog-preview en la home

**Fase 4 — Empresa + pulido:**
11. Página `/empresa`
12. Mega-menú de navegación
13. Audit final de consistencia (skill `impeccable`)

---

## 12. Lo que NO hacemos (para no romper la marca)

- No azul corporativo. No turquesa. Paleta RDMD: negro, hueso, gold.
- No ilustraciones flat genéricas. No blobs decorativos.
- No fotos de stock de gente sonriendo. Imágenes editoriales Higgsfield o nada.
- No buzzwords ("revolucionario", "líder", "innovador") sin probarlos.
- No inflar con stats falsos. Solo números reales o claramente ilustrativos.
- Copy: español, sin guiones, sin emojis, sin exclamaciones. Siempre.

---

## 13. Estado

- [ ] Fase 1 — Servicios
- [ ] Fase 2 — Sistemas + Sectores
- [ ] Fase 3 — Blog
- [ ] Fase 4 — Empresa + pulido

Documento creado 2026-05-21. Actualizar a medida que se construye.
