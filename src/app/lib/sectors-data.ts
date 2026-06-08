/**
 * Datos de los sectores donde RDMD se especializa.
 * Cada sector traduce los servicios generales al lenguaje de esa industria.
 * Alimenta la plantilla SectorTemplate vía /sectores/[slug].
 *
 * Reglas de copy: español neutro, sin guiones tipográficos, sin emojis, sin
 * exclamaciones, sin buzzwords. Tono Casio->Suizo: aspiracional, nunca de dolor.
 */

export type SectorChallenge = {
  icon: string; // id Lucide (ver ICON_MAP en SectorTemplate)
  title: string;
  body: string;
};

export type SectorSolution = {
  title: string;
  body: string;
  serviceSlug?: string; // link a la página de servicio relacionada
};

export type Sector = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  intro: string;
  challenges: SectorChallenge[];
  solutions: SectorSolution[];
  stat: { value: string; label: string };
};

export const SECTORS: Sector[] = [
  {
    slug: "agencias-marketing",
    eyebrow: "Especialización",
    title: "Automatización para agencias de marketing",
    subtitle:
      "El sector donde más casos acumulamos. Conocemos la operación de una agencia por dentro: las cuentas, los reportes, los entregables, la presión de escalar sin contratar a medio mundo.",
    metaDescription:
      "Automatización y software para agencias de marketing en Latinoamérica: reportería, gestión de cuentas, seguimiento de leads y procesos internos.",
    intro:
      "Una agencia crece atendiendo más cuentas, pero cada cuenta nueva multiplica los reportes, las aprobaciones y las tareas operativas. Llega un punto en que el equipo pasa más tiempo administrando que creando. Ahí entramos nosotros.",
    challenges: [
      { icon: "file-text", title: "Reportería que devora horas", body: "Cada cuenta pide su reporte mensual. Multiplicado por todas las cuentas, son días enteros de copiar y pegar números entre plataformas." },
      { icon: "users", title: "Crecer obliga a contratar", body: "Más clientes deberían significar más margen, pero terminan significando más gente operativa para sostener la carga manual." },
      { icon: "git-merge", title: "Herramientas que no se hablan", body: "Meta Ads, Google Ads, el CRM, las hojas de cálculo, el WhatsApp de los clientes. Información dispersa que alguien tiene que unir a mano." },
    ],
    solutions: [
      { title: "Reportes automáticos por cuenta", body: "Conectamos las plataformas de cada cliente a un sistema que genera el reporte con métricas, comparativas y narrativa. De tres días al mes a una validación de minutos.", serviceSlug: "gestion-procesos" },
      { title: "Seguimiento de leads sin fugas", body: "Cada lead que entra por los anuncios se captura, clasifica y recibe respuesta en menos de dos minutos. El equipo solo atiende los que ya están calientes.", serviceSlug: "tecnologias-emergentes" },
      { title: "Flujos internos centralizados", body: "Aprobaciones, entregables y versiones en un solo lugar, con trazabilidad. Cero revisiones perdidas en cadenas de WhatsApp.", serviceSlug: "desarrollo-software" },
    ],
    stat: { value: "36 hrs/mes", label: "ahorradas en reportería para una agencia de performance con 12 cuentas" },
  },
  {
    slug: "servicios-profesionales",
    eyebrow: "Sector",
    title: "Automatización para servicios profesionales",
    subtitle:
      "Consultoras, despachos, estudios y clínicas. Negocios donde el activo es el tiempo experto de la gente, y cada hora gastada en administración es una hora que no se factura.",
    metaDescription:
      "Automatización para servicios profesionales en Latinoamérica: consultoras, despachos, estudios y clínicas. Menos administración, más tiempo facturable.",
    intro:
      "En un negocio de servicios profesionales, el producto es el criterio de tu equipo. Pero buena parte de su día se va en agendar, dar seguimiento, generar documentos y perseguir pagos. Liberamos ese tiempo para lo que de verdad cobras.",
    challenges: [
      { icon: "message-square", title: "Seguimiento manual a cada cliente", body: "Recordar quién necesita qué, cuándo, y dar el seguimiento a tiempo depende de la memoria de alguien. Y la memoria falla." },
      { icon: "file-text", title: "Documentos que se generan a mano", body: "Propuestas, contratos, informes. Cada uno armado desde cero o copiado de uno anterior, con el riesgo de errores que eso implica." },
      { icon: "gauge", title: "Horas expertas en tareas que no lo requieren", body: "Profesionales caros haciendo trabajo administrativo barato. El margen se diluye en lo operativo." },
    ],
    solutions: [
      { title: "Atención y agenda automatizada", body: "Un agente responde consultas, agenda y da el primer seguimiento. Tu equipo solo entra cuando hace falta criterio profesional.", serviceSlug: "tecnologias-emergentes" },
      { title: "Generación de documentos", body: "Propuestas, contratos e informes que se arman solos a partir de los datos del cliente. Consistentes, sin errores, en segundos.", serviceSlug: "desarrollo-software" },
      { title: "Procesos internos optimizados", body: "Mapeamos cómo opera tu despacho y eliminamos los pasos manuales que consumen las horas que deberías estar facturando.", serviceSlug: "gestion-procesos" },
    ],
    stat: { value: "90 seg", label: "de tiempo de respuesta promedio en la primera consulta, frente a las horas que tomaba antes" },
  },
  {
    slug: "ecommerce",
    eyebrow: "Sector",
    title: "Automatización para e-commerce",
    subtitle:
      "Tiendas en crecimiento donde el volumen de pedidos, consultas y operaciones empieza a superar lo que un equipo pequeño puede manejar a mano.",
    metaDescription:
      "Automatización y software para e-commerce en Latinoamérica: atención al cliente, procesamiento de pedidos, seguimiento y reactivación de clientes.",
    intro:
      "Un e-commerce que crece recibe más pedidos, más preguntas y más devoluciones. Si todo eso se atiende manualmente, el crecimiento se convierte en saturación. Automatizamos la operación para que vender más no signifique trabajar más.",
    challenges: [
      { icon: "message-square", title: "Consultas que no paran", body: "Estado del pedido, tallas, cambios, devoluciones. Las mismas preguntas, todo el día, robando tiempo de lo que mueve ventas." },
      { icon: "refresh-cw", title: "Clientes que compran una vez y desaparecen", body: "Una base de clientes pasados que nadie reactiva. Dinero dormido que la competencia sí está despertando." },
      { icon: "file-text", title: "Operación que no escala", body: "Procesar pedidos, actualizar inventario, coordinar envíos. Tareas que crecen con cada venta y que alguien tiene que sostener." },
    ],
    solutions: [
      { title: "Atención al cliente 24/7", body: "Un agente conectado a tu tienda responde estados de pedido, tallas y devoluciones en tiempo real. Solo escala a humano lo complejo.", serviceSlug: "tecnologias-emergentes" },
      { title: "Reactivación de clientes", body: "Tomamos tu base de compradores pasados y la reactivamos con mensajes personalizados. Te entregamos solo los que vuelven a comprar.", serviceSlug: "gestion-procesos" },
      { title: "Operación conectada", body: "Pedidos, inventario y envíos integrados para que la información fluya sola entre tus plataformas, sin trabajo manual.", serviceSlug: "arquitectura" },
    ],
    stat: { value: "78%", label: "de las consultas resueltas sin intervención humana en un e-commerce de moda" },
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

export const SECTOR_SLUGS = SECTORS.map((s) => s.slug);
