/**
 * Casos de éxito RDMD. Resultados reales de proyectos.
 * Usados por la página /casos y la sección Trust de la home.
 *
 * Reglas de copy: español neutro, sin guiones tipográficos, sin emojis, sin
 * exclamaciones. Datos concretos, sin inflar.
 */

export type Case = {
  client: string;
  sector: string;
  stat: string;
  statLabel: string;
  title: string;
  body: string;
};

export const CASES: Case[] = [
  {
    client: "Agencia de performance en CDMX",
    sector: "Agencias de marketing",
    stat: "36 hrs/mes",
    statLabel: "ahorradas en reportería",
    title: "Reportes mensuales automatizados para 12 cuentas",
    body: "Conectamos Meta Ads, Google Ads y GA4 a un pipeline que genera reportes en Notion con métricas, narrativa y comparativas. El equipo pasó de tres días al mes en reportes a una validación de cuatro minutos por cuenta.",
  },
  {
    client: "E-commerce de moda en Bogotá",
    sector: "E-commerce",
    stat: "78%",
    statLabel: "de tickets resueltos sin intervención humana",
    title: "Agente de WhatsApp conectado a Shopify",
    body: "Implementamos un agente que responde estados de pedido, cambios de talla y devoluciones en tiempo real. Solo escala a humano cuando detecta intención compleja. El tiempo de respuesta promedio bajó de cuatro horas a noventa segundos.",
  },
  {
    client: "Productora de contenido en Buenos Aires",
    sector: "Servicios profesionales",
    stat: "2.5x",
    statLabel: "más contenido aprobado por semana",
    title: "Workflow de aprobación centralizado",
    body: "Reemplazamos el flujo de email, Slack y WhatsApp por un sistema con notificaciones automáticas, versionado y trazabilidad. Cero revisiones perdidas y un equipo de seis personas duplicó throughput sin contratar.",
  },
];
