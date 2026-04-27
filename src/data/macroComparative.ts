import type { Locale } from "../i18n/copy";

type Localized = Record<Locale, string>;

export type MacroSource = {
  label: Localized;
  href: string;
};

export type MacroSeriesPoint = {
  year: string;
  texas: number;
  florida: number;
  national?: number;
  note?: Localized;
};

export type FiscalMetricRow = {
  label: Localized;
  texas: string[];
  florida: string[];
  note: Localized;
};

export type MacroIndicator = {
  id: string;
  title: Localized;
  kicker: Localized;
  chart: "line" | "bar" | "fiscal";
  unit: "percent" | "currency" | "billions";
  precision?: number;
  showNational?: boolean;
  series?: MacroSeriesPoint[];
  summary: Localized;
  keyData: Localized;
  meaning: Localized;
  impact: Localized;
  texasScore: number;
  floridaScore: number;
  texasReason: Localized;
  floridaReason: Localized;
  strategicReading: Localized;
  footnote?: Localized;
  sources: MacroSource[];
  apa: string[];
  fiscalRows?: FiscalMetricRow[];
};

export const macroHero = {
  title: {
    es: "Texas y Florida: dos rutas viables para la internacionalizacion de UMO",
    en: "Texas and Florida: two viable routes for UMO's internationalization",
  },
  subtitle: {
    es: "Texas ofrece escala productiva e industrial; Florida destaca por su mercado verde, residencial y profesional de mantenimiento de cesped.",
    en: "Texas offers industrial and productive scale; Florida stands out for its green, residential and professional lawn-care market.",
  },
  intro: {
    es: "Este analisis compara Texas y Florida como posibles mercados para la entrada de UMO en Estados Unidos, a partir de seis indicadores macroeconomicos y sectoriales. El objetivo es identificar que condiciones economicas favorecen la comercializacion de sillines, cojines y asientos para podadoras, tractores y maquinaria similar.",
    en: "This analysis compares Texas and Florida as possible markets for UMO's entry into the United States, using six macroeconomic and sector indicators. The goal is to identify which economic conditions favor the commercialization of seats, cushions and saddle components for mowers, tractors and similar machinery.",
  },
};

export const macroExecutiveCards = [
  {
    title: { es: "Mercado de escala", en: "Scale market" },
    state: { es: "Texas", en: "Texas" },
    text: {
      es: "Mayor tamano economico, mayor produccion agricola y mejor conexion con maquinaria, operaciones industriales y expansion comercial.",
      en: "Larger economic size, larger agricultural production and a tighter fit with machinery, industrial operations and commercial expansion.",
    },
    detail: {
      es: "PIB 2025 (e): USD 2.90T / Agricultura 2025 (e): USD 38.2B",
      en: "2025 (e) GDP: USD 2.90T / 2025 (e) Agriculture: USD 38.2B",
    },
  },
  {
    title: { es: "Mercado verde/premium", en: "Green / premium market" },
    state: { es: "Florida", en: "Florida" },
    text: {
      es: "Alta relevancia del cesped profesional, jardineria, mantenimiento residencial y paisajismo como oportunidad para productos especializados de UMO.",
      en: "Strong relevance of professional turf, gardening, residential maintenance and landscaping as an opportunity for UMO's specialized products.",
    },
    detail: {
      es: "Turfgrass 2025 (p): USD 44.1B / Ingreso per capita 2025 (e): USD 68.3k",
      en: "2025 (p) Turfgrass: USD 44.1B / 2025 (e) Per capita income: USD 68.3k",
    },
  },
  {
    title: { es: "Estrategia recomendada", en: "Recommended strategy" },
    state: { es: "Ruta dual", en: "Dual route" },
    text: {
      es: "Usar Texas como mercado principal de expansion y Florida como mercado complementario para segmentos premium, residenciales y de areas verdes.",
      en: "Use Texas as the main expansion market and Florida as the complementary market for premium, residential and green-area segments.",
    },
    detail: {
      es: "Texas = volumen, maquinaria y escala / Florida = cesped, paisajismo y valor",
      en: "Texas = volume, machinery and scale / Florida = turf, landscaping and value",
    },
  },
];

export const macroPresentationCards = [
  {
    title: { es: "Que analizamos", en: "What we analyzed" },
    text: {
      es: "Seis indicadores economicos y sectoriales para medir escala de mercado, estabilidad de compra, encaje con maquinaria y facilidad operativa.",
      en: "Six economic and sector indicators to measure market scale, purchasing stability, machinery fit and operating ease.",
    },
  },
  {
    title: { es: "Como le ayuda a UMO", en: "How this helps UMO" },
    text: {
      es: "Reduce la decision intuitiva. La empresa puede priorizar un mercado de mayor volumen sin perder de vista un segundo estado con encaje premium y demanda continua.",
      en: "It reduces intuitive decision-making. The company can prioritize a higher-volume market without losing a second state with premium fit and continuous demand.",
    },
  },
  {
    title: { es: "Como defender la recomendacion", en: "How to defend the recommendation" },
    text: {
      es: "Texas se justifica por escala, agricultura y base industrial; Florida por turfgrass, jardineria profesional, mantenimiento residencial y consumo estable.",
      en: "Texas is justified by scale, agriculture and industrial base; Florida by turfgrass, professional gardening, residential maintenance and steady consumption.",
    },
  },
];

export const macroMethodology = {
  title: { es: "Metodologia de calificacion", en: "Scoring methodology" },
  text: {
    es: "La calificacion se normaliza sobre 5. En cada indicador, el estado con mejor desempeno recibe 5 y el otro se calcula proporcionalmente con base en ese valor. Esto permite comparar magnitudes distintas con una misma escala sin perder la lectura estrategica. El Excel del equipo se usa como fuente principal para series historicas; el indicador de desempleo se completa con BLS porque no venia cargado en la hoja original.",
    en: "The score is normalized to 5. In each indicator, the stronger state receives 5 and the other is calculated proportionally from that value. This makes it possible to compare different magnitudes on a common scale without losing the strategic reading. The team workbook is used as the primary source for historical series; the unemployment indicator is completed with BLS because it was not included in the original file.",
  },
  scale: [
    { label: { es: "1 = Muy desfavorable", en: "1 = Very unfavorable" } },
    { label: { es: "2 = Poco favorable", en: "2 = Slightly favorable" } },
    { label: { es: "3 = Neutral o aceptable", en: "3 = Neutral or acceptable" } },
    { label: { es: "4 = Favorable", en: "4 = Favorable" } },
    { label: { es: "5 = Muy favorable", en: "5 = Very favorable" } },
  ],
};

const workbookSource: MacroSource = {
  label: { es: "Archivo base del equipo (Excel)", en: "Team base file (Excel)" },
  href: "/assets/content/macro-texas-florida.xlsx",
};

const strategyMemoSource: MacroSource = {
  label: { es: "Documento de analisis y redaccion", en: "Analysis and writing memo" },
  href: "/assets/content/macro-texas-florida.docx",
};

export const macroIndicators: MacroIndicator[] = [
  {
    id: "inflacion",
    title: { es: "Inflacion regional y estabilidad de precios", en: "Regional inflation and price stability" },
    kicker: { es: "Indicador 01", en: "Indicator 01" },
    chart: "line",
    unit: "percent",
    precision: 1,
    showNational: true,
    series: [
      { year: "2021", texas: 7.5, florida: 7.1, national: 7.0 },
      { year: "2022", texas: 8.4, florida: 10.1, national: 6.5 },
      { year: "2023", texas: 5.2, florida: 7.4, national: 3.4 },
      { year: "2024", texas: 4.9, florida: 4.5, national: 2.9 },
      { year: "2025", texas: 2.8, florida: 3.2, national: 2.7 },
    ],
    summary: {
      es: "La inflacion muestra que ambos mercados siguen siendo viables, pero con roles distintos. Texas absorbe mejor los ciclos de precios por su escala economica y su tejido productivo. Florida, en cambio, llega al arranque 2026 con una correccion inflacionaria mas rapida, lo que reduce incertidumbre para un producto especializado. Para UMO esto no define por si solo el mercado principal, pero si ayuda a anticipar sensibilidad al precio, ajustes comerciales y estabilidad de margen.",
      en: "Inflation shows that both markets remain viable, but with different roles. Texas absorbs price cycles better thanks to economic scale and productive depth. Florida, meanwhile, reaches early 2026 with a faster inflation correction, reducing uncertainty for a specialized product. For UMO this does not decide the primary market on its own, but it helps anticipate price sensitivity, commercial adjustments and margin stability.",
    },
    keyData: {
      es: "Florida entra a 2026 con 2.1% YoY frente a 3.0% en Texas, aunque Texas cierra 2025 ligeramente por debajo en el estimado anual del Excel.",
      en: "Florida enters 2026 at 2.1% YoY versus 3.0% in Texas, although Texas closes 2025 slightly lower in the workbook's annual estimate.",
    },
    meaning: {
      es: "Menor presion inflacionaria facilita decisiones de precio y reduce ruido sobre el costo total del producto.",
      en: "Lower inflation pressure makes pricing easier and reduces noise around total product cost.",
    },
    impact: {
      es: "Ayuda a entrar con una oferta de valor mas clara en repuestos premium y reduce volatilidad comercial durante el piloto.",
      en: "It helps enter with a clearer premium-aftermarket value proposition and reduces commercial volatility during the pilot.",
    },
    texasScore: 3.5,
    floridaScore: 5,
    texasReason: {
      es: "Texas queda en 3.5/5 porque su inflacion de referencia es mas alta que la de Florida en la lectura comparativa usada por el equipo.",
      en: "Texas lands at 3.5/5 because its reference inflation is higher than Florida's in the team's comparison model.",
    },
    floridaReason: {
      es: "Florida recibe 5/5 porque muestra la mejor estabilidad relativa de precios en el punto de comparacion utilizado para calificar.",
      en: "Florida receives 5/5 because it shows the strongest relative price stability at the comparison point used for scoring.",
    },
    strategicReading: {
      es: "Florida reduce incertidumbre de precio; Texas la compensa con escala y resiliencia.",
      en: "Florida reduces pricing uncertainty; Texas offsets it with scale and resilience.",
    },
    footnote: {
      es: "Proxy regional usado por el Excel: Dallas-Fort Worth-Arlington para Texas y Miami-Fort Lauderdale para Florida. Lectura adicional 2026 Q1: Texas 3.0% / Florida 2.1%.",
      en: "Regional proxy used by the workbook: Dallas-Fort Worth-Arlington for Texas and Miami-Fort Lauderdale for Florida. Additional 2026 Q1 reading: Texas 3.0% / Florida 2.1%.",
    },
    sources: [
      workbookSource,
      { label: { es: "BLS Consumer Price Index", en: "BLS Consumer Price Index" }, href: "https://www.bls.gov/cpi/" },
    ],
    apa: [
      "U.S. Bureau of Labor Statistics. (2025). Consumer Price Index. https://www.bls.gov/cpi/",
      "Fondo Monetario Internacional. (2025). World Economic Outlook. https://www.imf.org/en/Publications/WEO",
    ],
  },
  {
    id: "ingreso",
    title: { es: "Ingreso per capita y poder adquisitivo", en: "Per capita income and purchasing power" },
    kicker: { es: "Indicador 02", en: "Indicator 02" },
    chart: "line",
    unit: "currency",
    precision: 0,
    series: [
      { year: "2021", texas: 60200, florida: 58500 },
      { year: "2022", texas: 63500, florida: 62100 },
      { year: "2023", texas: 66800, florida: 64200 },
      { year: "2024", texas: 67942, florida: 66100 },
      { year: "2025", texas: 69100, florida: 68300 },
    ],
    summary: {
      es: "El ingreso per capita confirma que Texas y Florida tienen capacidad para absorber una propuesta de mayor valor, no solo productos de bajo costo. Texas mantiene una ligera ventaja en ingreso y un salto mayor de PIB estatal, lo que amplia la base potencial de flotas, distribuidores y operadores. Florida queda muy cerca y conserva atractivo en segmentos residenciales, jardineria profesional y mantenimiento premium. Este indicador debe leerse junto al desempleo para entender el poder de compra real y no solo el ingreso nominal.",
      en: "Per capita income confirms that Texas and Florida can absorb a higher-value proposition, not just low-cost products. Texas keeps a slight lead in income and a larger jump in state GDP, expanding the potential base of fleets, distributors and operators. Florida stays close and remains attractive in residential, professional gardening and premium maintenance segments. This indicator should be read alongside unemployment to understand real purchasing power rather than nominal income alone.",
    },
    keyData: {
      es: "En 2025 el ingreso per capita llega a USD 69.1k en Texas y USD 68.3k en Florida; el PIB estimado es USD 2.90T vs USD 1.83T.",
      en: "In 2025 per capita income reaches USD 69.1k in Texas and USD 68.3k in Florida; estimated GDP is USD 2.90T vs USD 1.83T.",
    },
    meaning: {
      es: "Hay mercado para vender confort, ergonomia y durabilidad como propuesta superior, no solo por precio.",
      en: "There is room to sell comfort, ergonomics and durability as a superior proposition, not just on price.",
    },
    impact: {
      es: "Le permite a UMO defender sillines y cojines especializados frente a marcas economicas con un discurso de valor y vida util.",
      en: "It allows UMO to defend specialized seats and cushions against low-cost brands with a value and lifespan argument.",
    },
    texasScore: 5,
    floridaScore: 4.94,
    texasReason: {
      es: "Texas combina ingreso alto con mas escala economica, mayor base B2B y mas volumen potencial para expansion.",
      en: "Texas combines high income with more economic scale, a larger B2B base and more potential volume for expansion.",
    },
    floridaReason: {
      es: "Florida queda en 4.94/5 porque su ingreso per capita es casi equivalente al de Texas y conserva capacidad de compra muy alta.",
      en: "Florida lands at 4.94/5 because its per capita income is almost equivalent to Texas and preserves strong purchasing power.",
    },
    strategicReading: {
      es: "Texas lidera por escala; Florida sigue siendo solvente para un posicionamiento premium y residencial.",
      en: "Texas leads on scale; Florida remains solvent for premium and residential positioning.",
    },
    footnote: {
      es: "Serie principal desde el Excel: renta per capita 2021-2025. La lectura de escala incorpora el PIB estatal estimado del mismo archivo.",
      en: "Primary series from the workbook: 2021-2025 per capita income. The scale reading also incorporates estimated state GDP from the same file.",
    },
    sources: [
      workbookSource,
      { label: { es: "BEA ingreso personal por estado", en: "BEA personal income by state" }, href: "https://www.bea.gov/data/income-saving/personal-income-by-state" },
      { label: { es: "BEA GDP por estado", en: "BEA GDP by state" }, href: "https://www.bea.gov/data/gdp/gdp-state" },
    ],
    apa: [
      "Bureau of Economic Analysis. (2025). Personal income by state. https://www.bea.gov/data/income-saving/personal-income-by-state",
      "Bureau of Economic Analysis. (2025). Gross domestic product by state. https://www.bea.gov/data/gdp/gdp-state",
    ],
  },
  {
    id: "desempleo",
    title: { es: "Tasa de desempleo y estabilidad laboral", en: "Unemployment rate and labor stability" },
    kicker: { es: "Indicador 06", en: "Indicator 06" },
    chart: "line",
    unit: "percent",
    precision: 1,
    series: [
      { year: "2021", texas: 5.7, florida: 4.5 },
      { year: "2022", texas: 3.8, florida: 2.8 },
      { year: "2023", texas: 4.0, florida: 2.7 },
      { year: "2024", texas: 4.1, florida: 3.1 },
      { year: "2025", texas: 4.1, florida: 3.8 },
    ],
    summary: {
      es: "El desempleo aterriza la lectura del poder adquisitivo. No basta con tener ingreso alto; tambien importa cuanta estabilidad laboral sostiene el mercado. Florida mantiene tasas mas bajas entre 2022 y 2025, lo que sugiere una base de consumo y servicio mas continua. Texas no presenta una señal negativa, pero se mueve en un rango ligeramente mas alto. Para UMO esto es importante porque sus productos dependen de operadores, contratistas, talleres, paisajistas y empresas que renuevan equipos cuando su actividad se mantiene estable.",
      en: "Unemployment grounds the purchasing-power reading. High income alone is not enough; labor stability also matters. Florida keeps lower rates from 2022 through 2025, suggesting a more continuous service and consumption base. Texas does not show a negative signal, but it moves in a slightly higher range. For UMO this matters because its products depend on operators, contractors, workshops, landscapers and companies that renew equipment when activity stays stable.",
    },
    keyData: {
      es: "En 2025 Florida cierra en 3.8% y Texas en 4.1%; por eso Florida toma el 5 y Texas se calcula relativo a ese valor.",
      en: "In 2025 Florida closes at 3.8% and Texas at 4.1%; Florida takes the 5 and Texas is calculated relative to that value.",
    },
    meaning: {
      es: "Un mercado con empleo mas estable sostiene mejor compras recurrentes y contratos de mantenimiento.",
      en: "A market with more stable employment sustains recurring purchases and maintenance contracts better.",
    },
    impact: {
      es: "Refuerza la viabilidad de vender accesorios y repuestos a empresas de paisajismo, mantenimiento y operacion de maquinaria.",
      en: "It reinforces the viability of selling accessories and spare parts to landscaping, maintenance and machinery-operation businesses.",
    },
    texasScore: 4.63,
    floridaScore: 5,
    texasReason: {
      es: "Texas queda en 4.63/5 porque su desempleo es ligeramente mas alto que el de Florida en el cierre comparado.",
      en: "Texas lands at 4.63/5 because its unemployment rate is slightly higher than Florida's in the closing comparison.",
    },
    floridaReason: {
      es: "Florida recibe 5/5 porque registra la mejor estabilidad laboral relativa dentro de la comparacion construida para este indicador.",
      en: "Florida receives 5/5 because it records the strongest relative labor stability in the comparison built for this indicator.",
    },
    strategicReading: {
      es: "Florida sostiene mejor continuidad laboral; Texas sigue siendo funcional para operar a escala, pero con una ligera desventaja relativa.",
      en: "Florida sustains better labor continuity; Texas remains functional for scale, but with a slight relative disadvantage.",
    },
    footnote: {
      es: "Este es el unico indicador completado fuera del Excel original porque la hoja no venia con serie de desempleo. Se usaron datos oficiales de BLS y la misma regla comparativa de 5 puntos.",
      en: "This is the only indicator completed outside the original workbook because the sheet did not include an unemployment series. Official BLS data and the same 5-point comparison rule were used.",
    },
    sources: [
      { label: { es: "BLS Local Area Unemployment Statistics", en: "BLS Local Area Unemployment Statistics" }, href: "https://www.bls.gov/lau/" },
      { label: { es: "BLS labor underutilization by state", en: "BLS labor underutilization by state" }, href: "https://www.bls.gov/lau/stalt.htm" },
    ],
    apa: [
      "U.S. Bureau of Labor Statistics. (2026). Local area unemployment statistics. https://www.bls.gov/lau/",
      "U.S. Bureau of Labor Statistics. (2026). State labor underutilization rates. https://www.bls.gov/lau/stalt.htm",
    ],
  },
  {
    id: "agricultura",
    title: { es: "Valor de la produccion agricola", en: "Agricultural production value" },
    kicker: { es: "Indicador 03", en: "Indicator 03" },
    chart: "bar",
    unit: "billions",
    precision: 1,
    series: [
      { year: "2021", texas: 24.9, florida: 7.7, note: { es: "Recuperacion post-pandemia; alta demanda de equipos.", en: "Post-pandemic recovery; strong equipment demand." } },
      { year: "2022", texas: 32.2, florida: 8.1, note: { es: "Pico de commodities; renovacion de flotas.", en: "Commodity peak; fleet renewal." } },
      { year: "2023", texas: 36.5, florida: 8.4, note: { es: "Tasas altas; giro hacia mantenimiento aftermarket.", en: "Higher rates; shift toward aftermarket maintenance." } },
      { year: "2024", texas: 35.8, florida: 8.6, note: { es: "Estabilizacion; foco en eficiencia y ergonomia.", en: "Stabilization; focus on efficiency and ergonomics." } },
      { year: "2025", texas: 38.2, florida: 8.9, note: { es: "Proyeccion record por tecnificacion y ayudas federales.", en: "Record projection driven by technification and federal support." } },
    ],
    summary: {
      es: "La produccion agricola es el indicador que mejor explica por que Texas debe ser el mercado principal. La diferencia de escala frente a Florida es amplia durante toda la serie y conecta de forma directa con tractores, maquinaria, podadoras y equipos donde UMO puede vender ergonomia, confort y reposicion. Florida sigue siendo util para nichos agricolas concretos, pero no ofrece el mismo volumen estructural. Si el objetivo es abrir mercado con una base productiva de gran escala, Texas tiene el mejor encaje operativo.",
      en: "Agricultural production is the indicator that best explains why Texas should be the main market. The scale gap versus Florida is wide across the whole series and connects directly with tractors, machinery, mowers and equipment where UMO can sell ergonomics, comfort and replacement solutions. Florida remains useful for specific agricultural niches, but it does not offer the same structural volume. If the goal is to open a market with a large productive base, Texas has the strongest operational fit.",
    },
    keyData: {
      es: "Texas proyecta USD 38.2B en 2025 frente a USD 8.9B en Florida.",
      en: "Texas projects USD 38.2B in 2025 versus USD 8.9B in Florida.",
    },
    meaning: {
      es: "Hay mas actividad productiva ligada a maquinaria y mas equipos en uso que pueden requerir mejoras o reposicion.",
      en: "There is more productive activity tied to machinery and more equipment in use that may require upgrades or replacement.",
    },
    impact: {
      es: "Refuerza a Texas como primer territorio para abrir relacion con distribuidores, talleres y operadores de maquinaria.",
      en: "It reinforces Texas as the first territory to open relationships with distributors, workshops and machinery operators.",
    },
    texasScore: 5,
    floridaScore: 1.16,
    texasReason: {
      es: "La escala agricola y la relacion con maquinaria convierten a Texas en el mejor punto de arranque productivo.",
      en: "Agricultural scale and its link to machinery make Texas the best productive starting point.",
    },
    floridaReason: {
      es: "Florida queda en 1.16/5 porque su escala agricola es muy inferior a la de Texas en la comparacion 2025 usada para calificar.",
      en: "Florida lands at 1.16/5 because its agricultural scale is far below Texas in the 2025 comparison used for scoring.",
    },
    strategicReading: {
      es: "Texas domina por escala y cercania al uso intensivo de maquinaria.",
      en: "Texas dominates through scale and proximity to intensive machinery use.",
    },
    footnote: {
      es: "La columna de tendencia en maquinaria del Excel se usa como lectura cualitativa del contexto de compra: renovacion de flotas, mantenimiento y ergonomia laboral.",
      en: "The machinery trend column in the workbook is used as a qualitative reading of buying context: fleet renewal, maintenance and labor ergonomics.",
    },
    sources: [
      workbookSource,
      {
        label: { es: "USDA Farm income and wealth statistics", en: "USDA Farm income and wealth statistics" },
        href: "https://www.ers.usda.gov/data-products/farm-income-and-wealth-statistics/",
      },
    ],
    apa: [
      "U.S. Department of Agriculture, Economic Research Service. (2025). Farm income and wealth statistics. https://www.ers.usda.gov/data-products/farm-income-and-wealth-statistics/",
    ],
  },
  {
    id: "turfgrass",
    title: { es: "Industria turfgrass y cesped profesional", en: "Turfgrass and professional lawn industry" },
    kicker: { es: "Indicador 04", en: "Indicator 04" },
    chart: "bar",
    unit: "billions",
    precision: 1,
    series: [
      { year: "2021", texas: 31.2, florida: 31.4 },
      { year: "2022", texas: 34.5, florida: 36.2 },
      { year: "2023", texas: 37.1, florida: 41.9 },
      { year: "2024", texas: 38.2, florida: 42.8 },
      { year: "2025", texas: 39.5, florida: 44.1 },
    ],
    summary: {
      es: "La industria de turfgrass es el puente mas directo entre la estrategia de UMO y el uso real de podadoras, asientos, cojines y repuestos ergonomicos. Ambos estados son fuertes, pero Florida sobresale por continuidad climatica, turismo, paisajismo, mantenimiento residencial y operacion de areas verdes durante todo el ano. Texas tambien es grande y comercialmente atractivo, pero Florida ofrece una lectura mas fina para segmentos premium y de servicio constante. Esta es la razon para tratarlo como mercado complementario de alto valor y no como un descarte.",
      en: "The turfgrass industry is the most direct bridge between UMO's strategy and the real use of mowers, seats, cushions and ergonomic spare parts. Both states are strong, but Florida stands out due to climate continuity, tourism, landscaping, residential maintenance and year-round green-area operation. Texas is also large and commercially attractive, but Florida provides a sharper reading for premium and constant-service segments. That is why it should be treated as a high-value complementary market rather than discarded.",
    },
    keyData: {
      es: "Florida proyecta USD 44.1B en 2025 y supera a Texas, que llega a USD 39.5B.",
      en: "Florida projects USD 44.1B in 2025 and stays above Texas, which reaches USD 39.5B.",
    },
    meaning: {
      es: "Existe una demanda estable de mantenimiento de cesped, podadoras y equipos asociados en segmentos residenciales y profesionales.",
      en: "There is stable demand for lawn maintenance, mowers and associated equipment in both residential and professional segments.",
    },
    impact: {
      es: "Florida encaja muy bien para vender mejoras de confort y reposicion en podadoras de paisajismo, hoteleria y servicios verdes.",
      en: "Florida fits very well for selling comfort upgrades and replacement parts for landscaping, hospitality and green-service mowers.",
    },
    texasScore: 4.47,
    floridaScore: 5,
    texasReason: {
      es: "Texas queda en 4.47/5 porque sigue siendo grande, pero Florida marca la referencia maxima en turfgrass.",
      en: "Texas lands at 4.47/5 because it remains large, but Florida sets the maximum reference in turfgrass.",
    },
    floridaReason: {
      es: "Florida domina por continuidad climatica, mantenimiento de areas verdes y consumo premium ligado a paisajismo y turismo.",
      en: "Florida leads because of climate continuity, green-area maintenance and premium demand tied to landscaping and tourism.",
    },
    strategicReading: {
      es: "Florida es la mejor puerta al segmento verde y premium; Texas sigue siendo un mercado complementario muy fuerte.",
      en: "Florida is the strongest door into the green and premium segment; Texas remains a very strong complementary market.",
    },
    footnote: {
      es: "El Excel consolida esta serie a partir de Texas A&M AgriLife Research y University of Florida IFAS. La lectura estrategica se apoya en continuidad de uso y tamano del mercado verde.",
      en: "The workbook consolidates this series from Texas A&M AgriLife Research and the University of Florida IFAS. The strategic reading relies on continuity of use and green-market size.",
    },
    sources: [
      workbookSource,
      { label: { es: "Texas A&M AgriLife Turf Program", en: "Texas A&M AgriLife Turf Program" }, href: "https://aggieturf.tamu.edu/" },
      { label: { es: "University of Florida IFAS", en: "University of Florida IFAS" }, href: "https://ifas.ufl.edu/" },
    ],
    apa: [
      "Texas A&M AgriLife Research. (2025). Turf program and industry resources. https://aggieturf.tamu.edu/",
      "University of Florida IFAS. (2025). Turfgrass and landscape resources. https://ifas.ufl.edu/",
    ],
  },
  {
    id: "fiscal",
    title: { es: "Contexto fiscal estatal e impuestos aplicables", en: "State tax context and applicable taxes" },
    kicker: { es: "Indicador 05", en: "Indicator 05" },
    chart: "fiscal",
    unit: "percent",
    summary: {
      es: "El contexto fiscal no decide el mercado por si solo, pero si cambia la forma de entrar, facturar y cumplir. Texas no tiene impuesto corporativo tradicional, aunque si puede aplicar franchise tax segun ingresos y tipo de entidad. Florida aplica corporate income tax estatal y sales tax general del 6%. Texas aplica sales tax estatal de 6.25%, con posibles impuestos locales adicionales. Para UMO, la lectura correcta es operativa: como estructurar la venta, cuando se gatillan obligaciones y que estado facilita mas una fase inicial con menor friccion regulatoria.",
      en: "Tax context does not decide the market on its own, but it changes how entry, billing and compliance must be structured. Texas has no traditional corporate income tax, although franchise tax may apply depending on revenue and entity type. Florida applies a state corporate income tax and a general 6% sales tax. Texas applies a 6.25% state sales tax with possible local add-ons. For UMO the correct reading is operational: how to structure sales, when obligations are triggered and which state creates less regulatory friction in the first phase.",
    },
    keyData: {
      es: "Texas combina 6.25% de sales tax base, sin impuesto corporativo tradicional y nexus de USD 500k; Florida opera con 6% de sales tax, impuesto corporativo estatal y nexus desde USD 100k.",
      en: "Texas combines a 6.25% base sales tax, no traditional corporate income tax and a USD 500k nexus threshold; Florida operates with 6% sales tax, a state corporate income tax and nexus from USD 100k.",
    },
    meaning: {
      es: "Ambos estados son competitivos, pero no bajo la misma arquitectura tributaria.",
      en: "Both states are competitive, but not under the same tax architecture.",
    },
    impact: {
      es: "Le permite a UMO preparar distribucion, facturacion y cumplimiento con una entrada mas ordenada y realista.",
      en: "It allows UMO to prepare distribution, billing and compliance with a more ordered and realistic entry model.",
    },
    texasScore: 4.8,
    floridaScore: 5,
    texasReason: {
      es: "Texas queda en 4.8/5 en la comparacion de sales tax, porque 6.25% es ligeramente superior al 6% de Florida.",
      en: "Texas lands at 4.8/5 in the sales-tax comparison because 6.25% is slightly above Florida's 6%.",
    },
    floridaReason: {
      es: "Florida recibe 5/5 por la menor tasa base de sales tax en la regla comparativa del cuadro, aunque sigue exigiendo lectura de impuesto corporativo y nexus.",
      en: "Florida receives 5/5 because of the lower base sales-tax rate in the comparison rule, although it still requires attention to corporate tax and nexus.",
    },
    strategicReading: {
      es: "Florida gana la comparacion de tasa base; Texas conserva atractivo operativo por franchise tax y umbral de nexus mas amplio.",
      en: "Florida wins the base-rate comparison; Texas keeps operational appeal through franchise tax treatment and a wider nexus threshold.",
    },
    footnote: {
      es: "Este indicador se presenta como contexto de operacion, no como comercio exterior. La recomendacion fiscal no reemplaza asesoria tributaria local.",
      en: "This indicator is presented as an operating context, not as foreign trade. The tax recommendation does not replace local tax advice.",
    },
    sources: [
      workbookSource,
      { label: { es: "Texas franchise tax", en: "Texas franchise tax" }, href: "https://comptroller.texas.gov/taxes/franchise/" },
      { label: { es: "Texas sales and use tax", en: "Texas sales and use tax" }, href: "https://comptroller.texas.gov/taxes/sales/" },
      { label: { es: "Florida corporate income tax", en: "Florida corporate income tax" }, href: "https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx" },
      { label: { es: "Florida sales and use tax", en: "Florida sales and use tax" }, href: "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx" },
    ],
    apa: [
      "Texas Comptroller of Public Accounts. (2025). Franchise tax. https://comptroller.texas.gov/taxes/franchise/",
      "Texas Comptroller of Public Accounts. (2025). Sales and use tax. https://comptroller.texas.gov/taxes/sales/",
      "Florida Department of Revenue. (2025). Corporate income tax. https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx",
      "Florida Department of Revenue. (2025). Sales and use tax. https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx",
    ],
    fiscalRows: [
      {
        label: { es: "Sales tax estatal", en: "State sales tax" },
        texas: ["6.25%", "6.25%", "6.25%", "6.25%", "6.25%"],
        florida: ["6.00%", "6.00%", "6.00%", "6.00%", "6.00%"],
        note: {
          es: "Texas puede sumar impuestos locales de hasta 2%; Florida mantiene una base menor, pero sin la ventaja de nexus alto.",
          en: "Texas may add local taxes up to 2%; Florida keeps a lower base, but without the higher nexus advantage.",
        },
      },
      {
        label: { es: "Corporate income tax / similar", en: "Corporate income tax / similar" },
        texas: ["No tradicional", "No tradicional", "No tradicional", "No tradicional", "No tradicional"],
        florida: ["3.53%", "5.50%", "5.50%", "5.50%", "5.50%"],
        note: {
          es: "Texas no tiene impuesto corporativo tradicional, pero si puede aplicar franchise tax segun ingresos y tipo de entidad.",
          en: "Texas has no traditional corporate income tax, but franchise tax may apply depending on revenue and entity type.",
        },
      },
      {
        label: { es: "Income tax personal", en: "Personal income tax" },
        texas: ["0%", "0%", "0%", "0%", "0%"],
        florida: ["0%", "0%", "0%", "0%", "0%"],
        note: {
          es: "Los dos estados conservan atractivo para talento y operadores por la ausencia de income tax personal.",
          en: "Both states remain attractive for talent and operators because they do not levy personal income tax.",
        },
      },
      {
        label: { es: "Umbral de nexus economico", en: "Economic nexus threshold" },
        texas: ["USD 500k", "USD 500k", "USD 500k", "USD 500k", "USD 500k"],
        florida: ["USD 100k", "USD 100k", "USD 100k", "USD 100k", "USD 100k"],
        note: {
          es: "Texas da mas espacio antes de activar obligaciones de sales tax; Florida exige cumplimiento mas temprano.",
          en: "Texas provides more room before triggering sales-tax obligations; Florida requires compliance earlier.",
        },
      },
    ],
  },
];

export const macroConclusion = {
  title: {
    es: "Conclusion estrategica: dos mercados, dos oportunidades",
    en: "Strategic conclusion: two markets, two opportunities",
  },
  text: {
    es: "El analisis no descarta a ninguno de los dos estados. Texas y Florida representan oportunidades distintas para UMO. Texas se perfila como el mercado principal por su escala economica, produccion agricola, base industrial y relacion con maquinaria. Florida se posiciona como un mercado complementario de alto valor por su fortaleza en cesped profesional, jardineria, mantenimiento residencial y areas verdes. La mejor estrategia no es escoger uno y abandonar el otro, sino priorizar Texas para expansion operativa y usar Florida como mercado especializado para segmentos verdes y premium.",
    en: "The analysis does not discard either state. Texas and Florida represent different opportunities for UMO. Texas emerges as the main market because of economic scale, agricultural production, industrial base and machinery fit. Florida positions itself as a high-value complementary market because of its strength in professional turf, gardening, residential maintenance and green areas. The best strategy is not to choose one and abandon the other, but to prioritize Texas for operational expansion and use Florida as a specialized market for green and premium segments.",
  },
  states: [
    {
      state: { es: "Texas", en: "Texas" },
      text: {
        es: "Escala, agricultura, maquinaria y expansion.",
        en: "Scale, agriculture, machinery and expansion.",
      },
    },
    {
      state: { es: "Florida", en: "Florida" },
      text: {
        es: "Cesped profesional, jardineria, mantenimiento residencial y mercado premium.",
        en: "Professional turf, gardening, residential maintenance and premium market.",
      },
    },
  ],
};

export const macroSupportingSources = [workbookSource, strategyMemoSource];

export const macroReferenceList = Array.from(
  new Set(macroIndicators.flatMap((indicator) => indicator.apa)),
);
