import type { Locale } from "../i18n/copy";

export type Localized = Record<Locale, string>;

export type DocumentItem = {
  id: string;
  type: "pdf" | "image" | "spreadsheet" | "external";
  title: Localized;
  description: Localized;
  href: string;
  preview?: string;
  category: Localized;
  actionLabel: Localized;
};

export type ModuleType = "text" | "canvas" | "swot" | "diagnostic" | "team" | "visual";

export type WorkModule = {
  id: string;
  type: ModuleType;
  title: Localized;
  eyebrow: Localized;
  summary: Localized;
  body: Localized[];
  highlights: Localized[];
  documents: DocumentItem[];
};

export type Delivery = {
  id: string;
  number: number;
  code: string;
  status: Localized;
  date: string;
  title: Localized;
  summary: Localized;
  tags: string[];
  modules: WorkModule[];
};

export type TeamMember = {
  name: string;
  role: Localized;
  strengths: Localized;
  focus: Localized;
};

export const companyProfile = {
  name: "UMO S.A.",
  founded: "1968-10-18",
  origin: { es: "Nace en Medellin", en: "Founded in Medellin" },
  headquarters: {
    es: "Parque Industrial La Brizuela, Antioquia",
    en: "La Brizuela Industrial Park, Antioquia",
  },
  employees: "+360",
  allies: "+400",
  experience: "+55",
  website: "https://umo.com.co",
  lines: [
    {
      title: { es: "Vehiculos", en: "Vehicles" },
      text: {
        es: "Portafolio de reposicion para vehiculos colombianos, respaldado por experiencia en sistemas de escape y estandares de calidad.",
        en: "Replacement portfolio for Colombian vehicles, backed by exhaust-system experience and quality standards.",
      },
    },
    {
      title: { es: "Motos", en: "Motorcycles" },
      text: {
        es: "Forros de sillin con enfoque en confort, ajuste, durabilidad y reduccion de temperatura en la conduccion.",
        en: "Seat covers focused on comfort, fit, durability and lower riding temperature.",
      },
    },
    {
      title: { es: "Bienestar", en: "Wellness" },
      text: {
        es: "Articulos de bienestar con tecnologia y diseno orientados a transformar la calidad de vida.",
        en: "Wellness products using technology and design to improve quality of life.",
      },
    },
  ],
  milestones: [
    { year: "1968", text: { es: "Nace UMO S.A. en Medellin.", en: "UMO S.A. is founded in Medellin." } },
    {
      year: "1970",
      text: {
        es: "Primer contrato para suministro de sistemas de escape a SOFASA.",
        en: "First contract to supply exhaust systems to SOFASA.",
      },
    },
    {
      year: "1980",
      text: {
        es: "Proveedor oficial de sistemas de escape para GM - Colmotores.",
        en: "Official exhaust-system supplier for GM - Colmotores.",
      },
    },
    {
      year: "1998",
      text: {
        es: "Adquisicion de brazo portatil 3D para metrologia.",
        en: "Acquisition of portable 3D arm for metrology.",
      },
    },
  ],
  certifications: ["IATF 16949", "ASES B", "BIQS", "DIAN", "CTPAT"],
};

export const documents: DocumentItem[] = [
  {
    id: "team-pdf",
    type: "pdf",
    title: { es: "Conformacion de equipo", en: "Team formation" },
    description: {
      es: "Proposito comun, fortalezas, oportunidades de mejora y acuerdos de comunicacion.",
      en: "Shared purpose, strengths, improvement areas and communication agreements.",
    },
    href: "/assets/content/equipo.pdf",
    category: { es: "Equipo", en: "Team" },
    actionLabel: { es: "Ver PDF", en: "View PDF" },
  },
  {
    id: "umo-notes",
    type: "pdf",
    title: { es: "Notas reunion UMO", en: "UMO meeting notes" },
    description: {
      es: "Hallazgos sobre capacidad, producto, precios, canales y mercado estadounidense.",
      en: "Findings about capacity, product, pricing, channels and the U.S. market.",
    },
    href: "/assets/content/notas-umo.pdf",
    category: { es: "Investigacion", en: "Research" },
    actionLabel: { es: "Ver PDF", en: "View PDF" },
  },
  {
    id: "diagnostic-xlsx",
    type: "spreadsheet",
    title: { es: "Diagnostico P-I", en: "P-I diagnostic" },
    description: {
      es: "Matriz de resultados con dimensiones de preparacion internacional.",
      en: "Results matrix with international readiness dimensions.",
    },
    href: "/assets/content/diagnostico-pi.xlsx",
    category: { es: "Datos", en: "Data" },
    actionLabel: { es: "Abrir Excel", en: "Open Excel" },
  },
  {
    id: "canvas-img",
    type: "image",
    title: { es: "Business Model Canvas original", en: "Original Business Model Canvas" },
    description: {
      es: "Imagen original usada como fuente para reconstruir el canvas dentro del dossier.",
      en: "Original image used as source for the reconstructed canvas in the dossier.",
    },
    href: "/assets/content/business-model-canvas.png",
    preview: "/assets/content/business-model-canvas.png",
    category: { es: "Modelo", en: "Model" },
    actionLabel: { es: "Ver imagen original", en: "View original image" },
  },
  {
    id: "dofa-img",
    type: "image",
    title: { es: "Matriz DOFA original", en: "Original SWOT Matrix" },
    description: {
      es: "Captura original usada como referencia para la version visual reinterpretada.",
      en: "Original capture used as reference for the reinterpreted visual version.",
    },
    href: "/assets/content/dofa.png",
    preview: "/assets/content/dofa.png",
    category: { es: "Analisis", en: "Analysis" },
    actionLabel: { es: "Ver imagen original", en: "View original image" },
  },
  {
    id: "canva-canvas",
    type: "external",
    title: { es: "Canvas en Canva", en: "Canvas in Canva" },
    description: {
      es: "Enlace externo editable o visual del material de Canvas.",
      en: "External editable or visual link for the Canvas material.",
    },
    href: "https://canva.link/yyqciefr16q7ji7",
    category: { es: "Canva", en: "Canva" },
    actionLabel: { es: "Abrir Canva Canvas", en: "Open Canvas Canva" },
  },
  {
    id: "canva-dofa",
    type: "external",
    title: { es: "DOFA en Canva", en: "SWOT in Canva" },
    description: {
      es: "Enlace externo del material editable o visual de la matriz DOFA.",
      en: "External editable or visual link for the SWOT matrix material.",
    },
    href: "https://canva.link/yyqciefr16q7ji7",
    category: { es: "Canva", en: "Canva" },
    actionLabel: { es: "Abrir Canva DOFA", en: "Open SWOT Canva" },
  },
  {
    id: "umo-website",
    type: "external",
    title: { es: "Web oficial UMO", en: "Official UMO website" },
    description: {
      es: "Fuente corporativa usada para construir el contexto de la home.",
      en: "Corporate source used to build the homepage context.",
    },
    href: "https://umo.com.co",
    category: { es: "Fuente externa", en: "External source" },
    actionLabel: { es: "Ver fuente externa", en: "View external source" },
  },
  {
    id: "umo-smart-md",
    type: "external",
    title: { es: "Desarrollo Thermo Seats", en: "Thermo Seats development" },
    description: {
      es: "Documento base con propuesta innovadora, producto, sostenibilidad y viabilidad de internacionalizacion.",
      en: "Source document with innovation proposal, product, sustainability and internationalization viability.",
    },
    href: "/assets/content/umo-smart.md",
    category: { es: "SMART y viabilidad", en: "SMART and viability" },
    actionLabel: { es: "Ver documento original", en: "View original document" },
  },
];

export const diagnosticMetrics = [
  { label: "Direccionamiento estrategico", value: 100, tone: "strong" },
  { label: "Alianzas estrategicas", value: 100, tone: "strong" },
  { label: "Exportacion e importacion bienes", value: 70, tone: "mid" },
  { label: "Producto / servicio", value: 61, tone: "mid" },
  { label: "Potencial de internacionalizacion", value: 44, tone: "mid" },
  { label: "Sostenibilidad", value: 41, tone: "mid" },
  { label: "Modos de entrada", value: 33, tone: "risk" },
  { label: "Tecnologia e innovacion", value: 29, tone: "risk" },
  { label: "Inversion extranjera directa", value: 13, tone: "risk" },
  { label: "Exportacion de servicios", value: 4, tone: "risk" },
  { label: "Talento humano", value: 0, tone: "risk" },
  { label: "Licencias y franquicias", value: 0, tone: "risk" },
];

export const canvasBlocks = [
  {
    title: { es: "Socios clave", en: "Key partners" },
    text: {
      es: "Distribuidores de maquinaria en Estados Unidos, importadores, operadores logisticos, representante comercial en Colombia y proveedores de materias primas para asegurar entrega al destino final.",
      en: "U.S. machinery distributors, importers, logistics operators, a Colombian sales representative and raw-material suppliers to secure final delivery.",
    },
  },
  {
    title: { es: "Propuesta de valor", en: "Value proposition" },
    text: {
      es: "Sillines de alta calidad para podadoras, con durabilidad para uso intensivo, mayor comodidad, ergonomia, resistencia climatica y mejor relacion calidad-precio.",
      en: "High-quality mower seats with intensive-use durability, better comfort, ergonomics, weather resistance and a stronger price-quality ratio.",
    },
  },
  {
    title: { es: "Segmentos", en: "Segments" },
    text: {
      es: "Distribuidores de maquinaria outdoor, tiendas de repuestos, empresas de paisajismo y contratistas que usan podadoras de forma constante.",
      en: "Outdoor machinery distributors, spare-parts stores, landscaping companies and contractors that use mowers constantly.",
    },
  },
  {
    title: { es: "Canales", en: "Channels" },
    text: {
      es: "Distribuidores mayoristas, importadores, ventas directas B2B, plataformas e-commerce y ferias industriales.",
      en: "Wholesale distributors, importers, B2B direct sales, e-commerce platforms and industrial fairs.",
    },
  },
  {
    title: { es: "Relaciones con clientes", en: "Customer relationships" },
    text: {
      es: "Atencion y asesoria personalizada B2B, soporte tecnico, postventa y relaciones de largo plazo con distribuidores.",
      en: "Personalized B2B support, technical assistance, after-sales service and long-term distributor relationships.",
    },
  },
  {
    title: { es: "Actividades clave", en: "Key activities" },
    text: {
      es: "Produccion de sillines, diseno y mejora del producto, control de calidad, logistica internacional, desarrollo de clientes B2B y marketing industrial.",
      en: "Seat production, product design and improvement, quality control, international logistics, B2B customer development and industrial marketing.",
    },
  },
  {
    title: { es: "Recursos clave", en: "Key resources" },
    text: {
      es: "Planta de produccion en Colombia, experiencia industrial, certificaciones, mano de obra especializada, capacidad de produccion y red comercial.",
      en: "Production plant in Colombia, industrial experience, certifications, skilled labor, production capacity and commercial network.",
    },
  },
  {
    title: { es: "Estructura de costos", en: "Cost structure" },
    text: {
      es: "Materiales, mano de obra, control de calidad, empaque, transporte, logistica internacional, comercializacion y construccion de confianza en el mercado.",
      en: "Materials, labor, quality control, packaging, transport, international logistics, commercialization and market trust-building.",
    },
  },
  {
    title: { es: "Fuentes de ingreso", en: "Revenue streams" },
    text: {
      es: "Ventas B2B a distribuidores y tiendas de repuestos, mercado aftermarket, ventas al por mayor, acuerdos comerciales estables y personalizacion.",
      en: "B2B sales to distributors and spare-parts stores, aftermarket sales, wholesale orders, stable commercial agreements and customization.",
    },
  },
];

export const swotBlocks = [
  {
    title: { es: "Fortalezas", en: "Strengths" },
    text: {
      es: "Modelo asset-light, neutralidad tecnologica, cultura de seguridad basada en protocolos y solidez financiera con flujo de caja estable.",
      en: "Asset-light model, technological neutrality, safety culture based on protocols and financial strength with stable cash flow.",
    },
  },
  {
    title: { es: "Oportunidades", en: "Opportunities" },
    text: {
      es: "Escalabilidad geografica hacia Panama y Estados Unidos, social selling en LinkedIn, programa formal de referidos y nuevos modelos laborales especializados.",
      en: "Geographic scalability toward Panama and the U.S., LinkedIn social selling, a formal referral program and new specialized labor models.",
    },
  },
  {
    title: { es: "Debilidades", en: "Weaknesses" },
    text: {
      es: "Invisibilidad digital, procesos manuales, estructura centralizada y ausencia de un CRM formal para fidelizacion y retencion de clientes.",
      en: "Low digital visibility, manual processes, centralized structure and lack of a formal CRM for customer loyalty and retention.",
    },
  },
  {
    title: { es: "Amenazas", en: "Threats" },
    text: {
      es: "Asimetria de marketing frente a competidores, fuga de capital humano, vulnerabilidad por dependencia de referidos y saturacion del sector.",
      en: "Marketing asymmetry against competitors, talent leakage, channel vulnerability from referral dependence and sector saturation.",
    },
  },
];

export const team: TeamMember[] = [
  {
    name: "Thomas Ochoa",
    role: { es: "Investigacion y criterio", en: "Research and judgment" },
    strengths: {
      es: "Aprendizaje rapido, creatividad y cuestionamiento antes de entregar.",
      en: "Fast learning, creativity and questioning before delivery.",
    },
    focus: {
      es: "Puntualidad, foco y responsabilidad en entregas.",
      en: "Punctuality, focus and delivery ownership.",
    },
  },
  {
    name: "Jose David Jaramillo",
    role: {
      es: "CTO / desarrollador, direccion visual y organizacion",
      en: "CTO / developer, visual direction and organization",
    },
    strengths: {
      es: "Creatividad, proactividad y busqueda de calidad en el resultado.",
      en: "Creativity, proactivity and care for result quality.",
    },
    focus: {
      es: "Constancia, organizacion y disciplina de seguimiento.",
      en: "Consistency, organization and follow-up discipline.",
    },
  },
  {
    name: "Maria Fernanda Burgos",
    role: { es: "Detalle y entrega", en: "Detail and delivery" },
    strengths: {
      es: "Organizacion, actitud positiva, creatividad y atencion al detalle.",
      en: "Organization, positive attitude, creativity and attention to detail.",
    },
    focus: {
      es: "Paciencia, comunicacion asertiva y confianza en el proceso.",
      en: "Patience, assertive communication and trust in the process.",
    },
  },
  {
    name: "Agustin Barreneche",
    role: { es: "Iniciativa y adaptacion", en: "Initiative and adaptation" },
    strengths: {
      es: "Adaptacion, aprendizaje, responsabilidad, creatividad e iniciativa.",
      en: "Adaptation, learning, responsibility, creativity and initiative.",
    },
    focus: {
      es: "Gestion del tiempo, foco y reduccion de distracciones.",
      en: "Time management, focus and distraction reduction.",
    },
  },
];

export const deliveries: Delivery[] = [
  {
    id: "entrega-1",
    number: 1,
    code: "ENTREGA 01",
    status: { es: "Entrega cargada", en: "Loaded delivery" },
    date: "2026-04-17",
    title: { es: "Equipo, diagnostico y ruta UMO", en: "Team, diagnostic and UMO route" },
    summary: {
      es: "Reune los archivos reales de la primera entrega: conformacion del equipo, diagnostico P-I, Canvas, DOFA y desarrollo Thermo Seats para Estados Unidos.",
      en: "Collects the real files from the first delivery: team formation, P-I diagnostic, Canvas, SWOT and Thermo Seats development for the United States.",
    },
    tags: ["team", "diagnostic", "canvas", "swot", "smart", "viability"],
    modules: [
      {
        id: "acuerdo-equipo",
        type: "team",
        eyebrow: { es: "Trabajo 01", en: "Work 01" },
        title: { es: "Acuerdo de equipo", en: "Team agreement" },
        summary: {
          es: "La entrega define proposito comun, fortalezas, oportunidades de mejora, comunicacion y reglas de trabajo.",
          en: "The delivery defines shared purpose, strengths, improvement areas, communication and work rules.",
        },
        body: [
          {
            es: "Proposito comun: transformar las habilidades individuales en una ventaja estrategica, trabajando con compromiso y respeto mutuo para liderar el desarrollo del nucleo y convertir cada desafio en aprendizaje compartido.",
            en: "Shared purpose: turn individual skills into a strategic advantage, working with commitment and mutual respect to lead the core project and turn each challenge into shared learning.",
          },
          {
            es: "Daily Update: cada martes y miercoles, antes de clase, el equipo reserva cinco minutos para responder tres preguntas base: en que estoy, que me falta y que se debe mejorar. Ese microcorte evita atrasos silenciosos y permite detectar bloqueos rapido.",
            en: "Daily update: every Tuesday and Wednesday, before class, the team reserves five minutes to answer three core questions: what I am working on, what is missing and what needs improvement. That short checkpoint avoids silent delays and catches blockers early.",
          },
          {
            es: "Grupo WhatsApp: se usa para coordinar tareas, avisar cambios, confirmar avances y sostener el seguimiento fuera del aula. Tambien funciona como canal para revisar comentarios sobre la empresa y convertirlos en mejoras concretas en las entregas.",
            en: "WhatsApp group: it is used to coordinate tasks, report changes, confirm progress and keep follow-up active outside the classroom. It also works as a channel to review company feedback and convert it into concrete delivery improvements.",
          },
          {
            es: "Retroalimentacion: durante el nucleo el grupo hace reuniones cortas cada semana para revisar que funciono, que no funciono y que debe corregirse. La opinion del profesor entra como criterio de ajuste rapido, no como comentario aislado.",
            en: "Feedback: during the project the group holds short weekly meetings to review what worked, what did not and what needs correction. The professor's opinion is treated as a rapid adjustment criterion, not as isolated feedback.",
          },
          {
            es: "Reglas de trabajo: cumplir tareas en los tiempos acordados, mantener una comunicacion clara y respetuosa, participar activamente en las reuniones, asumir responsabilidad individual, ser puntuales y apoyar a los demas cuando una parte del trabajo se atrasa.",
            en: "Work rules: complete tasks on the agreed deadlines, keep communication clear and respectful, participate actively in meetings, assume individual ownership, be punctual and support others whenever a part of the work falls behind.",
          },
          {
            es: "Consecuencias: primero hay llamado de atencion y oportunidad de corregir. Si el incumplimiento continua, la tarea puede reasignarse, se reduce la participacion en decisiones y queda registro para informar al docente. Cuando una falta afecta de forma directa una entrega, tambien puede impactar la evaluacion individual.",
            en: "Consequences: first there is a warning and a chance to correct it. If the failure continues, the task can be reassigned, participation in decisions is reduced and a record is kept to inform the teacher. When a fault directly affects a delivery, it can also impact the individual grade.",
          },
          {
            es: "Lectura de fortalezas iniciales: Thomas registro 89.8%, Agustin 93.2% y Maria Fernanda 73.1% en la prueba de entrada. El documento los interpreta como perfiles utiles para investigacion, precision estrategica, operacion y detalle, dejando claro que el equipo debe mezclar velocidad con rigor.",
            en: "Initial strengths reading: Thomas scored 89.8%, Agustin 93.2% and Maria Fernanda 73.1% on the entry test. The document reads those results as useful profiles for research, strategic precision, operations and detail, making it clear that the team must combine speed with rigor.",
          },
          {
            es: "Planeacion semanal derivada del acuerdo: lunes se definen objetivos y tiempos, de lunes a jueves se produce, el miercoles se revisa a mitad de semana, el jueves se integran aportes y el viernes se hace cierre y mejora. El acuerdo no es solo normativo: estructura la forma real de trabajar.",
            en: "Weekly planning derived from the agreement: Monday defines goals and timing, Monday through Thursday is production time, Wednesday is a midweek review, Thursday is for integration and Friday is for closing and improvement. The agreement is not just normative: it structures the real work model.",
          },
          {
            es: "Regla critica del archivo original: si alguien no entrega su parte y compromete el resultado del grupo, esa persona puede quedar fuera del trabajo puntual. Esa clausula vuelve visible que la responsabilidad no es simbolica sino operativa.",
            en: "Critical rule from the original file: if someone does not deliver their part and compromises the group result, that person can be removed from that specific work. That clause makes it clear that responsibility is operational, not symbolic.",
          },
          {
            es: "Este modulo ya no deja el archivo aislado: el texto central del acuerdo queda pegado dentro del dossier para que la entrega se lea como una pagina de trabajo, no solo como un PDF adjunto.",
            en: "This module no longer leaves the file isolated: the core agreement text is embedded inside the dossier so the delivery reads as a working page, not just as an attached PDF.",
          },
          {
            es: "La comunicacion se sostiene con daily updates, grupo de WhatsApp y revision de comentarios para mejorar la calidad de cada entrega.",
            en: "Communication is supported through daily updates, a WhatsApp group and review of feedback to improve the quality of each delivery.",
          },
        ],
        highlights: [
          { es: "Daily Update fijo: martes y miercoles, cinco minutos antes de clase.", en: "Fixed daily update: Tuesday and Wednesday, five minutes before class." },
          { es: "Canal operativo: WhatsApp para tareas, seguimiento y alertas.", en: "Operational channel: WhatsApp for tasks, follow-up and alerts." },
          { es: "Feedback semanal con reuniones cortas y ajustes rapidos.", en: "Weekly feedback through short meetings and quick adjustments." },
          { es: "Reglas: responsabilidad, puntualidad, respeto, participacion y apoyo entre integrantes.", en: "Rules: ownership, punctuality, respect, participation and support between members." },
          { es: "Consecuencia progresiva: llamado de atencion, correccion, reasignacion y reporte al docente.", en: "Progressive consequence: warning, correction, reassignment and teacher report." },
          { es: "Prueba de entrada: Thomas 89.8%, Agustin 93.2%, Maria Fernanda 73.1%.", en: "Entry test: Thomas 89.8%, Agustin 93.2%, Maria Fernanda 73.1%." },
        ],
        documents: [documents[0]],
      },
      {
        id: "planeacion-equipo",
        type: "text",
        eyebrow: { es: "Trabajo 02", en: "Work 02" },
        title: { es: "Planeacion semanal", en: "Weekly planning" },
        summary: {
          es: "La forma de trabajo queda organizada en una semana operativa: planear, producir, revisar, integrar y ajustar.",
          en: "The work method is organized into an operational week: plan, produce, review, integrate and adjust.",
        },
        body: [
          {
            es: "Lunes: una hora para definir objetivos, asignar tareas y establecer tiempos. De lunes a jueves cada integrante desarrolla investigacion, redaccion o diseno segun lo asignado.",
            en: "Monday: one hour to define goals, assign tasks and set deadlines. From Monday to Thursday each member develops research, writing or design according to the assignment.",
          },
          {
            es: "Miercoles: seguimiento intermedio de 30 a 45 minutos para revisar avances y resolver dudas. Jueves: integracion de aportes, coherencia del documento y ajustes. Viernes: revision final y mejoras.",
            en: "Wednesday: a 30 to 45 minute checkpoint to review progress and solve questions. Thursday: integration of contributions, document coherence and adjustments. Friday: final review and improvements.",
          },
        ],
        highlights: [
          { es: "Plan semanal claro antes de producir.", en: "Clear weekly plan before production." },
          { es: "Seguimiento a mitad de semana para corregir a tiempo.", en: "Midweek checkpoint to correct on time." },
          { es: "Fin de semana reservado para ajustes finales si hace falta.", en: "Weekend reserved for final adjustments if needed." },
        ],
        documents: [documents[0]],
      },
      {
        id: "diagnostico-pi",
        type: "diagnostic",
        eyebrow: { es: "Trabajo 03", en: "Work 03" },
        title: { es: "Diagnostico P-I", en: "P-I diagnostic" },
        summary: {
          es: "Lectura del Excel original: UMO obtiene 40.03% de preparacion internacional, con fortalezas claras y brechas criticas.",
          en: "Reading from the original Excel: UMO scores 40.03% international readiness, with clear strengths and critical gaps.",
        },
        body: [
          {
            es: "El diagnostico marca fortalezas en direccionamiento estrategico y alianzas estrategicas, ambas al 100%. Producto/servicio alcanza 60.94% y exportacion de bienes 70%, lo que indica una base comercial y productiva aprovechable.",
            en: "The diagnostic shows strengths in strategic direction and strategic alliances, both at 100%. Product/service reaches 60.94% and goods export reaches 70%, showing an usable commercial and production base.",
          },
          {
            es: "Las brechas principales estan en talento humano, licencias y franquicias, exportacion de servicios, inversion extranjera directa, tecnologia e innovacion y modos de entrada.",
            en: "The main gaps are talent, licenses and franchises, service exports, foreign direct investment, technology and innovation, and entry modes.",
          },
          {
            es: "La lectura del Excel no se queda en el porcentaje total. Dentro del dossier se usa para separar lo que UMO ya tiene resuelto de lo que debe construir antes de entrar a Estados Unidos: estructura comercial, innovacion, conocimiento de modos de entrada y fortalecimiento del frente humano.",
            en: "The spreadsheet reading does not stop at the total score. Inside the dossier it is used to separate what UMO already has in place from what still needs to be built before entering the United States: commercial structure, innovation, entry mode knowledge and stronger human talent systems.",
          },
          {
            es: "El valor real del diagnostico es priorizar. La hoja deja claro que no basta con tener producto y alianzas; tambien hace falta cerrar brechas en tecnologia, servicios y expansion internacional para no entrar al mercado con una base incompleta.",
            en: "The real value of the diagnostic is prioritization. The sheet makes clear that having product and alliances is not enough; gaps in technology, services and international expansion also need to be closed to avoid entering the market with an incomplete base.",
          },
        ],
        highlights: [
          { es: "Puntaje total del diagnostico: 40.03%.", en: "Total diagnostic score: 40.03%." },
          { es: "Direccionamiento estrategico y alianzas: 100%.", en: "Strategic direction and alliances: 100%." },
          { es: "Talento humano y licencias/franquicias: zona critica.", en: "Talent and licenses/franchises: critical zone." },
        ],
        documents: [documents[2]],
      },
      {
        id: "business-model-canvas",
        type: "canvas",
        eyebrow: { es: "Trabajo 04", en: "Work 04" },
        title: { es: "Business Model Canvas", en: "Business Model Canvas" },
        summary: {
          es: "El Canvas original se reconstruye como bloques editables para leer socios, actividades, propuesta de valor, canales y fuentes de ingreso.",
          en: "The original Canvas is rebuilt as editable blocks to read partners, activities, value proposition, channels and revenue streams.",
        },
        body: [
          {
            es: "El archivo visual no queda como captura suelta: se convierte en una matriz navegable que explica como UMO podria vender sillines para podadoras en Estados Unidos.",
            en: "The visual file is not left as a loose screenshot: it becomes a navigable matrix explaining how UMO could sell mower seats in the United States.",
          },
          {
            es: "La reconstruccion aclara el modelo en lenguaje operativo: socios para importar y distribuir, actividades ligadas a produccion y mejora del producto, propuesta de valor centrada en durabilidad y ergonomia, y canales B2B para mover volumen con rapidez.",
            en: "The reconstruction clarifies the model in operational language: partners to import and distribute, activities tied to production and product improvement, a value proposition centered on durability and ergonomics, and B2B channels to move volume quickly.",
          },
          {
            es: "Tambien deja visible que el Canvas no es solo una imagen bonita. Sirve para enlazar cliente, canal, costo e ingreso con la estrategia de entrada a Estados Unidos, y por eso el dossier muestra tanto la version interpretada como el archivo original y su link de Canva.",
            en: "It also makes visible that the Canvas is not just a nice image. It connects customer, channel, cost and revenue with the U.S. entry strategy, which is why the dossier shows both the interpreted version and the original asset plus its Canva link.",
          },
        ],
        highlights: [
          { es: "Incluye imagen original y enlace de Canva.", en: "Includes original image and Canva link." },
          { es: "Pensado para ventas B2B, distribuidores y aftermarket.", en: "Designed around B2B sales, distributors and aftermarket." },
          { es: "Modelo listo para editar por bloques.", en: "Model ready to edit by blocks." },
        ],
        documents: [documents[3], documents[5]],
      },
      {
        id: "dofa",
        type: "swot",
        eyebrow: { es: "Trabajo 05", en: "Work 05" },
        title: { es: "Matriz DOFA", en: "SWOT matrix" },
        summary: {
          es: "La imagen original se reinterpreta como lectura estrategica: fortalezas, debilidades, oportunidades y amenazas.",
          en: "The original image is reinterpreted as a strategic reading: strengths, weaknesses, opportunities and threats.",
        },
        body: [
          {
            es: "La DOFA sintetiza riesgos digitales, dependencia de canales, capacidades internas y oportunidades de expansion hacia mercados internacionales.",
            en: "The SWOT synthesizes digital risks, channel dependence, internal capabilities and expansion opportunities toward international markets.",
          },
          {
            es: "Fortalezas como el modelo asset-light, la neutralidad tecnologica y la estabilidad de caja muestran que UMO tiene una base operativa aprovechable. En contraste, la invisibilidad digital, los procesos manuales y la falta de CRM señalan por que la entrada internacional necesita orden comercial y no solo producto.",
            en: "Strengths such as the asset-light model, technological neutrality and stable cash flow show that UMO has an operational base worth leveraging. In contrast, low digital visibility, manual processes and the absence of CRM show why international entry needs commercial order, not just product.",
          },
          {
            es: "La oportunidad no esta planteada en abstracto: la matriz apunta a expansion geografica, social selling y formalizacion de referidos como motores reales para abrir mercado. Por eso el dossier expone la interpretacion y tambien conserva el material original y su enlace en Canva.",
            en: "The opportunity is not stated in the abstract: the matrix points to geographic expansion, social selling and referral formalization as real market-opening drivers. That is why the dossier exposes the interpretation while also preserving the original material and its Canva link.",
          },
        ],
        highlights: [
          { es: "Fortaleza central: modelo liviano, seguridad y caja estable.", en: "Core strength: lean model, safety and stable cash flow." },
          { es: "Debilidad central: baja visibilidad digital y falta de CRM.", en: "Core weakness: low digital visibility and lack of CRM." },
          { es: "Oportunidad central: expansion geografica y captacion B2B.", en: "Core opportunity: geographic expansion and B2B lead generation." },
        ],
        documents: [documents[4], documents[6]],
      },
      {
        id: "thermo-seats-smart",
        type: "text",
        eyebrow: { es: "Trabajo 06", en: "Work 06" },
        title: { es: "Thermo Seats SMART", en: "Thermo Seats SMART" },
        summary: {
          es: "El desarrollo de UMO.md se organiza como objetivo de internacionalizacion para asientos premium de podadoras Zero-Turn.",
          en: "The UMO.md development is organized as an internationalization objective for premium Zero-Turn mower seats.",
        },
        body: [
          {
            es: "Nombre del proyecto: Thermo Seats by UMO, confort ergonomico para el paisajismo de alto rendimiento. El producto son asientos premium para el mercado aftermarket de podadoras profesionales, especialmente modelos Zero-Turn.",
            en: "Project name: Thermo Seats by UMO, ergonomic comfort for high-performance landscaping. The product is premium seats for the professional mower aftermarket, especially Zero-Turn models.",
          },
          {
            es: "La propuesta usa tecnologia Thermoliner para regular temperatura en climas extremos como Texas y Georgia, ergonomia avanzada con poliuretano de alta densidad, compatibilidad con marcas como John Deere y Toro, y materiales de alta resistencia.",
            en: "The proposal uses Thermoliner technology to regulate temperature in extreme climates such as Texas and Georgia, advanced ergonomics with high-density polyurethane, compatibility with brands like John Deere and Toro, and high-resistance materials.",
          },
          {
            es: "Objetivo SMART propuesto: validar en 12 meses la entrada de Thermo Seats al aftermarket de podadoras en Texas y Georgia mediante ventas B2B, marketplaces y distribuidores especializados, con precio objetivo entre USD 180 y USD 220.",
            en: "Proposed SMART goal: validate within 12 months Thermo Seats' entry into the mower aftermarket in Texas and Georgia through B2B sales, marketplaces and specialized distributors, with a target price between USD 180 and USD 220.",
          },
        ],
        highlights: [
          { es: "Especifico: asientos premium para podadoras Zero-Turn.", en: "Specific: premium seats for Zero-Turn mowers." },
          { es: "Medible: rango de precio USD 180-220 y capacidad inicial de 1.000-1.500 sillas mensuales.", en: "Measurable: USD 180-220 price range and initial capacity of 1,000-1,500 seats per month." },
          { es: "Relevante: reduce fatiga y mejora confort del operario de paisajismo.", en: "Relevant: reduces fatigue and improves comfort for landscaping operators." },
        ],
        documents: [documents[8]],
      },
      {
        id: "sostenibilidad-viabilidad",
        type: "visual",
        eyebrow: { es: "Trabajo 07", en: "Work 07" },
        title: { es: "Sostenibilidad y viabilidad", en: "Sustainability and viability" },
        summary: {
          es: "El texto de UMO.md se separa en dimensiones economica, ambiental, social y lectura de mercado para Texas y Georgia.",
          en: "The UMO.md text is separated into economic, environmental, social and market readings for Texas and Georgia.",
        },
        body: [
          {
            es: "Dimension economica: la viabilidad se apoya en una ventaja arancelaria. Colombia exporta con 10% de arancel frente al 50% que enfrenta China, lo que permite competir en precio sin abandonar calidad.",
            en: "Economic dimension: viability relies on a tariff advantage. Colombia exports with a 10% tariff versus the 50% faced by China, enabling price competition without abandoning quality.",
          },
          {
            es: "Dimension ambiental: el foco esta en durabilidad y economia circular. Asientos mas resistentes extienden la vida util de maquinaria existente y reducen reemplazos prematuros.",
            en: "Environmental dimension: the focus is durability and circular economy. More resistant seats extend existing machinery life and reduce premature replacements.",
          },
          {
            es: "Dimension social: en Colombia genera empleo tecnico en planta; en Estados Unidos mejora salud lumbar y confort de operarios de paisajismo con jornadas extensas.",
            en: "Social dimension: in Colombia it generates technical plant employment; in the U.S. it improves lumbar health and comfort for landscaping operators with long workdays.",
          },
          {
            es: "La viabilidad comercial se concentra en Texas y Georgia: el primero por volumen de maquinaria y trabajo de paisajismo, el segundo por su salida logistica a traves de Savannah. Esa lectura convierte la idea de expansion en una hipotesis territorial concreta.",
            en: "Commercial viability focuses on Texas and Georgia: the first for machinery volume and landscaping demand, the second for logistical access through Savannah. That reading turns the expansion idea into a concrete territorial hypothesis.",
          },
        ],
        highlights: [
          { es: "Texas: mercado de volumen por granjas y propiedades suburbanas extensas.", en: "Texas: volume market due to farms and large suburban properties." },
          { es: "Georgia: hub logistico por el puerto de Savannah.", en: "Georgia: logistics hub through the Port of Savannah." },
          { es: "Competencia: Milsco y Grammer AG dominan OEM, pero sus repuestos originales son costosos.", en: "Competition: Milsco and Grammer AG dominate OEM, but original spare parts are expensive." },
        ],
        documents: [documents[8]],
      },
    ],
  },
  {
    id: "entrega-2",
    number: 2,
    code: "ENTREGA 02",
    status: { es: "Proxima carpeta", en: "Next folder" },
    date: "2026-04-30",
    title: { es: "Investigacion comercial", en: "Commercial research" },
    summary: {
      es: "Espacio preparado para proximas fuentes: mercado, competencia, canales, pricing, entrevistas y evidencia comercial.",
      en: "Prepared space for upcoming sources: market, competition, channels, pricing, interviews and commercial evidence.",
    },
    tags: ["market", "research", "pricing"],
    modules: [],
  },
  {
    id: "entrega-3",
    number: 3,
    code: "ENTREGA 03",
    status: { es: "Proxima carpeta", en: "Next folder" },
    date: "2026-04-30",
    title: { es: "Plan de entrada y ejecucion", en: "Entry and execution plan" },
    summary: {
      es: "Carpeta preparada para proximos trabajos: acciones, indicadores, cronograma, presupuesto, graficas y nuevos documentos.",
      en: "Folder prepared for upcoming work: actions, indicators, timeline, budget, charts and new documents.",
    },
    tags: ["execution", "timeline", "budget"],
    modules: [],
  },
];

export const objectives = [
  {
    id: "diagnose",
    label: { es: "Diagnosticar", en: "Diagnose" },
    text: {
      es: "Convertir entrevistas, matrices y datos en una lectura clara del punto de partida.",
      en: "Turn interviews, matrices and data into a clear reading of the starting point.",
    },
  },
  {
    id: "prioritize",
    label: { es: "Priorizar", en: "Prioritize" },
    text: {
      es: "Diferenciar hallazgos criticos de informacion secundaria para enfocar decisiones.",
      en: "Separate critical findings from secondary information to focus decisions.",
    },
  },
  {
    id: "build",
    label: { es: "Construir", en: "Build" },
    text: {
      es: "Armar entregas, canvas, DOFA y documentos como piezas de un mismo sistema.",
      en: "Build deliverables, canvas, SWOT and documents as one connected system.",
    },
  },
  {
    id: "present",
    label: { es: "Presentar", en: "Present" },
    text: {
      es: "Mostrar el avance con una narrativa visual que haga facil entender el caso.",
      en: "Present progress with a visual narrative that makes the case easy to understand.",
    },
  },
];
