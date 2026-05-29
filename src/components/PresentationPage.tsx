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
    title: "4M de acres de césped.",
    summary:
      "Florida tiene casi 4 millones de acres de césped mantenido y una industria de turfgrass de USD 7.82 mil millones al año. Es el #1 en EE. UU. en producción de césped — señal directa de mantenimiento recurrente, maquinaria y operadores que necesitan comodidad.",
    variant: "support",
  },
  {
    id: "indicadores",
    number: "03",
    label: "Indicadores principales",
    shortLabel: "Indicadores",
    eyebrow: "Gráficos de decisión",
    title: "Los indicadores asignan roles.",
    summary:
      "Florida gana foco en turfgrass y uso continuo; Texas mantiene fuerza en escala agrícola y volumen B2B.",
  },
  {
    id: "benchmarks",
    number: "04",
    label: "Benchmark macro y estatal",
    shortLabel: "Benchmarks",
    eyebrow: "Florida y Texas frente al promedio y al resto",
    title: "Por encima del promedio nacional.",
    summary:
      "Tanto contra el promedio nacional como contra los estados grandes, Florida y Texas sobresalen en uso digital, clima, desgaste ambiental y dinamismo pyme.",
  },
  {
    id: "fiscal",
    number: "05",
    label: "Impuestos y entrada legal",
    shortLabel: "Fiscal",
    eyebrow: "Facilidad fiscal y formalización",
    title: "Menos fricción que California o New York.",
    summary:
      "La ventaja fiscal no decide sola la entrada, pero ayuda a defender por qué estos estados son mejores puntos de arranque que mercados más costosos o complejos.",
  },
  {
    id: "competencia",
    number: "06",
    label: "Posicionamiento competitivo",
    shortLabel: "Competencia",
    eyebrow: "Mapa 2×2 — precio vs especialización",
    title: "UMO juega en cuadrante propio.",
    summary:
      "El mercado se divide entre OEM caro, aftermarket genérico y nichos premium. UMO ocupa el espacio de comodidad técnica accesible para operadores comerciales.",
  },
  {
    id: "roles",
    number: "07",
    label: "Dos roles, una secuencia",
    shortLabel: "Roles",
    eyebrow: "Decisión geográfica",
    title: "Florida valida. Texas escala.",
    summary:
      "Dos mercados con roles distintos. Florida abre con canal digital y aliados locales; Texas entra cuando el producto ya tiene evidencia.",
    variant: "decision",
  },
  {
    id: "mapa-florida",
    number: "08",
    label: "Mapa de oportunidad",
    shortLabel: "Mapa FL",
    eyebrow: "Compradores potenciales",
    title: "Clusters de entrada en Florida.",
    summary:
      "El mapa muestra clusters posibles para UMO: universidades con mantenimiento de campus, campos de golf, parques, resorts, condominios y zonas residenciales.",
  },
  {
    id: "entrada",
    number: "09",
    label: "Modo de entrada",
    shortLabel: "Entrada",
    eyebrow: "Estrategia de internacionalización",
    title: "Exportación directa + alianzas.",
    summary:
      "El modelo reduce riesgo inicial, conserva control productivo y permite validar demanda antes de pensar en una sede propia o una estructura fija en el mercado.",
  },
  {
    id: "producto",
    number: "10",
    label: "Producto y propuesta",
    shortLabel: "Producto",
    eyebrow: "Adaptación y valor",
    title: "Menos fatiga. Más durabilidad.",
    summary:
      "UMO debe presentarse como una solución de comodidad para operadores que pasan horas en podadoras, tractores pequeños, vehículos utilitarios y maquinaria agrícola.",
  },
  {
    id: "propuesta",
    number: "11",
    label: "Propuesta + segmento",
    shortLabel: "Propuesta",
    eyebrow: "Thermo Seats by UMO + buyer B2B",
    title: "Thermo Seats para operadores B2B.",
    summary:
      "Asiento ergonómico y térmico para operadores de podadoras y tractores pequeños. El comprador B2B no compra accesorios — compra continuidad operativa.",
  },
  {
    id: "gtm",
    number: "12",
    label: "Go-to-market",
    shortLabel: "GTM",
    eyebrow: "Operación, precio y canales",
    title: "Precio digital. Distribución dual.",
    summary:
      "Precio comparable en Amazon y landing; defensa en valor, soporte y compatibilidad. Distribución combinada B2C digital + B2B local en Florida.",
  },
  {
    id: "pitch",
    number: "13",
    label: "Pitch y promesa",
    shortLabel: "Pitch",
    eyebrow: "Mensaje de marca",
    title: "Menos fatiga. Más horas.",
    summary:
      "Una sola promesa vertebra la campaña en Florida: comodidad para operadores que pasan jornadas exteriores. Tres pilares sostienen el mensaje en cada canal.",
  },
  {
    id: "ruta",
    number: "14",
    label: "Ruta de acción",
    shortLabel: "Ruta",
    eyebrow: "Cierre ejecutivo",
    title: "Aprender, probar y escalar.",
    summary:
      "Florida es el laboratorio comercial. Texas es la plataforma de volumen cuando el producto, el precio, el canal y la operación ya estén validados.",
  },
  {
    id: "ask",
    number: "15",
    label: "Decisión ejecutiva",
    shortLabel: "Ask",
    eyebrow: "Compromiso y siguientes pasos",
    title: "Decisión: aprobar piloto Florida.",
    summary:
      "Lo que necesitamos del comité para arrancar: aprobación del piloto, presupuesto, criterios de éxito y fecha de revisión para decidir Texas.",
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
    text: "Necesitan repuestos rapidos para podadoras comerciales, tractores pequenos y equipos que no pueden quedar quietos.",
    meta: "Buyer B2B 01",
    icon: UsersRound,
  },
  {
    title: "Compras B2B",
    text: "Procurement valida precio, ficha tecnica, compatibilidad, garantia, soporte y condiciones de entrega.",
    meta: "Buyer B2B 02",
    icon: BriefcaseBusiness,
  },
  {
    title: "93.0% urbano",
    text: "Florida concentra comunidades planeadas, propiedades comerciales, campus, clubes y zonas verdes recurrentes.",
    meta: "Entorno Florida",
    icon: Building2,
  },
];

const marketingOperationCards: InsightCard[] = [
  {
    title: "Precio competitivo",
    text: "Alinear el precio con alternativas digitales visibles para reducir friccion de compra inicial.",
    meta: "Estrategia",
    icon: CircleDollarSign,
  },
  {
    title: "Valor defendible",
    text: "Justificar el precio por mayor vida util, ergonomia, resistencia climatica y menor tiempo muerto.",
    meta: "Diferenciacion",
    icon: ShieldCheck,
  },
  {
    title: "USD 100K nexus",
    text: "Planear cumplimiento fiscal temprano cuando las ventas digitales empiecen a escalar en Florida.",
    meta: "Cumplimiento",
    icon: Landmark,
  },
];

const distributionChannelBullets = [
  "Amazon Marketplace USA",
  "Landing regional de Florida",
  "Distribuidores online de repuestos",
  "Dealers de outdoor power equipment",
  "Prospeccion B2B a landscaping, golf y campus",
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
  presentationMode,
  onTogglePresentation,
}: {
  slides: DeckSlide[];
  activeIndex: number;
  onGo: (index: number) => void;
  presentationMode: boolean;
  onTogglePresentation: () => void;
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
        <button
          type="button"
          onClick={onTogglePresentation}
          aria-label={presentationMode ? "Salir del modo presentación" : "Entrar al modo presentación"}
          title={presentationMode ? "Salir (Esc)" : "Modo presentación"}
        >
          {presentationMode ? <X size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {presentationMode ? (
        <div className="presentation-mode-hint" aria-hidden="true">
          ← → para navegar · F pantalla · Esc para salir
        </div>
      ) : null}
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
            {typeof point.national === "number" ? (
              <circle className="presentation-trend-dot is-national" cx={x(index)} cy={y(point.national)} r={expanded ? 5 : 4} />
            ) : null}
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
  const [presentationMode, setPresentationMode] = useState(false);
  const slideRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainRef = useRef<HTMLElement | null>(null);

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
    if (presentationMode) return; // en presentación el activo se controla por teclas/botón, no por scroll.
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
  }, [presentationMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a")) return;

      // F → toggle modo presentación + fullscreen
      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        togglePresentationMode();
        return;
      }

      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }

      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
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
  }, [activeIndex, presentationMode]);

  function goToSlide(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), deckSlides.length - 1);
    if (presentationMode) {
      // En modo presentación sólo cambiamos el slide activo (CSS lo anima).
      setActiveIndex(nextIndex);
      return;
    }
    const slide = deckSlides[nextIndex];
    const node = slideRefs.current[slide.id] ?? document.getElementById(slide.id);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function togglePresentationMode() {
    const target = mainRef.current ?? document.documentElement;
    try {
      if (!document.fullscreenElement) {
        await target.requestFullscreen?.();
        setPresentationMode(true);
      } else {
        await document.exitFullscreen?.();
        setPresentationMode(false);
      }
    } catch {
      // si fullscreen falla, igual activa el modo visual
      setPresentationMode((prev) => !prev);
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setPresentationMode(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Marca el slide activo con data-active para que CSS muestre solo ese en modo presentación.
  useEffect(() => {
    const activeId = deckSlides[activeIndex]?.id;
    document.querySelectorAll("[data-presentation-slide]").forEach((el) => {
      el.removeAttribute("data-active");
    });
    if (activeId) {
      document.getElementById(activeId)?.setAttribute("data-active", "true");
    }
  }, [activeIndex]);

  const progressPercent = ((activeIndex + 1) / deckSlides.length) * 100;

  return (
    <main
      ref={mainRef}
      className="presentation-page presentation-deck-page"
      data-presentation-mode={presentationMode ? "on" : "off"}
      style={{ ["--presentation-progress" as string]: `${progressPercent}%` }}
      lang={locale === "es" ? "es" : "es"}
    >
      <DeckChrome
        slides={deckSlides}
        activeIndex={activeIndex}
        onGo={goToSlide}
        presentationMode={presentationMode}
        onTogglePresentation={togglePresentationMode}
      />

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
              <strong>4M</strong>
              <h3>acres de césped mantenido</h3>
              <p>
                Industria de turfgrass de <strong>USD 7.82B</strong> al año. Florida ocupa el <strong>#1</strong> en
                EE. UU. en producción de césped — demanda recurrente de mantenimiento, maquinaria y comodidad para
                operadores en jornadas exteriores.
              </p>
            </article>
            <div className="presentation-stat-bars is-compact">
              <header className="presentation-stat-bars-head">
                <span>Refuerzo del dato</span>
                <h4>Campos de golf por estado</h4>
              </header>
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
              <p>Con 1,290 instalaciones, Florida lidera EE. UU. en campos de golf — un consumidor más del ecosistema de césped.</p>
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
          slide={slidesById.benchmarks}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.benchmarks = node;
          }}
        >
          <div className="presentation-benchmark-unified">
            <div className="presentation-benchmark-national">
              <NationalComparisonChart onExpand={() => setExpandedVisual({ type: "national", id: "benchmarks" })} />
            </div>
            <div className="presentation-benchmark-state">
              <header>
                <BarChart3 size={20} />
                <span>Benchmark estatal — Florida y Texas vs el resto</span>
              </header>
              <div className="presentation-benchmark-grid-v2 is-compact">
                {benchmarkGroups.map((group) => (
                  <BenchmarkChart
                    key={group.title}
                    group={group}
                    onExpand={() => setExpandedVisual({ type: "benchmark", id: group.id })}
                  />
                ))}
              </div>
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.fiscal}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.fiscal = node;
          }}
        >
          <div className="presentation-fiscal-layout">
            <section className="presentation-fiscal-recommended">
              <header>
                <span>Recomendados</span>
                <em>Top 10 Tax Foundation 2026</em>
              </header>
              <article className="presentation-fiscal-card is-florida">
                <div className="presentation-fiscal-card-head">
                  <strong>#5</strong>
                  <h3>Florida</h3>
                </div>
                <ul>
                  <li>Sin impuesto estatal personal</li>
                  <li>Corporate income tax 5.5% · Sales 6.00%</li>
                  <li>LLC filing online vía Sunbiz</li>
                </ul>
                <p className="presentation-fiscal-card-reading"><strong>→</strong> Mejor para el piloto: menor fricción y velocidad de arranque.</p>
              </article>
              <article className="presentation-fiscal-card is-texas">
                <div className="presentation-fiscal-card-head">
                  <strong>#7</strong>
                  <h3>Texas</h3>
                </div>
                <ul>
                  <li>Sin impuesto estatal personal</li>
                  <li>Sin corporate income tax tradicional · Sales 6.25%</li>
                  <li>SOSDirect con servicios expedited</li>
                </ul>
                <p className="presentation-fiscal-card-reading"><strong>→</strong> Mejor para la escala B2B con evidencia de Florida.</p>
              </article>
            </section>

            <section className="presentation-fiscal-contrast">
              <header>
                <span>Contraste</span>
                <em>Por qué no arrancar acá</em>
              </header>
              <article className="presentation-fiscal-mini">
                <strong>#48</strong>
                <div>
                  <h4>California</h4>
                  <p>Mayor presión tributaria y costos operativos altos.</p>
                </div>
              </article>
              <article className="presentation-fiscal-mini">
                <strong>#50</strong>
                <div>
                  <h4>New York</h4>
                  <p>Ranking fiscal inferior y cumplimiento exigente.</p>
                </div>
              </article>
              <p className="presentation-fiscal-contrast-note">
                Mercados grandes, pero menos eficientes para validar con bajo riesgo.
              </p>
            </section>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.competencia}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.competencia = node;
          }}
        >
          <div className="presentation-competencia-layout">
            <div className="presentation-quadrant">
              <div className="presentation-quadrant-axis-y">Especialización técnica ↑</div>
              <div className="presentation-quadrant-axis-x">Precio →</div>
              <div className="presentation-quadrant-grid" aria-hidden="true">
                <span className="q-label q-tl">Técnico · accesible</span>
                <span className="q-label q-tr">Técnico · premium</span>
                <span className="q-label q-bl">Genérico · accesible</span>
                <span className="q-label q-br">Genérico · premium</span>
              </div>
              <div className="presentation-quadrant-point is-umo" style={{ left: "30%", top: "22%" }}>
                <span>UMO</span>
                <em>Thermo Seats</em>
              </div>
              <div className="presentation-quadrant-point is-oem" style={{ left: "78%", top: "18%" }}>
                <span>OEM</span>
                <em>John Deere, Kubota</em>
              </div>
              <div className="presentation-quadrant-point is-premium" style={{ left: "70%", top: "38%" }}>
                <span>Premium nicho</span>
                <em>Milsco, Grammer</em>
              </div>
              <div className="presentation-quadrant-point is-generic" style={{ left: "22%", top: "78%" }}>
                <span>Aftermarket genérico</span>
                <em>Amazon cojines</em>
              </div>
            </div>
            <aside className="presentation-competencia-side">
              <article>
                <Target size={20} />
                <span>Espacio UMO</span>
                <h4>Comodidad técnica accesible</h4>
                <p>Ergonomía, materiales y compatibilidad de gama media — sin el precio del OEM ni la incertidumbre del cojín genérico.</p>
              </article>
              <article>
                <ShieldCheck size={20} />
                <span>Defensa de valor</span>
                <h4>Compatibilidad + vida útil</h4>
                <p>El argumento técnico (modelo exacto, resistencia UV, soporte lumbar) bloquea al aftermarket genérico sin competir con OEM en precio.</p>
              </article>
              <article>
                <LineChart size={20} />
                <span>Ventana competitiva</span>
                <h4>Mid-market desatendido</h4>
                <p>Operadores B2B de podadoras comerciales no quieren pagar OEM, pero el cojín de USD 35 no aguanta una temporada. Ese es el hueco.</p>
              </article>
            </aside>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.roles}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.roles = node;
          }}
        >
          <div className="presentation-decision-layout">
            <article className="presentation-decision-primary">
              <MapPinned size={24} />
              <span>Florida — Validar ahora</span>
              <h3>Laboratorio comercial.</h3>
              <p>
                Canal digital medible + B2B local con landscaping, contratistas y distribuidores visibles. Ciclo
                logístico corto desde Colombia para iterar producto, precio y soporte sin abrir estructura propia.
              </p>
              <ul className="presentation-role-list">
                <li><strong>B2C + B2B local.</strong> Amazon, landing regional y aliados de mantenimiento.</li>
                <li><strong>Iteración rápida.</strong> 6 días marítimos y reposición ágil para corregir en marcha.</li>
                <li><strong>Aprendizaje real.</strong> Reseñas, devoluciones y margen por canal antes de escalar.</li>
              </ul>
            </article>
            <article className="presentation-decision-secondary">
              <Tractor size={24} />
              <span>Texas — Escalar después</span>
              <h3>Plataforma de volumen.</h3>
              <p>
                Cuando el producto está probado, Texas multiplica el alcance B2B con dealers agrícolas, ranchos y
                maquinaria pesada. La entrada exige fichas técnicas, soporte y argumento robusto.
              </p>
              <ul className="presentation-role-list">
                <li><strong>Venta consultiva.</strong> Dealers agrícolas, talleres rurales y compradores técnicos.</li>
                <li><strong>Escala productiva.</strong> Base agro mucho mayor que Florida, ciclos de renovación.</li>
                <li><strong>Evidencia primero.</strong> Entra con datos validados en FL — no antes.</li>
              </ul>
            </article>
          </div>
          <div className="presentation-role-sequence">
            <span>Secuencia recomendada</span>
            <strong>Aprender en Florida → Probar canal y producto → Migrar a Texas con evidencia.</strong>
          </div>
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
          slide={slidesById.entrada}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.entrada = node;
          }}
        >
          <div className="presentation-entry-pipeline">
            <article className="presentation-entry-stage is-colombia">
              <header>
                <span className="presentation-entry-num">01</span>
                <em>Colombia</em>
              </header>
              <Factory size={28} />
              <h3>Producción</h3>
              <p>
                UMO conserva control de producción, calidad, costos y aprendizaje sin abrir sede fija antes de validar
                demanda en EE. UU.
              </p>
              <span className="presentation-entry-tag">Menor riesgo</span>
            </article>

            <div className="presentation-entry-link" aria-hidden="true">
              <span className="presentation-entry-link-line" />
              <ArrowUpRight size={22} />
              <em>Exporta</em>
            </div>

            <article className="presentation-entry-stage is-florida">
              <header>
                <span className="presentation-entry-num">02</span>
                <em>Florida</em>
              </header>
              <Sprout size={28} />
              <h3>Piloto comercial</h3>
              <p>
                Distribuidores de outdoor power equipment, empresas de landscaping, tiendas de maquinaria y campos de
                golf aceleran confianza local.
              </p>
              <span className="presentation-entry-tag">Entrada local · alianzas</span>
            </article>

            <div className="presentation-entry-link" aria-hidden="true">
              <span className="presentation-entry-link-line" />
              <ArrowUpRight size={22} />
              <em>Escala</em>
            </div>

            <article className="presentation-entry-stage is-texas">
              <header>
                <span className="presentation-entry-num">03</span>
                <em>Texas</em>
              </header>
              <Tractor size={28} />
              <h3>Expansión B2B</h3>
              <p>
                Segundo movimiento: dealers agrícolas, talleres rurales, repuestos y clientes de mayor volumen sobre la
                base validada en Florida.
              </p>
              <span className="presentation-entry-tag">Fase de escala</span>
            </article>
          </div>

          <div className="presentation-entry-closer">
            <Route size={20} />
            <strong>Exportación directa + alianzas locales.</strong>
            <p>
              Sin sede propia, sin estructura fija. Cada fase desbloquea la siguiente solo cuando hay evidencia
              comercial real.
            </p>
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
          slide={slidesById.propuesta}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.propuesta = node;
          }}
        >
          <div className="presentation-propuesta-layout">
            <article className="presentation-propuesta-hero">
              <PackageCheck size={26} />
              <span>Producto internacional</span>
              <h3>Thermo Seats by UMO</h3>
              <p>
                Línea de asientos ergonómicos y térmicos para operadores de podadoras comerciales, tractores pequeños y
                maquinaria de mantenimiento. Misma calidad industrial colombiana, adaptada por modelo.
              </p>
              <ul className="presentation-propuesta-bullets">
                <li><strong>Producto modificado.</strong> Dimensiones, materiales y catálogos por modelo.</li>
                <li><strong>Compatibilidad exacta.</strong> Tractores pequeños y podadoras dominantes en landscaping.</li>
                <li><strong>Promesa comercial.</strong> Comodidad, soporte lumbar y mejor relación valor-precio.</li>
              </ul>
            </article>
            <div className="presentation-propuesta-segment">
              <header>
                <UsersRound size={20} />
                <span>Buyer B2B — qué compra realmente</span>
              </header>
              <article>
                <strong>Dueños de landscaping</strong>
                <p>Necesitan repuestos rápidos para equipos que no pueden quedar quietos.</p>
              </article>
              <article>
                <strong>Procurement B2B</strong>
                <p>Valida precio, ficha técnica, compatibilidad, garantía, soporte y entrega.</p>
              </article>
              <article>
                <strong>Mantenimiento institucional</strong>
                <p>Universidades, parques y campos de golf con flotas y SLA recurrentes.</p>
              </article>
              <div className="presentation-propuesta-compat">
                {["Modelo", "Medidas", "Referencia", "Soporte"].map((step, index) => (
                  <span key={step}><em>{String(index + 1).padStart(2, "0")}</em>{step}</span>
                ))}
              </div>
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.gtm}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.gtm = node;
          }}
        >
          <div className="presentation-gtm-layout">
            <article className="presentation-gtm-price">
              <CircleDollarSign size={22} />
              <span>Precio y valor</span>
              <h4>Comparable digital, defendido por valor.</h4>
              <p>El precio se alinea con alternativas en Amazon para reducir fricción inicial. La defensa comercial está en vida útil, ergonomía, soporte y compatibilidad exacta.</p>
              <ul>
                <li><strong>Cumplimiento.</strong> USD 100K economic nexus en Florida — planear desde temprano.</li>
                <li><strong>Operación.</strong> Exportación directa con fulfillment localizado.</li>
              </ul>
            </article>
            <article className="presentation-gtm-tool">
              <MonitorSmartphone size={22} />
              <span>Ventaja digital</span>
              <h4>Buscador de compatibilidad.</h4>
              <p>Filtrar por máquina y encontrar la referencia exacta. Reduce devoluciones y convierte dudas técnicas en leads B2B.</p>
            </article>
            <div className="presentation-gtm-channels">
              <header>
                <Route size={18} />
                <span>Canales de captura</span>
              </header>
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
          slide={slidesById.pitch}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.pitch = node;
          }}
        >
          <div className="presentation-pitch-layout">
            <article className="presentation-pitch-hero">
              <Target size={26} />
              <span>One-liner para Florida</span>
              <h3>&ldquo;Asientos que aguantan el sol y el día.&rdquo;</h3>
              <p>
                El pitch comercial parte de una promesa concreta: menos fatiga del operador, menos paradas por
                incomodidad y menos reposición por desgaste prematuro.
              </p>
            </article>
            <div className="presentation-pitch-pillars">
              <article>
                <ShieldCheck size={20} />
                <span>Pilar 01</span>
                <h4>Durabilidad</h4>
                <p>Materiales y costuras probados para calor, humedad y radiación UV constantes.</p>
              </article>
              <article>
                <BadgeCheck size={20} />
                <span>Pilar 02</span>
                <h4>Compatibilidad</h4>
                <p>Matriz visible por modelo: podadora, tractor pequeño y vehículo utilitario.</p>
              </article>
              <article>
                <Sprout size={20} />
                <span>Pilar 03</span>
                <h4>Comodidad</h4>
                <p>Ergonomía para jornadas largas — soporte lumbar, ventilación y ajuste.</p>
              </article>
            </div>
            <div className="presentation-pitch-tone">
              <span>Tono y estilo</span>
              <strong>Directo, técnico, sin adornos.</strong>
              <p>La marca habla como un operador: claro, útil y cero marketing inflado. Misma voz en Amazon, landing, ficha técnica y prospección B2B.</p>
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.ruta}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.ruta = node;
          }}
        >
          <div className="presentation-roadmap-visual">
            <div className="presentation-roadmap-track">
              <div className="presentation-roadmap-line" aria-hidden="true" />
              {roadmap.map((step, index) => {
                const isTexas = step.phase === "3";
                return (
                  <div
                    key={step.phase}
                    className={`presentation-roadmap-node ${isTexas ? "is-texas" : "is-florida"}`}
                    style={{ ["--node-index" as string]: index }}
                  >
                    <div className="presentation-roadmap-marker">
                      <span>{step.phase}</span>
                    </div>
                    <div className="presentation-roadmap-card">
                      <em>{step.timing}</em>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="presentation-roadmap-legend">
              <span className="is-florida"><MapPinned size={14} /> Laboratorio Florida</span>
              <span className="is-texas"><Tractor size={14} /> Escala Texas</span>
            </div>
            <div className="presentation-roadmap-closer">
              <Flag size={22} />
              <strong>Florida es el laboratorio. Texas es la escala.</strong>
              <p>
                Cuando producto, precio, canal y operación están validados, la transición es secuencial — no se descarta
                Texas, se prepara.
              </p>
            </div>
          </div>
        </PresentationSlide>

        <PresentationSlide
          slide={slidesById.ask}
          refSetter={(node: HTMLElement | null) => {
            slideRefs.current.ask = node;
          }}
        >
          <div className="presentation-ask-layout">
            <article className="presentation-ask-decision">
              <CheckCircle2 size={26} />
              <span>Decisión solicitada</span>
              <h3>Aprobar piloto Florida — arrancar Q3 2026.</h3>
              <p>
                Luz verde para preparar producto, canales y soporte, con revisión ejecutiva a los 6 meses para activar (o
                detener) la fase Texas.
              </p>
            </article>
            <div className="presentation-ask-grid">
              <article>
                <CircleDollarSign size={22} />
                <span>Presupuesto solicitado</span>
                <strong>USD 180–240K</strong>
                <p>Inventario inicial, landing + Amazon, fichas técnicas, logística primer trimestre y soporte legal/fiscal.</p>
              </article>
              <article>
                <CalendarRange size={22} />
                <span>Próximo milestone</span>
                <strong>6 meses · piloto vivo</strong>
                <p>Amazon + landing live, primeros B2B contactados, 50–70 unidades vendidas y reseñas iniciales medidas.</p>
              </article>
              <article>
                <Target size={22} />
                <span>Criterios go / no-go a Texas</span>
                <strong>Margen ≥ 28% · Devoluciones ≤ 6%</strong>
                <p>Reviews promedio ≥ 4.2/5 y al menos 2 alianzas B2B firmadas. Si se cumple, activar fase Texas en mes 12.</p>
              </article>
              <article>
                <Handshake size={22} />
                <span>Responsables clave</span>
                <strong>Comercial · Producto · Legal</strong>
                <p>Owner comercial para canal, owner técnico para compatibilidad, owner legal para nexus fiscal Florida.</p>
              </article>
            </div>
            <div className="presentation-ask-closer">
              <Flag size={20} />
              <strong>Lo que necesitamos hoy:</strong>
              <span>Aprobación del piloto, asignación del presupuesto y nombramiento de los 3 owners.</span>
            </div>
          </div>
        </PresentationSlide>
      </div>
      <ExpandedVisualModal visual={expandedVisual} onClose={() => setExpandedVisual(null)} />
    </main>
  );
}
