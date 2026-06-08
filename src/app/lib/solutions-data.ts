/**
 * Datos de los 6 sistemas llave en mano (productos con precio fijo).
 * Usados por la sección Solutions de la home y por la página /sistemas.
 */

export type Solution = {
  badge: string;
  title: string;
  price: string;
  hook: string;
  bullets: string[];
  delivery: string;
  ctaPath: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const WA_BASE =
  "https://wa.me/18299056168?text=Hola%2C%20me%20interesa%20la%20soluci%C3%B3n%20de%20";

export const SOLUTIONS: Solution[] = [
  {
    badge: "Más vendido",
    title: "Sistema de Seguimiento de Leads con IA",
    price: "$597 USD",
    hook: "Nunca más pierdas un lead por falta de seguimiento. Respuesta automática en menos de 2 minutos.",
    bullets: [
      "Captura desde Instagram, WhatsApp o formulario web",
      "Clasificación automática por temperatura (frío / tibio / caliente)",
      "Primer mensaje personalizado con IA",
      "Notificación al vendedor con contexto del lead",
      "Integración con tu CRM actual",
    ],
    delivery: "Entrega estimada: 5–7 días hábiles",
    ctaPath: "Seguimiento%20de%20Leads",
    image: "/solutions/01-leads.webp",
    imageAlt: "Sistema de seguimiento de leads",
    featured: true,
  },
  {
    badge: "Ahorra más tiempo",
    title: "Agente de Atención al Cliente 24/7",
    price: "$897 USD",
    hook: "Tu negocio responde, agenda y vende incluso cuando tú estás durmiendo.",
    bullets: [
      "Agente de IA entrenado con tu catálogo y FAQ",
      "Integración con WhatsApp Business o tu sitio web",
      "Escalamiento automático a humano cuando es necesario",
      "Reporte semanal de preguntas frecuentes",
      "1 ronda de ajustes incluida",
    ],
    delivery: "Entrega estimada: 7–10 días hábiles",
    ctaPath: "Atenci%C3%B3n%20al%20Cliente%2024-7",
    image: "/solutions/02-customer.webp",
    imageAlt: "Agente de atención al cliente 24/7",
  },
  {
    badge: "Más fácil de entender",
    title: "Sistema de Reportes Automáticos",
    price: "$397 USD",
    hook: "Cada lunes a las 8am recibes el resumen de tu negocio en WhatsApp. Sin abrir nada.",
    bullets: [
      "Conexión con tus herramientas actuales (Sheets, Airtable, Stripe, Notion, HubSpot, cal.com)",
      "Narrativa escrita por IA en español: el dato más importante explicado en una línea",
      "Dashboard web en tu propio subdominio, accesible desde cualquier dispositivo",
      "Reporte automático semanal por WhatsApp y email",
      "Alertas inmediatas si una métrica baja del umbral que tú definiste",
    ],
    delivery: "Entrega estimada: 3–5 días hábiles",
    ctaPath: "Reportes%20Autom%C3%A1ticos",
    image: "/solutions/03-reports.webp",
    imageAlt: "Sistema de reportes automáticos",
  },
  {
    badge: "Para operaciones",
    title: "Procesamiento Automático de Documentos",
    price: "$697 USD",
    hook: "¿Alguien en tu equipo copia datos de PDFs o facturas a hojas de cálculo todos los días? Eso se acabó.",
    bullets: [
      "Recepción automática de documentos por email",
      "Extracción de datos clave (proveedor, monto, fecha, detalles)",
      "Validación automática contra tus registros existentes",
      "Alerta inmediata si algo no cuadra",
      "Envío de datos limpios a tu sistema (ERP, Sheets, contabilidad)",
    ],
    delivery: "Entrega estimada: 5–7 días hábiles",
    ctaPath: "Procesamiento%20de%20Documentos",
    image: "/solutions/04-documents.webp",
    imageAlt: "Procesamiento automático de documentos",
  },
  {
    badge: "Cierra más ventas",
    title: "Secuencia de Seguimiento y Nutrición",
    price: "$797 USD",
    hook: "El 80% de las ventas requieren 5 seguimientos. El 90% de los negocios hace 2 y abandona. Esto cierra ese hueco.",
    bullets: [
      "Secuencia de 5–7 puntos de contacto post-lead",
      "Mensajes adaptados según el comportamiento del prospecto",
      "Integración con WhatsApp, email o ambos",
      "La secuencia se detiene automáticamente cuando el prospecto responde",
      "Notificación al vendedor con historial completo de la conversación",
    ],
    delivery: "Entrega estimada: 5–7 días hábiles",
    ctaPath: "Secuencia%20de%20Seguimiento",
    image: "/solutions/05-followup.webp",
    imageAlt: "Secuencia de seguimiento y nutrición",
  },
  {
    badge: "ROI inmediato",
    title: "Reactivación de Base de Datos",
    price: "$997 USD",
    hook: "Tienes cientos de contactos en tu CRM que nadie ha vuelto a tocar. Eso es dinero dormido. Vamos por él.",
    bullets: [
      "Auditoría y segmentación de tu base de datos existente",
      "Mensajes personalizados que referencian el historial de cada contacto",
      "Flujo de calificación automática cuando alguien responde",
      "Solo te entregamos leads reactivados y listos para cerrar",
      "Reporte final con tasa de reactivación y revenue recuperado",
    ],
    delivery: "Entrega estimada: 7–10 días hábiles",
    ctaPath: "Reactivaci%C3%B3n%20de%20Base%20de%20Datos",
    image: "/solutions/06-reactivation.webp",
    imageAlt: "Reactivación de base de datos",
  },
];
