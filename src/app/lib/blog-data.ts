/**
 * Artículos del blog RDMD.
 * Cada artículo se compone de bloques estructurados que alimentan la plantilla
 * ArticleTemplate. La tabla de contenidos se genera de los bloques tipo "h2".
 *
 * Reglas de copy (no negociable): español neutro, sin guiones tipográficos,
 * sin emojis, sin exclamaciones, sin buzzwords, sin AI-tells. Tono directo,
 * específico, educativo y honesto. Cada artículo enseña algo real y cierra
 * conectando con un servicio.
 */

export type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "stat"; value: string; label: string };

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  dateISO: string;
  dateLabel: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  hook: string;
  blocks: Block[];
  relatedSlugs: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "que-procesos-automatizar-primero",
    category: "Procesos",
    title: "Cómo saber qué procesos de tu empresa deberías automatizar primero",
    excerpt:
      "No todo se automatiza igual. Esta es la forma de elegir por dónde empezar para que la primera automatización pague las siguientes.",
    author: "Editorial RDMD",
    dateISO: "2026-05-21",
    dateLabel: "21 de mayo, 2026",
    readingTime: "6 min de lectura",
    image: "/editorial/philosophy.webp",
    imageAlt: "Procesos de negocio sobre escritorio editorial",
    hook: "La pregunta no es si deberías automatizar. Es qué automatizar primero. Y la mayoría empieza por lo equivocado.",
    blocks: [
      { type: "p", text: "Cuando un negocio decide automatizar, casi siempre empieza por lo más visible o lo más molesto. Suena lógico, pero rara vez es lo más rentable. La primera automatización debería pagar las siguientes, y para eso hay que elegirla con criterio, no por intuición." },
      { type: "p", text: "En este artículo te damos el método que usamos para decidir por dónde empezar. Es el mismo que aplicamos en el diagnóstico de cada proyecto." },

      { type: "h2", text: "Primero, lista los procesos, no las tareas", id: "lista-procesos" },
      { type: "p", text: "Una tarea es copiar un dato de un correo a una hoja. Un proceso es todo lo que pasa desde que llega el pedido hasta que el cliente recibe su factura. Automatizar tareas sueltas da alivios pequeños. Automatizar un proceso completo cambia cómo opera el negocio." },
      { type: "p", text: "Empieza escribiendo los procesos que repites cada semana. No hace falta un diagrama elegante. Una lista en una hoja basta: nombre del proceso, quién lo hace, cada cuánto, cuánto tiempo toma." },

      { type: "h2", text: "Califica cada proceso en tres ejes", id: "tres-ejes" },
      { type: "p", text: "Con la lista lista, califica cada proceso del 1 al 5 en tres dimensiones. La suma te da una prioridad objetiva, no una corazonada." },
      { type: "list", items: [
        "Frecuencia: qué tan seguido ocurre. Un proceso diario pesa más que uno mensual.",
        "Tiempo: cuántas horas consume al mes entre todas las veces que se hace.",
        "Error: qué tan caro sale cuando algo se hace mal. Un error en facturación cuesta más que uno en un reporte interno.",
      ]},
      { type: "p", text: "El proceso con el puntaje más alto suele ser el mejor candidato. No el más urgente en tu cabeza, sino el que más tiempo y riesgo concentra." },

      { type: "h2", text: "Descarta lo que cambia todo el tiempo", id: "descartar" },
      { type: "p", text: "Hay procesos que parecen ideales para automatizar pero cambian de reglas cada mes. Automatizar algo inestable es construir sobre arena: lo armas, cambia el criterio, y hay que rehacerlo. Esos procesos primero se estabilizan, después se automatizan." },
      { type: "p", text: "La señal de alerta es simple. Si nadie en el equipo puede explicarte las reglas exactas del proceso sin decir depende, todavía no está listo para automatizar." },

      { type: "callout", title: "Caso real", body: "Una agencia de marketing tenía dos candidatos: la reportería mensual de sus 12 cuentas y la asignación de tareas internas. La asignación cambiaba de criterio cada semana según la carga del equipo. La reportería seguía siempre los mismos pasos. Empezamos por la reportería. Resultado: 36 horas al mes liberadas, y con ese tiempo recuperado, el equipo por fin pudo estabilizar el proceso de asignación para automatizarlo después." },

      { type: "h2", text: "Empieza por algo que se pueda medir", id: "medible" },
      { type: "p", text: "La primera automatización tiene una función extra: convencer al resto del equipo de que esto funciona. Por eso conviene que sea algo cuyo resultado se vea en números claros. Horas ahorradas, errores evitados, tiempo de respuesta reducido. Cuando el impacto es visible, las siguientes automatizaciones dejan de ser una discusión." },

      { type: "stat", value: "36 hrs/mes", label: "fue lo que liberó la primera automatización bien elegida en una sola agencia" },

      { type: "h2", text: "El orden correcto, en resumen", id: "resumen" },
      { type: "p", text: "Lista procesos completos, no tareas. Califícalos por frecuencia, tiempo y costo del error. Descarta los que todavía cambian de reglas. Y empieza por uno cuyo resultado se pueda medir, para que la primera victoria financie las siguientes." },
      { type: "p", text: "Si quieres que hagamos este diagnóstico contigo, es exactamente con lo que arranca cada proyecto. Sin costo, y si tu caso no es para nosotros, te lo decimos." },
    ],
    relatedSlugs: ["tu-equipo-no-es-lento", "que-es-un-agente-de-ia"],
  },

  {
    slug: "tu-equipo-no-es-lento",
    category: "Procesos",
    title: "Tu equipo no es lento. Es tu proceso.",
    excerpt:
      "Cuando algo se pierde o llega tarde, la reacción natural es buscar al responsable. Casi siempre el responsable no es una persona.",
    author: "Editorial RDMD",
    dateISO: "2026-05-21",
    dateLabel: "21 de mayo, 2026",
    readingTime: "5 min de lectura",
    image: "/editorial/craft.webp",
    imageAlt: "Oficio y proceso de trabajo editorial",
    hook: "Contratas buena gente. Y aun así las cosas se pierden, llegan tarde, se hacen dos veces. El problema no es a quién contrataste.",
    blocks: [
      { type: "p", text: "Hay una conversación que se repite en casi todas las empresas pequeñas que crecen. Algo se cae, alguien pregunta de quién fue la culpa, y la respuesta termina siendo una persona. La próxima vez vuelve a pasar, con otra persona. Cambias gente y el problema sigue." },
      { type: "p", text: "Cuando el mismo error ocurre con personas distintas, el error no está en las personas. Está en el proceso que las rodea." },

      { type: "h2", text: "La señal: el problema sobrevive a la gente", id: "senal" },
      { type: "p", text: "Esta es la prueba más simple. Si despides a quien cometió el error, contratas a alguien mejor, y a los dos meses el mismo error reaparece, no era un problema de talento. Era un proceso que hace tropezar a cualquiera que pase por él." },
      { type: "p", text: "Los buenos procesos hacen que sea difícil equivocarse. Los malos hacen que sea cuestión de tiempo." },

      { type: "h2", text: "Dónde se esconden los procesos rotos", id: "donde" },
      { type: "p", text: "Los procesos que fallan rara vez se ven como procesos. Se ven como costumbres. Algunas señales de que tienes uno roto:" },
      { type: "list", items: [
        "El conocimiento vive en la cabeza de una persona, y cuando esa persona no está, nadie sabe cómo se hace.",
        "La información se copia a mano de un lugar a otro varias veces al día.",
        "Para saber el estado de algo, hay que preguntar en un chat en lugar de mirarlo en un sistema.",
        "El mismo dato existe en tres lugares distintos, y nunca estás seguro de cuál es el correcto.",
      ]},

      { type: "h2", text: "Por qué culpar a la persona es cómodo y caro", id: "culpar" },
      { type: "p", text: "Echarle la culpa a alguien es rápido y no obliga a cambiar nada. Arreglar el proceso es más lento y obliga a mirar cómo trabaja el negocio de verdad. Por eso la mayoría elige lo primero, una y otra vez, pagando el mismo error en cuotas." },
      { type: "p", text: "La empresa que decide arreglar el proceso paga una vez. La que sigue culpando a la persona paga cada mes." },

      { type: "callout", title: "Caso real", body: "Una productora de contenido perdía revisiones constantemente. Aprobaciones que se traspapelaban entre correo, Slack y WhatsApp. Cada vez culpaban a quien la había dejado pasar. Reemplazamos el flujo disperso por un sistema con notificaciones automáticas, versionado y trazabilidad. Cero revisiones perdidas después. Y un equipo de seis personas duplicó cuánto contenido aprobaba por semana, sin contratar a nadie." },

      { type: "stat", value: "2.5x", label: "más trabajo aprobado por semana, con el mismo equipo, tras arreglar el proceso en vez de la persona" },

      { type: "h2", text: "El cambio de pregunta", id: "cambio" },
      { type: "p", text: "La próxima vez que algo se caiga, cambia la pregunta. En lugar de quién fue, pregunta qué parte del proceso permitió que esto pasara. Esa pregunta lleva a soluciones que duran. La otra solo lleva a buscar al siguiente culpable." },
      { type: "p", text: "Mapear y rediseñar procesos para que sea difícil equivocarse es la base de lo que hacemos. Si quieres ver dónde se está cayendo el tuyo, empecemos por un diagnóstico." },
    ],
    relatedSlugs: ["que-procesos-automatizar-primero", "que-es-un-agente-de-ia"],
  },

  {
    slug: "que-es-un-agente-de-ia",
    category: "IA aplicada",
    title: "Qué es un agente de IA y para qué sirve en una empresa pequeña",
    excerpt:
      "Sin tecnicismos. Qué es un agente de IA, qué puede hacer hoy por un negocio pequeño, y dónde todavía no conviene usarlo.",
    author: "Editorial RDMD",
    dateISO: "2026-05-21",
    dateLabel: "21 de mayo, 2026",
    readingTime: "7 min de lectura",
    image: "/editorial/capacity.webp",
    imageAlt: "Tecnología aplicada al negocio",
    hook: "Todos hablan de agentes de IA. Pocos explican qué son sin venderte algo. Aquí va la versión honesta para un negocio pequeño.",
    blocks: [
      { type: "p", text: "El término agente de IA se usa para todo y por eso ya no significa nada. Vamos a aterrizarlo en algo concreto y útil para una empresa que no tiene un departamento de tecnología." },

      { type: "h2", text: "Qué es un agente, en simple", id: "que-es" },
      { type: "p", text: "Un agente de IA es un programa que entiende lo que le escriben en lenguaje normal, decide qué hacer, y ejecuta una acción. La diferencia con un chatbot viejo es que el chatbot solo seguía un guion fijo. El agente entiende la intención aunque la pregunta venga de mil formas distintas, y puede hacer cosas, no solo responder." },
      { type: "p", text: "Un ejemplo concreto. Un cliente escribe a tu WhatsApp donde esta mi pedido, donde anda lo que compre, o ya llego mi paquete. Un chatbot viejo necesitaría una coincidencia exacta. Un agente entiende que las tres preguntas son la misma, busca el pedido en tu sistema, y responde con el estado real." },

      { type: "h2", text: "Qué puede hacer hoy por un negocio pequeño", id: "que-hace" },
      { type: "p", text: "Sin exagerar lo que existe hoy, estas son las tareas donde un agente ya rinde de verdad:" },
      { type: "list", items: [
        "Atender consultas repetitivas las 24 horas: horarios, precios, stock, estado de pedidos, devoluciones.",
        "Capturar y clasificar leads en cuanto entran, y dar el primer mensaje antes de que se enfríen.",
        "Leer documentos como facturas o formularios y sacar los datos sin que nadie los transcriba.",
        "Agendar citas y reuniones conversando con el cliente, sin que tú muevas tu agenda a mano.",
      ]},

      { type: "h2", text: "Dónde todavía no conviene", id: "donde-no" },
      { type: "p", text: "Ser honesto sobre los límites es parte de hacerlo bien. Un agente todavía no es la herramienta correcta para:" },
      { type: "list", items: [
        "Decisiones que requieren criterio humano fino, como negociar un contrato importante o manejar una queja delicada.",
        "Tareas donde un error tiene consecuencias graves y no hay forma de revisar antes de actuar.",
        "Procesos que cambian de reglas constantemente y nadie puede definir con claridad.",
      ]},
      { type: "p", text: "La clave está en los límites. Un agente bien hecho sabe cuándo no sabe, y en ese momento pasa la conversación a una persona en lugar de inventar una respuesta." },

      { type: "callout", title: "Caso real", body: "Un e-commerce de moda recibía las mismas preguntas todo el día: estado de pedido, cambios de talla, devoluciones. Conectamos un agente a su tienda. Hoy resuelve el 78 por ciento de las consultas sin intervención humana, y solo escala a una persona cuando detecta algo fuera de lo común. El tiempo de respuesta promedio bajó de cuatro horas a noventa segundos." },

      { type: "stat", value: "78%", label: "de las consultas resueltas sin intervención humana por un agente bien acotado" },

      { type: "h2", text: "Cómo saber si tu negocio está listo", id: "listo" },
      { type: "p", text: "No necesitas miles de datos ni un equipo técnico. Necesitas dos cosas: una tarea repetitiva que hoy te consume tiempo, y la información para que el agente la haga bien, como tu catálogo, tus preguntas frecuentes o tus conversaciones anteriores. Con eso se empieza acotado y se amplía." },
      { type: "p", text: "Lo importante es no instalar IA para decir que tienes IA. Se aplica a un problema concreto que hoy te cuesta tiempo o dinero, y se mide el resultado. Si quieres ver qué tarea de tu negocio tiene sentido resolver así, conversemos." },
    ],
    relatedSlugs: ["que-procesos-automatizar-primero", "tu-equipo-no-es-lento"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
