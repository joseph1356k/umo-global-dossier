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

export type InsightCard = {
  title: Localized;
  text: Localized;
};

export type EntryProfile = {
  name: string;
  score: string;
  reading: Localized;
};

export type WeeklyCadenceRow = {
  day: Localized;
  time: Localized;
  focus: Localized;
  outcome: Localized;
};

export type DiagnosticSnapshot = {
  label: string;
  obtained: string;
  maximum: string;
};

export type RadarDataset = {
  title: Localized;
  labels: Localized[];
  values: number[];
};

export type BulletGroup = {
  title: Localized;
  items: Localized[];
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
  {
    id: "diagnostic-capture",
    type: "image",
    title: { es: "Resumen visual del diagnostico", en: "Diagnostic visual summary" },
    description: {
      es: "Captura del Excel con dimensiones, puntaje obtenido y puntaje maximo para leer el estado general de preparacion.",
      en: "Spreadsheet capture with dimensions, achieved score and maximum score to read the overall readiness status.",
    },
    href: "/assets/content/diagnostico-pi-resumen.png",
    preview: "/assets/content/diagnostico-pi-resumen.png",
    category: { es: "Captura Excel", en: "Excel capture" },
    actionLabel: { es: "Ver captura completa", en: "View full capture" },
  },
  {
    id: "macro-excel",
    type: "spreadsheet",
    title: { es: "Analisis macroeconomico Texas y Florida", en: "Texas and Florida macro analysis" },
    description: {
      es: "Excel base con las seis series comparativas para construir la Entrega 02 dentro del dossier.",
      en: "Base spreadsheet with the six comparative series used to build Delivery 02 inside the dossier.",
    },
    href: "/assets/content/macro-texas-florida.xlsx",
    category: { es: "Macro datos", en: "Macro data" },
    actionLabel: { es: "Abrir Excel base", en: "Open base spreadsheet" },
  },
  {
    id: "macro-brief",
    type: "external",
    title: { es: "Documento de analisis macro", en: "Macro analysis document" },
    description: {
      es: "Documento de apoyo con la narrativa comparativa Texas vs Florida y criterios de interpretacion.",
      en: "Support document with the Texas vs Florida comparative narrative and interpretation criteria.",
    },
    href: "/assets/content/macro-texas-florida.docx",
    category: { es: "Texto base", en: "Base text" },
    actionLabel: { es: "Abrir documento base", en: "Open base document" },
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

export const agreementPillars: InsightCard[] = [
  {
    title: { es: "Proposito comun", en: "Shared purpose" },
    text: {
      es: "Transformar las habilidades individuales en una ventaja estrategica para liderar el nucleo con compromiso, respeto mutuo y aprendizaje compartido.",
      en: "Turn individual skills into a strategic advantage to lead the project with commitment, mutual respect and shared learning.",
    },
  },
  {
    title: { es: "Comunicacion operativa", en: "Operational communication" },
    text: {
      es: "Daily update martes y miercoles, grupo de WhatsApp para seguimiento y revision permanente de comentarios para corregir a tiempo.",
      en: "Tuesday and Wednesday daily updates, a WhatsApp group for follow-up and constant review of feedback to correct on time.",
    },
  },
  {
    title: { es: "Feedback y mejora", en: "Feedback and improvement" },
    text: {
      es: "Reuniones cortas cada semana para revisar que funciono, que fallo y que debe ajustarse antes de la siguiente entrega.",
      en: "Short weekly meetings to review what worked, what failed and what must be adjusted before the next delivery.",
    },
  },
  {
    title: { es: "Responsabilidad compartida", en: "Shared accountability" },
    text: {
      es: "Cada integrante responde por su parte, pero tambien apoya el cierre colectivo para que la calidad final no dependa de una sola persona.",
      en: "Each member is responsible for their part, but also supports the collective finish so final quality does not depend on a single person.",
    },
  },
];

export const agreementRules: Localized[] = [
  {
    es: "Cumplir las tareas en los tiempos acordados y avisar con anticipacion si aparece un bloqueo.",
    en: "Complete tasks on agreed deadlines and warn early if a blocker appears.",
  },
  {
    es: "Mantener una comunicacion clara, respetuosa y util para la toma de decisiones.",
    en: "Keep communication clear, respectful and useful for decision making.",
  },
  {
    es: "Participar activamente en reuniones, revisiones y ajustes colectivos.",
    en: "Participate actively in meetings, reviews and collective adjustments.",
  },
  {
    es: "Sostener puntualidad, responsabilidad individual y apoyo entre integrantes.",
    en: "Maintain punctuality, individual ownership and support among members.",
  },
];

export const agreementConsequences: Localized[] = [
  {
    es: "Llamado de atencion inicial con oportunidad de corregir antes de la siguiente revision.",
    en: "Initial warning with a chance to correct before the next review.",
  },
  {
    es: "Reasignacion de tareas y reduccion de participacion en decisiones si el incumplimiento persiste.",
    en: "Task reassignment and reduced participation in decisions if non-compliance continues.",
  },
  {
    es: "Registro del caso e informe al docente cuando la falta compromete una entrega o el trabajo del grupo.",
    en: "Record and teacher notification when the fault compromises a delivery or the group's work.",
  },
];

export const entryTestProfiles: EntryProfile[] = [
  {
    name: "Thomas Ochoa",
    score: "89.8%",
    reading: {
      es: "Buen nivel de comprension y rapidez para investigar, estructurar ideas y detectar inconsistencias antes de entregar.",
      en: "Strong comprehension and speed to research, structure ideas and detect inconsistencies before delivery.",
    },
  },
  {
    name: "Agustin Barreneche",
    score: "93.2%",
    reading: {
      es: "Base solida en negocios internacionales; aporta precision estrategica y lectura comercial, aunque debe cuidar mas el detalle final.",
      en: "Strong base in international business; brings strategic precision and commercial reading, though final detail still needs care.",
    },
  },
  {
    name: "Maria Fernanda Burgos",
    score: "73.1%",
    reading: {
      es: "Buen potencial operativo y criterio practico; necesita reforzar pausa analitica y rigurosidad en diagnostico y planeacion.",
      en: "Good operational potential and practical judgment; needs to strengthen analytical pause and rigor in diagnosis and planning.",
    },
  },
];

export const weeklyCadence: WeeklyCadenceRow[] = [
  {
    day: { es: "Lunes", en: "Monday" },
    time: { es: "1 hora", en: "1 hour" },
    focus: {
      es: "Definir objetivos, asignar tareas, repartir tiempos y dejar claro el entregable de la semana.",
      en: "Define goals, assign tasks, split timing and make the week's deliverable explicit.",
    },
    outcome: { es: "Plan operativo claro", en: "Clear operational plan" },
  },
  {
    day: { es: "Lunes a jueves", en: "Monday to Thursday" },
    time: { es: "Bloques de produccion", en: "Production blocks" },
    focus: {
      es: "Investigar, redactar, disenar y consolidar avances segun el frente de cada integrante.",
      en: "Research, write, design and consolidate progress according to each member's work front.",
    },
    outcome: { es: "Avances concretos", en: "Concrete progress" },
  },
  {
    day: { es: "Miercoles", en: "Wednesday" },
    time: { es: "30-45 min", en: "30-45 min" },
    focus: {
      es: "Revisar avances intermedios, resolver dudas y corregir desalineaciones antes del cierre.",
      en: "Review midweek progress, solve questions and correct misalignment before closing.",
    },
    outcome: { es: "Correccion a tiempo", en: "On-time correction" },
  },
  {
    day: { es: "Jueves", en: "Thursday" },
    time: { es: "1-2 horas", en: "1-2 hours" },
    focus: {
      es: "Integrar aportes, revisar coherencia, limpiar redaccion y dejar la version consolidada.",
      en: "Integrate contributions, review coherence, clean writing and leave the consolidated version ready.",
    },
    outcome: { es: "Documento integrado", en: "Integrated document" },
  },
  {
    day: { es: "Viernes", en: "Friday" },
    time: { es: "1 hora", en: "1 hour" },
    focus: {
      es: "Revisar calidad final, detectar mejoras y preparar la entrega o exposicion.",
      en: "Review final quality, detect improvements and prepare the delivery or presentation.",
    },
    outcome: { es: "Version final mejorada", en: "Improved final version" },
  },
];

export const diagnosticSnapshots: DiagnosticSnapshot[] = [
  { label: "Talento Humano", obtained: "0,01%", maximum: "12,50%" },
  { label: "Direccionamiento estrategico", obtained: "7,50%", maximum: "7,50%" },
  { label: "Tecnologia e innovacion", obtained: "4,38%", maximum: "15,00%" },
  { label: "Sostenibilidad", obtained: "6,19%", maximum: "15,00%" },
  { label: "Potencial de internacionalizacion", obtained: "21,95%", maximum: "50,00%" },
  { label: "Modos de entrada", obtained: "9,77%", maximum: "30,00%" },
  { label: "Exportacion e Importacion (Bienes)", obtained: "5,60%", maximum: "8,00%" },
  { label: "Exportacion (Servicios)", obtained: "0,17%", maximum: "4,00%" },
  { label: "Inversion Extranjera Directa", obtained: "1,00%", maximum: "8,00%" },
  { label: "Licencias y Franquicias", obtained: "0,00%", maximum: "7,00%" },
  { label: "Alianzas Estrategicas", obtained: "3,00%", maximum: "3,00%" },
  { label: "Producto / Servicio", obtained: "12,19%", maximum: "20,00%" },
];

export const diagnosticRadarSets: RadarDataset[] = [
  {
    title: { es: "Diagnostico completo", en: "Full diagnostic" },
    labels: [
      { es: "Talento Humano", en: "Talent" },
      { es: "Direccionamiento", en: "Direction" },
      { es: "Tecnologia", en: "Technology" },
      { es: "Sostenibilidad", en: "Sustainability" },
      { es: "Servicio", en: "Service" },
    ],
    values: [0, 100, 29, 41, 61],
  },
  {
    title: { es: "Potencial de internacionalizacion", en: "Internationalization potential" },
    labels: [
      { es: "Bienes", en: "Goods" },
      { es: "IED", en: "FDI" },
      { es: "Licencias", en: "Licenses" },
      { es: "Alianzas", en: "Alliances" },
      { es: "Producto", en: "Product" },
    ],
    values: [70, 13, 0, 100, 61],
  },
];

export const diagnosticFactors: BulletGroup[] = [
  {
    title: { es: "Factores Macro", en: "Macro factors" },
    items: [
      {
        es: "Alta demanda de maquinaria agricola y de jardineria profesional en los cinturones productivos de EE. UU.",
        en: "High demand for agricultural and professional landscaping machinery in U.S. productive belts.",
      },
      {
        es: "Efecto nearshoring favorable para fabricantes latinoamericanos frente a costos de flete y reposicion asiatica.",
        en: "A favorable nearshoring effect for Latin American manufacturers compared with Asian freight and replenishment costs.",
      },
      {
        es: "TLC con Estados Unidos como ventaja para reducir barreras arancelarias de entrada.",
        en: "Free trade agreement with the United States as an advantage to reduce entry tariff barriers.",
      },
    ],
  },
  {
    title: { es: "Factores Micro (Empresa)", en: "Micro factors (Company)" },
    items: [
      {
        es: "Capacidad instalada para escalar produccion gracias a estandarizacion, ensamblaje y conocimiento industrial acumulado.",
        en: "Installed capacity to scale production thanks to standardization, assembly and accumulated industrial know-how.",
      },
      {
        es: "Control experto en inyeccion de poliuretano y tapizado impermeable, superando competidores de bajo costo.",
        en: "Expert control in polyurethane injection and waterproof upholstery, outperforming low-cost competitors.",
      },
      {
        es: "Posibilidad de adaptar el producto como repuesto universal o bajo diseno propietario para distribuidores especializados.",
        en: "Ability to adapt the product as a universal spare part or under proprietary design for specialized distributors.",
      },
    ],
  },
];

export const canvasHighlights: InsightCard[] = [
  {
    title: { es: "Rendimiento termico y mecanico", en: "Thermal and mechanical performance" },
    text: {
      es: "El uso de poliuretano de alta resiliencia y mallas 3D neutraliza vibraciones y disipa el calor solar para jornadas intensas.",
      en: "High-resilience polyurethane and 3D meshes neutralize vibrations and dissipate solar heat during intense workdays.",
    },
  },
  {
    title: { es: "Personalizacion industrial", en: "Industrial customization" },
    text: {
      es: "Se plantea branding, materiales y acabados integrados a la propuesta estetica de cada distribuidor o fabricante.",
      en: "Branding, materials and finishes are designed to integrate with each distributor's or manufacturer's visual proposal.",
    },
  },
  {
    title: { es: "Entrada comercial gradual", en: "Gradual commercial entry" },
    text: {
      es: "La validacion inicia con marketplaces y distribuidores especializados antes de escalar acuerdos mas robustos en EE. UU.",
      en: "Validation starts with marketplaces and specialized distributors before scaling stronger agreements in the U.S.",
    },
  },
];

export const swotDetailedBlocks: BulletGroup[] = [
  {
    title: { es: "Fortalezas", en: "Strengths" },
    items: [
      {
        es: "Direccion estrategica clara, experiencia industrial y capacidad de adaptar producto con criterio tecnico.",
        en: "Clear strategic direction, industrial experience and the ability to adapt product with technical judgment.",
      },
      {
        es: "Alianzas estrategicas y conocimiento de negociacion con actores clave en Colombia y EE. UU.",
        en: "Strategic alliances and negotiation knowledge with key actors in Colombia and the U.S.",
      },
      {
        es: "Modelo asset-light y cultura de seguridad que sostienen operacion eficiente.",
        en: "Asset-light model and safety culture that support efficient operations.",
      },
    ],
  },
  {
    title: { es: "Oportunidades", en: "Opportunities" },
    items: [
      {
        es: "Tecnologia de confort y enfriamiento como palanca diferencial para podadoras y tractores profesionales.",
        en: "Comfort and cooling technology as a differentiating lever for professional mowers and tractors.",
      },
      {
        es: "Ventaja competitiva en precio frente a alternativas OEM o repuestos premium existentes.",
        en: "Competitive price advantage versus existing OEM or premium replacement alternatives.",
      },
      {
        es: "TLC con Estados Unidos y crecimiento de canales digitales y distribuidores de nicho.",
        en: "Trade agreement with the United States and growth of digital channels and niche distributors.",
      },
    ],
  },
  {
    title: { es: "Debilidades", en: "Weaknesses" },
    items: [
      {
        es: "Brecha en talento humano con competencias internacionales y manejo comercial en ingles.",
        en: "Gap in talent with international skills and commercial English capabilities.",
      },
      {
        es: "Procesos comerciales y de CRM todavia poco estructurados para una expansion sostenida.",
        en: "Commercial and CRM processes still under-structured for sustained expansion.",
      },
      {
        es: "Dependencia de una estructura centralizada para decisiones clave y seguimiento.",
        en: "Dependence on a centralized structure for key decisions and follow-up.",
      },
    ],
  },
  {
    title: { es: "Amenazas", en: "Threats" },
    items: [
      {
        es: "Riesgo de depender de un solo canal o de un unico producto en la primera entrada comercial.",
        en: "Risk of depending on a single channel or a single product in the first commercial entry.",
      },
      {
        es: "Marcas ya posicionadas y distribuidores locales con relaciones comerciales maduras.",
        en: "Already established brands and local distributors with mature commercial relationships.",
      },
      {
        es: "Talento tercerizado o no propio como limitante para el crecimiento internacional sostenido.",
        en: "Outsourced or non-core talent as a limitation for sustained international growth.",
      },
    ],
  },
];

export const smartObjective = {
  es: "UMO buscara ingresar de manera gradual y sostenible al mercado de Estados Unidos durante los proximos 12 meses, mediante la exportacion de sillas aftermarket para tractores y podadoras profesionales, priorizando los estados de Texas y Georgia, con una estrategia de entrada basada en marketplaces y en la vinculacion progresiva de distribuidores, talleres o concesionarios especializados. Como meta inicial, la empresa pretende comercializar entre 50 y 70 unidades en esta primera fase, manteniendo un rango de precio de entre USD 180 y USD 220 por silla, validando asi la aceptacion comercial del producto, su competitividad frente a marcas existentes y la viabilidad operativa de su oferta internacional. Este objetivo es especifico porque define con claridad el producto, el mercado, los estados objetivo, el canal y el volumen inicial esperado; es medible porque establece metas concretas de unidades vendidas, precio y plazo; es alcanzable y realista porque se ajusta a la capacidad actual de produccion de UMO, a su experiencia previa en exportacion de bienes y a su nivel actual de preparacion internacional; y es retador porque exige pasar del analisis y desarrollo del producto a una primera insercion comercial real en Estados Unidos. Ademas, este objetivo se relaciona directamente con el diagnostico de potencialidades de internacionalizacion, ya que la empresa presenta fortalezas en direccionamiento estrategico, capacidad productiva, adaptabilidad del producto y posibilidad de exportacion de bienes, pero aun debe fortalecer aspectos como el talento humano con competencias internacionales, el dominio del ingles y la consolidacion de una estructura comercial externa mas robusta.",
  en: "UMO will seek a gradual and sustainable entry into the United States market during the next 12 months through the export of aftermarket seats for tractors and professional mowers, prioritizing Texas and Georgia, with an entry strategy based on marketplaces and the progressive linkage of distributors, workshops or specialized dealerships. As an initial target, the company aims to commercialize between 50 and 70 units in this first phase, keeping a price range between USD 180 and USD 220 per seat, thereby validating product acceptance, competitiveness against existing brands and the operating viability of its international offer. This goal is specific because it clearly defines the product, market, target states, channel and expected initial volume; measurable because it sets concrete targets for units sold, price and timing; achievable and realistic because it fits UMO's current production capacity, prior experience exporting goods and current level of international readiness; and challenging because it requires moving from analysis and product development to a first real commercial insertion in the United States. It is also directly linked to the diagnosis of internationalization potential, since the company shows strengths in strategic direction, production capacity, product adaptability and export potential, but still needs to strengthen international talent, English proficiency and a more robust external commercial structure.",
};

export const smartCriteria: InsightCard[] = [
  {
    title: { es: "Especifico", en: "Specific" },
    text: {
      es: "Define producto, mercado, estados objetivo, canal de entrada y volumen esperado en la primera fase.",
      en: "Defines product, market, target states, entry channel and expected first-phase volume.",
    },
  },
  {
    title: { es: "Medible", en: "Measurable" },
    text: {
      es: "Fija 50-70 unidades, precio de USD 180-220 y plazo de 12 meses para validar la hipotesis comercial.",
      en: "Sets 50-70 units, a USD 180-220 price range and a 12-month window to validate the commercial hypothesis.",
    },
  },
  {
    title: { es: "Alcanzable", en: "Achievable" },
    text: {
      es: "Se apoya en la capacidad actual de produccion, la experiencia exportadora de UMO y su adaptabilidad tecnica.",
      en: "It relies on current production capacity, UMO's export experience and its technical adaptability.",
    },
  },
  {
    title: { es: "Retador y relevante", en: "Challenging and relevant" },
    text: {
      es: "Obliga a pasar del analisis a una insercion comercial real, alineada con las fortalezas y brechas detectadas en el diagnostico.",
      en: "It forces a move from analysis to real commercial entry, aligned with the strengths and gaps found in the diagnostic.",
    },
  },
];

export const viabilityPillars: InsightCard[] = [
  {
    title: { es: "Dimension economica", en: "Economic dimension" },
    text: {
      es: "Ventaja arancelaria colombiana, posicion de precio competitiva y posibilidad de validar volumen sin comprometer calidad.",
      en: "Colombian tariff advantage, competitive pricing position and the ability to validate volume without compromising quality.",
    },
  },
  {
    title: { es: "Dimension ambiental", en: "Environmental dimension" },
    text: {
      es: "Mayor durabilidad y menor reemplazo prematuro como argumento de economia circular para maquinaria ya instalada.",
      en: "Greater durability and fewer premature replacements as a circular-economy argument for already-installed machinery.",
    },
  },
  {
    title: { es: "Dimension social", en: "Social dimension" },
    text: {
      es: "Empleo tecnico en Colombia y mejora del confort lumbar para operarios de paisajismo en Estados Unidos.",
      en: "Technical employment in Colombia and improved lumbar comfort for landscaping operators in the United States.",
    },
  },
  {
    title: { es: "Viabilidad territorial", en: "Territorial viability" },
    text: {
      es: "Texas concentra demanda por volumen; Georgia facilita logistica, reposicion y acceso al puerto de Savannah.",
      en: "Texas concentrates volume demand; Georgia enables logistics, replenishment and access to the Port of Savannah.",
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
        documents: [documents[2], documents[9]],
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
    status: { es: "Entrega cargada", en: "Loaded delivery" },
    date: "2026-04-26",
    title: { es: "Investigacion comercial", en: "Commercial research" },
    summary: {
      es: "Comparacion macroeconomica y sectorial para decidir como deben leerse Texas y Florida dentro de la expansion de UMO hacia Estados Unidos.",
      en: "Macroeconomic and sector comparison to decide how Texas and Florida should be read inside UMO's expansion into the United States.",
    },
    tags: ["market", "research", "macro", "strategy"],
    modules: [
      {
        id: "macro-texas-florida",
        type: "visual",
        eyebrow: { es: "Trabajo 01", en: "Work 01" },
        title: { es: "Texas vs Florida", en: "Texas vs Florida" },
        summary: {
          es: "Analisis macroeconomico comparativo con seis indicadores para sustentar a Texas como mercado principal y a Florida como mercado complementario/premium.",
          en: "Comparative macro analysis with six indicators to support Texas as the main market and Florida as the complementary / premium market.",
        },
        body: [],
        highlights: [],
        documents: [documents[10], documents[11]],
      },
    ],
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
