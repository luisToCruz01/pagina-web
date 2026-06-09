# Playbook — Artículo semanal automático del blog RDMD

> Este archivo es la instrucción completa para la routine semanal que escribe y
> publica un artículo nuevo en rdmdco.com cada lunes por la mañana.
> El agente que corre la routine NO tiene contexto previo: este playbook es
> autosuficiente. Léelo completo y ejecuta el flujo de principio a fin.
>
> Modo de publicación decidido por Luis (2026-06-09): **publica solo y avisa.**
> El artículo sale a producción sin revisión previa, y al final se notifica a
> Luis con el link para que lo revise después.

---

## Objetivo

Cada lunes: escribir un artículo nuevo (voz RDMD), generar su imagen, agregarlo
al blog, hacer push (Vercel publica solo) y avisar a Luis.

---

## Contexto del proyecto

- Repo: `C:\Users\luisc\Downloads\Todo lo que hago en Claude Code\pagina-web`
- Datos del blog: `src/app/lib/blog-data.ts` (array `ARTICLES`)
- Imágenes del blog: `public/blog/*.webp`
- El sitio tiene auto-deploy: cada push a `main` publica en rdmdco.com en ~2 min.
- Identidad git ya configurada en el repo. El repo es público.

---

## Voz RDMD (no negociable)

- Español neutro LATAM. Sin guiones tipográficos (— ni –). Sin emojis. Sin
  exclamaciones. Sin buzzwords (revolucionario, disruptivo, sinergia, etc.).
  Sin AI-tells (delve, aprovechar, robusto, en el panorama, etc.).
- Tono directo, específico, honesto. Cada artículo enseña algo real y cierra
  conectando con un servicio, sin venta forzada.
- Cliente objetivo: Carlos, fundador de empresa pequeña (3 a 15 personas) en
  MX/CO/AR. Old money, no guru. Aspiracional, nunca de dolor.
- Longitud objetivo: 1.000 a 1.400 palabras.

---

## Flujo paso a paso

### 1. Ver qué ya existe
Lee `src/app/lib/blog-data.ts` y lista los `slug` y `title` ya publicados, para
no repetir tema.

### 2. Elegir el siguiente tema
Toma el primer tema del banco de abajo que NO tenga ya un artículo. Si todos
están usados, elige un ángulo nuevo del nicho (automatización, procesos, IA
aplicada, casos) que no se solape con los existentes.

**Banco de temas (en orden de prioridad):**
1. Cuánto cuesta automatizar un proceso y cómo calcular el retorno
2. Cinco señales de que tu empresa necesita un sistema, no más gente
3. WhatsApp como canal de ventas: qué se puede automatizar y qué no
4. El error de automatizar un proceso roto: primero arréglalo
5. Cómo es trabajar con una agencia de automatización, paso a paso
6. Reportes que nadie lee vs reportes que se usan
7. La diferencia entre un chatbot y un agente de IA
8. Cuándo conviene un sistema llave en mano y cuándo un desarrollo a medida
9. Cómo no perder un lead por falta de seguimiento
10. Dejar de transcribir facturas a mano: procesamiento de documentos
11. Por qué tus herramientas no se hablan y cómo conectarlas
12. Qué puede y qué no puede hacer la IA en tu negocio hoy

### 3. Escribir el artículo
Sigue exactamente la estructura del tipo `Article` en blog-data.ts:
- `slug`: kebab-case, descriptivo, sin acentos
- `category`: una de "Procesos", "IA aplicada", "Automatización", "Casos de éxito"
- `title`, `excerpt` (1 frase), `author`: "Editorial RDMD"
- `dateISO` y `dateLabel`: la fecha del lunes en curso (pasada vía args o usar la fecha real del día; el dateLabel en formato "DD de mes, AAAA")
- `readingTime`: "X min de lectura" (estimar ~200 palabras/min)
- `image` e `imageAlt`: ver paso 4
- `hook`: 1-2 frases que enganchan, una pregunta o contraste
- `blocks`: array de bloques. Usa 4-6 secciones `h2` (con `id` único en
  kebab-case), párrafos `p`, al menos una `list`, un `callout` (caso real
  ilustrativo titulado "Caso real") y un `stat` (dato grande). Mira los
  artículos existentes como molde exacto.
- `relatedSlugs`: 2 slugs de otros artículos existentes.

### 4. Generar la imagen
Usa el MCP de Higgsfield (`generate_image`), modelo `z_image`, aspect `16:9`.
Prompt base (ajusta el sujeto al tema, MANTÉN el resto):

```
luxury cinematic editorial photograph, horizontal 16:9, [SUJETO RELACIONADO AL
TEMA, objeto u escena de oficina old-money], dark walnut / marble surface at
golden hour, warm amber light, painterly bokeh, very subtle fine film grain,
matte cinematic finish, warm amber and deep black palette, shallow depth of
field, no text anywhere, no screens, no readable labels, no signage, old-money
quiet luxury
```

Reglas de imagen (del CLAUDE.md raíz): cero texto, pantallas apagadas,
superficies sin texto legible. Polling con `job_display` hasta `completed`.

Luego:
- Descarga el PNG a `public/blog/<slug>.png`
- Convierte a webp optimizado y borra el png:
  `ffmpeg -y -i public/blog/<slug>.png -vf "scale=1600:-1" -c:v libwebp -quality 80 public/blog/<slug>.webp`
- Usa `image: "/blog/<slug>.webp"` en el data.

### 5. Insertar el artículo
Agrega el nuevo objeto al **inicio** del array `ARTICLES` en blog-data.ts (para
que sea el destacado del índice y aparezca primero en la home). Actualiza los
`relatedSlugs` de algún artículo viejo si tiene sentido.

### 6. Verificar y publicar
```
cd "C:\Users\luisc\Downloads\Todo lo que hago en Claude Code\pagina-web"
npx tsc --noEmit        # debe pasar sin errores
git add -A
git commit -m "blog: <titulo del articulo> (articulo semanal automatico)"
git push origin main
```
El push dispara el deploy de Vercel. Espera ~60-90s y verifica:
`curl -s -o /dev/null -w "%{http_code}" https://rdmdco.com/blog/<slug>` → 200.

### 7. Avisar a Luis
Manda un mensaje de cierre con: título del artículo, link
`https://rdmdco.com/blog/<slug>`, y una línea de qué trata. Recordar que él
revisa después y si algo está mal, se corrige.

---

## Reglas de seguridad

- Si `tsc` falla, NO hagas push. Corrige el error primero. Si no se puede,
  revierte los cambios y avisa a Luis que el artículo de esta semana no salió.
- No toques otros archivos del sitio. Solo `blog-data.ts` y `public/blog/`.
- Un artículo por ejecución. No publiques varios.
