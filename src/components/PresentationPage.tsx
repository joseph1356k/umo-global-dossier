import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Factory,
  FileText,
  Flag,
  Globe2,
  Handshake,
  Landmark,
  LineChart,
  MapPinned,
  Maximize2,
  MonitorSmartphone,
  PackageCheck,
  Route,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Target,
  Tractor,
  Truck,
  UsersRound,
  Video,
  X,
} from "lucide-react";
import { type ComponentType, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  canvasBlocks,
  canvasHighlights,
  companyProfile,
  deliveries,
  diagnosticMetrics,
  swotDetailedBlocks,
} from "../data/content";
import { macroIndicators, macroReferenceList } from "../data/macroComparative";
import type { Locale } from "../i18n/copy";

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

type DeckSlide = {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  summary?: string;
  variant?: "hero" | "decision" | "final" | "support";
};

type InsightCard = {
  title: string;
  text: string;
  meta?: string;
  icon: IconComponent;
};

type BenchmarkGroup = {
  id: string;
  title: string;
  unit: string;
  scaleMax: number;
  note: string;
  bars: Array<{
    label: string;
    value: number;
    display: string;
    tone: "florida" | "texas" | "usa" | "california" | "newyork";
  }>;
};

type TrendChartConfig = {
  id: string;
  indicatorId: string;
  title: string;
  unit: string;
  note: string;
  focus: string;
};

type ScorecardRow = {
  criterion: string;
  florida: number;
  texas: number;
  floridaText: string;
  texasText: string;
};

type ExpandedVisual =
  | { type: "benchmark"; id: string }
  | { type: "trend"; id: string }
  | { type: "national"; id: "benchmarks" }
  | { type: "map"; id: "florida" };

const deckSlides: DeckSlide[] = [
  {
    id: "portada",
    number: "01",
    label: "Tesis ejecutiva",
    shortLabel: "Tesis",
    eyebrow: "Presentación ejecutiva",
    title: "UMO hacia Estados Unidos.",
    summary:
      "Florida primero. Texas escala. La decisión ejecutiva es validar demanda rápido y dejar lista la expansión de mayor volumen.",
    variant: "hero",
  },
  {
    id: "estadistica",
    number: "02",
    label: "Dato de apertura",
    shortLabel: "Dato",
    eyebrow: "Señal de mercado",
    title: "1,290 campos de golf.",
    summary:
      "Es una señal directa de turfgrass, mantenimiento recurrente, maquinaria de césped y operadores que necesitan comodidad durante jornadas exteriores.",
    variant: "support",
  },
  {
    id: "umo",
    number: "03",
    label: "Contexto UMO",
    shortLabel: "UMO",
    eyebrow: "Capacidad empresarial",
    title: "UMO fabrica comodidad para operación intensiva.",
    summary:
      "La oportunidad no se limita a cojines o sillines tradicionales: UMO puede traducir su experiencia industrial en soluciones de soporte, ergonomía y durabilidad para maquinaria de uso diario.",
  },
  {
    id: "proceso",
    number: "04",
    label: "Proceso de análisis",
    shortLabel: "Proceso",
    eyebrow: "De las fases previas a la decisión",
    title: "Del diagnóstico a la decisión.",
    summary:
      "Las entregas previas se resumen en una línea de avance: capacidad interna, modelo de entrada, entornos, comparativo macro y ruta comercial.",
  },
  {
    id: "diagnostico",
    number: "05",
    label: "Hallazgos previos",
    shortLabel: "Hallazgos",
    eyebrow: "Lo que ya probó el dossier",
    title: "Base lista. Entrada gradual.",
    summary:
      "El diagnóstico, el Canvas y el DOFA dejan una conclusión práctica: UMO tiene capacidad, pero necesita validar canal, soporte y compatibilidad antes de escalar.",
  },
  {
    id: "indicadores",
    number: "06",
    label: "Indicadores principales",
    shortLabel: "Indicadores",
    eyebrow: "Gráficos de decisión",
    title: "Los indicadores asignan roles.",
    summary:
      "Florida gana foco en turfgrass y uso continuo; Texas mantiene fuerza en escala agrícola y volumen B2B.",
  },
  {
    id: "vs-eeuu",
    number: "07",
    label: "Comparación nacional",
    shortLabel: "Vs EE. UU.",
    eyebrow: "Nuestros estados frente al promedio",
    title: "Florida y Texas sobresalen.",
    summary:
      "La selección se refuerza cuando ambos estados se comparan con el promedio nacional en uso digital, clima, desgaste ambiental y dinamismo pyme.",
  },
  {
    id: "benchmarks",
    number: "08",
    label: "Benchmark estatal",
    shortLabel: "Benchmarks",
    eyebrow: "Florida y Texas frente al resto",
    title: "Nuestros estados superan el promedio.",
    summary:
      "Los datos usados en la web muestran que Florida y Texas no fueron elegidos por intuición: superan el promedio en variables que importan para UMO.",
  },
  {
    id: "fiscal",
    number: "09",
    label: "Impuestos y entrada legal",
    shortLabel: "Fiscal",
    eyebrow: "Facilidad fiscal y formalización",
    title: "Menos fricción que California o New York.",
    summary:
      "La ventaja fiscal no decide sola la entrada, pero ayuda a defender por qué estos estados son mejores puntos de arranque que mercados más costosos o complejos.",
  },
  {
    id: "comparativo",
    number: "10",
    label: "Florida vs Texas",
    shortLabel: "Roles",
    eyebrow: "Comparativo ejecutivo",
    title: "Dos estados, dos roles.",
    summary:
      "Florida concentra la validación comercial inicial. Texas conserva el rol de escala productiva y expansión B2B para la segunda etapa.",
  },
  {
    id: "florida",
    number: "11",
    label: "Oportunidad Florida",
    shortLabel: "Florida",
    eyebrow: "Entrada prioritaria",
    title: "Florida es el foco.",
    summary:
      "Turfgrass, landscaping, campos de golf, urbanizaciones, condominios y mantenimiento de zonas verdes crean un mercado visible para soluciones de comodidad.",
  },
  {
    id: "mapa-florida",
    number: "12",
    label: "Mapa de oportunidad",
    shortLabel: "Mapa FL",
    eyebrow: "Compradores potenciales",
    title: "Clusters de entrada en Florida.",
    summary:
      "El mapa muestra clusters posibles para UMO: universidades con mantenimiento de campus, campos de golf, parques, resorts, condominios y zonas residenciales.",
  },
  {
    id: "texas",
    number: "13",
    label: "Oportunidad Texas",
    shortLabel: "Texas",
    eyebrow: "Segunda etapa estratégica",
    title: "Texas escala el B2B.",
    summary:
      "Texas no se descarta. Su escala rural y productiva exige más preparación comercial, pero puede multiplicar el alcance B2B después del piloto.",
  },
  {
    id: "decision",
    number: "14",
    label: "Decisión recomendada",
    shortLabel: "Decisión",
    eyebrow: "Secuencia recomendada",
    title: "Validar en Florida. Escalar en Texas.",
    summary:
      "La recomendación final es secuencial: Florida para aprender rápido con canales digitales y alianzas locales; Texas para llevar el producto a distribuidores agrícolas y maquinaria pesada.",
    variant: "decision",
  },
  {
    id: "entrada",
    number: "15",
    label: "Modo de entrada",
    shortLabel: "Entrada",
    eyebrow: "Estrategia de internacionalización",
    title: "Exportación directa + alianzas.",
    summary:
      "El modelo reduce riesgo inicial, conserva control productivo y permite validar demanda antes de pensar en una sede propia o una estructura fija en el mercado.",
  },
  {
    id: "producto",
    number: "16",
    label: "Producto y propuesta",
    shortLabel: "Producto",
    eyebrow: "Adaptación y valor",
    title: "Menos fatiga. Más durabilidad.",
    summary:
      "UMO debe presentarse como una solución de comodidad para operadores que pasan horas en podadoras, tractores pequeños, vehículos utilitarios y maquinaria agrícola.",
  },
  {
    id: "marketing",
    number: "17",
    label: "Plan de marketing",
    shortLabel: "Marketing",
    eyebrow: "Thermo Seats by UMO",
    title: "Adaptar para vender.",
    summary:
      "El plan cambia el foco de vender cojines genericos a lanzar una linea compatible, tecnica y preparada para maquinaria de landscaping en Florida.",
  },
  {
    id: "marketing-ecosistema",
    number: "18",
    label: "Ecosistema Florida",
    shortLabel: "Ecosistema",
    eyebrow: "Demanda recurrente",
    title: "Florida convierte desgaste en demanda.",
    summary:
      "El clima, el uso exterior y el tamano del sector de turfgrass hacen que los asientos resistentes no sean un lujo, sino una necesidad operativa.",
  },
  {
    id: "marketing-segmentacion",
    number: "19",
    label: "Segmentacion",
    shortLabel: "Segmento",
    eyebrow: "Comprador objetivo",
    title: "El comprador exige compatibilidad.",
    summary:
      "El cliente B2B compara rapido, busca referencias por modelo y espera soporte tecnico antes de comprar repuestos para maquinaria comercial.",
  },
  {
    id: "marketing-operacion",
    number: "20",
    label: "Plaza y precio",
    shortLabel: "Plaza/precio",
    eyebrow: "Entrada operativa",
    title: "Exportar, cumplir y competir.",
    summary:
      "Exportacion directa desde Colombia, fulfillment localizado y precio digital competitivo reducen riesgo sin abrir estructura propia desde el inicio.",
  },
  {
    id: "marketing-canales",
    number: "21",
    label: "Canales y promocion",
    shortLabel: "Canales",
    eyebrow: "Captura de demanda",
    title: "La web debe cerrar la venta.",
    summary:
      "Amazon, landing regional, distribuidores online, SEO/SEM y contacto B2B deben conectarse con una herramienta de compatibilidad clara.",
  },
  {
    id: "riesgos",
    number: "22",
    label: "Riesgos y control",
    shortLabel: "Riesgos",
    eyebrow: "Gestión ejecutiva",
    title: "Cada riesgo debe tener una prueba.",
    summary:
      "La entrada debe medir compatibilidad, devoluciones, costo logístico, resistencia climática, leads B2B, reseñas y margen por canal antes de escalar.",
  },
  {
    id: "ruta",
    number: "23",
    label: "Ruta de acción",
    shortLabel: "Ruta",
    eyebrow: "Cierre ejecutivo",
    title: "Aprender, probar y escalar.",
    summary:
      "Florida es el laboratorio comercial. Texas es la plataforma de volumen cuando el producto, el precio, el canal y la operación ya estén validados.",
    variant: "final",
  },
];

const benchmarkGroups: BenchmarkGroup[] = [
  {
    id: "ecommerce-landscaping",
    title: "E-commerce en landscaping",
    unit: "% adopción digital",
    scaleMax: 20,
    note: "Valida Amazon, landing page, marketplace y venta directa como canales de prueba.",
    bars: [
      { label: "Texas", value: 17.8, display: "17.8%", tone: "texas" },
      { label: "Florida", value: 17.5, display: "17.5%", tone: "florida" },
      { label: "EE. UU.", value: 16.4, display: "16.4%", tone: "usa" },
    ],
  },
  {
    id: "temporada-clima",
    title: "Temporada favorable",
    unit: "temperatura media",
    scaleMax: 80,
    note: "Más uso exterior durante el año aumenta la recurrencia de mantenimiento y desgaste.",
    bars: [
      { label: "Florida", value: 72.3, display: "72.3 F", tone: "florida" },
      { label: "Texas", value: 67.7, display: "67.7 F", tone: "texas" },
      { label: "EE. UU.", value: 54.6, display: "54.6 F", tone: "usa" },
    ],
  },
  {
    id: "desgaste-ambiental",
    title: "Desgaste ambiental",
    unit: "índice 1-5",
    scaleMax: 5,
    note: "Calor, humedad, polvo y exposición exterior hacen más relevante la promesa de durabilidad.",
    bars: [
      { label: "Texas", value: 4.7, display: "4.7/5", tone: "texas" },
      { label: "Florida", value: 4.5, display: "4.5/5", tone: "florida" },
      { label: "EE. UU.", value: 3.6, display: "3.6/5", tone: "usa" },
    ],
  },
  {
    id: "dinamismo-pyme",
    title: "Dinamismo pyme",
    unit: "% negocios jovenes",
    scaleMax: 30,
    note: "Mayor dinamismo facilita pilotos B2B, distribuidores pequenos y alianzas comerciales.",
    bars: [
      { label: "Texas", value: 27.67, display: "27.67%", tone: "texas" },
      { label: "Florida", value: 22.39, display: "22.39%", tone: "florida" },
      { label: "EE. UU.", value: 19.34, display: "19.34%", tone: "usa" },
    ],
  },
  {
    id: "golf-florida",
    title: "Campos de golf",
    unit: "instalaciones 2026",
    scaleMax: 1300,
    note: "Florida lidera el país en oferta golfística; es un argumento directo para mantenimiento de césped, flotas y comodidad del operador.",
    bars: [
      { label: "Florida", value: 1290, display: "1,290", tone: "florida" },
      { label: "California", value: 963, display: "963", tone: "california" },
      { label: "New York", value: 830, display: "830", tone: "newyork" },
      { label: "Texas", value: 825, display: "825", tone: "texas" },
    ],
  },
];

const trendCharts: TrendChartConfig[] = [
  {
    id: "turfgrass",
    indicatorId: "turfgrass",
    title: "Turfgrass 2021-2025",
    unit: "USD B",
    focus: "Florida lidera",
    note: "Muestra por qué Florida es el foco: césped profesional, golf, landscaping y mantenimiento continuo.",
  },
  {
    id: "agricultura",
    indicatorId: "agricultura",
    title: "Agricultura 2021-2025",
    unit: "USD B",
    focus: "Texas escala",
    note: "Texas explica la segunda etapa por volumen agrícola, ranchos y maquinaria pesada.",
  },
  {
    id: "desempleo",
    indicatorId: "desempleo",
    title: "Estabilidad laboral",
    unit: "%",
    focus: "Florida más estable",
    note: "Una menor tasa de desempleo favorece consumo recurrente, servicios y mantenimiento.",
  },
  {
    id: "ingreso",
    indicatorId: "ingreso",
    title: "Poder adquisitivo",
    unit: "USD",
    focus: "Ambos fuertes",
    note: "Ambos estados pueden absorber una propuesta de mayor valor si se comunica durabilidad y ergonomía.",
  },
];

const scorecardRows: ScorecardRow[] = [
  {
    criterion: "Validación rápida B2C/B2B",
    florida: 5,
    texas: 3.6,
    floridaText: "Amazon, landing, landscaping, golf y distribuidores de jardín.",
    texasText: "Más fuerte cuando ya exista prueba de producto y soporte.",
  },
  {
    criterion: "Landscaping y turfgrass",
    florida: 5,
    texas: 4.2,
    floridaText: "Identidad clara en césped, zonas verdes, comunidades y turismo.",
    texasText: "También atractivo, pero menos concentrado para la entrada inicial.",
  },
  {
    criterion: "Agricultura y maquinaria pesada",
    florida: 2.7,
    texas: 5,
    floridaText: "Util para nichos, pero no lidera escala rural.",
    texasText: "Ranchos, tractores, ganadería, talleres y dealers agrícolas.",
  },
  {
    criterion: "Friccion logistica inicial",
    florida: 4.8,
    texas: 3.7,
    floridaText: "Mejor lectura como puerta de entrada desde Colombia.",
    texasText: "Cobertura fuerte, pero más conveniente tras validar operaciones.",
  },
  {
    criterion: "Potencial de escala posterior",
    florida: 4.2,
    texas: 5,
    floridaText: "Escala en canales verdes y segmentos premium.",
    texasText: "Escala en volumen, distribuidores y B2B técnico.",
  },
];

const floridaCards: InsightCard[] = [
  {
    title: "Mercado visible",
    text: "Empresas de landscaping, urbanizaciones, condominios, campos de golf y propietarios con jardínes grandes usan maquinaria de césped con alta frecuencia.",
    meta: "Turfgrass + mantenimiento",
    icon: Sprout,
  },
  {
    title: "Canal dual",
    text: "Florida permite combinar B2C medible en Amazon y ecommerce con B2B local en distribuidores, empresas de mantenimiento y golf.",
    meta: "B2C + B2B",
    icon: ShoppingCart,
  },
  {
    title: "Prueba de producto",
    text: "El calor y la humedad obligan a probar materiales, ventilacion, instalación y vida util desde la primera fase.",
    meta: "Validación real",
    icon: ShieldCheck,
  },
];

const texasCards: InsightCard[] = [
  {
    title: "Escala agro",
    text: "La agricultura, ganadería, ranchos y grandes extensiones sostienen una demanda natural por tractores, maquinaria pesada y repuestos.",
    meta: "Agro + ranchos",
    icon: Tractor,
  },
  {
    title: "Venta técnica",
    text: "La entrada exige dealers agrícolas, talleres rurales, pruebas de compatibilidad y argumentos de resistencia más robustos.",
    meta: "B2B especializado",
    icon: BriefcaseBusiness,
  },
  {
    title: "Evidencia",
    text: "Con reseñas, datos de devolución, margen y soporte validados en Florida, Texas se negocia con mas credibilidad.",
    meta: "Fase de escala",
    icon: LineChart,
  },
];

const entryCards: InsightCard[] = [
  {
    title: "Exportar desde Colombia",
    text: "UMO mantiene control de produccion, calidad, costos y aprendizaje sin abrir una sede fija antes de validar demanda.",
    meta: "Menor riesgo",
    icon: PackageCheck,
  },
  {
    title: "Alianzas en Florida",
    text: "Distribuidores de outdoor power equipment, empresas de landscaping, tiendas de maquinaria y campos de golf aceleran confianza local.",
    meta: "Entrada local",
    icon: Handshake,
  },
  {
    title: "Texas despues",
    text: "El segundo movimiento aprovecha dealers agrícolas, repuestos, talleres rurales y clientes de mayor volumen.",
    meta: "Escala B2B",
    icon: Route,
  },
];

const productCards: InsightCard[] = [
  {
    title: "Materiales",
    text: "Resistencia a calor, humedad, radiación, lluvia, polvo y vibración según el estado y el tipo de maquinaria.",
    meta: "Durabilidad exterior",
    icon: ShieldCheck,
  },
  {
    title: "Compatibilidad",
    text: "Fichas técnicas, medidas, guías de instalación y fotografías por modelo reducen devoluciones y preguntas repetidas.",
    meta: "Menos fricción",
    icon: FileText,
  },
  {
    title: "Promesa comercial",
    text: "No vender un accesorio generico: vender comodidad, soporte lumbar, vida util y mejor relacion valor-precio.",
    meta: "Thermo Seats by UMO",
    icon: Target,
  },
];

const channelCards: InsightCard[] = [
  {
    title: "B2C medible",
    text: "Amazon, marketplace, ecommerce y landing de Florida miden búsquedas, conversión, reseñas y precio.",
    meta: "Demanda digital",
    icon: MonitorSmartphone,
  },
  {
    title: "B2B local",
    text: "Landscaping, distribuidores, golf y tiendas especializadas convierten la validación en volumen.",
    meta: "Ventas consultivas",
    icon: UsersRound,
  },
  {
    title: "Prueba técnica",
    text: "Comparativos, instalación, videos y pruebas de desgaste responden dudas antes del contacto.",
    meta: "Confianza",
    icon: Video,
  },
];

const marketingProductCards: InsightCard[] = [
  {
    title: "Producto modificado",
    text: "Mantener calidad industrial colombiana, pero adaptar dimensiones, materiales, catalogos digitales y referencias por modelo.",
    meta: "Estrategia de modificacion",
    icon: PackageCheck,
  },
  {
    title: "Thermo Seats by UMO",
    text: "Posicionar la linea como asiento ergonomico y termico para operadores de maquinaria que trabajan jornadas largas al exterior.",
    meta: "Linea internacional",
    icon: ShieldCheck,
  },
  {
    title: "Compatibilidad exacta",
    text: "Priorizar tractores pequenos, podadoras comerciales y equipos dominantes en landscaping para reducir devoluciones.",
    meta: "Menos friccion",
    icon: FileText,
  },
];

const marketingEcosystemCards: InsightCard[] = [
  {
    title: "USD 44.1B",
    text: "El sector turfgrass y landscaping en Florida sostiene demanda recurrente para repuestos de uso exterior.",
    meta: "Mercado sectorial",
    icon: Sprout,
  },
  {
    title: "2.10% inflacion",
    text: "Un entorno de precios mas predecible ayuda a planear inventario, margen y presupuesto de adquisicion B2B.",
    meta: "Q1 2026",
    icon: LineChart,
  },
  {
    title: "#4 fiscal",
    text: "El atractivo tributario refuerza a Florida como plataforma de entrada frente a estados mas costosos.",
    meta: "Tax competitiveness",
    icon: Landmark,
  },
  {
    title: "UV + humedad",
    text: "Radiacion, humedad extrema y polvo aceleran desgaste; UMO debe vender resistencia como argumento central.",
    meta: "Necesidad tecnica",
    icon: ShieldCheck,
  },
];

const marketingSegmentCards: InsightCard[] = [
  {
    title: "Duenos de landscaping",
    text: "Buscan disponibilidad, compatibilidad rapida, durabilidad y menor tiempo muerto de la maquinaria comercial.",
    meta: "Buyer B2B 01",
    icon: UsersRound,
  },
  {
    title: "Compras B2B",
    text: "Gerentes de mantenimiento y procurement comparan especificaciones, precio, soporte y condiciones de entrega.",
    meta: "Buyer B2B 02",
    icon: BriefcaseBusiness,
  },
  {
    title: "93.0% urbano",
    text: "La alta urbanizacion concentra comunidades planeadas, propiedades comerciales, campus y clubes con zonas verdes.",
    meta: "Florida 2025",
    icon: Building2,
  },
];

const marketingOperationCards: InsightCard[] = [
  {
    title: "Exportacion directa",
    text: "UMO conserva control de calidad y evita costos fijos altos de una sede propia durante la validacion.",
    meta: "Modo de entrada",
    icon: Truck,
  },
  {
    title: "6 dias maritimos",
    text: "La ruta Colombia-Florida permite ciclos cortos de reposicion, menor inventario y mejor flujo de caja.",
    meta: "Logistica",
    icon: Route,
  },
  {
    title: "USD 100K nexus",
    text: "Planear cumplimiento fiscal desde temprano evita fricciones cuando las ventas digitales empiecen a escalar.",
    meta: "Florida economic nexus",
    icon: CircleDollarSign,
  },
];

const marketingChannelPlan = [
  {
    label: "Amazon USA",
    text: "Prueba B2C medible con busquedas, conversion, reviews, preguntas y sensibilidad de precio.",
  },
  {
    label: "Landing Florida",
    text: "Pagina regional con compatibilidad por modelo, fichas tecnicas, soporte y formulario B2B.",
  },
  {
    label: "Distribuidores online",
    text: "Alianzas con ecommerce industrial y plataformas de repuestos para ampliar alcance sin estructura propia.",
  },
  {
    label: "SEO/SEM",
    text: "Capturar busquedas de alta intencion como replacement seats y parts for commercial lawn mowers Florida.",
  },
  {
    label: "Email B2B",
    text: "Prospeccion a directores de mantenimiento, campos de golf, clubes privados y empresas de landscaping.",
  },
];

const riskControls = [
  {
    risk: "Compatibilidad limitada",
    control: "Matriz por modelos de podadora, tractor pequeno y vehiculo utilitario antes de publicar.",
  },
  {
    risk: "Devoluciones por instalación",
    control: "Guia visual, video corto, empaque claro y soporte de primer contacto.",
  },
  {
    risk: "Desgaste por clima",
    control: "Pruebas de calor, humedad, rayos UV y limpieza en condiciones de Florida.",
  },
  {
    risk: "Ciclo B2B largo en Texas",
    control: "Entrar con evidencia de Florida: ventas, reseñas, margen, reclamos y fichas técnicas.",
  },
];

const roadmap = [
  {
    phase: "0",
    timing: "0-2 meses",
    title: "Preparación",
    text: "Compatibilidades, muestras, fichas técnicas, empaque, landing en inglés y política de soporte.",
  },
  {
    phase: "1",
    timing: "3-6 meses",
    title: "Piloto Florida",
    text: "Amazon, ecommerce, empresas de landscaping, tiendas de jardín y primeros contactos con golf.",
  },
  {
    phase: "2",
    timing: "7-12 meses",
    title: "Validación",
    text: "Medir margen, devoluciones, reseñas, leads B2B, costo logístico y ajustes de producto.",
  },
  {
    phase: "3",
    timing: "12-18 meses",
    title: "Escala Texas",
    text: "Activar distribuidores agrícolas, talleres rurales y pilotos con maquinaria pesada.",
  },
];

const fiscalCards = [
  {
    state: "Florida",
    rank: "#5",
    tone: "florida",
    lines: ["Sin impuesto estatal personal", "Corporate income tax 5.5%", "Sales tax base 6.00%", "Sunbiz permite filing online de LLC"],
    reading: "Mejor encaje para iniciar con menor fricción fiscal, cercania logistica y canales de prueba.",
  },
  {
    state: "Texas",
    rank: "#7",
    tone: "texas",
    lines: [
      "Sin impuesto estatal personal",
      "Sin corporate income tax tradicional",
      "Franchise tax segun condiciones",
      "Sales tax base 6.25%",
      "SOSDirect y servicios expedited",
    ],
    reading: "Muy competitivo para expandir cuando UMO tenga evidencia comercial y pueda negociar B2B.",
  },
  {
    state: "California",
    rank: "#48",
    tone: "other",
    lines: ["Mayor presión tributaria", "Costos operativos altos", "Entorno más pesado para una prueba inicial"],
    reading: "Sirve como contraste: gran mercado, pero menos eficiente para validar con bajo riesgo.",
  },
  {
    state: "New York",
    rank: "#50",
    tone: "other",
    lines: ["Ranking fiscal inferior", "Costos y cumplimiento mas exigentes", "Menor encaje con maquinaria verde como entrada"],
    reading: "No es el mejor punto de arranque para una propuesta que necesita velocidad y aprendizaje.",
  },
];

const sourceLinks = [
  { label: "Tax Foundation 2026", href: "https://taxfoundation.org/research/all/state/2026-state-tax-competitiveness-index/" },
  { label: "Florida DOR", href: "https://floridarevenue.com/taxes/taxesfees/Pages/tax_interest_rates.aspx" },
  { label: "Florida Sunbiz", href: "https://dos.fl.gov/sunbiz/forms/limited-liability-company/" },
  { label: "Texas Comptroller", href: "https://comptroller.texas.gov/taxes/franchise/" },
  { label: "Texas SOS", href: "https://www.sos.state.tx.us/corp/options.shtml" },
  { label: "National Golf Foundation", href: "https://www.ngf.org/short-game/states-of-public-golf/" },
  { label: "Mapa base Florida", href: "https://commons.wikimedia.org/wiki/File:USA_Florida_location_map.svg" },
];

const diagnosticShortMetrics = [
  { label: "Dirección", value: 100, tone: "strong" },
  { label: "Alianzas", value: 100, tone: "strong" },
  { label: "Exportación", value: 70, tone: "mid" },
  { label: "Producto", value: 61, tone: "mid" },
  { label: "Potencial intl.", value: 44, tone: "mid" },
  { label: "Modo entrada", value: 33, tone: "risk" },
];

const nationalBenchmarkGroups = benchmarkGroups.filter((group) =>
  ["ecommerce-landscaping", "temporada-clima", "desgaste-ambiental", "dinamismo-pyme"].includes(group.id),
);

function getLatestSeriesPoint(indicatorId: string) {
  const indicator = macroIndicators.find((item) => item.id === indicatorId);
  const series = indicator?.series ?? [];
  return series[series.length - 1];
}

function getDiagnosticAverage() {
  const values = diagnosticMetrics.map((item) => item.value);
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round(total / Math.max(values.length, 1));
}

function goToElement(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DeckChrome({
  slides,
  activeIndex,
  onGo,
}: {
  slides: DeckSlide[];
  activeIndex: number;
  onGo: (index: number) => void;
}) {
  const activeSlide = slides[activeIndex] ?? slides[0];
  const progress = ((activeIndex + 1) / slides.length) * 100;

  return (
    <>
      <aside className="presentation-side-rail" aria-label="Índice de la presentación">
        <div className="presentation-rail-track" aria-hidden="true">
          <span style={{ height: `${progress}%` }} />
        </div>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`presentation-rail-item${index === activeIndex ? " is-active" : ""}`}
            onClick={() => onGo(index)}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            <span>{slide.number}</span>
            <strong>{slide.shortLabel}</strong>
          </button>
        ))}
      </aside>

      <div className="presentation-deck-status" aria-live="polite">
        <span>
          {activeSlide.number} / {slides.length.toString().padStart(2, "0")}
        </span>
        <strong>{activeSlide.label}</strong>
        <i aria-hidden="true">
          <b style={{ width: `${progress}%` }} />
        </i>
      </div>

      <div className="presentation-deck-controls" aria-label="Controles de diapositivas">
        <button type="button" onClick={() => onGo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Diapositiva anterior">
          <ChevronUp size={18} />
        </button>
        <button
          type="button"
          onClick={() => onGo(activeIndex + 1)}
          disabled={activeIndex === slides.length - 1}
          aria-label="Diapositiva siguiente"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </>
  );
}

function PresentationSlide({
  slide,
  children,
  refSetter,
}: {
  slide: DeckSlide;
  children: ReactNode;
  refSetter?: (node: HTMLElement | null) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={slide.id}
      ref={refSetter}
      className={`presentation-slide${slide.variant ? ` is-${slide.variant}` : ""}`}
      data-presentation-slide
      initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.28, once: false }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="presentation-slide-shell">
        <div className="presentation-slide-copy">
          <span className="presentation-slide-index">
            {slide.number} / {slide.eyebrow}
          </span>
          <h2>{slide.title}</h2>
          {slide.summary ? <p>{slide.summary}</p> : null}
        </div>
        <div className="presentation-slide-body">{children}</div>
      </div>
    </motion.section>
  );
}

function InsightPanel({ card, accent }: { card: InsightCard; accent?: "florida" | "texas" }) {
  const Icon = card.icon;

  return (
    <article className={`presentation-panel${accent ? ` is-${accent}` : ""}`}>
      <div className="presentation-panel-head">
        <Icon size={20} />
        {card.meta ? <span>{card.meta}</span> : null}
      </div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
    </article>
  );
}

function MetricRibbon({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
    text: string;
  }>;
}) {
  return (
    <div className="presentation-metric-ribbon">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function BenchmarkChart({
  group,
  onExpand,
  expanded = false,
}: {
  group: BenchmarkGroup;
  onExpand?: () => void;
  expanded?: boolean;
}) {
  return (
    <article className={`presentation-benchmark-card${expanded ? " is-expanded" : ""}`}>
      <div className="presentation-benchmark-head">
        <span>{group.unit}</span>
        {onExpand ? (
          <button type="button" onClick={onExpand} aria-label={`Ampliar gráfico ${group.title}`}>
            <Maximize2 size={15} />
          </button>
        ) : null}
        <h3>{group.title}</h3>
      </div>
      <div className="presentation-benchmark-bars">
        {group.bars.map((bar) => {
          const width = Math.min(100, (bar.value / group.scaleMax) * 100);
          return (
            <div key={`${group.title}-${bar.label}`} className={`presentation-benchmark-row is-${bar.tone}`}>
              <div>
                <strong>{bar.label}</strong>
                <em>{bar.display}</em>
              </div>
              <span aria-hidden="true">
                <i style={{ width: `${width}%` }} />
              </span>
            </div>
          );
        })}
      </div>
      <p>{group.note}</p>
    </article>
  );
}

function NationalComparisonChart({
  onExpand,
  expanded = false,
}: {
  onExpand?: () => void;
  expanded?: boolean;
}) {
  return (
    <article className={`presentation-national-card${expanded ? " is-expanded" : ""}`}>
      <div className="presentation-benchmark-head">
        <span>Florida + Texas vs EE. UU.</span>
        {onExpand ? (
          <button type="button" onClick={onExpand} aria-label="Ampliar comparación con promedio nacional">
            <Maximize2 size={15} />
          </button>
        ) : null}
        <h3>{expanded ? "Comparación contra EE. UU." : "Ambos estados superan el promedio nacional"}</h3>
      </div>
      <div className="presentation-national-grid">
        {nationalBenchmarkGroups.map((group) => (
          <div key={group.id} className="presentation-national-metric">
            <strong>{group.title}</strong>
            {group.bars.map((bar) => {
              const width = Math.min(100, (bar.value / group.scaleMax) * 100);
              return (
                <div key={`${group.id}-${bar.label}`} className={`presentation-national-row is-${bar.tone}`}>
                  <span>{bar.label}</span>
                  <i aria-hidden="true">
                    <b style={{ width: `${width}%` }} />
                  </i>
                  <em>{bar.display}</em>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p>
        Esta comparación responde la pregunta clave: Florida y Texas no solo son viables, sino que están por encima del
        promedio nacional en señales comerciales y de uso exterior relevantes para UMO.
      </p>
    </article>
  );
}

function TrendChart({
  config,
  onExpand,
  expanded = false,
}: {
  config: TrendChartConfig;
  onExpand?: () => void;
  expanded?: boolean;
}) {
  const indicator = macroIndicators.find((item) => item.id === config.indicatorId);
  const series = indicator?.series ?? [];
  const width = expanded ? 760 : 430;
  const height = expanded ? 420 : 210;
  const padding = expanded ? 66 : 34;
  const values = series.flatMap((point) => [point.florida, point.texas, point.national].filter((value): value is number => typeof value === "number"));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const x = (index: number) => padding + (index * (width - padding * 2)) / Math.max(series.length - 1, 1);
  const y = (value: number) => height - padding - ((value - min) / range) * (height - padding * 2);

  const pathFor = (key: "florida" | "texas" | "national") =>
    series
      .filter((point) => typeof point[key] === "number")
      .map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point[key] as number)}`)
      .join(" ");

  const latest = series[series.length - 1];

  return (
    <article className={`presentation-trend-card${expanded ? " is-expanded" : ""}`}>
      <div className="presentation-trend-head">
        <span>{config.focus}</span>
        {onExpand ? (
          <button type="button" onClick={onExpand} aria-label={`Ampliar gráfico ${config.title}`}>
            <Maximize2 size={15} />
          </button>
        ) : null}
        <h3>{config.title}</h3>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={config.title}>
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1={padding}
            x2={width - padding}
            y1={padding + line * ((height - padding * 2) / 2)}
            y2={padding + line * ((height - padding * 2) / 2)}
            className="presentation-trend-grid-line"
          />
        ))}
        <path className="presentation-trend-line is-florida" d={pathFor("florida")} />
        <path className="presentation-trend-line is-texas" d={pathFor("texas")} />
        {series.some((point) => typeof point.national === "number") ? (
          <path className="presentation-trend-line is-national" d={pathFor("national")} />
        ) : null}
        {series.map((point, index) => (
          <g key={`${config.id}-${point.year}`}>
            <circle className="presentation-trend-dot is-florida" cx={x(index)} cy={y(point.florida)} r={expanded ? 5 : 4} />
            <circle className="presentation-trend-dot is-texas" cx={x(index)} cy={y(point.texas)} r={expanded ? 5 : 4} />
            <text x={x(index)} y={height - 10} textAnchor="middle">
              {point.year}
            </text>
          </g>
        ))}
      </svg>
      <div className="presentation-trend-legend">
        <span className="is-florida">Florida {latest ? formatChartValue(latest.florida, config.unit) : ""}</span>
        <span className="is-texas">Texas {latest ? formatChartValue(latest.texas, config.unit) : ""}</span>
        {latest?.national ? <span className="is-national">EE. UU. {formatChartValue(latest.national, config.unit)}</span> : null}
      </div>
      <p>{config.note}</p>
    </article>
  );
}

function formatChartValue(value: number, unit: string) {
  if (unit === "USD") return `USD ${Math.round(value).toLocaleString("en-US")}`;
  if (unit === "%") return `${value.toFixed(1)}%`;
  return `${value.toFixed(1)} ${unit}`;
}

function StateScorecard({ rows }: { rows: ScorecardRow[] }) {
  return (
    <div className="presentation-scorecard">
      {rows.map((row) => (
        <article key={row.criterion}>
          <h3>{row.criterion}</h3>
          <div className="presentation-score-row is-florida">
            <div>
              <strong>Florida</strong>
              <em>{row.florida.toFixed(1)}/5</em>
            </div>
            <span aria-hidden="true">
              <i style={{ width: `${(row.florida / 5) * 100}%` }} />
            </span>
            <p>{row.floridaText}</p>
          </div>
          <div className="presentation-score-row is-texas">
            <div>
              <strong>Texas</strong>
              <em>{row.texas.toFixed(1)}/5</em>
            </div>
            <span aria-hidden="true">
              <i style={{ width: `${(row.texas / 5) * 100}%` }} />
            </span>
            <p>{row.texasText}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function StrategyFlow() {
  const steps = [
    { label: "Colombia", title: "Produccion UMO", text: "Calidad, costos y aprendizaje bajo control.", icon: Factory },
    { label: "Florida", title: "Piloto comercial", text: "Landscaping, golf, Amazon y distribuidores.", icon: Sprout },
    { label: "Texas", title: "Escala B2B", text: "Agro, ranchos, dealers y maquinaria pesada.", icon: Tractor },
  ];

  return (
    <div className="presentation-strategy-flow">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <article key={step.label}>
            <span>{step.label}</span>
            <Icon size={22} />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {index < steps.length - 1 ? <ArrowUpRight className="presentation-flow-arrow" size={22} /> : null}
          </article>
        );
      })}
    </div>
  );
}

const floridaOpportunityPins = [
  {
    name: "Miami / Fort Lauderdale",
    label: "condominios, golf, residencias premium y jardinería profesional",
    x: 78,
    y: 84,
    type: "Golf + residencias",
  },
  {
    name: "Orlando",
    label: "resorts, parques, golf, turismo y mantenimiento de zonas verdes",
    x: 66,
    y: 56,
    type: "Parques + turismo",
  },
  {
    name: "Tampa Bay",
    label: "distribuidores, suburbios, landscaping y maquinaria de jardín",
    x: 58,
    y: 66,
    type: "Distribución",
  },
  {
    name: "Gainesville / UF",
    label: "campus, zonas verdes y flotas de mantenimiento universitario",
    x: 55,
    y: 43,
    type: "Universidad",
  },
  {
    name: "Tallahassee / FSU",
    label: "campus, operación pública y zonas verdes institucionales",
    x: 22,
    y: 33,
    type: "Universidad",
  },
  {
    name: "Jacksonville",
    label: "logística, parques, contratistas y compradores institucionales",
    x: 66,
    y: 36,
    type: "Logística",
  },
];

type FloridaOpportunityDot = {
  x: number;
  y: number;
  kind: "golf" | "campus" | "park" | "residential" | "dealer";
  scale?: number;
};

const floridaOpportunityDots: FloridaOpportunityDot[] = [
  { x: 19, y: 32, kind: "campus", scale: 1.2 },
  { x: 23, y: 34, kind: "campus" },
  { x: 27, y: 35, kind: "park" },
  { x: 31, y: 36, kind: "dealer", scale: 0.9 },
  { x: 36, y: 38, kind: "park", scale: 0.9 },
  { x: 42, y: 39, kind: "golf" },
  { x: 49, y: 41, kind: "campus", scale: 1.15 },
  { x: 54, y: 43, kind: "campus", scale: 1.25 },
  { x: 58, y: 45, kind: "golf" },
  { x: 61, y: 47, kind: "park" },
  { x: 64, y: 35, kind: "dealer", scale: 1.2 },
  { x: 67, y: 37, kind: "park" },
  { x: 69, y: 40, kind: "golf" },
  { x: 65, y: 42, kind: "residential" },
  { x: 61, y: 41, kind: "park" },
  { x: 56, y: 50, kind: "golf", scale: 0.95 },
  { x: 59, y: 52, kind: "park" },
  { x: 63, y: 51, kind: "campus" },
  { x: 64, y: 54, kind: "golf", scale: 1.15 },
  { x: 67, y: 56, kind: "park", scale: 1.25 },
  { x: 70, y: 58, kind: "residential" },
  { x: 62, y: 58, kind: "golf" },
  { x: 66, y: 60, kind: "park", scale: 0.9 },
  { x: 69, y: 62, kind: "residential" },
  { x: 73, y: 61, kind: "golf" },
  { x: 55, y: 61, kind: "dealer", scale: 1.15 },
  { x: 58, y: 63, kind: "residential" },
  { x: 61, y: 65, kind: "golf", scale: 1.1 },
  { x: 58, y: 68, kind: "park" },
  { x: 62, y: 70, kind: "residential" },
  { x: 65, y: 72, kind: "golf" },
  { x: 57, y: 72, kind: "park", scale: 0.95 },
  { x: 61, y: 74, kind: "residential" },
  { x: 64, y: 76, kind: "golf", scale: 1.15 },
  { x: 67, y: 78, kind: "park" },
  { x: 69, y: 81, kind: "residential" },
  { x: 66, y: 83, kind: "golf" },
  { x: 71, y: 84, kind: "park" },
  { x: 74, y: 50, kind: "golf", scale: 0.9 },
  { x: 76, y: 55, kind: "residential" },
  { x: 78, y: 60, kind: "park" },
  { x: 79, y: 65, kind: "golf" },
  { x: 78, y: 70, kind: "residential" },
  { x: 76, y: 74, kind: "golf" },
  { x: 78, y: 77, kind: "park" },
  { x: 79, y: 80, kind: "residential" },
  { x: 80, y: 83, kind: "golf", scale: 1.2 },
  { x: 78, y: 86, kind: "residential", scale: 1.2 },
  { x: 75, y: 88, kind: "park" },
  { x: 73, y: 90, kind: "golf", scale: 1.25 },
  { x: 81, y: 87, kind: "dealer", scale: 0.9 },
  { x: 72, y: 64, kind: "golf" },
  { x: 74, y: 67, kind: "park" },
  { x: 75, y: 70, kind: "residential" },
  { x: 70, y: 67, kind: "dealer" },
  { x: 68, y: 70, kind: "campus" },
  { x: 71, y: 73, kind: "golf" },
  { x: 69, y: 76, kind: "park" },
  { x: 72, y: 79, kind: "residential" },
  { x: 75, y: 82, kind: "golf" },
];

const floridaOpportunityZones = [
  { name: "Tallahassee", x: 24, y: 34, size: 18 },
  { name: "Jacksonville", x: 66, y: 38, size: 18 },
  { name: "Orlando", x: 67, y: 58, size: 24 },
  { name: "Tampa Bay", x: 59, y: 68, size: 23 },
  { name: "South Florida", x: 78, y: 82, size: 27 },
];

const floridaOpportunitySegments = [
  {
    label: "Golf + turfgrass",
    value: "1,290 campos",
    text: "Cesped profesional, flotas de mantenimiento y jornadas largas de operacion.",
    icon: Flag,
  },
  {
    label: "Campus",
    value: "UF, FSU, UCF, UM",
    text: "Universidades con zonas verdes, mantenimiento interno y compras institucionales.",
    icon: Landmark,
  },
  {
    label: "Parques y resorts",
    value: "Orlando + costa",
    text: "Turismo, parques, hoteles y operacion recurrente de paisajismo.",
    icon: Sprout,
  },
  {
    label: "Comunidades",
    value: "HOA + condominios",
    text: "Urbanizaciones y residencias premium con mantenimiento frecuente.",
    icon: Building2,
  },
  {
    label: "Canal local",
    value: "Dealers OPE",
    text: "Tiendas y distribuidores de maquinaria de jardin para validar venta B2B.",
    icon: Truck,
  },
];

function FloridaOpportunityMap({ onExpand, expanded = false }: { onExpand?: () => void; expanded?: boolean }) {
  return (
    <article className={`presentation-map-card${expanded ? " is-expanded" : ""}`}>
      <div className="presentation-map-head">
        <span>Florida / clusters de entrada</span>
        {onExpand ? (
          <button type="button" onClick={onExpand} aria-label="Ampliar mapa de Florida">
            <Maximize2 size={15} />
          </button>
        ) : null}
        <h3>{expanded ? "Densidad comercial en Florida" : "Mapa de demanda visible"}</h3>
      </div>
      <div className="presentation-florida-map is-image-map" aria-label="Mapa de Florida con alta concentración de zonas con necesidad de podadoras">
        <figure className="presentation-florida-map-image">
          <img
            src="/assets/content/florida-demand-map.png"
            alt="Florida: alta concentración de zonas con necesidad de podadoras, parques, universidades, canchas y áreas de turfgrass"
            loading="lazy"
          />
        </figure>
      </div>
      <p className="presentation-map-note">
        Lectura de prospección: el mapa sintetiza zonas con posible necesidad de podadoras, mantenimiento de césped y soluciones de comodidad para operación exterior.
      </p>
    </article>
  );
}

function MiniBarList({ items }: { items: Array<{ label: string; value: number; tone?: string }> }) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="presentation-mini-bar-list">
      {items.map((item) => (
        <div key={item.label} className={item.tone ? `is-${item.tone}` : undefined}>
          <strong>{item.label}</strong>
          <span>
            <i style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <em>{item.value}%</em>
        </div>
      ))}
    </div>
  );
}

function ExpandedVisualModal({
  visual,
  onClose,
}: {
  visual: ExpandedVisual | null;
  onClose: () => void;
}) {
  if (!visual) return null;

  const benchmark = visual.type === "benchmark" ? benchmarkGroups.find((group) => group.id === visual.id) : null;
  const trend = visual.type === "trend" ? trendCharts.find((chart) => chart.id === visual.id) : null;
  const title =
    visual.type === "map"
      ? "Mapa de oportunidad en Florida"
      : visual.type === "national"
        ? "Comparación con promedio nacional"
      : benchmark?.title ?? trend?.title ?? "Visualización ampliada";

  return (
    <motion.div
      className="presentation-visual-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="presentation-modal-backdrop" type="button" aria-label="Cerrar visualización" onClick={onClose} />
      <motion.div
        className="presentation-modal-panel"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <button className="presentation-modal-close" type="button" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>
        {benchmark ? <BenchmarkChart group={benchmark} expanded /> : null}
        {trend ? <TrendChart config={trend} expanded /> : null}
        {visual.type === "national" ? <NationalComparisonChart expanded /> : null}
        {visual.type === "map" ? <FloridaOpportunityMap expanded /> : null}
      </motion.div>
    </motion.div>
  );
}

function SourceNote() {
  return (
    <p className="presentation-source-note-v2">
      Fuentes de soporte:{" "}
      {sourceLinks.map((source, index) => (
        <span key={source.href}>
          <a href={source.href} target="_blank" rel="noreferrer">
            {source.label}
          </a>
          {index < sourceLinks.length - 1 ? " · " : ""}
        </span>
      ))}
    </p>
  );
}

function HeroRouteCanvas() {
  return (
    <div className="presentation-route-canvas" aria-hidden="true">
      <span className="presentation-route-grid" />
      <span className="presentation-route-line-v2" />
      <span className="presentation-route-line-v2 is-secondary" />
      <div className="presentation-route-node is-colombia">
        <small>Origen</small>
        <strong>Colombia</strong>
        <em>Manufactura y control de calidad</em>
      </div>
      <div className="presentation-route-node is-florida">
        <small>Entrada prioritaria</small>
        <strong>Florida</strong>
        <em>Turfgrass, golf y mantenimiento residencial</em>
      </div>
      <div className="presentation-route-node is-texas">
        <small>Escala posterior</small>
        <strong>Texas</strong>
        <em>Agro, ranchos y distribuidores B2B</em>
      </div>
    </div>
  );
}

export default function PresentationPage({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedVisual, setExpandedVisual] = useState<ExpandedVisual | null>(null);
  const slideRefs = useRef<Record<string, HTMLElement | null>>({});

  const turfgrass2025 = getLatestSeriesPoint("turfgrass");
  const agriculture2025 = getLatestSeriesPoint("agricultura");
  const income2025 = getLatestSeriesPoint("ingreso");
  const unemployment2025 = getLatestSeriesPoint("desempleo");

  const diagnosticAverage = useMemo(() => getDiagnosticAverage(), []);
  const strategicCanvasBlocks = useMemo(
    () => canvasBlocks.filter((block) => ["Propuesta de valor", "Segmentos", "Canales", "Socios clave"].includes(block.title.es)),
    [],
  );
  const slidesById = useMemo(() => Object.fromEntries(deckSlides.map((slide) => [slide.id, slide])) as Record<string, DeckSlide>, []);

  useEffect(() => {
    if (!expandedVisual) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedVisual(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedVisual]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSlide = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const anchor = window.innerWidth < 860 ? 118 : window.innerHeight * 0.34;
        const distances = deckSlides.map((slide, index) => {
          const node = document.getElementById(slide.id);
          if (!node) return { index, distance: Number.POSITIVE_INFINITY };
          return { index, distance: Math.abs(node.getBoundingClientRect().top - anchor) };
        });
        const closest = distances.sort((a, b) => a.distance - b.distance)[0];
        if (closest && Number.isFinite(closest.distance)) setActiveIndex(closest.index);
      });
    };

    updateActiveSlide();
    window.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a")) return;

      if (["ArrowDown", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToSlide(deckSlides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  function goToSlide(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), deckSlides.length - 1);
    const slide = deckSlides[nextIndex];
    const node = slideRefs.current[slide.id] ?? document.getElementById(slide.id);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="presentation-page presentation-deck-page" lang={locale === "es" ? "es" : "es"}>
      <DeckChrome slides={deckSlides} activeIndex={activeIndex} onGo={goToSlide} />

      <div className="presentation-deck-shell">
        <motion.section
          id="portada"
          ref={(node) => {
            slideRefs.current.portada = node;
          }}
          className="presentation-slide is-hero"
          data-presentation-slide
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="presentation-hero-stage">
            <HeroRouteCanvas />
            <div className="presentation-hero-copy-v2">
              <span>{deckSlides[0].eyebrow}</span>
              <h1>{deckSlides[0].title}</h1>
              <strong className="presentation-hero-thesis">Florida primero. Texas escala.</strong>
              <p>
                Estrategia de internacionalización para convertir la experiencia industrial de UMO en una entrada
                medible al mercado estadounidense de comodidad, maquinaria ligera y mantenimiento exterior.
              </p>
              <div className="presentation-hero-actions-v2">
                <button type="button" onClick={() => goToElement("decision")}>
                  Ver decisión <ArrowUpRight size={16} />
                </button>
                <button type="button" onClick={() => goToElement("benchmarks")}>
                  Ver benchmarks
                </button>
              </div>
            </div>

            <div className="presentation-hero-photo">
              <img src="/assets/content/florida-turf-hero.jpg" alt="Campo de golf y césped profesional en Florida" />
              <div>
                <span>Florida / turfgrass / landscaping</span>
                <strong>1,290 campos</strong>
                <p>La señal visual del mercado: césped, golf, comunidades, resorts y mantenimiento recurrente.</p>
              </div>
            </div>

            <div className="presentation-hero-proofline">
              <span>Entrada inicial / Florida</span>
              <span>Escala B2B / Texas</span>
              <span>Modelo / exportación directa + aliados locales</span>
            </div>
          </div>
        </motion.section>

        <PresentationSlide
          slide={slidesById.estadistica}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.estadistica = node;
          }}
        >
          <div className="presentation-stat-layout">
            <article className="presentation-stat-hero">
              <Flag size={28} />
              <span>Florida como foco</span>
              <strong>1,290</strong>
              <h3>campos de golf</h3>
              <p>
                Este dato convierte a Florida en una vitrina natural para validar comodidad, resistencia al clima y
                uso frecuente en maquinaria de césped.
              </p>
            </article>
            <div className="presentation-stat-bars">
              {benchmarkGroups
                .find((group) => group.id === "golf-florida")
                ?.bars.map((bar) => {
                  const width = Math.min(100, (bar.value / 1290) * 100);
                  return (
                    <div key={bar.label} className={`presentation-stat-row is-${bar.tone}`}>
                      <div>
                        <strong>{bar.label}</strong>
                        <em>{bar.display}</em>
                      </div>
                      <span aria-hidden="true">
                        <i style={{ width: `${width}%` }} />
                      </span>
                    </div>
                  );
                })}
              <p>Florida queda por encima de alternativas grandes como California, New York y Texas en este indicador.</p>
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.umo}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.umo = node;
          }}
        >
          <div className="presentation-company-story">
            <article className="presentation-company-lead">
              <Building2 size={24} />
              <span>{companyProfile.name}</span>
              <h3>{companyProfile.experience} años de experiencia industrial</h3>
              <p>
                UMO nace en Medellin y llega a esta decisión con trayectoria en manufactura, autopartes, sillines,
                cojines, bienestar y soluciones que pueden migrar hacia comodidad operativa en maquinaria.
              </p>
            </article>
            <div className="presentation-panel-grid">
              {[
                {
                  title: "Cojines y sillines",
                  text: "Base natural para hablar de soporte, ergonomía, ajuste y comodidad.",
                  meta: "Producto",
                  icon: BadgeCheck,
                },
                {
                  title: "Asientos y componentes",
                  text: "Aplicacion directa en podadoras, tractores pequeños y vehículos utilitarios.",
                  meta: "Aplicacion",
                  icon: Truck,
                },
                {
                  title: "Capacidad exportadora",
                  text: "La entrada debe aprovechar produccion colombiana, control de calidad y aprendizaje comercial.",
                  meta: "Operación",
                  icon: Globe2,
                },
              ].map((card) => (
                <InsightPanel key={card.title} card={card} />
              ))}
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.proceso}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.proceso = node;
          }}
        >
          <div className="presentation-process-layout">
            <div className="presentation-timeline is-wide">
              {deliveries.map((delivery) => (
                <article key={delivery.id}>
                  <span>{delivery.code}</span>
                  <h3>{delivery.title.es}</h3>
                  <p>{delivery.summary.es}</p>
                </article>
              ))}
            </div>
            <article className="presentation-process-summary">
              <Route size={24} />
              <span>Lectura ejecutiva</span>
              <strong>El análisis deja de ser académico cuando se convierte en secuencia de entrada.</strong>
              <p>Primero se valida dónde aprender más rápido; después se elige dónde escalar con más volumen.</p>
            </article>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.diagnostico}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.diagnostico = node;
          }}
        >
          <div className="presentation-diagnostic-layout">
            <article className="presentation-evidence-hero">
              <FileText size={22} />
              <span>Diagnóstico P-I</span>
              <strong>{diagnosticAverage}%</strong>
              <p>La preparación existe, pero el modo de entrada debe reducir riesgo y validar canales antes de escalar.</p>
            </article>
            <div className="presentation-diagnostic-bars">
              <span>Capacidades internas principales</span>
              <MiniBarList items={diagnosticShortMetrics} />
            </div>
            <div className="presentation-evidence-stack is-compact">
              <article>
                <Target size={20} />
                <span>Modelo de negocio</span>
                <p>{canvasHighlights[0]?.text.es ?? "La propuesta se organiza alrededor de valor, canales, aliados y segmentos."}</p>
              </article>
              <article>
                <ShieldCheck size={20} />
                <span>DOFA ejecutivo</span>
                <p>
                  {swotDetailedBlocks[0]?.items[0]?.es ??
                    "Experiencia industrial y capacidad de adaptar producto sostiene la entrada internacional."}
                </p>
              </article>
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.indicadores}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.indicadores = node;
          }}
        >
          <div className="presentation-visual-gallery is-decision">
            {trendCharts.map((chart) => (
              <TrendChart
                key={chart.id}
                config={chart}
                onExpand={() => setExpandedVisual({ type: "trend", id: chart.id })}
              />
            ))}
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById["vs-eeuu"]}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current["vs-eeuu"] = node;
          }}
        >
          <NationalComparisonChart onExpand={() => setExpandedVisual({ type: "national", id: "benchmarks" })} />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.benchmarks}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.benchmarks = node;
          }}
        >
          <div className="presentation-benchmark-grid-v2">
            {benchmarkGroups.map((group) => (
              <BenchmarkChart
                key={group.title}
                group={group}
                onExpand={() => setExpandedVisual({ type: "benchmark", id: group.id })}
              />
            ))}
          </div>
          <div className="presentation-benchmark-argument">
            <BarChart3 size={22} />
            <p>
              La comparación con el promedio nacional refuerza la selección: ambos estados muestran más uso potencial,
              mayor dinamismo comercial y condiciones ambientales que hacen más urgente la comodidad y durabilidad del
              producto.
            </p>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.fiscal}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.fiscal = node;
          }}
        >
          <div className="presentation-tax-grid-v2">
            {fiscalCards.map((card) => (
              <article key={card.state} className={`presentation-tax-card-v2 is-${card.tone}`}>
                <div>
                  <span>Tax Foundation 2026</span>
                  <strong>{card.rank}</strong>
                </div>
                <h3>{card.state}</h3>
                <ul>
                  {card.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p>{card.reading}</p>
              </article>
            ))}
          </div>
          <SourceNote />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.comparativo}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.comparativo = node;
          }}
        >
          <StateScorecard rows={scorecardRows} />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.florida}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.florida = node;
          }}
        >
          <div className="presentation-state-story is-florida">
            <div className="presentation-state-hero">
              <MapPinned size={26} />
              <span>Entrada prioritaria</span>
              <h3>Landscaping, turfgrass y mantenimiento de césped.</h3>
              <p>
                Florida conecta la propuesta de UMO con operadores que pasan varias horas en maquinaria pequeña y
                mediana: podadoras, tractores de jardín, vehículos utilitarios y equipos de mantenimiento.
              </p>
            </div>
            <div className="presentation-panel-grid">
              {floridaCards.map((card) => (
                <InsightPanel key={card.title} card={card} accent="florida" />
              ))}
            </div>
          </div>
          <MetricRibbon
            items={[
              {
                label: "Turfgrass 2025",
                value: `USD ${turfgrass2025?.florida.toFixed(1) ?? "44.1"}B`,
                text: "Mayor lectura de césped profesional frente a Texas.",
              },
              {
                label: "Ingreso 2025",
                value: `USD ${(income2025?.florida ?? 68300).toLocaleString("en-US")}`,
                text: "Capacidad para absorber una propuesta de mayor valor.",
              },
              {
                label: "Desempleo 2025",
                value: `${unemployment2025?.florida.toFixed(1) ?? "3.8"}%`,
                text: "Mercado laboral estable para servicios recurrentes.",
              },
            ]}
          />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById["mapa-florida"]}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current["mapa-florida"] = node;
          }}
        >
          <div className="presentation-map-slide-layout is-image-only">
            <FloridaOpportunityMap onExpand={() => setExpandedVisual({ type: "map", id: "florida" })} />
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.texas}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.texas = node;
          }}
        >
          <div className="presentation-state-story is-texas">
            <div className="presentation-state-hero">
              <Tractor size={26} />
              <span>Segunda etapa fuerte</span>
              <h3>Agricultura, ganadería, ranchos y maquinaria pesada.</h3>
              <p>
                Texas debe entrar cuando UMO pueda vender con evidencia: producto probado, fichas técnicas, soporte,
                precios validados y argumento B2B mas robusto para dealers agrícolas.
              </p>
            </div>
            <div className="presentation-panel-grid">
              {texasCards.map((card) => (
                <InsightPanel key={card.title} card={card} accent="texas" />
              ))}
            </div>
          </div>
          <MetricRibbon
            items={[
              {
                label: "Agricultura 2025",
                value: `USD ${agriculture2025?.texas.toFixed(1) ?? "38.2"}B`,
                text: "Escala productiva superior para maquinaria y repuestos.",
              },
              {
                label: "Ingreso 2025",
                value: `USD ${(income2025?.texas ?? 69100).toLocaleString("en-US")}`,
                text: "Base de compra fuerte para canales especializados.",
              },
              {
                label: "Rol estratégico",
                value: "Escala B2B",
                text: "Distribuidores agrícolas, ranchos, talleres y maquinaria pesada.",
              },
            ]}
          />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.decision}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.decision = node;
          }}
        >
          <div className="presentation-decision-layout">
            <article className="presentation-decision-primary">
              <CheckCircle2 size={24} />
              <span>Recomendacion principal</span>
              <h3>Florida como mercado inicial prioritario.</h3>
              <p>
                Florida permite validar la propuesta de UMO en un entorno donde convergen uso frecuente de maquinaria
                de césped, demanda de comodidad, canales digitales y alianzas locales con clientes visibles.
              </p>
            </article>
            <article className="presentation-decision-secondary">
              <Flag size={24} />
              <span>Lectura sobre Texas</span>
              <h3>Texas no se descarta: se reserva para escalar.</h3>
              <p>
                Su tamaño, cultura agrícola, base ganadera y red de distribuidores lo convierten en el siguiente paso
                cuando UMO ya tenga evidencia de producto, logistica, precio y soporte.
              </p>
            </article>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.entrada}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.entrada = node;
          }}
        >
          <StrategyFlow />
          <div className="presentation-panel-grid is-three">
            {entryCards.map((card) => (
              <InsightPanel key={card.title} card={card} />
            ))}
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.producto}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.producto = node;
          }}
        >
          <div className="presentation-panel-grid is-three">
            {productCards.map((card) => (
              <InsightPanel key={card.title} card={card} />
            ))}
          </div>
          <div className="presentation-canvas-strip">
            {strategicCanvasBlocks.map((block) => (
              <article key={block.title.es}>
                <span>{block.title.es}</span>
                <p>{block.text.es}</p>
              </article>
            ))}
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.marketing}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.marketing = node;
          }}
        >
          <div className="presentation-marketing-core">
            <article className="presentation-marketing-hero">
              <PackageCheck size={26} />
              <span>Producto internacional</span>
              <h3>Thermo Seats by UMO</h3>
              <p>
                Una linea de asientos y soluciones de comodidad para operadores de podadoras comerciales, tractores
                pequenos y maquinaria de mantenimiento de cesped en Florida.
              </p>
            </article>
            <div className="presentation-panel-grid is-three">
              {marketingProductCards.map((card) => (
                <InsightPanel key={card.title} card={card} />
              ))}
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById["marketing-ecosistema"]}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current["marketing-ecosistema"] = node;
          }}
        >
          <div className="presentation-marketing-proof-grid">
            {marketingEcosystemCards.map((card) => (
              <InsightPanel key={card.title} card={card} accent="florida" />
            ))}
          </div>
          <MetricRibbon
            items={[
              {
                label: "Lectura ejecutiva",
                value: "Recurrente",
                text: "El desgaste por uso exterior convierte la comodidad y durabilidad en compra de reposicion.",
              },
              {
                label: "Ventaja Florida",
                value: "Clima + golf",
                text: "Uso anual, campos de golf, comunidades y contratistas sostienen demanda mas visible.",
              },
              {
                label: "Implicacion UMO",
                value: "Resistencia",
                text: "Materiales, costuras, fichas y garantia deben hablar de calor, humedad y radiacion UV.",
              },
            ]}
          />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById["marketing-segmentacion"]}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current["marketing-segmentacion"] = node;
          }}
        >
          <div className="presentation-marketing-persona-grid">
            {marketingSegmentCards.map((card) => (
              <InsightPanel key={card.title} card={card} />
            ))}
          </div>
          <div className="presentation-compatibility-strip">
            {["Modelo de maquina", "Medidas exactas", "Referencia compatible", "Entrega y soporte"].map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </article>
            ))}
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById["marketing-operacion"]}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current["marketing-operacion"] = node;
          }}
        >
          <div className="presentation-marketing-route">
            {marketingOperationCards.map((card) => (
              <InsightPanel key={card.title} card={card} />
            ))}
          </div>
          <div className="presentation-pricing-callout">
            <CircleDollarSign size={24} />
            <span>Precio competitivo digital</span>
            <p>
              El precio debe poder compararse contra alternativas online, pero defenderse con mayor vida util,
              ergonomia, soporte tecnico y menor riesgo de compra por compatibilidad.
            </p>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById["marketing-canales"]}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current["marketing-canales"] = node;
          }}
        >
          <div className="presentation-marketing-channel-stack">
            <article className="presentation-channel-tool">
              <MonitorSmartphone size={26} />
              <span>Ventaja digital</span>
              <h3>Buscador de compatibilidad</h3>
              <p>
                La web debe permitir filtrar por maquina y encontrar la referencia exacta de Thermo Seats. Eso reduce
                devoluciones y convierte dudas tecnicas en leads.
              </p>
            </article>
            <div className="presentation-channel-plan">
              {marketingChannelPlan.map((channel) => (
                <article key={channel.label}>
                  <strong>{channel.label}</strong>
                  <p>{channel.text}</p>
                </article>
              ))}
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.riesgos}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.riesgos = node;
          }}
        >
          <div className="presentation-risk-grid">
            {riskControls.map((item) => (
              <article key={item.risk}>
                <ShieldCheck size={20} />
                <span>Riesgo</span>
                <h3>{item.risk}</h3>
                <p>{item.control}</p>
              </article>
            ))}
          </div>
          <MetricRibbon
            items={[
              { label: "KPI comercial", value: "50-70", text: "Unidades piloto para validar precio, compatibilidad y canal." },
              { label: "KPI canal", value: "Leads B2B", text: "Distribuidores, empresas de landscaping, golf y tiendas especializadas." },
              { label: "KPI producto", value: "Reseñas", text: "Devoluciones, preguntas técnicas, soporte y satisfacción." },
            ]}
          />
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.ruta}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.ruta = node;
          }}
        >
          <div className="presentation-roadmap-rail">
            {roadmap.map((step) => (
              <article key={step.phase} data-phase={step.phase}>
                <span>Fase {step.phase}</span>
                <strong>{step.timing}</strong>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="presentation-final-grid">
            <article>
              <CalendarRange size={22} />
              <span>Secuencia</span>
              <p>Primero aprender con Florida; despues llegar a Texas con evidencia y poder de negociacion.</p>
            </article>
            <article>
              <CircleDollarSign size={22} />
              <span>Precio y margen</span>
              <p>Usar el piloto para ajustar rango de precio, costo logístico, margen por canal y política de soporte.</p>
            </article>
            <article>
              <Landmark size={22} />
              <span>Soporte ejecutivo</span>
              <p>
                Referencias macro y legales disponibles en el dossier: {macroReferenceList.length} fuentes consolidadas
                y analisis por entornos.
              </p>
            </article>
          </div>
        </PresentationSlide>
      </div>
      <ExpandedVisualModal visual={expandedVisual} onClose={() => setExpandedVisual(null)} />
    </main>
  );
}
