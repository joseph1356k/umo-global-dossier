import type { Locale } from "../i18n/copy";

export type Localized = Record<Locale, string>;

export type DocumentItem = {
  id: string;
  type: "pdf" | "image" | "spreadsheet";
  title: Localized;
  description: Localized;
  href: string;
  preview?: string;
  category: Localized;
};

export type Delivery = {
  id: string;
  code: string;
  status: Localized;
  date: string;
  title: Localized;
  summary: Localized;
  tags: string[];
  documents: DocumentItem[];
  signals: Localized[];
};

export type TeamMember = {
  name: string;
  role: Localized;
  strengths: Localized;
  focus: Localized;
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
  },
  {
    id: "canvas-img",
    type: "image",
    title: { es: "Business Model Canvas", en: "Business Model Canvas" },
    description: {
      es: "Mapa visual del modelo de negocio para ordenar propuesta, canales y relacion con clientes.",
      en: "Visual business model map for value proposition, channels and customer relationships.",
    },
    href: "/assets/content/business-model-canvas.png",
    preview: "/assets/content/business-model-canvas.png",
    category: { es: "Modelo", en: "Model" },
  },
  {
    id: "dofa-img",
    type: "image",
    title: { es: "Matriz DOFA", en: "SWOT Matrix" },
    description: {
      es: "Lectura de fortalezas, oportunidades, debilidades y amenazas.",
      en: "Strengths, weaknesses, opportunities and threats reading.",
    },
    href: "/assets/content/dofa.png",
    preview: "/assets/content/dofa.png",
    category: { es: "Analisis", en: "Analysis" },
  },
  {
    id: "umo-panorama",
    type: "image",
    title: { es: "Panorama UMO", en: "UMO panorama" },
    description: {
      es: "Imagen panoramica disponible para ambientar el archivo visual del proyecto.",
      en: "Panoramic image available for the project's visual archive.",
    },
    href: "/assets/content/umo-panorama.jpeg",
    preview: "/assets/content/umo-panorama.jpeg",
    category: { es: "Visual", en: "Visual" },
  },
];

export const deliveries: Delivery[] = [
  {
    id: "equipo",
    code: "CASE 001",
    status: { es: "Base del equipo", en: "Team baseline" },
    date: "2026-04-17",
    title: { es: "Conformacion del equipo", en: "Team formation" },
    summary: {
      es: "Define quienes integran la celula, como se comunican y que reglas sostienen el trabajo durante el nucleo.",
      en: "Defines the team cell, communication rituals and rules that sustain the project work.",
    },
    tags: ["team", "planning", "governance"],
    documents: [documents[0], documents[5]],
    signals: [
      {
        es: "Daily updates martes y miercoles para revisar avance y bloqueos.",
        en: "Daily updates on Tuesdays and Wednesdays to check progress and blockers.",
      },
      {
        es: "Feedback semanal para convertir comentarios en mejoras de entrega.",
        en: "Weekly feedback to turn comments into delivery improvements.",
      },
      {
        es: "Roles flexibles con foco en calidad, investigacion y organizacion.",
        en: "Flexible roles focused on quality, research and organization.",
      },
    ],
  },
  {
    id: "diagnostico",
    code: "CASE 002",
    status: { es: "Lectura inicial", en: "Initial reading" },
    date: "2026-04-19",
    title: { es: "Diagnostico y notas UMO", en: "UMO diagnostic and notes" },
    summary: {
      es: "Concentra hallazgos de reunion y matriz P-I para entender capacidades, riesgos y prioridades antes de entrar a Estados Unidos.",
      en: "Combines meeting findings and the P-I matrix to understand capabilities, risks and priorities before entering the U.S.",
    },
    tags: ["diagnostic", "market", "data"],
    documents: [documents[1], documents[2]],
    signals: [
      {
        es: "Capacidad mensual estimada de 1.000 a 1.500 sillas.",
        en: "Estimated monthly capacity between 1,000 and 1,500 seats.",
      },
      {
        es: "Primer objetivo comercial: 50 a 70 unidades en marketplaces como Amazon.",
        en: "Initial commercial target: 50 to 70 units through marketplaces such as Amazon.",
      },
      {
        es: "Solo dos personas manejan ingles dentro de la empresa.",
        en: "Only two people in the company currently handle English.",
      },
    ],
  },
  {
    id: "modelos",
    code: "CASE 003",
    status: { es: "Marco estrategico", en: "Strategic frame" },
    date: "2026-04-19",
    title: { es: "Canvas y DOFA", en: "Canvas and SWOT" },
    summary: {
      es: "Agrupa los artefactos visuales que sintetizan modelo de negocio, lectura competitiva y variables criticas.",
      en: "Collects visual artifacts that synthesize the business model, competitive reading and critical variables.",
    },
    tags: ["canvas", "swot", "strategy"],
    documents: [documents[3], documents[4]],
    signals: [
      {
        es: "Los canales deben distinguir fabricantes, repuestos, distribuidores y marketplaces.",
        en: "Channels must separate manufacturers, spare parts, distributors and marketplaces.",
      },
      {
        es: "La propuesta de precio inicial se mueve entre menos de USD 200 y versiones de USD 200 a 220.",
        en: "Initial price proposal ranges from below USD 200 to versions between USD 200 and 220.",
      },
      {
        es: "Thermo Seats aparece como activo registrado en Estados Unidos.",
        en: "Thermo Seats appears as a registered asset in the United States.",
      },
    ],
  },
];

export const diagnosticMetrics = [
  { label: "Direccionamiento estrategico", value: 100, tone: "strong" },
  { label: "Alianzas estrategicas", value: 100, tone: "strong" },
  { label: "Exportacion e importacion", value: 70, tone: "mid" },
  { label: "Producto / servicio", value: 61, tone: "mid" },
  { label: "Potencial internacional", value: 44, tone: "mid" },
  { label: "Tecnologia e innovacion", value: 29, tone: "risk" },
  { label: "Talento humano", value: 0, tone: "risk" },
  { label: "Licencias y franquicias", value: 0, tone: "risk" },
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
