import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Factory,
  FileText,
  Flag,
  Globe2,
  Handshake,
  Landmark,
  LineChart,
  MapPinned,
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
} from "lucide-react";
import { type ComponentType, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  canvasBlocks,
  canvasHighlights,
  companyProfile,
  deliveries,
  diagnosticMetrics,
  documents,
  smartCriteria,
  swotDetailedBlocks,
  viabilityPillars,
} from "../data/content";
import { environmentEntries } from "../data/environmentAnalysis";
import { getEnvironmentDeepDive } from "../data/environmentDeepDive";
import { macroIndicators, macroReferenceList } from "../data/macroComparative";
import type { Locale } from "../i18n/copy";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

type Chapter = {
  id: string;
  label: string;
};

type NarrativeCard = {
  title: string;
  text: string;
  meta?: string;
  icon: IconComponent;
};

type ComparisonRow = {
  criteria: string;
  florida: string;
  texas: string;
  reading: string;
  priority: "Florida" | "Texas" | "Ambos";
};

const chapters: Chapter[] = [
  { id: "contexto", label: "Contexto UMO" },
  { id: "sintesis", label: "Fases previas" },
  { id: "comparativo", label: "Florida vs Texas" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "florida", label: "Florida" },
  { id: "texas", label: "Texas" },
  { id: "decision", label: "Decisión" },
  { id: "estrategia", label: "Estrategia" },
  { id: "marketing", label: "Marketing" },
  { id: "roadmap", label: "Ruta" },
];

const comparisonRows: ComparisonRow[] = [
  {
    criteria: "Tamaño del mercado",
    florida: "Mercado grande, concentrado en servicios, turismo, residencia y mantenimiento exterior.",
    texas: "Mayor escala económica y productiva; fuerte para volumen, agro e industria.",
    reading: "Texas da escala; Florida permite un arranque más enfocado y visible.",
    priority: "Ambos",
  },
  {
    criteria: "Actividad agrícola",
    florida: "Agricultura relevante, pero menos dominante para maquinaria pesada.",
    texas: "Base agrícola y ganadera de gran escala, con uso intensivo de tractores y equipos.",
    reading: "Texas es más fuerte para una fase B2B agrícola posterior.",
    priority: "Texas",
  },
  {
    criteria: "Landscaping",
    florida: "Ecosistema muy visible de paisajismo, mantenimiento de jardines, condominios y zonas verdes.",
    texas: "Demanda fuerte en propiedades grandes, suburbios y servicios de mantenimiento.",
    reading: "Florida ofrece un mercado más claro para probar comodidad en maquinaria pequeña y mediana.",
    priority: "Florida",
  },
  {
    criteria: "Turfgrass",
    florida: "Lidera la lectura de césped profesional y operación verde continua.",
    texas: "También tiene una industria turfgrass grande, pero con menor especialización relativa.",
    reading: "Florida conecta mejor con césped, jardinería, campos de golf y mantenimiento residencial.",
    priority: "Florida",
  },
  {
    criteria: "Campos de golf y turismo",
    florida: "Alta concentración de servicios verdes asociados a turismo, comunidades residenciales y golf.",
    texas: "Mercado relevante, pero más disperso y menos ligado al posicionamiento inicial.",
    reading: "Florida facilita pilotos con clientes de alta visibilidad.",
    priority: "Florida",
  },
  {
    criteria: "Poder adquisitivo",
    florida: "Ingreso per cápita alto y cercano a Texas; buen encaje para productos de valor.",
    texas: "Ingreso ligeramente superior y mayor tamaño económico total.",
    reading: "Ambos pueden absorber una propuesta premium si se comunica durabilidad y ergonomía.",
    priority: "Ambos",
  },
  {
    criteria: "Cultura de compra online",
    florida: "Buena adopción digital para productos de jardinería y mantenimiento.",
    texas: "También fuerte, con mayor preferencia DIY en los datos del entorno cultural.",
    reading: "Amazon, e-commerce propio y contenido técnico funcionan para ambos estados.",
    priority: "Ambos",
  },
  {
    criteria: "Clima y desgaste",
    florida: "Calor, humedad y exposición exterior exigen materiales resistentes y transpirables.",
    texas: "Calor, polvo, sol y uso rural intensivo exigen resistencia mecánica.",
    reading: "Ambos validan la promesa de durabilidad; Florida exige resolver humedad desde el inicio.",
    priority: "Ambos",
  },
  {
    criteria: "Cercanía logística",
    florida: "Ruta marítima más rápida desde Colombia y mejor lectura como puerta de entrada.",
    texas: "Más tiempo de ruta, pero mejor para cobertura y distribución interna posterior.",
    reading: "Florida reduce fricción inicial; Texas cobra más sentido al escalar.",
    priority: "Florida",
  },
  {
    criteria: "Presencia de distribuidores",
    florida: "Distribuidores de maquinaria de jardín, tiendas de outdoor power equipment y redes de landscaping.",
    texas: "Dealers agrícolas, concesionarios de maquinaria, talleres rurales y repuestos pesados.",
    reading: "Florida facilita entrada multicanal; Texas exige venta más técnica.",
    priority: "Ambos",
  },
  {
    criteria: "Potencial B2B",
    florida: "Empresas de landscaping, campos de golf, administradores de condominios y tiendas especializadas.",
    texas: "Ranchos, agro, ganadería, distribuidores agrícolas y talleres de maquinaria.",
    reading: "Florida prueba B2B ligero; Texas escala B2B productivo.",
    priority: "Ambos",
  },
  {
    criteria: "Potencial B2C",
    florida: "Dueños de casas con jardines grandes, usuarios DIY y compradores en marketplaces.",
    texas: "Usuarios rurales y propietarios de terrenos con compra funcional de repuestos.",
    reading: "Florida es más fuerte para combinar Amazon, landing page y prueba de demanda.",
    priority: "Florida",
  },
  {
    criteria: "Riesgos",
    florida: "Humedad, desgaste, competencia en accesorios y necesidad de diferenciación visual.",
    texas: "Mayor ciclo de venta técnico, dispersión territorial y adaptación a maquinaria pesada.",
    reading: "Florida tiene riesgos más manejables para un piloto; Texas pide más preparación comercial.",
    priority: "Florida",
  },
  {
    criteria: "Recomendación estratégica",
    florida: "Entrada inicial prioritaria para validar producto, canal, precio y narrativa comercial.",
    texas: "Segunda etapa fuerte para escalar hacia agricultura, ranchos y maquinaria pesada.",
    reading: "La secuencia recomendada es Florida primero, Texas después.",
    priority: "Florida",
  },
];

const floridaOpportunityCards: NarrativeCard[] = [
  {
    title: "Oportunidad principal",
    text: "Landscaping, turfgrass, mantenimiento de césped, campos de golf, urbanizaciones y comunidades residenciales donde la maquinaria de jardín se usa durante gran parte del año.",
    meta: "Mercado verde, residencial y profesional",
    icon: Sprout,
  },
  {
    title: "Cliente ideal",
    text: "Empresas de landscaping, administradores de condominios, campos de golf, tiendas de maquinaria de jardín, distribuidores de outdoor power equipment y propietarios de casas con jardines grandes.",
    meta: "B2B + B2C visibles",
    icon: UsersRound,
  },
  {
    title: "Por qué Florida primero",
    text: "Permite probar la propuesta de UMO en un mercado donde convergen uso frecuente de podadoras, alta demanda de comodidad, canales digitales, cercanía logística y afinidad comercial con Colombia.",
    meta: "Validación más rápida",
    icon: BadgeCheck,
  },
  {
    title: "Adaptación del producto",
    text: "Materiales resistentes al calor, humedad, radiación y lluvia; soporte lumbar para jornadas largas; comunicación clara sobre instalación, compatibilidad y vida útil.",
    meta: "Confort para clima húmedo",
    icon: ShieldCheck,
  },
];

const texasOpportunityCards: NarrativeCard[] = [
  {
    title: "Escala productiva",
    text: "Texas concentra agricultura, ganadería, ranchos, grandes extensiones de tierra y una cultura de operación con maquinaria pesada y equipos de trabajo intensivo.",
    meta: "Agro, ranchos y volumen",
    icon: Tractor,
  },
  {
    title: "Canal más técnico",
    text: "El camino natural pasa por distribuidores agrícolas, concesionarios, talleres especializados, repuestos para tractores y relaciones B2B de mayor ciclo comercial.",
    meta: "Dealers y repuestos",
    icon: BriefcaseBusiness,
  },
  {
    title: "Expansión lógica",
    text: "Texas no se descarta: se reserva para una segunda etapa cuando UMO ya haya probado producto, logística, precio, soporte y canales en el mercado inicial.",
    meta: "Fase de escala",
    icon: LineChart,
  },
  {
    title: "Adaptación posterior",
    text: "El aprendizaje de Florida puede transformarse en una línea más robusta para calor seco, polvo, vibración, maquinaria pesada y compradores rurales con exigencias técnicas.",
    meta: "Mayor especificación",
    icon: Factory,
  },
];

const entryStrategyCards: NarrativeCard[] = [
  {
    title: "Exportación directa desde Colombia",
    text: "UMO conserva producción, control de calidad y flexibilidad financiera en Colombia, evitando comprometer capital en una sede propia antes de validar demanda real.",
    meta: "Menor riesgo inicial",
    icon: PackageCheck,
  },
  {
    title: "Alianzas locales en Florida",
    text: "La entrada se acelera con distribuidores, tiendas de maquinaria de jardín, empresas de landscaping y contactos B2B que ya conocen el cliente final.",
    meta: "Tracción comercial local",
    icon: Handshake,
  },
  {
    title: "Canales digitales desde el primer día",
    text: "Amazon, marketplace, landing general, landing enfocada en Florida y e-commerce propio permiten medir demanda, preguntas frecuentes y sensibilidad de precio.",
    meta: "B2C medible",
    icon: ShoppingCart,
  },
  {
    title: "Texas como segunda red",
    text: "Una vez validado el producto en Florida, UMO puede negociar distribuidores agrícolas y alianzas en Texas con evidencia de ventas, reseñas, márgenes y soporte.",
    meta: "Escala B2B",
    icon: Route,
  },
];

const marketingCards: NarrativeCard[] = [
  {
    title: "Posicionamiento",
    text: "Thermo Seats by UMO debe presentarse como una solución de comodidad, ergonomía y durabilidad para personas que operan maquinaria de césped, jardín y mantenimiento durante jornadas largas.",
    meta: "No vender solo un asiento",
    icon: Target,
  },
  {
    title: "Segmentación",
    text: "Buyer personas: dueño de casa con jardín grande, operador de landscaping, comprador B2B de campo de golf, tienda de maquinaria de jardín y distribuidor de repuestos especializados.",
    meta: "Cinco compradores priorizados",
    icon: UsersRound,
  },
  {
    title: "Comercialización digital",
    text: "SEO para términos de mower seat replacement, campañas SEM, fichas de Amazon, email B2B, LinkedIn comercial y contenido técnico sobre instalación, compatibilidad y resistencia climática.",
    meta: "Demanda capturable",
    icon: MonitorSmartphone,
  },
  {
    title: "Precio",
    text: "Mantener una estrategia competitiva de valor, con rango de referencia entre USD 180 y USD 220 por unidad para validar percepción premium sin competir solo por bajo costo.",
    meta: "Valor vs OEM",
    icon: CircleDollarSign,
  },
];

const roadmap = [
  {
    phase: "0",
    title: "Preparación comercial",
    timing: "0-2 meses",
    text: "Definir compatibilidades, fichas técnicas, muestras, empaque, landing de mercado, material en inglés y política de soporte.",
  },
  {
    phase: "1",
    title: "Piloto Florida",
    timing: "3-6 meses",
    text: "Activar Amazon, landing Florida, contacto con tiendas de maquinaria de jardín, empresas de landscaping y campos de golf.",
  },
  {
    phase: "2",
    title: "Validación y ajuste",
    timing: "6-12 meses",
    text: "Medir unidades vendidas, margen, devoluciones, preguntas técnicas, reseñas, tiempos logísticos y respuesta de distribuidores.",
  },
  {
    phase: "3",
    title: "Expansión Texas",
    timing: "12-18 meses",
    text: "Llevar evidencia de Florida a distribuidores agrícolas, talleres rurales y dealers de maquinaria pesada en Texas.",
  },
];

const nationalBenchmarkGroups = [
  {
    title: "E-commerce aplicado a landscaping",
    unit: "% de adopción digital",
    scaleMax: 20,
    note: "Ambos estados quedan por encima del promedio nacional, lo que valida Amazon, landing page y venta directa.",
    bars: [
      { label: "Texas", value: 17.8, display: "17.8%", tone: "texas" },
      { label: "Florida", value: 17.5, display: "17.5%", tone: "florida" },
      { label: "Promedio nacional", value: 16.4, display: "16.4%", tone: "usa" },
    ],
  },
  {
    title: "Clima favorable para uso continuo",
    unit: "temperatura media 2025",
    scaleMax: 80,
    note: "Florida y Texas sostienen una temporada de uso mucho más larga que el promedio nacional.",
    bars: [
      { label: "Florida", value: 72.3, display: "72.3 F", tone: "florida" },
      { label: "Texas", value: 67.7, display: "67.7 F", tone: "texas" },
      { label: "Promedio nacional", value: 54.6, display: "54.6 F", tone: "usa" },
    ],
  },
  {
    title: "Desgaste que justifica producto premium",
    unit: "índice / 5",
    scaleMax: 5,
    note: "Más calor, humedad, polvo y exposición exterior elevan la necesidad de materiales resistentes.",
    bars: [
      { label: "Texas", value: 4.7, display: "4.7 / 5", tone: "texas" },
      { label: "Florida", value: 4.5, display: "4.5 / 5", tone: "florida" },
      { label: "Promedio nacional", value: 3.6, display: "3.6 / 5", tone: "usa" },
    ],
  },
  {
    title: "Dinamismo pyme",
    unit: "apertura neta de establecimientos",
    scaleMax: 30,
    note: "La base empresarial local supera el promedio nacional y facilita distribuidores, aliados y clientes B2B.",
    bars: [
      { label: "Texas", value: 27.67, display: "27.67%", tone: "texas" },
      { label: "Florida", value: 22.39, display: "22.39%", tone: "florida" },
      { label: "Promedio nacional", value: 19.34, display: "19.34%", tone: "usa" },
    ],
  },
];

const fiscalComparisonRows = [
  {
    state: "Florida",
    rank: 5,
    personalTax: "0%",
    businessTax: "Corporate income tax 5.5%",
    salesTax: "Sales tax base 6.00%",
    formation: "Sunbiz permite filing online de LLC",
    reading: "Muy fuerte para iniciar con menor fricción, menor carga personal y logística cercana a Colombia.",
    tone: "florida",
  },
  {
    state: "Texas",
    rank: 7,
    personalTax: "0%",
    businessTax: "Sin corporate income tax tradicional; franchise tax según condiciones",
    salesTax: "Sales tax base 6.25%",
    formation: "SOSDirect permite filing online y servicios same-day / next-day",
    reading: "Muy atractivo para escalar B2B, distribuidores, volumen agrícola y expansión posterior.",
    tone: "texas",
  },
  {
    state: "California",
    rank: 48,
    personalTax: "Alta carga personal",
    businessTax: "Corporate tax 8.84% y mínimo anual de USD 800",
    salesTax: "Sales tax estatal 7.25%",
    formation: "Expedited online disponible, pero con costos altos",
    reading: "Mercado grande, pero menos conveniente para un piloto exportador de bajo riesgo.",
    tone: "other",
  },
  {
    state: "New York",
    rank: 50,
    personalTax: "Top rate alta",
    businessTax: "Corporate tax graduado 6.5%-7.25%",
    salesTax: "Sales tax estatal más cargas locales",
    formation: "Mayor complejidad regulatoria y de costos",
    reading: "Ejemplo de mercado potente, pero más pesado para validar rápido una línea nueva.",
    tone: "other",
  },
];

function formatScore(value: number) {
  return value.toFixed(2).replace(/\.?0+$/, "");
}

function getBarWidth(value: number, max: number) {
  return `${Math.min(100, Math.max(6, (value / max) * 100))}%`;
}

function getLatestSeriesPoint(indicatorId: string) {
  const indicator = macroIndicators.find((item) => item.id === indicatorId);
  const series = indicator?.series ?? [];
  return series[series.length - 1];
}

function getEnvironmentAverage(entryId: string) {
  const detail = getEnvironmentDeepDive(entryId);
  if (!detail) return null;

  const texasAverage =
    detail.indicators.reduce((total, indicator) => total + indicator.texas.score, 0) /
    Math.max(detail.indicators.length, 1);
  const floridaAverage =
    detail.indicators.reduce((total, indicator) => total + indicator.florida.score, 0) /
    Math.max(detail.indicators.length, 1);

  return {
    texasAverage,
    floridaAverage,
    winner:
      texasAverage === floridaAverage ? "Compartido" : texasAverage > floridaAverage ? "Texas" : "Florida",
  };
}

function SectionKicker({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="presentation-section-kicker">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function IconCard({ card }: { card: NarrativeCard }) {
  const Icon = card.icon;

  return (
    <motion.article
      className="presentation-icon-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.32 }}
    >
      <div className="presentation-icon-head">
        <span>{card.meta}</span>
        <Icon size={20} />
      </div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
    </motion.article>
  );
}

function BenchmarkChart({
  title,
  unit,
  scaleMax,
  note,
  bars,
}: {
  title: string;
  unit: string;
  scaleMax: number;
  note: string;
  bars: { label: string; value: number; display: string; tone: string }[];
}) {
  return (
    <article className="presentation-chart-card">
      <div className="presentation-chart-head">
        <span>{unit}</span>
        <BarChart3 size={19} />
      </div>
      <h3>{title}</h3>
      <div className="presentation-bar-stack">
        {bars.map((bar) => (
          <div className={`presentation-bar-row is-${bar.tone}`} key={`${title}-${bar.label}`}>
            <div>
              <strong>{bar.label}</strong>
              <em>{bar.display}</em>
            </div>
            <span>
              <i style={{ width: getBarWidth(bar.value, scaleMax) }} />
            </span>
          </div>
        ))}
      </div>
      <p>{note}</p>
    </article>
  );
}

function SourceImageCard({
  title,
  text,
  image,
  href,
}: {
  title: string;
  text: string;
  image: string;
  href: string;
}) {
  return (
    <a className="presentation-source-card" href={href} target="_blank" rel="noreferrer">
      <img src={image} alt={title} loading="lazy" />
      <div>
        <span>Fuente interna</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </a>
  );
}

function PresentationHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 720], [0, 82]);
  const opacity = useTransform(scrollY, [0, 560], [1, 0.45]);

  return (
    <section className="presentation-hero">
      <motion.div className="presentation-hero-map" style={{ y, opacity }} aria-hidden="true">
        <span className="presentation-route-line" />
        <div className="presentation-map-node presentation-map-node-colombia">
          <small>Origen</small>
          <strong>Colombia</strong>
        </div>
        <div className="presentation-map-node presentation-map-node-florida is-priority">
          <small>Entrada</small>
          <strong>Florida</strong>
        </div>
        <div className="presentation-map-node presentation-map-node-texas">
          <small>Escala</small>
          <strong>Texas</strong>
        </div>
      </motion.div>

      <motion.div
        className="presentation-hero-copy"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62 }}
      >
        <span>Presentación estratégica / Selección estatal prioritaria</span>
        <h1>Florida y Texas: los estados más atractivos para la expansión de UMO</h1>
        <p>
          Comparación ejecutiva entre Florida y Texas frente a otros estados para definir dónde iniciar con
          menor fricción, mayor visibilidad comercial y mejor oportunidad de aprendizaje.
        </p>
        <div className="presentation-hero-actions">
          <a href="#decision">
            Ver recomendación <ArrowUpRight size={17} />
          </a>
          <Link to="/entregas/entrega-3/recopilacion">
            Soportes de entornos <FileText size={17} />
          </Link>
        </div>
      </motion.div>

      <div className="presentation-hero-summary">
        <article>
          <small>Recomendación</small>
          <strong>Florida primero</strong>
          <p>Validación comercial con landscaping, turfgrass, B2C, B2B ligero y logística más cercana.</p>
        </article>
        <article>
          <small>Expansión</small>
          <strong>Texas después</strong>
          <p>Escala productiva para agricultura, ranchos, maquinaria pesada y distribuidores técnicos.</p>
        </article>
      </div>
    </section>
  );
}

export default function PresentationPage({ locale }: { locale: Locale }) {
  const turfgrass2025 = getLatestSeriesPoint("turfgrass");
  const agriculture2025 = getLatestSeriesPoint("agricultura");
  const income2025 = getLatestSeriesPoint("ingreso");
  const unemployment2025 = getLatestSeriesPoint("desempleo");

  const environmentScoreRows = useMemo(
    () =>
      environmentEntries.map((entry) => ({
        entry,
        score: getEnvironmentAverage(entry.id),
      })),
    [],
  );

  const sourceHighlights = [
    {
      title: "Diagnóstico P-I",
      text: "Identifica fortalezas en direccionamiento y alianzas, pero también brechas en talento internacional, CRM y modos formales de entrada.",
      image: "/assets/content/diagnostico-pi-resumen.png",
      href: documents.find((document) => document.id === "diagnostic-capture")?.href ?? "/assets/content/diagnostico-pi-resumen.png",
    },
    {
      title: "Business Model Canvas",
      text: "Ordena propuesta de valor, segmentos, canales, actividades clave y socios alrededor de sillines y soluciones de comodidad para maquinaria.",
      image: "/assets/content/business-model-canvas.png",
      href: documents.find((document) => document.id === "canvas-img")?.href ?? "/assets/content/business-model-canvas.png",
    },
    {
      title: "DOFA",
      text: "Permite leer fortalezas, oportunidades, debilidades y amenazas para convertir la internacionalización en una ruta gradual y controlada.",
      image: "/assets/content/dofa.png",
      href: documents.find((document) => document.id === "dofa-img")?.href ?? "/assets/content/dofa.png",
    },
  ];

  const strongestDiagnosticMetrics = [...diagnosticMetrics]
    .sort((left, right) => right.value - left.value)
    .slice(0, 5);

  const strategicCanvasBlocks = canvasBlocks.filter((block) =>
    ["Propuesta de valor", "Segmentos", "Canales", "Socios clave"].includes(block.title.es),
  );

  return (
    <main className="presentation-page" lang={locale === "es" ? "es" : "es"}>
      <PresentationHero />

      <nav className="presentation-chapter-nav" aria-label="Navegación de la presentación">
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`}>
            {chapter.label}
          </a>
        ))}
      </nav>

      <section className="presentation-signal-strip" aria-label="Métricas clave del dossier">
        <article>
          <span>Turfgrass Florida</span>
          <strong>USD {turfgrass2025?.florida.toFixed(1)}B</strong>
          <p>Lectura 2025 frente a Texas: USD {turfgrass2025?.texas.toFixed(1)}B.</p>
        </article>
        <article>
          <span>Ruta logística</span>
          <strong>6 días</strong>
          <p>Florida reduce fricción de entrada frente a la ruta más larga hacia Texas.</p>
        </article>
        <article>
          <span>Agricultura Texas</span>
          <strong>USD {agriculture2025?.texas.toFixed(1)}B</strong>
          <p>Base productiva para segunda etapa; Florida: USD {agriculture2025?.florida.toFixed(1)}B.</p>
        </article>
        <article>
          <span>Poder adquisitivo</span>
          <strong>USD {((income2025?.florida ?? 0) / 1000).toFixed(1)}k</strong>
          <p>Florida queda muy cerca de Texas, que marca USD {((income2025?.texas ?? 0) / 1000).toFixed(1)}k.</p>
        </article>
      </section>

      <section id="contexto" className="presentation-section presentation-context-grid">
        <SectionKicker
          eyebrow="01 / Contexto empresarial"
          title="UMO no vende solo piezas: fabrica comodidad para operación intensiva"
          text="UMO S.A. es una empresa colombiana con trayectoria industrial, experiencia en autopartes, sillines, cojines, asientos y soluciones de bienestar. Esa base permite leer su internacionalización como una oportunidad en ergonomía, soporte y durabilidad para usuarios que trabajan durante horas sobre maquinaria."
        />
        <div className="presentation-company-panel">
          <article>
            <Building2 size={22} />
            <span>Empresa</span>
            <h3>{companyProfile.name}</h3>
            <p>
              Fundada en 1968 en Medellín, con más de {companyProfile.experience} años de experiencia
              industrial y una base productiva que puede adaptarse a soluciones de confort para maquinaria.
            </p>
          </article>
          <article>
            <Factory size={22} />
            <span>Capacidad</span>
            <h3>Fabricación adaptable</h3>
            <p>
              La experiencia en poliuretano, tapizado, sillines, accesorios y bienestar permite desarrollar
              repuestos o upgrades para podadoras, tractores pequeños, vehículos utilitarios y equipos de mantenimiento.
            </p>
          </article>
          <article>
            <Tractor size={22} />
            <span>Aplicación del producto</span>
            <h3>Maquinaria de césped y campo</h3>
            <p>
              El usuario objetivo pasa largas jornadas sentado en podadoras, tractores pequeños o vehículos de
              mantenimiento; la comodidad se vuelve productividad, salud lumbar y vida útil del equipo.
            </p>
          </article>
        </div>
        <div className="presentation-product-rack">
          {canvasHighlights.map((item) => (
            <article key={item.title.es}>
              <span>{item.title.es}</span>
              <p>{item.text.es}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sintesis" className="presentation-section">
        <SectionKicker
          eyebrow="02 / Síntesis de entregas anteriores"
          title="De un diagnóstico general a una decisión territorial concreta"
          text="Las fases anteriores permitieron pasar de entender la empresa y su preparación internacional a comparar cuáles estados ofrecen mejores condiciones reales para iniciar. El punto ya no es explicar el país; es demostrar por qué Florida y Texas sobresalen frente al resto."
        />
        <div className="presentation-phase-grid">
          {deliveries.map((delivery) => (
            <article key={delivery.id} className="presentation-phase-card">
              <span>{delivery.code}</span>
              <h3>{delivery.title.es}</h3>
              <p>{delivery.summary.es}</p>
              <strong>{delivery.modules.length} módulos integrados</strong>
            </article>
          ))}
        </div>
        <div className="presentation-source-grid">
          {sourceHighlights.map((source) => (
            <SourceImageCard key={source.title} {...source} />
          ))}
        </div>
        <div className="presentation-findings-grid">
          <article className="presentation-finding-main">
            <span>Hallazgo ejecutivo</span>
            <h3>Florida abre mejor; Texas escala mejor.</h3>
            <p>
              El macrocomparativo demuestra que Texas tiene fuerza estructural en agricultura y volumen.
              El análisis de entornos complementa esa lectura mostrando que Florida ofrece una entrada más
              rápida, visible y comercialmente flexible para validar UMO frente a otros estados posibles.
            </p>
          </article>
          <div className="presentation-mini-metrics">
            {strongestDiagnosticMetrics.map((metric) => (
              <article key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}%</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comparativo" className="presentation-section">
        <SectionKicker
          eyebrow="03 / Análisis comparativo"
          title="Florida y Texas son opciones fuertes, pero cumplen roles distintos"
          text="La recomendación no busca presentar a Texas como una mala opción. Texas es estratégico para una segunda etapa. La pregunta es dónde conviene iniciar con menor fricción y mayor capacidad de aprendizaje comercial."
        />
        <div className="presentation-state-split">
          <article className="presentation-state-panel is-florida">
            <MapPinned size={24} />
            <span>Florida / Entrada prioritaria</span>
            <h3>Mercado verde, residencial y profesional</h3>
            <p>
              Florida combina turfgrass, landscaping, césped residencial, campos de golf, condominios,
              urbanizaciones, compradores digitales y ruta logística más cercana desde Colombia.
            </p>
          </article>
          <article className="presentation-state-panel is-texas">
            <Landmark size={24} />
            <span>Texas / Segunda etapa</span>
            <h3>Mercado productivo, rural y de escala</h3>
            <p>
              Texas concentra agricultura, ganadería, ranchos, distribuidores agrícolas, maquinaria pesada
              y un potencial B2B robusto para crecer después de la validación inicial.
            </p>
          </article>
        </div>
        <div className="presentation-table-shell">
          <table className="presentation-comparison-table">
            <thead>
              <tr>
                <th>Criterio</th>
                <th>Florida</th>
                <th>Texas</th>
                <th>Lectura estratégica</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.criteria}>
                  <th>{row.criteria}</th>
                  <td>{row.florida}</td>
                  <td>{row.texas}</td>
                  <td>{row.reading}</td>
                  <td>
                    <span className={`presentation-priority-chip is-${row.priority.toLowerCase()}`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="benchmarks" className="presentation-section presentation-benchmark-section">
        <SectionKicker
          eyebrow="04 / Benchmark nacional y fiscal"
          title="Florida y Texas destacan frente al promedio nacional y frente a estados más costosos"
          text="El argumento ejecutivo no es que sean los únicos mercados posibles. Es que combinan demanda real para maquinaria exterior, temporada de uso, compra digital, dinamismo empresarial y un marco fiscal más amigable que alternativas grandes como California o New York."
        />
        <div className="presentation-benchmark-grid">
          {nationalBenchmarkGroups.map((group) => (
            <BenchmarkChart key={group.title} {...group} />
          ))}
        </div>
        <div className="presentation-market-fit">
          <article>
            <span>Encaje comercial UMO / Florida</span>
            <h3>Turfgrass, landscaping y mantenimiento de césped</h3>
            <div className="presentation-fit-bars">
              <div>
                <strong>Florida</strong>
                <span>
                  <i style={{ width: getBarWidth(turfgrass2025?.florida ?? 0, 50) }} />
                </span>
                <em>USD {turfgrass2025?.florida.toFixed(1)}B</em>
              </div>
              <div>
                <strong>Texas</strong>
                <span>
                  <i style={{ width: getBarWidth(turfgrass2025?.texas ?? 0, 50) }} />
                </span>
                <em>USD {turfgrass2025?.texas.toFixed(1)}B</em>
              </div>
            </div>
            <p>
              Este gráfico refuerza por qué Florida es la puerta de entrada: el producto puede probarse en
              césped profesional, campos de golf, condominios, urbanizaciones y empresas de mantenimiento.
            </p>
          </article>
          <article>
            <span>Encaje comercial UMO / Texas</span>
            <h3>Agricultura, ranchos y maquinaria pesada</h3>
            <div className="presentation-fit-bars">
              <div>
                <strong>Texas</strong>
                <span>
                  <i style={{ width: getBarWidth(agriculture2025?.texas ?? 0, 40) }} />
                </span>
                <em>USD {agriculture2025?.texas.toFixed(1)}B</em>
              </div>
              <div>
                <strong>Florida</strong>
                <span>
                  <i style={{ width: getBarWidth(agriculture2025?.florida ?? 0, 40) }} />
                </span>
                <em>USD {agriculture2025?.florida.toFixed(1)}B</em>
              </div>
            </div>
            <p>
              Texas se fortalece como segunda etapa: cuando UMO tenga validación en Florida, puede
              llevar evidencia comercial a distribuidores agrícolas, ranchos y canales B2B técnicos.
            </p>
          </article>
        </div>
        <div className="presentation-tax-layout">
          <article className="presentation-tax-intro">
            <CircleDollarSign size={22} />
            <span>Impuestos y facilidad legal de entrada</span>
            <h3>Florida y Texas reducen fricción frente a estados más pesados</h3>
            <p>
              Para una primera fase exportadora, UMO no necesita abrir sede propia. Aun así, comparar el entorno
              fiscal y la facilidad de registro ayuda a demostrar por qué Florida y Texas son más prácticos para
              validar mercado que zonas con mayor carga tributaria o costos de cumplimiento.
            </p>
          </article>
          <div className="presentation-tax-cards">
            {fiscalComparisonRows.map((row) => (
              <article className={`presentation-tax-card is-${row.tone}`} key={row.state}>
                <div>
                  <span>Tax Foundation 2026</span>
                  <strong>#{row.rank}</strong>
                </div>
                <h3>{row.state}</h3>
                <ul>
                  <li>{row.personalTax} impuesto estatal personal.</li>
                  <li>{row.businessTax}.</li>
                  <li>{row.salesTax}.</li>
                  <li>{row.formation}.</li>
                </ul>
                <p>{row.reading}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="presentation-source-note">
          Fuentes consultadas: Tax Foundation 2026 State Tax Competitiveness Index, Florida Department of
          Revenue, Florida Sunbiz, Texas Comptroller, Texas Secretary of State, California Franchise Tax Board y
          California Secretary of State. Esta lectura es estratégica y no reemplaza asesoría legal o tributaria local.
        </p>
      </section>

      <section id="florida" className="presentation-section presentation-deep-section">
        <SectionKicker
          eyebrow="05 / Profundización Florida"
          title="Florida es atractiva por el mercado de césped, jardinería profesional y mantenimiento continuo"
          text="La entrada por Florida permite probar UMO en un mercado donde la comodidad del operador se conecta con residencias, empresas de landscaping, campos de golf, condominios, urbanizaciones y maquinaria de jardín de uso frecuente."
        />
        <div className="presentation-icon-grid">
          {floridaOpportunityCards.map((card) => (
            <IconCard key={card.title} card={card} />
          ))}
        </div>
        <div className="presentation-evidence-band">
          <article>
            <span>Dato del dossier</span>
            <strong>USD {turfgrass2025?.florida.toFixed(1)}B</strong>
            <p>Turfgrass Florida 2025, por encima de Texas en la serie usada por la Entrega 2.</p>
          </article>
          <article>
            <span>Empleo estable</span>
            <strong>{unemployment2025?.florida.toFixed(1)}%</strong>
            <p>Desempleo 2025 menor que Texas, útil para demanda recurrente de servicios y mantenimiento.</p>
          </article>
          <article>
            <span>Ruta Colombia</span>
            <strong>6 días</strong>
            <p>La lectura logística de entornos favorece Florida para probar mercado con menos fricción inicial.</p>
          </article>
        </div>
      </section>

      <section id="texas" className="presentation-section presentation-deep-section">
        <SectionKicker
          eyebrow="06 / Profundización Texas"
          title="Texas conserva alto atractivo para una segunda etapa de expansión"
          text="Texas no pierde atractivo. Su tamaño, cultura agrícola, base ganadera, ranchos y ecosistema de distribuidores lo convierten en un destino sólido cuando UMO ya haya validado producto, precio, logística y canales en Florida."
        />
        <div className="presentation-icon-grid">
          {texasOpportunityCards.map((card) => (
            <IconCard key={card.title} card={card} />
          ))}
        </div>
        <div className="presentation-evidence-band">
          <article>
            <span>Agricultura Texas</span>
            <strong>USD {agriculture2025?.texas.toFixed(1)}B</strong>
            <p>Base productiva 2025 muy superior a Florida, útil para tractores, ranchos y maquinaria pesada.</p>
          </article>
          <article>
            <span>DIY Texas</span>
            <strong>79%</strong>
            <p>La preferencia por mantenimiento directo abre oportunidad de aftermarket y repuestos.</p>
          </article>
          <article>
            <span>Rol recomendado</span>
            <strong>Escala</strong>
            <p>Texas es la fase natural para distribuidores agrícolas y B2B técnico después del piloto.</p>
          </article>
        </div>
      </section>

      <section id="decision" className="presentation-section presentation-decision-section">
        <div className="presentation-decision-copy">
          <span>07 / Selección final</span>
          <h2>Florida se recomienda como mercado inicial prioritario.</h2>
          <p>
            Florida permite validar la propuesta de UMO en un entorno donde convergen el uso frecuente de
            maquinaria de césped, la demanda de soluciones prácticas de comodidad y la posibilidad de combinar
            canales digitales con alianzas locales.
          </p>
        </div>
        <div className="presentation-decision-grid">
          <article>
            <CheckCircle2 size={20} />
            <h3>Por qué Florida primero</h3>
            <ul>
              <li>Mercado residencial, comercial y profesional en la misma entrada.</li>
              <li>Landscaping, turfgrass, campos de golf y mantenimiento de zonas verdes.</li>
              <li>Oportunidad B2C en Amazon y B2B con empresas de landscaping.</li>
              <li>Ruta logística más rápida desde Colombia y afinidad comercial inicial.</li>
              <li>Mejor entorno para aprender rápido sobre compatibilidad, precio y demanda.</li>
            </ul>
          </article>
          <article>
            <Flag size={20} />
            <h3>Cómo queda Texas</h3>
            <p>
              Texas debe entenderse como una segunda etapa de expansión, no como un mercado descartado. Su tamaño,
              cultura agrícola y base ganadera lo convierten en un destino atractivo una vez UMO haya validado
              producto, logística, precios y canales en Florida.
            </p>
          </article>
        </div>
      </section>

      <section id="estrategia" className="presentation-section">
        <SectionKicker
          eyebrow="08 / Estrategia de internacionalización"
          title="Exportación directa + alianzas locales: entrada controlada, medible y escalable"
          text="A partir de la consigna estratégica del archivo Markdown y los análisis del dossier, la ruta recomendada es exportar directamente desde Colombia y combinar la operación con distribuidores, marketplaces y contactos B2B en Florida; posteriormente, replicar aprendizajes hacia Texas."
        />
        <div className="presentation-icon-grid">
          {entryStrategyCards.map((card) => (
            <IconCard key={card.title} card={card} />
          ))}
        </div>
        <div className="presentation-strategy-layout">
          <article>
            <span>Por qué no abrir sede propia al inicio</span>
            <p>
              Una sede propia elevaría costos fijos, requeriría contratación local, cumplimiento más complejo y
              exposición financiera antes de conocer la demanda real. La exportación directa permite validar el
              mercado con menor riesgo y ajustar producto, empaque, precios y soporte sin sobredimensionar la operación.
            </p>
          </article>
          <article>
            <span>Canales de entrada recomendados</span>
            <div className="presentation-channel-cloud">
              {[
                "Amazon",
                "E-commerce propio",
                "Landing de mercado",
                "Landing Florida",
                "Marketplaces",
                "Distribuidores locales",
                "Empresas de landscaping",
                "Tiendas de maquinaria",
                "Campos de golf",
                "Ventas B2B",
                "Ventas B2C",
              ].map((channel) => (
                <i key={channel}>{channel}</i>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="marketing" className="presentation-section">
        <SectionKicker
          eyebrow="09 / Plan de marketing digital"
          title="La demanda debe capturarse con contenido técnico, prueba social y canales medibles"
          text="La estrategia digital no debe limitarse a publicar el producto. Debe convertir la ventaja de UMO en argumentos claros: menos fatiga, mayor durabilidad, compatibilidad, soporte climático y mejor relación valor-precio frente a repuestos OEM."
        />
        <div className="presentation-icon-grid">
          {marketingCards.map((card) => (
            <IconCard key={card.title} card={card} />
          ))}
        </div>
        <div className="presentation-canvas-grid">
          {strategicCanvasBlocks.map((block) => (
            <article key={block.title.es}>
              <span>{block.title.es}</span>
              <p>{block.text.es}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="presentation-section">
        <SectionKicker
          eyebrow="10 / Ruta de implementación"
          title="Primero validar, después escalar"
          text="La recomendación ejecutiva es secuencial: Florida se usa para aprender con bajo riesgo relativo; Texas se activa cuando ya exista evidencia comercial suficiente para negociar con canales más técnicos y de mayor volumen."
        />
        <div className="presentation-roadmap">
          {roadmap.map((step) => (
            <article key={step.phase} data-phase={step.phase}>
              <span>Fase {step.phase}</span>
              <strong>{step.timing}</strong>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="presentation-kpi-panel">
          <article>
            <BarChart3 size={20} />
            <span>Indicadores de validación</span>
            <p>
              Unidades vendidas, margen por canal, tasa de devolución, costo logístico, leads B2B, reseñas, preguntas
              técnicas, tasa de recompra y distribuidores interesados.
            </p>
          </article>
          <article>
            <Globe2 size={20} />
            <span>Conclusión general</span>
            <p>
              La internacionalización de UMO debe iniciar donde sea más fácil aprender,
              demostrar valor y corregir rápido. Por eso Florida es la primera entrada y Texas queda como el
              siguiente mercado de escala.
            </p>
          </article>
        </div>
      </section>

      <section className="presentation-section presentation-video-section">
        <div>
          <span>11 / Video ejecutivo en inglés</span>
          <h2>Espacio preparado para la exposición de máximo 5 minutos</h2>
          <p>
            El archivo Markdown exige incluir una presentación en inglés. Como aún no hay un video cargado en el
            repositorio, esta sección queda lista para insertar el archivo final y deja una estructura de guion.
          </p>
        </div>
        <article>
          <Video size={22} />
          <h3>Suggested English flow</h3>
          <ol>
            <li>UMO company context and product opportunity.</li>
            <li>Why Florida and Texas stand out among the most attractive state options.</li>
            <li>Florida vs Texas comparison and strategic roles.</li>
            <li>Recommended entry strategy: Florida first, Texas second.</li>
            <li>Digital marketing, channels and implementation roadmap.</li>
          </ol>
        </article>
      </section>

      <section className="presentation-section presentation-support-section">
        <SectionKicker
          eyebrow="12 / Sustento del expediente"
          title="Referencias y materiales usados para construir la presentación"
          text="La nueva sección se apoya en los documentos internos del proyecto, las entregas cargadas, el análisis macroeconómico, los entornos, el DOFA, el Canvas, el diagnóstico P-I y la consigna estratégica del archivo Markdown."
        />
        <div className="presentation-reference-layout">
          <article>
            <span>Lecturas DOFA relevantes</span>
            {swotDetailedBlocks.map((block) => (
              <div key={block.title.es} className="presentation-bullet-cluster">
                <strong>{block.title.es}</strong>
                <ul>
                  {block.items.slice(0, 2).map((item) => (
                    <li key={item.es}>{item.es}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
          <article>
            <span>Criterios SMART y viabilidad</span>
            {[...smartCriteria, ...viabilityPillars.slice(0, 3)].map((item) => (
              <div key={item.title.es} className="presentation-bullet-cluster">
                <strong>{item.title.es}</strong>
                <p>{item.text.es}</p>
              </div>
            ))}
          </article>
          <article>
            <span>Referencias APA consolidadas</span>
            <div className="presentation-reference-list">
              {macroReferenceList.slice(0, 8).map((reference) => (
                <p key={reference}>{reference}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
