"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const WA_BASE =
  "https://wa.me/18299056168?text=Hola%2C%20me%20interesa%20la%20soluci%C3%B3n%20de%20";

type Solution = {
  badge: string;
  title: string;
  price: string;
  hook: string;
  bullets: string[];
  delivery: string;
  ctaPath: string;
  featured?: boolean;
};

const SOLUTIONS: Solution[] = [
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
  },
  {
    badge: "Más fácil de entender",
    title: "Sistema de Reportes Automáticos",
    price: "$397 USD",
    hook: "Cada lunes a las 8am recibes el resumen de tu negocio en WhatsApp. Sin abrir nada.",
    bullets: [
      "Conexión con tus herramientas actuales (Shopify, Sheets, Notion…)",
      "Dashboard consolidado en una sola vista",
      "Reporte automático semanal por WhatsApp o email",
      "Alertas si alguna métrica baja del umbral definido",
    ],
    delivery: "Entrega estimada: 3–5 días hábiles",
    ctaPath: "Reportes%20Autom%C3%A1ticos",
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
  },
];

export function Solutions() {
  return (
    <section id="soluciones" className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <Eyebrow>Soluciones llave en mano</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Resultados desde el día uno.
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
            Empieza con una solución específica, ve los resultados, y escala
            cuando quieras. Pago único. Sin retainer obligatorio.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-20 grid gap-px bg-rule lg:grid-cols-2"
        >
          {SOLUTIONS.map((s) => (
            <motion.article
              key={s.title}
              variants={staggerItem}
              className="group relative flex flex-col overflow-hidden bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-10"
            >
              {/* Hover accent rail */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-y-100"
              />

              <div className="flex items-center justify-between gap-4">
                <Eyebrow tone={s.featured ? "accent" : "muted"}>
                  {s.badge}
                </Eyebrow>
                {s.featured && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                )}
              </div>

              <h3 className="mt-8 font-display text-3xl font-light leading-tight text-fg">
                {s.title}
              </h3>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl font-light text-fg">
                  {s.price}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
                  Pago único
                </span>
              </div>

              <p className="mt-6 font-sans text-base leading-relaxed text-fg-muted">
                {s.hook}
              </p>

              <ul className="mt-8 space-y-3 border-t border-rule pt-8">
                {s.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="grid grid-cols-[16px_1fr] gap-3 font-sans text-sm leading-relaxed text-fg"
                  >
                    <span aria-hidden className="pt-2 text-accent">
                      <span className="block h-px w-3 bg-accent" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-4 border-t border-rule pt-6">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
                  {s.delivery}
                </span>
                <Button
                  href={`${WA_BASE}${s.ctaPath}`}
                  external
                  variant={s.featured ? "primary" : "secondary"}
                >
                  Quiero esta solución
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 flex flex-col items-start gap-4 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl font-sans text-base text-fg-muted">
            ¿Necesitas algo diferente? Cuéntanos tu proceso y lo construimos a
            medida.
          </p>
          <Button
            href="https://cal.com/rdmdco/30min"
            external
            variant="secondary"
          >
            Hablemos
          </Button>
        </motion.div>

        <p className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
          Todas las soluciones incluyen onboarding guiado y soporte
          post-entrega de 15 días.
        </p>
      </Container>
    </section>
  );
}
