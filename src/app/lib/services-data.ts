/**
 * Datos de los 5 servicios de consultoría RDMD.
 * Cada uno alimenta la plantilla ServiceTemplate vía la ruta /servicios/[slug].
 *
 * Reglas de copy (no negociable): español neutro, sin guiones tipográficos,
 * sin emojis, sin exclamaciones, sin buzzwords. Tono Casio->Suizo: aspiracional,
 * nunca de dolor.
 */

export type SubService = {
  icon: string; // id de icono Lucide (ver ICON_MAP en ServiceTemplate)
  title: string;
  body: string;
};

export type Advantage = {
  tab: string; // etiqueta corta del tab
  headline: string;
  body: string;
};

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  eyebrow: string;
  title: string; // H1 completo
  subtitle: string;
  metaDescription: string;
  subServices: SubService[];
  advantages: Advantage[];
  process: ProcessStep[];
  stat: { value: string; label: string };
  faqs: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: "gestion-procesos",
    eyebrow: "Procesos",
    title: "Gestión inteligente de procesos de negocio",
    subtitle:
      "Mapeamos, optimizamos y automatizamos los procesos manuales que consumen el tiempo de tu equipo, para que se dediquen a lo que de verdad mueve el negocio.",
    metaDescription:
      "Mapeo, optimización y automatización de procesos de negocio para empresas en Latinoamérica. Menos trabajo manual, más capacidad sin contratar.",
    subServices: [
      { icon: "git-branch", title: "Mapeo de procesos", body: "Documentamos cómo opera tu negocio hoy, paso a paso, para ver dónde se pierde el tiempo." },
      { icon: "trending-up", title: "Optimización", body: "Rediseñamos los flujos para eliminar pasos redundantes antes de automatizar nada." },
      { icon: "zap", title: "Automatización", body: "Conectamos tus herramientas para que la información fluya sin intervención manual." },
      { icon: "search", title: "Minería de procesos", body: "Analizamos los datos de tu operación para descubrir cuellos de botella que no se ven a simple vista." },
      { icon: "shield-check", title: "Reglas de negocio", body: "Definimos qué pasa, cuándo y bajo qué condiciones, sin depender de la memoria de nadie." },
      { icon: "file-text", title: "Documentación", body: "Dejamos cada proceso escrito y versionado, para que el conocimiento no viva solo en una persona." },
    ],
    advantages: [
      { tab: "A medida", headline: "Diseñado para tu operación, no para un manual", body: "No traemos plantillas genéricas. Estudiamos cómo trabajas y construimos el flujo que tu negocio necesita, con tus herramientas actuales." },
      { tab: "Sin fricción", headline: "El equipo lo adopta sin pelear con la herramienta", body: "Automatizamos alrededor de cómo ya trabaja tu gente. Menos resistencia, adopción real desde el primer día." },
      { tab: "Escalable", headline: "Aguanta cuando la operación se multiplica", body: "Los procesos que diseñamos soportan el crecimiento. Lo que funciona con 10 pedidos al día funciona con 1,000." },
      { tab: "Medible", headline: "Ves el impacto en números, no en sensaciones", body: "Cada automatización deja métricas: horas ahorradas, errores evitados, tiempo de respuesta. Sabes exactamente qué ganaste." },
    ],
    process: [
      { n: "01", title: "Diagnóstico", body: "Mapeamos tus procesos actuales y priorizamos los que más tiempo te cuestan." },
      { n: "02", title: "Diseño", body: "Rediseñamos el flujo óptimo y definimos qué se automatiza y cómo." },
      { n: "03", title: "Construcción", body: "Implementamos la automatización con tus herramientas y la probamos a fondo." },
      { n: "04", title: "Soporte", body: "Acompañamos la puesta en marcha y ajustamos hasta que opere solo." },
    ],
    stat: { value: "36 hrs/mes", label: "ahorradas en una sola agencia tras automatizar su reportería" },
    faqs: [
      { q: "¿Necesito tener mis procesos documentados antes de empezar?", a: "No. Parte de nuestro trabajo es documentarlos contigo. Si ya los tienes, avanzamos más rápido, pero no es requisito." },
      { q: "¿Tengo que cambiar las herramientas que ya uso?", a: "Casi nunca. Trabajamos sobre tu stack actual (CRM, hojas de cálculo, e-commerce, lo que sea) y lo conectamos. Solo sugerimos cambiar algo si de verdad te limita." },
      { q: "¿Cuánto tarda ver resultados?", a: "Las primeras automatizaciones suelen estar operando entre 2 y 4 semanas, según la complejidad del proceso." },
      { q: "¿Qué pasa si mi equipo se resiste al cambio?", a: "Diseñamos alrededor de cómo ya trabajan, no en contra. La adopción es parte del proyecto, no un problema que te dejamos." },
      { q: "¿Cómo se cobra este servicio?", a: "Por proyecto, con alcance y precio cerrado tras el diagnóstico. Sin sorpresas. Si el problema no es para nosotros, te lo decimos." },
    ],
  },
  {
    slug: "desarrollo-software",
    eyebrow: "Software",
    title: "Desarrollo de software a medida",
    subtitle:
      "Código estable, seguro y escalable. Aplicaciones, integraciones y sistemas internos diseñados para tu operación específica, no plantillas genéricas.",
    metaDescription:
      "Desarrollo de software a medida: aplicaciones web, integraciones, dashboards y sistemas internos para empresas en Latinoamérica.",
    subServices: [
      { icon: "layout", title: "Aplicaciones web", body: "Plataformas internas o de cara al cliente, diseñadas para tu flujo exacto." },
      { icon: "git-merge", title: "Integraciones de sistemas", body: "Conectamos las herramientas que hoy no se hablan entre sí." },
      { icon: "bar-chart-3", title: "Dashboards y BI", body: "Tableros que muestran lo que importa, sin reportes recargados que nadie lee." },
      { icon: "cloud", title: "Migración a la nube", body: "Llevamos tu operación a infraestructura que escala y no se cae." },
      { icon: "plug", title: "APIs a medida", body: "Construimos las conexiones que tu negocio necesita para crecer." },
      { icon: "workflow", title: "Automatización de flujos", body: "Procesos repetitivos convertidos en software que corre solo." },
    ],
    advantages: [
      { tab: "A medida", headline: "Construido para tu problema, de inicio a fin", body: "No adaptamos un producto existente a la fuerza. Diseñamos exactamente lo que tu operación necesita, sin cargar con funciones que no usas." },
      { tab: "Bien hecho", headline: "Código que otro equipo puede mantener", body: "Entregamos con documentación, accesos y estándares claros. No quedas atado a nosotros para siempre." },
      { tab: "Entrega ágil", headline: "Ves avances cada semana, no al final", body: "Trabajamos en ciclos cortos. Validas el rumbo a tiempo, no cuando ya es tarde para corregir." },
      { tab: "Escalable", headline: "Diseñado para soportar tu crecimiento", body: "La arquitectura aguanta más usuarios y más datos sin reescribir todo. Lo que construimos dura." },
    ],
    process: [
      { n: "01", title: "Diagnóstico", body: "Entendemos el problema y definimos el alcance exacto del software." },
      { n: "02", title: "Diseño", body: "Definimos arquitectura, flujos y la experiencia antes de escribir código." },
      { n: "03", title: "Construcción", body: "Desarrollamos en ciclos cortos con avances que validas semana a semana." },
      { n: "04", title: "Soporte", body: "Acompañamos 15 días tras la entrega para ajustes y dudas." },
    ],
    stat: { value: "2.5x", label: "más throughput de un equipo de 6 personas, sin contratar a nadie nuevo" },
    faqs: [
      { q: "¿Qué pasa si no tengo una especificación clara de lo que necesito?", a: "Es lo normal. Parte de nuestro trabajo es ayudarte a definir qué necesitas de verdad antes de construir nada." },
      { q: "¿Qué tecnologías usan?", a: "Elegimos según el problema, no por moda. Stacks probados y mantenibles, para que no quedes con software que nadie más puede tocar." },
      { q: "¿El código es mío al terminar?", a: "Sí. Entregamos el código, los accesos y la documentación. Es tuyo." },
      { q: "¿Cuánto cuesta desarrollar software a medida?", a: "Depende del alcance, igual que construir una casa. Tras el diagnóstico te damos un precio cerrado, sin costos ocultos." },
      { q: "¿Dan soporte después de entregar?", a: "Sí. Acompañamos 15 días sin costo para ajustes. Después puedes contratar soporte continuo si lo necesitas." },
    ],
  },
  {
    slug: "arquitectura",
    eyebrow: "Arquitectura",
    title: "Arquitectura tecnológica que escala",
    subtitle:
      "Diseñamos el sistema que conecta tus herramientas y soporta el crecimiento, sin que se rompa cuando la operación se multiplica.",
    metaDescription:
      "Arquitectura tecnológica para empresas en Latinoamérica: diseño de sistemas, integración, infraestructura cloud y seguridad que escala.",
    subServices: [
      { icon: "network", title: "Diseño de arquitectura", body: "Definimos cómo se conectan tus sistemas para que crezcan sin romperse." },
      { icon: "git-merge", title: "Integración de sistemas", body: "Unificamos las herramientas dispersas en una operación coherente." },
      { icon: "cloud", title: "Infraestructura cloud", body: "Montamos la base que aguanta picos de carga y no se cae en el peor momento." },
      { icon: "shield-check", title: "Seguridad", body: "Protegemos los datos y accesos con criterios serios, no parches improvisados." },
      { icon: "trending-up", title: "Escalabilidad", body: "Diseñamos pensando en el negocio que vas a ser, no solo en el que eres hoy." },
      { icon: "file-text", title: "Documentación técnica", body: "Dejamos el sistema documentado para que cualquier equipo pueda continuarlo." },
    ],
    advantages: [
      { tab: "Sólida", headline: "Una base que no se cae bajo presión", body: "Diseñamos para los momentos difíciles: picos de tráfico, fallos parciales, crecimiento súbito. El sistema aguanta." },
      { tab: "Conectada", headline: "Tus herramientas operando como una sola", body: "Eliminamos las islas de información. Lo que pasa en un sistema se refleja en los demás, sin trabajo manual." },
      { tab: "Segura", headline: "Datos y accesos protegidos de verdad", body: "Seguridad pensada desde el diseño, no agregada al final. Quién accede a qué, cuándo, con qué nivel." },
      { tab: "Preparada", headline: "Lista para el siguiente nivel de tu operación", body: "Lo que construimos no se queda corto en seis meses. Diseñamos con margen para crecer." },
    ],
    process: [
      { n: "01", title: "Diagnóstico", body: "Auditamos tu infraestructura actual y sus límites." },
      { n: "02", title: "Diseño", body: "Definimos la arquitectura objetivo y el plan para llegar a ella." },
      { n: "03", title: "Construcción", body: "Implementamos por fases, sin frenar tu operación en marcha." },
      { n: "04", title: "Soporte", body: "Acompañamos la transición y documentamos todo el sistema." },
    ],
    stat: { value: "78%", label: "de las consultas resueltas sin intervención humana tras integrar los sistemas" },
    faqs: [
      { q: "¿Necesito esto si mi empresa es pequeña?", a: "Si tus herramientas no se hablan entre sí y todo depende de copiar y pegar, sí. La arquitectura correcta evita que el crecimiento se vuelva un caos." },
      { q: "¿Tengo que parar mi operación durante el proyecto?", a: "No. Trabajamos por fases para que la operación siga en marcha mientras migramos." },
      { q: "¿Qué pasa con mis datos actuales?", a: "Los migramos con cuidado y respaldo. Nada se pierde en la transición." },
      { q: "¿Esto me ata a un proveedor?", a: "No. Diseñamos con tecnologías estándar y documentamos todo. Puedes cambiar de equipo cuando quieras." },
      { q: "¿Cómo se cobra?", a: "Por proyecto, con alcance cerrado tras la auditoría inicial." },
    ],
  },
  {
    slug: "tecnologias-emergentes",
    eyebrow: "IA",
    title: "Tecnologías emergentes aplicadas a tu negocio",
    subtitle:
      "Agentes de IA, automatización con modelos de lenguaje y herramientas que hace dos años no existían, aplicadas a problemas concretos de tu operación.",
    metaDescription:
      "Inteligencia artificial aplicada: agentes conversacionales, automatización con IA y procesamiento de documentos para empresas en Latinoamérica.",
    subServices: [
      { icon: "message-square", title: "Agentes conversacionales", body: "Asistentes que atienden, responden y agendan, entrenados con tu catálogo y tu voz." },
      { icon: "sparkles", title: "Automatización con IA", body: "Tareas que antes requerían criterio humano, resueltas por modelos de lenguaje." },
      { icon: "file-text", title: "Procesamiento de documentos", body: "Facturas, contratos y formularios leídos y capturados sin transcripción manual." },
      { icon: "trending-up", title: "Análisis predictivo", body: "Datos que anticipan demanda, abandono o riesgo antes de que pasen." },
      { icon: "plug", title: "Integraciones con LLMs", body: "Conectamos modelos de IA a tus sistemas para que trabajen donde ya operas." },
    ],
    advantages: [
      { tab: "Aplicada", headline: "IA resolviendo un problema real, no una demo", body: "No instalamos IA para decir que tienes IA. La aplicamos a una tarea concreta que hoy te cuesta tiempo o dinero." },
      { tab: "Confiable", headline: "Con criterios claros de cuándo escalar a un humano", body: "Definimos los límites del sistema. Cuando algo se sale de lo que sabe manejar, lo pasa a una persona, sin inventar." },
      { tab: "Integrada", headline: "Trabaja donde ya opera tu negocio", body: "WhatsApp, tu CRM, tu correo. La IA llega a donde ya está tu operación, no a una herramienta más que nadie abre." },
      { tab: "Medible", headline: "Sabes exactamente qué te está ahorrando", body: "Cada agente deja registro: consultas resueltas, tiempo de respuesta, casos escalados. El impacto es visible." },
    ],
    process: [
      { n: "01", title: "Diagnóstico", body: "Identificamos qué tarea concreta vale la pena resolver con IA." },
      { n: "02", title: "Diseño", body: "Definimos el comportamiento del sistema y sus límites de actuación." },
      { n: "03", title: "Construcción", body: "Entrenamos, conectamos y probamos con casos reales de tu operación." },
      { n: "04", title: "Soporte", body: "Afinamos el comportamiento con datos reales tras la puesta en marcha." },
    ],
    stat: { value: "90 seg", label: "de tiempo de respuesta promedio, frente a las 4 horas que tomaba antes" },
    faqs: [
      { q: "¿La IA va a reemplazar a mi equipo?", a: "No. Se encarga de lo repetitivo para que tu equipo se dedique a lo que requiere criterio humano. Es una herramienta, no un reemplazo." },
      { q: "¿Qué pasa si la IA responde algo incorrecto?", a: "Definimos límites claros. Cuando el sistema no tiene certeza, escala a una persona en lugar de inventar." },
      { q: "¿Necesito muchos datos para empezar?", a: "Menos de lo que crees. Entrenamos con tu catálogo, FAQ y conversaciones existentes. Si tienes poco, empezamos acotado y ampliamos." },
      { q: "¿Esto es caro de mantener?", a: "Te dimensionamos el costo mensual antes de empezar. Usamos modelos eficientes para que el costo tenga sentido frente a lo que ahorra." },
      { q: "¿En qué canales puede operar?", a: "WhatsApp, web, Instagram, Telegram, correo. Donde tu cliente ya te escribe." },
    ],
  },
  {
    slug: "pruebas-qa",
    eyebrow: "Calidad",
    title: "Pruebas de software que evitan errores costosos",
    subtitle:
      "Validamos que tu software funcione, sea seguro y aguante carga antes de que llegue a producción. Porque un error en vivo cuesta más que prevenirlo.",
    metaDescription:
      "Pruebas de software (QA): funcionales, carga, seguridad y usabilidad para empresas en Latinoamérica. Software validado antes de salir a producción.",
    subServices: [
      { icon: "check-circle", title: "Pruebas funcionales", body: "Verificamos que cada función haga exactamente lo que debe hacer." },
      { icon: "gauge", title: "Carga y rendimiento", body: "Probamos que el sistema aguante muchos usuarios a la vez sin caerse." },
      { icon: "shield-check", title: "Seguridad", body: "Buscamos las vulnerabilidades antes de que las encuentre alguien más." },
      { icon: "mouse-pointer-click", title: "Usabilidad", body: "Confirmamos que la gente entienda cómo usar el software sin manual." },
      { icon: "refresh-cw", title: "Regresión", body: "Cada cambio nuevo se prueba contra lo anterior, para que nada que funcionaba se rompa." },
      { icon: "workflow", title: "Automatización de pruebas", body: "Convertimos las pruebas en procesos que corren solos en cada actualización." },
    ],
    advantages: [
      { tab: "Preventiva", headline: "Encontramos el error antes que tu cliente", body: "Un fallo detectado en pruebas cuesta una fracción de lo que cuesta detectado en producción, con clientes mirando." },
      { tab: "Rigurosa", headline: "Cubrimos los casos que nadie piensa probar", body: "No solo el camino feliz. Probamos los bordes, los errores de usuario y las condiciones extremas." },
      { tab: "Documentada", headline: "Sabes exactamente qué se probó y qué resultó", body: "Cada prueba deja evidencia. No es 'parece que funciona', es 'esto se validó y este fue el resultado'." },
      { tab: "Continua", headline: "La calidad no se revisa una vez, se mantiene", body: "Automatizamos las pruebas para que cada actualización futura se valide sola, sin volver a empezar de cero." },
    ],
    process: [
      { n: "01", title: "Diagnóstico", body: "Revisamos el software y definimos qué hay que probar y con qué prioridad." },
      { n: "02", title: "Diseño", body: "Construimos los casos de prueba que cubren funcionalidad, carga y seguridad." },
      { n: "03", title: "Ejecución", body: "Corremos las pruebas, documentamos hallazgos y priorizamos correcciones." },
      { n: "04", title: "Automatización", body: "Dejamos las pruebas automatizadas para que cada cambio futuro se valide solo." },
    ],
    stat: { value: "1 error", label: "en producción cuesta más que toda una fase de pruebas bien hecha" },
    faqs: [
      { q: "¿Esto solo aplica si el software lo hicieron ustedes?", a: "No. Probamos software hecho por cualquier equipo. De hecho, una mirada externa suele encontrar lo que el equipo que lo construyó ya no ve." },
      { q: "¿No basta con que el desarrollador pruebe su propio código?", a: "El que construye algo tiende a probar que funcione como él lo pensó. QA prueba que funcione como el usuario real lo va a usar, que es distinto." },
      { q: "¿Cuándo conviene hacer las pruebas?", a: "Idealmente antes de salir a producción. Pero también vale revisar software ya en vivo que da problemas intermitentes." },
      { q: "¿Qué entregan al final?", a: "Un informe claro de qué se probó, qué falló, qué tan grave es cada hallazgo y qué priorizar. Más las pruebas automatizadas si las incluimos." },
      { q: "¿Cómo se cobra?", a: "Por proyecto, según el alcance del software a probar. Te lo cerramos tras la revisión inicial." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
