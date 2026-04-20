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
    actionLabel: { es: "Ir al Canva", en: "Open Canva" },
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

export const canvasBlocks = [
  {
    title: { es: "Propuesta de valor", en: "Value proposition" },
    text: {
      es: "Confort, calidad e innovacion aplicada a soluciones de movilidad y bienestar con experiencia industrial.",
      en: "Comfort, quality and innovation applied to mobility and wellness solutions with industrial experience.",
    },
  },
  {
    title: { es: "Segmentos", en: "Segments" },
    text: {
      es: "Reposicion automotriz, usuarios de moto, distribuidores, marketplaces y potenciales compradores en Estados Unidos.",
      en: "Automotive replacement market, motorcycle users, distributors, marketplaces and potential U.S. buyers.",
    },
  },
  {
    title: { es: "Canales", en: "Channels" },
    text: {
      es: "Fabricantes, repuestos, distribuidores, ecommerce y marketplaces como ruta inicial de validacion.",
      en: "Manufacturers, spare parts, distributors, ecommerce and marketplaces as initial validation routes.",
    },
  },
  {
    title: { es: "Recursos clave", en: "Key resources" },
    text: {
      es: "Capacidad productiva, equipo industrial, trayectoria, certificaciones y conocimiento tecnico de producto.",
      en: "Production capacity, industrial team, track record, certifications and technical product knowledge.",
    },
  },
  {
    title: { es: "Aliados", en: "Partners" },
    text: {
      es: "Mas de 400 aliados y potencial de representantes comerciales para entrada internacional.",
      en: "More than 400 allies and potential sales representatives for international entry.",
    },
  },
  {
    title: { es: "Ingresos", en: "Revenue" },
    text: {
      es: "Venta de productos basicos y referencias con mejores especificaciones entre USD 200 y USD 220.",
      en: "Sale of basic products and higher-spec references between USD 200 and USD 220.",
    },
  },
];

export const swotBlocks = [
  {
    title: { es: "Fortalezas", en: "Strengths" },
    text: {
      es: "Trayectoria industrial, calidad, capacidad de produccion, certificaciones y experiencia con aliados.",
      en: "Industrial track record, quality, production capacity, certifications and partner experience.",
    },
  },
  {
    title: { es: "Oportunidades", en: "Opportunities" },
    text: {
      es: "Mercado estadounidense, canales digitales, marketplaces y posicionamiento de productos de confort.",
      en: "U.S. market, digital channels, marketplaces and positioning for comfort products.",
    },
  },
  {
    title: { es: "Debilidades", en: "Weaknesses" },
    text: {
      es: "Baja capacidad interna en ingles, producto ecommerce en maduracion y pocas alianzas estrategicas actuales.",
      en: "Limited internal English capability, ecommerce product still maturing and few current strategic alliances.",
    },
  },
  {
    title: { es: "Amenazas", en: "Threats" },
    text: {
      es: "Competencia generica en Amazon, aranceles, exigencias de entrada y presion por precio.",
      en: "Generic Amazon competition, tariffs, entry requirements and pricing pressure.",
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
    status: { es: "Base del proyecto", en: "Project baseline" },
    date: "2026-04-17",
    title: { es: "Fundacion del dossier", en: "Dossier foundation" },
    summary: {
      es: "Organiza el punto de partida: equipo, contexto empresarial, notas iniciales y reglas para trabajar el caso UMO.",
      en: "Organizes the starting point: team, business context, initial notes and working rules for the UMO case.",
    },
    tags: ["team", "company", "research"],
    modules: [
      {
        id: "acuerdo-equipo",
        type: "team",
        eyebrow: { es: "Trabajo 01", en: "Work 01" },
        title: { es: "Acuerdo de equipo", en: "Team agreement" },
        summary: {
          es: "El equipo se convierte en una celula de investigacion con rituales, feedback y responsabilidades.",
          en: "The team becomes a research cell with rituals, feedback and responsibilities.",
        },
        body: [
          {
            es: "La entrega original define fortalezas individuales, oportunidades de mejora y una forma de comunicacion basada en updates cortos, WhatsApp y revisiones constantes.",
            en: "The original delivery defines individual strengths, improvement areas and communication through short updates, WhatsApp and constant reviews.",
          },
        ],
        highlights: [
          { es: "Daily updates martes y miercoles.", en: "Daily updates on Tuesdays and Wednesdays." },
          { es: "Feedback semanal para mejorar entregas.", en: "Weekly feedback to improve submissions." },
          { es: "Roles flexibles y foco en calidad.", en: "Flexible roles and quality focus." },
        ],
        documents: [documents[0]],
      },
      {
        id: "descripcion-empresa",
        type: "text",
        eyebrow: { es: "Trabajo 02", en: "Work 02" },
        title: { es: "Descripcion de UMO", en: "UMO company description" },
        summary: {
          es: "UMO se presenta como empresa colombiana con base industrial, historia automotriz y lineas que conectan movilidad y bienestar.",
          en: "UMO is presented as a Colombian company with industrial roots, automotive history and lines connecting mobility and wellness.",
        },
        body: [
          {
            es: "Fundada en 1968, UMO acumula mas de cinco decadas fabricando autopartes y accesorios para vehiculos automotores. Su experiencia en sistemas de escape, sillines para motos y articulos de bienestar permite analizarla como una empresa con capacidades productivas reales para internacionalizacion.",
            en: "Founded in 1968, UMO has more than five decades manufacturing auto parts and vehicle accessories. Its experience in exhaust systems, motorcycle seats and wellness products makes it a company with real production capabilities for internationalization.",
          },
        ],
        highlights: [
          { es: "Mas de 360 empleados.", en: "More than 360 employees." },
          { es: "Mas de 400 aliados.", en: "More than 400 allies." },
          { es: "Certificaciones y reconocimientos industriales.", en: "Industrial certifications and recognitions." },
        ],
        documents: [documents[6], documents[1]],
      },
    ],
  },
  {
    id: "entrega-2",
    number: 2,
    code: "ENTREGA 02",
    status: { es: "Diagnostico estrategico", en: "Strategic diagnostic" },
    date: "2026-04-19",
    title: { es: "Diagnostico, Canvas y DOFA", en: "Diagnostic, Canvas and SWOT" },
    summary: {
      es: "Reinterpreta documentos y matrices en modulos visuales para entender modelo, brechas y entrada a Estados Unidos.",
      en: "Reinterprets documents and matrices into visual modules for business model, gaps and U.S. entry understanding.",
    },
    tags: ["diagnostic", "canvas", "swot", "strategy"],
    modules: [
      {
        id: "business-model-canvas",
        type: "canvas",
        eyebrow: { es: "Trabajo 01", en: "Work 01" },
        title: { es: "Business Model Canvas", en: "Business Model Canvas" },
        summary: {
          es: "El canvas se reconstruye como sistema visual editable: bloques, lectura de negocio y fuentes originales.",
          en: "The canvas is rebuilt as an editable visual system: blocks, business reading and original sources.",
        },
        body: [
          {
            es: "La version web no se limita a pegar la imagen. Usa el archivo como referencia y reorganiza la informacion en bloques navegables para conectar propuesta de valor, canales, recursos, aliados e ingresos.",
            en: "The web version does not simply paste the image. It uses the file as reference and reorganizes information into navigable blocks connecting value proposition, channels, resources, partners and revenue.",
          },
        ],
        highlights: [
          { es: "Canvas reinterpretado dentro del frontend.", en: "Canvas reinterpreted inside the frontend." },
          { es: "Acceso a imagen original y Canva.", en: "Access to original image and Canva." },
          { es: "Preparado para editar bloques sin redisenar.", en: "Ready to edit blocks without redesigning." },
        ],
        documents: [documents[3], documents[5]],
      },
      {
        id: "diagnostico-pi",
        type: "diagnostic",
        eyebrow: { es: "Trabajo 02", en: "Work 02" },
        title: { es: "Diagnostico P-I", en: "P-I diagnostic" },
        summary: {
          es: "Lectura de preparacion internacional con puntaje total cercano al 40% y brechas criticas identificadas.",
          en: "International readiness reading with a total score around 40% and critical gaps identified.",
        },
        body: [
          {
            es: "El diagnostico muestra fortalezas en direccionamiento estrategico y alianzas, mientras talento humano, tecnologia e innovacion, y licencias/franquicias aparecen como frentes a reforzar antes de escalar.",
            en: "The diagnostic shows strengths in strategic direction and alliances, while talent, technology and innovation, and licenses/franchises appear as areas to reinforce before scaling.",
          },
        ],
        highlights: [
          { es: "Puntaje total: 40.0%.", en: "Total score: 40.0%." },
          { es: "Direccionamiento y alianzas al 100%.", en: "Direction and alliances at 100%." },
          { es: "Talento humano y licencias en zona critica.", en: "Talent and licenses in a critical zone." },
        ],
        documents: [documents[2]],
      },
      {
        id: "dofa",
        type: "swot",
        eyebrow: { es: "Trabajo 03", en: "Work 03" },
        title: { es: "DOFA internacional", en: "International SWOT" },
        summary: {
          es: "La matriz se convierte en cuatro cuadrantes editoriales para leer rapidamente capacidades y riesgos.",
          en: "The matrix becomes four editorial quadrants to quickly read capabilities and risks.",
        },
        body: [
          {
            es: "La DOFA combina hallazgos de capacidad, mercado, canales, competencia y preparacion interna para orientar decisiones de entrada.",
            en: "The SWOT combines findings about capacity, market, channels, competition and internal readiness to guide entry decisions.",
          },
        ],
        highlights: [
          { es: "Fortalezas productivas y trayectoria.", en: "Production strengths and track record." },
          { es: "Oportunidad en marketplaces de Estados Unidos.", en: "Opportunity in U.S. marketplaces." },
          { es: "Riesgos por idioma, competencia y aranceles.", en: "Risks from language, competition and tariffs." },
        ],
        documents: [documents[4]],
      },
    ],
  },
  {
    id: "entrega-3",
    number: 3,
    code: "ENTREGA 03",
    status: { es: "Proxima carpeta", en: "Next folder" },
    date: "2026-04-30",
    title: { es: "SMART, sostenibilidad y viabilidad", en: "SMART, sustainability and viability" },
    summary: {
      es: "Carpeta preparada para futuros trabajos: objetivos SMART, sostenibilidad, viabilidad, graficas y nuevos documentos.",
      en: "Folder prepared for future work: SMART goals, sustainability, viability, charts and new documents.",
    },
    tags: ["smart", "sustainability", "viability"],
    modules: [
      {
        id: "objetivo-smart",
        type: "text",
        eyebrow: { es: "Trabajo pendiente", en: "Pending work" },
        title: { es: "Objetivo SMART", en: "SMART goal" },
        summary: {
          es: "Modulo reservado para formular objetivos medibles de internacionalizacion.",
          en: "Reserved module for measurable internationalization goals.",
        },
        body: [
          {
            es: "Cuando el documento este listo, este espacio recibira el texto extraido, la version editorial y los botones al archivo original.",
            en: "When the document is ready, this space will receive extracted text, an editorial version and buttons to the original file.",
          },
        ],
        highlights: [
          { es: "Listo para texto, PDF, graficas o link externo.", en: "Ready for text, PDF, charts or external link." },
        ],
        documents: [],
      },
      {
        id: "sostenibilidad",
        type: "visual",
        eyebrow: { es: "Trabajo pendiente", en: "Pending work" },
        title: { es: "Sostenibilidad y viabilidad", en: "Sustainability and viability" },
        summary: {
          es: "Modulo preparado para interpretar capturas, tablas o diagnosticos futuros.",
          en: "Module prepared to interpret future screenshots, tables or diagnostics.",
        },
        body: [
          {
            es: "El sistema ya acepta resumen, lectura corta, archivos originales y enlaces externos para que la entrega crezca sin cambiar arquitectura.",
            en: "The system already accepts summary, short reading, original files and external links so the delivery can grow without changing architecture.",
          },
        ],
        highlights: [
          { es: "Escalable para nuevas entregas.", en: "Scalable for new submissions." },
          { es: "Separacion clara entre interpretacion y fuente.", en: "Clear separation between interpretation and source." },
        ],
        documents: [],
      },
    ],
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
