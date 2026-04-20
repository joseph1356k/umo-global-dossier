export type Locale = "es" | "en";

export const copy = {
  es: {
    nav: {
      archive: "Entregas",
      diagnostic: "Diagnostico",
      canvas: "Canvas",
      team: "Equipo",
      goals: "Objetivos",
      openArchive: "Abrir archivo",
      back: "Volver",
    },
    hero: {
      kicker: "International dossier // UMO to USA",
      title: "UMO Global Dossier",
      subtitle:
        "Un centro visual para ordenar evidencias, entregas y decisiones del proceso de internacionalizacion hacia Estados Unidos.",
      primary: "Explorar entregas",
      secondary: "Ver diagnostico",
      status: "Caso activo",
      market: "Mercado objetivo",
      route: "Medellin, Antioquia / ESIC -> Estados Unidos",
    },
    archive: {
      title: "Evidence Board",
      subtitle:
        "Cada entrega funciona como un expediente vivo: documentos completos, imagenes, hallazgos, matrices y decisiones listas para crecer.",
      all: "Todo",
      open: "Abrir expediente",
      docs: "documentos",
      view: "Ver archivo",
      download: "Descargar",
    },
    diagnostic: {
      title: "Radar de preparacion internacional",
      subtitle:
        "Lectura inicial del diagnostico P-I: un mapa de capacidades, brechas y rutas de entrada para priorizar el avance.",
      total: "Puntaje total",
      strongest: "Senales fuertes",
      risk: "Brechas criticas",
      insight:
        "La empresa muestra direccionamiento y alianzas con buen potencial, pero debe reforzar talento internacional, servicios exportables y mecanismos formales de entrada.",
    },
    canvas: {
      title: "Modelos y matrices",
      subtitle:
        "Canvas, DOFA y piezas visuales se presentan como material de analisis, no como anexos escondidos.",
      canvas: "Business Model Canvas",
      dofa: "Matriz DOFA",
    },
    team: {
      title: "Unidad de trabajo",
      subtitle:
        "El equipo se organiza como celula de investigacion: roles flexibles, feedback constante y foco en convertir entregas en decisiones.",
      purpose: "Proposito comun",
      purposeText:
        "Transformar habilidades individuales en una ventaja estrategica para liderar el desarrollo del nucleo con compromiso, respeto y aprendizaje compartido.",
    },
    goals: {
      title: "Que queremos lograr",
      subtitle:
        "Convertir documentos dispersos en una narrativa clara de internacionalizacion: diagnosticar, priorizar, construir y presentar.",
    },
    detail: {
      evidence: "Evidencia",
      contents: "Contenido del expediente",
      signals: "Senales clave",
      related: "Material relacionado",
    },
  },
  en: {
    nav: {
      archive: "Deliveries",
      diagnostic: "Diagnostic",
      canvas: "Canvas",
      team: "Team",
      goals: "Goals",
      openArchive: "Open archive",
      back: "Back",
    },
    hero: {
      kicker: "International dossier // UMO to USA",
      title: "UMO Global Dossier",
      subtitle:
        "A visual command center for evidence, submissions and decisions behind UMO's internationalization process into the United States.",
      primary: "Explore deliveries",
      secondary: "View diagnostic",
      status: "Active case",
      market: "Target market",
      route: "Medellin, Antioquia / ESIC -> United States",
    },
    archive: {
      title: "Evidence Board",
      subtitle:
        "Each delivery behaves like a living file: full documents, images, findings, matrices and decisions ready to scale.",
      all: "All",
      open: "Open file",
      docs: "documents",
      view: "View file",
      download: "Download",
    },
    diagnostic: {
      title: "International readiness radar",
      subtitle:
        "Initial P-I diagnostic reading: a capability map, gap tracker and market-entry signal system.",
      total: "Total score",
      strongest: "Strong signals",
      risk: "Critical gaps",
      insight:
        "UMO shows promising strategic direction and partnership potential, while international talent, exportable services and formal entry mechanisms need reinforcement.",
    },
    canvas: {
      title: "Models and matrices",
      subtitle:
        "Canvas, SWOT and visual artifacts are treated as analysis material, not hidden attachments.",
      canvas: "Business Model Canvas",
      dofa: "SWOT Matrix",
    },
    team: {
      title: "Work unit",
      subtitle:
        "The group operates as a research cell: flexible roles, constant feedback and focus on turning submissions into decisions.",
      purpose: "Shared purpose",
      purposeText:
        "Turn individual skills into a strategic advantage for the course project through commitment, respect and shared learning.",
    },
    goals: {
      title: "What we want to achieve",
      subtitle:
        "Transform scattered documents into a clear internationalization narrative: diagnose, prioritize, build and present.",
    },
    detail: {
      evidence: "Evidence",
      contents: "File contents",
      signals: "Key signals",
      related: "Related material",
    },
  },
} satisfies Record<Locale, Record<string, Record<string, string>>>;
