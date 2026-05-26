import type { Localized } from "./content";
import { normalizeSpanishContent } from "../i18n/spanish";

export type EnvironmentDetailMetric = {
  label: Localized;
  display: string;
  chartValue?: number;
};

export type EnvironmentIndicatorDetail = {
  id: string;
  title: Localized;
  eyebrow: Localized;
  summary: Localized;
  texas: EnvironmentDetailMetric & { score: number };
  florida: EnvironmentDetailMetric & { score: number };
  reference?: EnvironmentDetailMetric;
  chartMax?: number;
  lowerIsBetter?: boolean;
  chartNote?: Localized;
  latestLabel: Localized;
  tableRows: {
    label: Localized;
    texas: string;
    florida: string;
    reference?: string;
  }[];
  bullets: Localized[];
  analysis: {
    keyData: Localized;
    meaning: Localized;
    impact: Localized;
    score: Localized;
  };
  sources: { label: string; href?: string }[];
  series?: {
    year: string;
    texas: number;
    florida: number;
    national?: number;
    note?: Localized;
  }[];
  strategicReading?: Localized;
};

export type EnvironmentDeepDive = {
  id: string;
  heroEyebrow: Localized;
  heroTitle: Localized;
  heroSummary: Localized;
  presentationBullets: Localized[];
  conclusion: Localized;
  indicators: EnvironmentIndicatorDetail[];
};

export const environmentDeepDiveMap: Record<string, EnvironmentDeepDive> = normalizeSpanishContent<Record<string, EnvironmentDeepDive>>({
  "entorno-cultural-social": {
    id: "entorno-cultural-social",
    heroEyebrow: {
      es: "ENTREGA 03 / ENTORNO CULTURAL Y SOCIAL",
      en: "DELIVERY 03 / CULTURAL AND SOCIAL ENVIRONMENT",
    },
    heroTitle: {
      es: "Cultura de uso, jardin y aftermarket directo",
      en: "Usage culture, lawn care and direct aftermarket demand",
    },
    heroSummary: {
      es: "Este entorno explica por que Florida y Texas no solo tienen mercado, sino una rutina de uso real alrededor del jardin, la maquinaria ligera y el mantenimiento exterior. La decision no depende solo del tamano del estado; depende de que exista una cultura que haga frecuente el reemplazo, la mejora y la compra directa de partes.",
      en: "This environment explains why Florida and Texas not only have market size, but also a real usage routine around lawns, light machinery and outdoor maintenance. The decision does not depend only on size; it depends on whether there is a culture that makes replacement, upgrades and direct-parts buying frequent.",
    },
    presentationBullets: [
      {
        es: "Ambos estados sobresalen frente al contexto general del pais porque concentran vivienda suburbana, patio privado y mantenimiento exterior constante.",
        en: "Both states stand out against the broader country context because they concentrate suburban housing, private yards and constant outdoor maintenance.",
      },
      {
        es: "Florida se ve mas fuerte en urbanizacion y gasto por hogar; Texas lidera en preferencia por DIY y volumen operativo.",
        en: "Florida looks stronger in urbanization and household spending; Texas leads in DIY preference and operating volume.",
      },
      {
        es: "Para UMO, esto valida una entrada aftermarket: repuestos, upgrades de confort y venta directa al usuario o al contratista.",
        en: "For UMO, this validates an aftermarket entry: replacement parts, comfort upgrades and direct sales to the end user or contractor.",
      },
    ],
    conclusion: {
      es: "La lectura cultural y social deja claro que Texas y Florida no compiten por el mismo rol exacto. Los dos sirven porque el pais ya tiene una cultura fuerte de jardin y mantenimiento, pero Florida empuja mas por valor residencial y Texas por amplitud de uso y accion DIY.",
      en: "The cultural and social reading makes it clear that Texas and Florida do not compete for the exact same role. Both matter because the country already has a strong lawn-care and maintenance culture, but Florida pushes more through residential value and Texas through usage breadth and DIY action.",
    },
    indicators: [
      {
        id: "urbanizacion-suburbana",
        eyebrow: { es: "Indicador 01", en: "Indicator 01" },
        title: { es: "Urbanizacion y areas suburbanas", en: "Urbanization and suburban areas" },
        summary: {
          es: "Florida y Texas concentran vivienda suburbana y crecimiento residencial, lo que amplifica la necesidad de mantenimiento exterior y maquinaria ligera.",
          en: "Florida and Texas concentrate suburban housing and residential growth, which increases the need for outdoor maintenance and light machinery.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "86.8%", chartValue: 86.8, score: 4.67 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "93.0%", chartValue: 93.0, score: 5 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "Suburbia como base de demanda",
        },
        chartMax: 100,
        latestLabel: { es: "Proyeccion 2025", en: "2025 projection" },
        tableRows: [
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "93.0%", reference: "Crecimiento residencial alto" },
          { label: { es: "Texas", en: "Texas" }, texas: "86.8%", florida: "-", reference: "Mercado masivo en expansion" },
          { label: { es: "Lectura UMO", en: "UMO reading" }, texas: "Mas patios y uso exterior", florida: "Mas densidad suburbana", reference: "Base estable para podadoras" },
        ],
        bullets: [
          {
            es: "Cada nueva casa unifamiliar suma patio, cesped y mantenimiento obligatorio.",
            en: "Each new single-family home adds a yard, lawn and mandatory maintenance.",
          },
          {
            es: "La expansion suburbana permite anticipar demanda con lectura de vivienda y permisos.",
            en: "Suburban expansion allows demand forecasting through housing and permit signals.",
          },
          {
            es: "Esto conecta mas con el pais real que con una comparacion escolar entre dos estados.",
            en: "This connects more with the real country context than with a school-style state-vs-state comparison.",
          },
        ],
        analysis: {
          keyData: {
            es: "Florida llega a 93.0% y Texas a 86.8% en urbanizacion proyectada para 2025.",
            en: "Florida reaches 93.0% and Texas 86.8% in projected urbanization for 2025.",
          },
          meaning: {
            es: "Los dos estados tienen una base residencial fuerte para sostener jardin, paisajismo y uso frecuente de maquinaria exterior.",
            en: "Both states have a strong residential base to sustain lawn care, landscaping and frequent outdoor machinery use.",
          },
          impact: {
            es: "UMO puede leer estos territorios como mercados donde el equipo no se compra una sola vez: se usa, se desgasta y se mejora.",
            en: "UMO can read these territories as markets where equipment is not bought only once: it is used, worn and upgraded.",
          },
          score: {
            es: "Florida recibe 5/5 por la mayor concentracion suburbana. Texas queda en 4.67/5 porque sigue siendo enorme y escalable, aunque con menor porcentaje relativo.",
            en: "Florida gets 5/5 for the stronger suburban concentration. Texas stays at 4.67/5 because it is still huge and scalable, though with a lower relative percentage.",
          },
        },
        sources: [
          { label: "U.S. Census Bureau - Vintage 2024/2025 Population and Housing Estimates" },
          { label: "Texas Tribune / TXDOT Analysis" },
          { label: "USAFacts Florida Profile" },
        ],
      },
      {
        id: "cuidado-jardin",
        eyebrow: { es: "Indicador 02", en: "Indicator 02" },
        title: { es: "Cuidado del jardin y mantenimiento del hogar", en: "Yard care and home maintenance" },
        summary: {
          es: "El gasto por hogar confirma que en ambos estados el jardin no es un lujo: es una rutina sostenida con dinero real.",
          en: "Per-household spending confirms that in both states lawn care is not a luxury: it is a sustained routine with real money behind it.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "USD 712", chartValue: 712, score: 4.72 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "USD 755", chartValue: 755, score: 5 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "Sun Belt con gasto sostenido",
        },
        chartMax: 800,
        latestLabel: { es: "Gasto por hogar", en: "Household spending" },
        tableRows: [
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "USD 755", reference: "Mercado residencial premium" },
          { label: { es: "Texas", en: "Texas" }, texas: "USD 712", florida: "-", reference: "Volumen alto y sostenido" },
          { label: { es: "Lectura UMO", en: "UMO reading" }, texas: "Compra funcional y recurrente", florida: "Mayor disposicion de pago", reference: "Menor sensibilidad a precio" },
        ],
        bullets: [
          {
            es: "El gasto se sostiene porque mantener el cesped protege la valorizacion del hogar.",
            en: "Spending stays high because lawn care helps protect home value.",
          },
          {
            es: "Las HOAs y la presion estetica acortan el ciclo de reemplazo de equipos.",
            en: "HOAs and aesthetic pressure shorten the replacement cycle of equipment.",
          },
          {
            es: "Esto le sirve a UMO para vender no solo repuesto, sino una mejora visible de confort y rendimiento.",
            en: "This helps UMO sell not only replacement parts, but also a visible comfort and performance upgrade.",
          },
        ],
        analysis: {
          keyData: {
            es: "Florida proyecta USD 755 por hogar y Texas USD 712 en gasto de jardin y mantenimiento.",
            en: "Florida projects USD 755 per household and Texas USD 712 in lawn-care and maintenance spending.",
          },
          meaning: {
            es: "El hogar promedio si reserva dinero para cuidar el exterior, lo que vuelve mas natural la compra de piezas y mejoras.",
            en: "The average household does reserve money for exterior care, which makes buying parts and upgrades more natural.",
          },
          impact: {
            es: "UMO puede entrar con una propuesta de valor basada en durabilidad, ergonomia y vida util, no solo en precio.",
            en: "UMO can enter with a value proposition based on durability, ergonomics and equipment life, not only on price.",
          },
          score: {
            es: "Florida marca 5/5 por el mayor gasto por hogar. Texas queda en 4.72/5 porque el gasto sigue siendo alto y respalda una demanda fuerte en escala.",
            en: "Florida scores 5/5 because it has the highest household spending. Texas stays at 4.72/5 because spending remains high and supports strong demand at scale.",
          },
        },
        sources: [
          { label: "LawnStarter - Lawn Care and Landscaping Industry Statistics 2025" },
          { label: "This Old House - Top Landscaping Industry Statistics 2024" },
          { label: "Garden Research - National Gardening Survey 2023-2025" },
          { label: "IMARC Group - U.S. Lawn Care Market Report 2024-2034" },
        ],
      },
      {
        id: "diy",
        eyebrow: { es: "Indicador 03", en: "Indicator 03" },
        title: { es: "Preferencia por el Do It Yourself", en: "Do It Yourself preference" },
        summary: {
          es: "El alto nivel de DIY valida que el usuario final si compra repuestos y upgrades por su cuenta, sin esperar siempre al taller o al fabricante.",
          en: "The high DIY level validates that the end user does buy replacement parts and upgrades directly, without always waiting for a workshop or the manufacturer.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "79%", chartValue: 79, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "74%", chartValue: 74, score: 4.68 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "Canal D2C y aftermarket",
        },
        chartMax: 100,
        latestLabel: { es: "Nivel DIY 2025", en: "2025 DIY level" },
        tableRows: [
          { label: { es: "Texas", en: "Texas" }, texas: "79%", florida: "-", reference: "Mayor accion directa del usuario" },
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "74%", reference: "Demanda fuerte y residencial" },
          { label: { es: "Lectura UMO", en: "UMO reading" }, texas: "Mas volumen de upgrade", florida: "Mas valor por hogar", reference: "Ruta D2C valida" },
        ],
        bullets: [
          {
            es: "El usuario quiere resolver mantenimiento y mejora sin intermediarios innecesarios.",
            en: "The user wants to solve maintenance and upgrades without unnecessary intermediaries.",
          },
          {
            es: "Eso habilita e-commerce directo, kits faciles de instalar y comunicacion enfocada en mejora del equipo.",
            en: "That enables direct e-commerce, easy-to-install kits and messaging focused on equipment improvement.",
          },
          {
            es: "Aqui Texas destaca mas por accion y Florida por el valor del contexto residencial.",
            en: "Here Texas stands out more in action, while Florida stands out in residential-value context.",
          },
        ],
        analysis: {
          keyData: {
            es: "Texas registra 79% y Florida 74% en preferencia por DIY.",
            en: "Texas records 79% and Florida 74% in DIY preference.",
          },
          meaning: {
            es: "La persona que usa la maquina tambien esta dispuesta a comprar y montar mejoras por su cuenta.",
            en: "The person using the machine is also willing to buy and install upgrades on their own.",
          },
          impact: {
            es: "UMO gana margen porque puede hablarle al usuario final, ofrecer piezas premium y capturar una venta mas directa.",
            en: "UMO gains margin because it can speak to the end user, offer premium parts and capture a more direct sale.",
          },
          score: {
            es: "Texas recibe 5/5 por su mayor inclinacion DIY. Florida queda en 4.68/5 porque sigue siendo fuerte, aunque con una preferencia algo menor.",
            en: "Texas gets 5/5 for its stronger DIY inclination. Florida stays at 4.68/5 because it remains strong, though with a slightly lower preference.",
          },
        },
        sources: [
          { label: "HIRI - 2024-2025 Size of Market Report" },
          { label: "Statista - DIY & Home Improvement in the U.S." },
          { label: "Harvard JCHS - Improving America's Housing 2025" },
          { label: "Lowe's & Home Depot Annual Strategic Reports 2023-2024" },
        ],
      },
    ],
  },
  "entorno-politico-legal": {
    id: "entorno-politico-legal",
    heroEyebrow: {
      es: "ENTREGA 03 / ENTORNO POLITICO Y LEGAL",
      en: "DELIVERY 03 / POLITICAL AND LEGAL ENVIRONMENT",
    },
    heroTitle: {
      es: "Reglas operativas para entrar con mejor margen",
      en: "Operating rules for entering with stronger margins",
    },
    heroSummary: {
      es: "Este entorno explica por que Florida y Texas si son plataformas viables para una entrada comercial ordenada. Lo importante no es que uno destruya al otro, sino que ambos reducen friccion tributaria, dan continuidad operativa y aprovechan un marco comercial favorable para Colombia.",
      en: "This environment explains why Florida and Texas are viable platforms for an orderly commercial entry. What matters is not that one defeats the other, but that both reduce tax friction, provide operating continuity and take advantage of a trade framework favorable to Colombia.",
    },
    presentationBullets: [
      {
        es: "Florida sobresale en competitividad tributaria; Texas sigue fuerte por escala y clima pro-negocio.",
        en: "Florida stands out in tax competitiveness; Texas remains strong because of its scale and pro-business climate.",
      },
      {
        es: "Ambos comparten 0% de impuesto estatal sobre la renta personal, lo que eleva ingreso disponible y consumo.",
        en: "Both share a 0% state personal income tax, which raises disposable income and spending capacity.",
      },
      {
        es: "El TLC con Colombia no cambia por estado, pero vuelve mas rentable vender y distribuir en estos nodos fuertes.",
        en: "The FTA with Colombia does not change by state, but it makes selling and distributing through these strong nodes more profitable.",
      },
    ],
    conclusion: {
      es: "La lectura politica y legal no busca coronar un ganador unico. Sirve para mostrar que Florida y Texas permiten operar con menos friccion, sostener socios locales y entrar con una estructura de costos mas sana que en muchos otros puntos del pais.",
      en: "The political and legal reading is not trying to crown a single winner. It shows that Florida and Texas allow UMO to operate with less friction, sustain local partners and enter with a healthier cost structure than many other parts of the country.",
    },
    indicators: [
      {
        id: "competitividad-tributaria",
        eyebrow: { es: "Indicador 01", en: "Indicator 01" },
        title: { es: "Competitividad tributaria estatal", en: "State tax competitiveness" },
        summary: {
          es: "Los dos estados aparecen en la parte alta del mapa fiscal estadounidense, lo que ayuda a reducir costos fijos y presion de operacion.",
          en: "Both states appear near the top of the U.S. tax map, which helps reduce fixed costs and operating pressure.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "#12", chartValue: 4.6, score: 4.6 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "#4", chartValue: 5, score: 5 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "Dos estados dentro del grupo fuerte",
        },
        chartMax: 5,
        latestLabel: { es: "Lectura 2025", en: "2025 reading" },
        tableRows: [
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "Puesto #4", reference: "Entorno fiscal muy fuerte" },
          { label: { es: "Texas", en: "Texas" }, texas: "Puesto #12", florida: "-", reference: "Sigue dentro del grupo competitivo" },
          { label: { es: "Lectura UMO", en: "UMO reading" }, texas: "Mejor para volumen y red", florida: "Mejor para eficiencia fiscal", reference: "Ambos operables" },
        ],
        bullets: [
          {
            es: "Esto impacta donde conviene abrir distribucion, fulfillment o un nodo comercial.",
            en: "This affects where it makes sense to open distribution, fulfillment or a commercial node.",
          },
          {
            es: "La menor carga fija deja mas margen para pauta, logistica y crecimiento comercial.",
            en: "Lower fixed burden leaves more margin for marketing, logistics and commercial growth.",
          },
          {
            es: "La conclusion no es descartar Texas, sino entender que Florida tiene una ventaja tributaria relativa.",
            en: "The conclusion is not to discard Texas, but to understand that Florida has a relative tax advantage.",
          },
        ],
        analysis: {
          keyData: {
            es: "Florida aparece en el puesto 4 y Texas en el 12 del ranking de competitividad tributaria.",
            en: "Florida appears in rank 4 and Texas in rank 12 in the tax competitiveness ranking.",
          },
          meaning: {
            es: "Los dos estados son competitivos frente al pais, aunque Florida queda mejor posicionada para eficiencia fiscal pura.",
            en: "Both states are competitive against the broader country context, though Florida ranks better for pure tax efficiency.",
          },
          impact: {
            es: "UMO puede absorber mejor costos de entrada y destinar mas recursos a captacion y distribucion.",
            en: "UMO can absorb entry costs more effectively and allocate more resources to acquisition and distribution.",
          },
          score: {
            es: "Florida toma 5/5 por su mejor posicion fiscal. Texas queda en 4.6/5 porque sigue siendo competitivo y operable, aunque con menor ventaja relativa.",
            en: "Florida takes 5/5 for its stronger tax position. Texas stays at 4.6/5 because it remains competitive and operable, though with less relative advantage.",
          },
        },
        sources: [
          { label: "Tax Foundation - State Business Tax Climate Index 2021-2024" },
          { label: "Tax Foundation - 2025 State Tax Changes" },
        ],
      },
      {
        id: "renta-personal",
        eyebrow: { es: "Indicador 02", en: "Indicator 02" },
        title: { es: "Ausencia de impuesto estatal sobre la renta personal", en: "No state personal income tax" },
        summary: {
          es: "Texas y Florida comparten 0% de impuesto estatal a la renta personal, lo que mejora el ingreso disponible del cliente final.",
          en: "Texas and Florida share a 0% state personal income tax, which improves the end customer's disposable income.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "0%", chartValue: 5, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "0%", chartValue: 4.8, score: 4.8 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "Mas ingreso neto disponible",
        },
        chartMax: 5,
        latestLabel: { es: "Condicion 2025", en: "2025 condition" },
        tableRows: [
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "0%", reference: "Mas jubilados y segundas casas" },
          { label: { es: "Texas", en: "Texas" }, texas: "0%", florida: "-", reference: "Escala de consumo amplia" },
          { label: { es: "Lectura UMO", en: "UMO reading" }, texas: "Mas liquidez para mantenimiento", florida: "Mas compra residencial premium", reference: "Ambos fuertes" },
        ],
        bullets: [
          {
            es: "No cambia la regla del TLC, pero si mejora la capacidad de compra del usuario dentro del estado.",
            en: "It does not change the trade agreement rule, but it does improve user buying power inside the state.",
          },
          {
            es: "Esto favorece la venta de upgrades y sillines premium con menos sensibilidad al precio.",
            en: "This favors the sale of upgrades and premium seats with lower price sensitivity.",
          },
          {
            es: "La condicion legal es igual en los dos, pero Texas capitaliza mejor esa ventaja por escala comercial y amplitud de mercado.",
            en: "The legal condition is the same in both, but Texas captures that advantage better because of commercial scale and market breadth.",
          },
        ],
        analysis: {
          keyData: {
            es: "Texas y Florida mantienen 0% de impuesto estatal sobre la renta personal.",
            en: "Texas and Florida maintain a 0% state personal income tax.",
          },
          meaning: {
            es: "El cliente final conserva mas dinero disponible para mantenimiento, repuestos y mejoras del equipo.",
            en: "The end customer keeps more disposable money for maintenance, replacement parts and equipment upgrades.",
          },
          impact: {
            es: "UMO puede defender una posicion premium sin depender solo de competir por precio bajo.",
            en: "UMO can defend a premium position without relying only on low-price competition.",
          },
          score: {
            es: "Texas toma 5/5 porque, con la misma condicion de 0%, tiene mas escala para convertir esa ventaja en ventas y red comercial. Florida queda en 4.8/5 porque comparte la base legal, pero con menor alcance operativo para UMO.",
            en: "Texas takes 5/5 because, with the same 0% condition, it has more scale to turn that advantage into sales and channel reach. Florida stays at 4.8/5 because it shares the legal base, but with less operating reach for UMO.",
          },
        },
        sources: [
          { label: "Tax Foundation - State Individual Income Tax Rates and Brackets 2024-2025" },
          { label: "USAFacts - States without income tax 2026" },
        ],
      },
      {
        id: "supervivencia-pymes",
        eyebrow: { es: "Indicador 03", en: "Indicator 03" },
        title: { es: "Supervivencia de pequenas empresas", en: "Small business survival" },
        summary: {
          es: "La apertura neta de establecimientos ayuda a ver que tan vivo esta el ecosistema de talleres, minoristas y pequenos negocios que UMO necesita para vender y sostener postventa.",
          en: "Net establishment growth helps show how active the ecosystem of workshops, retailers and small businesses is for UMO's sales and after-sales support.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "27.67%", chartValue: 27.67, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "22.39%", chartValue: 22.39, score: 4.05 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "19.34%",
          chartValue: 19.34,
        },
        chartMax: 30,
        latestLabel: { es: "Dato 2025", en: "2025 data" },
        tableRows: [
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "22.39%", reference: "Por encima de EE. UU." },
          { label: { es: "Texas", en: "Texas" }, texas: "27.67%", florida: "-", reference: "Mayor dinamismo neto" },
          { label: { es: "EE. UU.", en: "U.S." }, texas: "-", florida: "-", reference: "19.34%" },
        ],
        bullets: [
          {
            es: "UMO no depende solo de vender: necesita distribuidores, talleres y dealers que se mantengan activos.",
            en: "UMO does not only need to sell: it needs distributors, workshops and dealers that stay active.",
          },
          {
            es: "Una apertura neta mayor sugiere mas capacidad para abrir canal y sostener postventa local.",
            en: "Higher net openings suggest more capacity to open channel and sustain local after-sales support.",
          },
          {
            es: "Ambos superan al pais, pero Texas queda arriba por mayor dinamismo empresarial.",
            en: "Both beat the country benchmark, but Texas ends higher because of stronger business dynamism.",
          },
        ],
        analysis: {
          keyData: {
            es: "Texas marca 27.67% y Florida 22.39% en apertura neta de establecimientos, ambos por encima del 19.34% de EE. UU.",
            en: "Texas reaches 27.67% and Florida 22.39% in net establishment growth, both above the 19.34% U.S. benchmark.",
          },
          meaning: {
            es: "Hay un ecosistema real para conseguir aliados comerciales, distribuidores y soporte local sin depender de una sola relacion.",
            en: "There is a real ecosystem for commercial partners, distributors and local support without depending on a single relationship.",
          },
          impact: {
            es: "UMO gana mas opciones para abrir canal, sostener postventa y escalar con socios locales.",
            en: "UMO gains more options to open channel, sustain after-sales support and scale through local partners.",
          },
          score: {
            es: "Texas toma 5/5 porque lidera la apertura neta de establecimientos. Florida queda en 4.05/5 porque tambien supera al pais, pero su dinamismo es menor al de Texas en esta comparacion.",
            en: "Texas takes 5/5 because it leads net establishment growth. Florida stays at 4.05/5 because it also beats the country, but its dynamism is lower than Texas in this comparison.",
          },
        },
        sources: [
          { label: "SBA Office of Advocacy - 2025 Small Business Profiles" },
          { label: "U.S. Bureau of Labor Statistics - Business Employment Dynamics 2024" },
        ],
      },
      {
        id: "tlc-colombia-eeuu",
        eyebrow: { es: "Indicador 04", en: "Indicator 04" },
        title: { es: "Marco TLC Colombia - Estados Unidos", en: "Colombia - United States FTA framework" },
        summary: {
          es: "El TLC no define el estado, pero si define la rentabilidad de la entrada porque deja las exportaciones de UMO con arancel 0%.",
          en: "The FTA does not define the state, but it does define entry profitability because it leaves UMO's exports at 0% tariff.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "0% arancel", chartValue: 5, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "0% arancel", chartValue: 4.8, score: 4.8 },
        reference: {
          label: { es: "Lectura pais", en: "Country reading" },
          display: "Ventaja estructural para Colombia",
        },
        chartMax: 5,
        latestLabel: { es: "Condicion comercial", en: "Commercial condition" },
        tableRows: [
          { label: { es: "Florida", en: "Florida" }, texas: "-", florida: "Arancel 0%", reference: "Entrada rentable por nodo costero" },
          { label: { es: "Texas", en: "Texas" }, texas: "Arancel 0%", florida: "-", reference: "Entrada rentable por escala interna" },
          { label: { es: "Lectura UMO", en: "UMO reading" }, texas: "Mejor absorcion de costos", florida: "Mayor flexibilidad de precios", reference: "Ventaja comun" },
        ],
        bullets: [
          {
            es: "El TLC baja friccion de importacion y protege el margen del aftermarket.",
            en: "The FTA lowers import friction and protects aftermarket margin.",
          },
          {
            es: "Permite competir por calidad y diseno, no solo por precio defensivo.",
            en: "It allows UMO to compete on quality and design, not only on defensive pricing.",
          },
          {
            es: "La ventaja legal aplica a ambos, pero Texas aprovecha mejor ese margen cuando el plan es escalar volumen y red comercial.",
            en: "The legal advantage applies to both, but Texas captures that margin better when the plan is to scale volume and channel reach.",
          },
        ],
        analysis: {
          keyData: {
            es: "Las exportaciones de UMO entran con arancel 0% bajo el TLC Colombia - Estados Unidos.",
            en: "UMO's exports enter with a 0% tariff under the Colombia - United States FTA.",
          },
          meaning: {
            es: "La estructura de costos de entrada mejora desde el origen, antes incluso de decidir el estado final.",
            en: "The entry cost structure improves from origin, even before choosing the final state.",
          },
          impact: {
            es: "UMO puede usar Texas o Florida con una base de rentabilidad mas sana y con mejor capacidad para invertir en canal y marca.",
            en: "UMO can use Texas or Florida with a healthier profitability base and better ability to invest in channel and brand.",
          },
          score: {
            es: "Texas toma 5/5 porque el mismo arancel 0% se vuelve mas potente en un mercado de mayor escala interna. Florida queda en 4.8/5 porque tambien aprovecha el TLC, pero con un rol mas claro de entrada y conexion logistica.",
            en: "Texas takes 5/5 because the same 0% tariff becomes more powerful in a market with larger internal scale. Florida stays at 4.8/5 because it also benefits from the FTA, but with a clearer gateway and logistics role.",
          },
        },
        sources: [
          { label: "Tratado de Libre Comercio Colombia - Estados Unidos" },
          { label: "Marco legal de exportacion Colombia -> U.S." },
        ],
      },
    ],
  },
  "entorno-tecnologico-geoambiental": {
    id: "entorno-tecnologico-geoambiental",
    heroEyebrow: {
      es: "ENTREGA 03 / ENTORNO TECNOLOGICO Y GEOAMBIENTAL",
      en: "DELIVERY 03 / TECHNOLOGICAL AND GEOENVIRONMENTAL ENVIRONMENT",
    },
    heroTitle: {
      es: "Canal digital, temporada verde y desgaste real del equipo",
      en: "Digital channel, green season and real equipment wear",
    },
    heroSummary: {
      es: "Este entorno aterriza por que Texas y Florida resaltan frente al resto del pais cuando UMO piensa en venta digital, uso continuo de maquinaria exterior y necesidad de repuestos mas durables. No es solo clima bonito: es frecuencia de uso, desgaste y canal de compra.",
      en: "This environment explains why Texas and Florida stand out against the rest of the country when UMO thinks about digital sales, continuous outdoor-equipment use and the need for more durable replacement parts. It is not just nice weather: it is usage frequency, wear and buying channel.",
    },
    presentationBullets: [
      {
        es: "Texas y Florida se ubican por encima del promedio nacional en e-commerce ligado a jardineria, clima util y condiciones de desgaste.",
        en: "Texas and Florida stay above the national average in e-commerce linked to gardening, useful climate and wear conditions.",
      },
      {
        es: "Florida resalta por temporada verde mas larga y mayor intensidad residencial de jardin y paisajismo.",
        en: "Florida stands out through a longer green season and stronger residential lawn and landscaping intensity.",
      },
      {
        es: "Texas combina buen canal digital con desgaste alto y mas lectura de volumen rural, comercial y operativo.",
        en: "Texas combines a solid digital channel with high wear and a stronger rural, commercial and operating-volume reading.",
      },
    ],
    conclusion: {
      es: "La lectura tecnologica y geoambiental confirma que ambos estados son utiles porque el equipo se usa mas tiempo, se desgasta mas y puede comprarse por canales digitales. Florida empuja mas el angulo verde y residencial; Texas empuja mas la escala de uso y la exigencia operativa.",
      en: "The technological and geoenvironmental reading confirms that both states are useful because equipment is used longer, wears faster and can be bought through digital channels. Florida pushes the green and residential angle more; Texas pushes usage scale and operating intensity more strongly.",
    },
    indicators: [
      {
        id: "ecommerce-paisajismo",
        eyebrow: { es: "Indicador 01", en: "Indicator 01" },
        title: { es: "E-commerce para productos de paisajismo", en: "E-commerce for landscaping products" },
        summary: {
          es: "La compra digital crece en ambos estados y se mantiene por encima de la referencia nacional, lo que le abre a UMO una ruta de entrada mas ligera por catalogo, pauta y marketplace.",
          en: "Digital buying grows in both states and stays above the national benchmark, giving UMO a lighter entry route through catalog, advertising and marketplaces.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "17.8%", chartValue: 17.8, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "17.5%", chartValue: 17.5, score: 4.92 },
        reference: {
          label: { es: "Pais", en: "Country" },
          display: "16.4%",
          chartValue: 16.4,
        },
        chartMax: 20,
        latestLabel: { es: "Dato 2025", en: "2025 data" },
        tableRows: [
          { label: { es: "2021", en: "2021" }, texas: "14.3%", florida: "14.1%", reference: "13.2%" },
          { label: { es: "2022", en: "2022" }, texas: "15.8%", florida: "15.6%", reference: "14.6%" },
          { label: { es: "2023", en: "2023" }, texas: "16.6%", florida: "16.3%", reference: "15.3%" },
          { label: { es: "2024", en: "2024" }, texas: "17.5%", florida: "17.2%", reference: "16.1%" },
          { label: { es: "2025", en: "2025" }, texas: "17.8%", florida: "17.5%", reference: "16.4%" },
        ],
        bullets: [
          {
            es: "Los dos estados permiten vender sin abrir punto fisico desde el primer dia.",
            en: "Both states allow sales without opening a physical point from day one.",
          },
          {
            es: "Texas queda levemente arriba por el mix entre demanda residencial, contratista y equipo comercial.",
            en: "Texas sits slightly above because of the mix between residential demand, contractors and commercial equipment.",
          },
          {
            es: "Florida sigue siendo fuerte por su base residencial y la frecuencia de compra ligada a jardin y mantenimiento.",
            en: "Florida remains strong because of its residential base and the buying frequency tied to lawn care and maintenance.",
          },
        ],
        analysis: {
          keyData: {
            es: "En 2025 Texas llega a 17.8%, Florida a 17.5% y ambos superan el 16.4% de referencia nacional.",
            en: "In 2025 Texas reaches 17.8%, Florida 17.5% and both exceed the 16.4% national benchmark.",
          },
          meaning: {
            es: "La compra digital ya tiene masa critica para captar demanda sin depender solo de distribuidores tradicionales.",
            en: "Digital buying already has enough critical mass to capture demand without relying only on traditional distributors.",
          },
          impact: {
            es: "UMO puede entrar con una ruta mas liviana: marketplace, pauta, catalogo digital y prospeccion de distribuidores.",
            en: "UMO can enter through a lighter route: marketplaces, advertising, digital catalog and distributor prospecting.",
          },
          score: {
            es: "Texas toma 5/5 porque llega al valor mas alto de la serie en 2025. Florida queda en 4.92/5 al calcularse relativo a ese 5, ya que tambien supera al pais y se mantiene muy cerca del lider.",
            en: "Texas takes 5/5 because it reaches the highest value in the 2025 series. Florida stays at 4.92/5 when normalized against that 5, since it also beats the country and remains very close to the leader.",
          },
        },
        series: [
          { year: "2021", texas: 14.3, florida: 14.1, national: 13.2, note: { es: "Base digital en crecimiento.", en: "Digital base in growth." } },
          { year: "2022", texas: 15.8, florida: 15.6, national: 14.6, note: { es: "Sube el canal catalogo/marketplace.", en: "Catalog and marketplace channel rises." } },
          { year: "2023", texas: 16.6, florida: 16.3, national: 15.3, note: { es: "Mayor adopcion digital en jardineria.", en: "Greater digital adoption in gardening." } },
          { year: "2024", texas: 17.5, florida: 17.2, national: 16.1, note: { es: "Canal online ya es parte estable del mercado.", en: "Online channel is now a stable part of the market." } },
          { year: "2025", texas: 17.8, florida: 17.5, national: 16.4, note: { es: "Ambos estados siguen por encima del pais.", en: "Both states remain above the country benchmark." } },
        ],
        strategicReading: {
          es: "Ambos estados sobresalen frente al pais y validan una entrada digital para UMO; Texas toma una leve ventaja por mezcla de volumen y uso comercial.",
          en: "Both states stand out against the country and validate a digital entry for UMO; Texas takes a slight edge because of volume and commercial use.",
        },
        sources: [
          { label: "U.S. Census Bureau - Quarterly Retail E-Commerce Sales Report", href: "https://www.census.gov/retail/ecommerce.html" },
          { label: "FRED - ECOMPCTSA", href: "https://fred.stlouisfed.org/series/ECOMPCTSA" },
          { label: "U.S. Census QuickFacts Florida", href: "https://www.census.gov/quickfacts/fact/table/FL/PST045224" },
          { label: "U.S. Census QuickFacts Texas", href: "https://www.census.gov/quickfacts/fact/table/TX/PST045224" },
        ],
      },
      {
        id: "growing-season-favorable",
        eyebrow: { es: "Indicador 02", en: "Indicator 02" },
        title: { es: "Growing season favorable", en: "Favorable growing season" },
        summary: {
          es: "Florida y Texas mantienen temperaturas muy superiores a la referencia nacional, lo que alarga la temporada de jardin, cesped y uso de maquinaria exterior.",
          en: "Florida and Texas maintain temperatures far above the national benchmark, which extends the season for lawns, turf and outdoor equipment use.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "67.7 F", chartValue: 67.7, score: 4.7 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "72.3 F", chartValue: 72.3, score: 5 },
        reference: {
          label: { es: "Pais", en: "Country" },
          display: "54.6 F",
          chartValue: 54.6,
        },
        chartMax: 80,
        latestLabel: { es: "Dato 2025", en: "2025 data" },
        tableRows: [
          { label: { es: "2021", en: "2021" }, texas: "66.4 F", florida: "72.3 F", reference: "54.5 F" },
          { label: { es: "2022", en: "2022" }, texas: "67.7 F", florida: "72.5 F", reference: "53.4 F" },
          { label: { es: "2023", en: "2023" }, texas: "68.1 F", florida: "73.4 F", reference: "54.4 F" },
          { label: { es: "2024", en: "2024" }, texas: "68.6 F", florida: "72.9 F", reference: "55.5 F" },
          { label: { es: "2025", en: "2025" }, texas: "67.7 F", florida: "72.3 F", reference: "54.6 F" },
        ],
        bullets: [
          {
            es: "Mas meses de clima util significan mas tiempo de uso y mas necesidad de mantenimiento.",
            en: "More months of useful weather mean more usage time and more need for maintenance.",
          },
          {
            es: "Florida domina la lectura residencial y verde; Texas sostiene una lectura fuerte en campo, suburbio y contratista.",
            en: "Florida dominates the residential and green reading; Texas keeps a strong reading across rural, suburban and contractor use.",
          },
          {
            es: "Frente al pais, ambos estados sobresalen con claridad y justifican la seleccion territorial.",
            en: "Against the country benchmark, both states clearly stand out and justify the territorial selection.",
          },
        ],
        analysis: {
          keyData: {
            es: "Florida se mantiene alrededor de 72-73 F y Texas alrededor de 67-68 F, ambos muy por encima del pais.",
            en: "Florida stays around 72-73 F and Texas around 67-68 F, both well above the country benchmark.",
          },
          meaning: {
            es: "El cesped, el jardin y la operacion exterior se sostienen por mas meses, lo que acelera uso y reposicion del equipo.",
            en: "Lawns, gardens and outdoor operation stay active for more months, which accelerates equipment use and replacement.",
          },
          impact: {
            es: "UMO gana un argumento claro: sus productos no entran a un mercado estacional corto, sino a uno de uso prolongado.",
            en: "UMO gains a clear argument: its products do not enter a short seasonal market, but one with prolonged use.",
          },
          score: {
            es: "Florida recibe 5/5 por la temporada verde mas larga. Texas queda en 4.7/5 porque tambien supera ampliamente al pais y sostiene uso continuo.",
            en: "Florida receives 5/5 for the longer green season. Texas stands at 4.7/5 because it also stays far above the country and sustains continuous use.",
          },
        },
        series: [
          { year: "2021", texas: 66.4, florida: 72.3, national: 54.5, note: { es: "Clima util muy superior al pais.", en: "Useful climate far above the country." } },
          { year: "2022", texas: 67.7, florida: 72.5, national: 53.4, note: { es: "Se sostiene la ventaja climatica.", en: "Climate advantage holds." } },
          { year: "2023", texas: 68.1, florida: 73.4, national: 54.4, note: { es: "Ano muy fuerte para uso exterior.", en: "Very strong year for outdoor use." } },
          { year: "2024", texas: 68.6, florida: 72.9, national: 55.5, note: { es: "El pais sube, pero Texas y Florida siguen arriba.", en: "The country rises, but Texas and Florida stay above." } },
          { year: "2025", texas: 67.7, florida: 72.3, national: 54.6, note: { es: "La ventaja sigue clara en los dos estados.", en: "The advantage remains clear in both states." } },
        ],
        strategicReading: {
          es: "Los dos estados quedan muy por encima del pais; Florida sobresale para jardin y mantenimiento continuo, mientras Texas combina clima util con mas escala operativa.",
          en: "Both states stay well above the country; Florida stands out for lawn care and continuous maintenance, while Texas combines useful climate with more operating scale.",
        },
        sources: [
          { label: "Florida Climate Center - Annual Summaries", href: "https://climatecenter.fsu.edu/" },
          { label: "NOAA NCEI Climate at a Glance", href: "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/statewide/time-series" },
          { label: "Texas State Climatologist", href: "https://climatexas.tamu.edu/" },
          { label: "Texas Tribune - Climate reporting", href: "https://www.texastribune.org/2024/01/11/texas-2023-hottest-year/" },
        ],
      },
      {
        id: "desgaste-ambiental",
        eyebrow: { es: "Indicador 03", en: "Indicator 03" },
        title: { es: "Condiciones ambientales de desgaste", en: "Environmental wear conditions" },
        summary: {
          es: "Florida y Texas muestran un desgaste ambiental superior al promedio nacional, lo que fortalece el argumento de durabilidad y reposicion premium para UMO.",
          en: "Florida and Texas show environmental wear above the national benchmark, which strengthens UMO's durability and premium-replacement argument.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "4.7 / 5", chartValue: 4.7, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "4.5 / 5", chartValue: 4.5, score: 4.79 },
        reference: {
          label: { es: "Pais", en: "Country" },
          display: "3.6 / 5",
          chartValue: 3.6,
        },
        chartMax: 5,
        latestLabel: { es: "Dato 2025", en: "2025 data" },
        tableRows: [
          { label: { es: "2021", en: "2021" }, texas: "4.2", florida: "4.6", reference: "3.2" },
          { label: { es: "2022", en: "2022" }, texas: "4.6", florida: "4.6", reference: "3.4" },
          { label: { es: "2023", en: "2023" }, texas: "4.9", florida: "4.8", reference: "3.5" },
          { label: { es: "2024", en: "2024" }, texas: "4.8", florida: "4.9", reference: "3.7" },
          { label: { es: "2025", en: "2025" }, texas: "4.7", florida: "4.5", reference: "3.6" },
        ],
        bullets: [
          {
            es: "El clima castiga mas el asiento: calor, radiacion, humedad y lluvia aceleran deterioro.",
            en: "The climate punishes the seat more: heat, radiation, humidity and rain accelerate deterioration.",
          },
          {
            es: "Eso no es un riesgo para UMO; es la oportunidad de vender mejor material, mejor costura y mayor vida util.",
            en: "That is not a risk for UMO; it is the opportunity to sell better material, stronger stitching and longer service life.",
          },
          {
            es: "Frente al pais, ambos estados vuelven mas facil defender una propuesta premium de reposicion.",
            en: "Against the country benchmark, both states make it easier to defend a premium replacement proposition.",
          },
        ],
        analysis: {
          keyData: {
            es: "En 2025 Texas marca 4.7, Florida 4.5 y el pais 3.6 en el indice de desgaste ambiental.",
            en: "In 2025 Texas marks 4.7, Florida 4.5 and the country 3.6 in the environmental-wear index.",
          },
          meaning: {
            es: "El equipo se deteriora mas rapido que en una gran parte del pais, por lo que el usuario siente mas valor en un repuesto superior.",
            en: "Equipment deteriorates faster than in much of the country, so the user feels more value in a superior replacement.",
          },
          impact: {
            es: "UMO puede vender durabilidad real: anti-UV, impermeabilidad, costuras reforzadas y espuma resistente.",
            en: "UMO can sell real durability: UV resistance, waterproofing, reinforced stitching and resilient foam.",
          },
          score: {
            es: "Texas toma 5/5 porque registra el mayor indice de desgaste en 2025. Florida queda en 4.79/5 al calcularse relativo a ese 5, y sigue siendo muy fuerte por humedad, lluvia y exposicion solar.",
            en: "Texas takes 5/5 because it records the highest wear index in 2025. Florida stays at 4.79/5 when normalized against that 5, and remains very strong because of humidity, rainfall and solar exposure.",
          },
        },
        series: [
          { year: "2021", texas: 4.2, florida: 4.6, national: 3.2, note: { es: "Florida arranca con mas humedad y lluvia.", en: "Florida starts with stronger humidity and rainfall." } },
          { year: "2022", texas: 4.6, florida: 4.6, national: 3.4, note: { es: "Empate alto de desgaste.", en: "High wear tie." } },
          { year: "2023", texas: 4.9, florida: 4.8, national: 3.5, note: { es: "Texas sube por calor extremo.", en: "Texas rises because of extreme heat." } },
          { year: "2024", texas: 4.8, florida: 4.9, national: 3.7, note: { es: "Florida vuelve a dominar por humedad sostenida.", en: "Florida retakes the lead because of sustained humidity." } },
          { year: "2025", texas: 4.7, florida: 4.5, national: 3.6, note: { es: "Ambos siguen muy por encima del pais.", en: "Both remain well above the country benchmark." } },
        ],
        strategicReading: {
          es: "El desgaste es una prueba de mercado para UMO: Texas y Florida exigen mejor producto que el promedio nacional y por eso favorecen una oferta premium.",
          en: "Wear is a market proof point for UMO: Texas and Florida demand a better product than the national average and therefore favor a premium offer.",
        },
        sources: [
          { label: "NOAA NCEI Climate at a Glance", href: "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/statewide/time-series" },
          { label: "Florida Climate Center", href: "https://climatecenter.fsu.edu/" },
          { label: "Texas State Climatologist", href: "https://climatexas.tamu.edu/" },
          { label: "USDA Plant Hardiness Zone Map", href: "https://planthardiness.ars.usda.gov/home" },
        ],
      },
    ],
  },
  "entorno-comercio-internacional": {
    id: "entorno-comercio-internacional",
    heroEyebrow: {
      es: "ENTREGA 03 / ENTORNO DE COMERCIO INTERNACIONAL",
      en: "DELIVERY 03 / INTERNATIONAL TRADE ENVIRONMENT",
    },
    heroTitle: {
      es: "Entrada rapida por Florida, escala comercial por Texas",
      en: "Fast entry through Florida, commercial scale through Texas",
    },
    heroSummary: {
      es: "Este entorno aterriza como sale el producto desde Colombia y por que la ruta no termina en el puerto. Florida aparece como puerta de entrada rapida y cercana; Texas aparece como nodo de escala para distribuir a mayor volumen hacia clientes B2B, agroindustria y maquinaria.",
      en: "This environment grounds how the product leaves Colombia and why the route does not end at the port. Florida appears as a fast and close entry gateway; Texas appears as the scale node for higher-volume distribution toward B2B, agro-industry and machinery customers.",
    },
    presentationBullets: [
      {
        es: "Florida sirve para entrar mas rapido, apoyarse en su relacion con Colombia y moverse por el sureste.",
        en: "Florida works for faster entry, leaning on its relationship with Colombia and moving through the Southeast.",
      },
      {
        es: "Texas gana peso cuando la conversacion pasa a puertos grandes, red interna y expansion comercial B2B.",
        en: "Texas gains weight when the conversation shifts to large ports, internal network and B2B commercial expansion.",
      },
      {
        es: "La estrategia no es escoger un unico ganador: Florida entra y Texas escala.",
        en: "The strategy is not to pick a single winner: Florida enters and Texas scales.",
      },
    ],
    conclusion: {
      es: "El entorno de comercio internacional confirma una ruta dual. Florida es la mejor puerta de entrada por cercania y relacion visible con Colombia. Texas es el mejor mercado para crecer despues, porque ofrece mas infraestructura, mas capacidad portuaria y mejor salida hacia distribuidores, dealers y clientes industriales.",
      en: "The international trade environment confirms a dual route. Florida is the best entry gateway because of proximity and a visible relationship with Colombia. Texas is the best market to grow afterward because it offers more infrastructure, more port capacity and stronger reach toward distributors, dealers and industrial buyers.",
    },
    indicators: [
      {
        id: "instituciones-apoyo-comercio",
        eyebrow: { es: "Indicador 01", en: "Indicator 01" },
        title: { es: "Instituciones de apoyo al comercio exterior", en: "Foreign-trade support institutions" },
        summary: {
          es: "Los dos estados cuentan con ecosistemas de apoyo fuertes, pero Texas queda un poco arriba cuando la lectura se enfoca en escala exportadora e infraestructura institucional.",
          en: "Both states have strong support ecosystems, but Texas edges ahead when the reading focuses on export scale and institutional infrastructure.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "5 / 5", chartValue: 5, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "4.8 / 5", chartValue: 4.8, score: 4.8 },
        reference: {
          label: { es: "Base USA", en: "U.S. base" },
          display: "4.8 / 5",
          chartValue: 4.8,
        },
        chartMax: 5,
        latestLabel: { es: "Dato 2025", en: "2025 data" },
        tableRows: [
          { label: { es: "2021", en: "2021" }, texas: "4.5", florida: "4.4", reference: "4.5" },
          { label: { es: "2022", en: "2022" }, texas: "4.6", florida: "4.5", reference: "4.6" },
          { label: { es: "2023", en: "2023" }, texas: "4.8", florida: "4.6", reference: "4.6" },
          { label: { es: "2024", en: "2024" }, texas: "4.9", florida: "4.8", reference: "4.7" },
          { label: { es: "2025", en: "2025" }, texas: "5.0", florida: "4.9", reference: "4.8" },
        ],
        bullets: [
          {
            es: "Florida conecta bien con la entrada por el sureste y la relacion institucional con Colombia.",
            en: "Florida connects well with Southeast entry and the institutional relationship with Colombia.",
          },
          {
            es: "Texas se ve mas fuerte cuando la pregunta es como escalar operaciones y volumen exportador.",
            en: "Texas looks stronger when the question is how to scale operations and export volume.",
          },
          {
            es: "Para UMO, esto reduce incertidumbre en inteligencia de mercado, aliados y soporte de aterrizaje.",
            en: "For UMO, this reduces uncertainty around market intelligence, partners and landing support.",
          },
        ],
        analysis: {
          keyData: {
            es: "En 2025 Texas llega a 5.0 y Florida a 4.9 en el indice construido de apoyo institucional.",
            en: "In 2025 Texas reaches 5.0 and Florida 4.9 in the constructed institutional-support index.",
          },
          meaning: {
            es: "Los dos estados tienen red real para ayudar a entrar; Texas queda un poco mas fuerte por escala e infraestructura exportadora.",
            en: "Both states have a real network to support entry; Texas stands slightly stronger because of scale and export infrastructure.",
          },
          impact: {
            es: "UMO gana acceso a contactos, eventos, apoyo regulatorio y mejor lectura para armar su canal de entrada.",
            en: "UMO gains access to contacts, events, regulatory support and a better reading to build its entry channel.",
          },
          score: {
            es: "Texas recibe 5/5 porque combina apoyo estatal, escala y liderazgo exportador. Florida queda en 4.8/5 porque tambien es muy fuerte, pero con menor musculo institucional total.",
            en: "Texas receives 5/5 because it combines state support, scale and export leadership. Florida stays at 4.8/5 because it is also very strong, though with less total institutional muscle.",
          },
        },
        series: [
          { year: "2021", texas: 4.5, florida: 4.4, national: 4.5, note: { es: "Base alta en ambos estados.", en: "High starting base in both states." } },
          { year: "2022", texas: 4.6, florida: 4.5, national: 4.6, note: { es: "Se consolida la red de apoyo.", en: "The support network consolidates." } },
          { year: "2023", texas: 4.8, florida: 4.6, national: 4.6, note: { es: "Texas amplia la ventaja por escala.", en: "Texas widens the edge through scale." } },
          { year: "2024", texas: 4.9, florida: 4.8, national: 4.7, note: { es: "Los dos se ubican arriba de la base USA.", en: "Both states sit above the U.S. base." } },
          { year: "2025", texas: 5.0, florida: 4.9, national: 4.8, note: { es: "Texas cierra con la lectura mas fuerte.", en: "Texas closes with the strongest reading." } },
        ],
        strategicReading: {
          es: "Las instituciones no son una barrera. La diferencia es de rol: Florida facilita la entrada y Texas respalda la expansion.",
          en: "Institutions are not a barrier. The difference is one of role: Florida facilitates entry and Texas supports expansion.",
        },
        sources: [
          { label: "ProColombia", href: "https://procolombia.co/" },
          { label: "AmCham Colombia", href: "https://amchamcolombia.co/" },
          { label: "SelectUSA", href: "https://www.trade.gov/selectusa" },
          { label: "FloridaCommerce / SelectFlorida", href: "https://www.floridajobs.org/" },
          { label: "Texas Economic Development", href: "https://businessintexas.com/" },
        ],
      },
      {
        id: "balanza-comercial-colombia",
        eyebrow: { es: "Indicador 02", en: "Indicator 02" },
        title: { es: "Relacion comercial Colombia - EE. UU. y lectura estatal", en: "Colombia-U.S. trade relationship and state reading" },
        summary: {
          es: "La balanza bilateral confirma que el comercio entre Colombia y Estados Unidos sigue activo. Florida resalta porque Colombia si aparece dentro de su relacion comercial visible.",
          en: "The bilateral balance confirms that trade between Colombia and the United States remains active. Florida stands out because Colombia does appear in its visible trade relationship.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "4.7 / 5", chartValue: 4.7, score: 4.7 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "5 / 5", chartValue: 5, score: 5 },
        reference: {
          label: { es: "Bilateral 2025", en: "2025 bilateral" },
          display: "US$37.2B comercio EE. UU.-Colombia",
        },
        chartMax: 5,
        latestLabel: { es: "Dato 2025", en: "2025 data" },
        tableRows: [
          { label: { es: "2021", en: "2021" }, texas: "Texas gran exportador estatal", florida: "Sin proxy estatal abierto", reference: "Balance EE. UU.-Colombia: US$3.59B" },
          { label: { es: "2022", en: "2022" }, texas: "Escala exportadora alta", florida: "FL exp. US$2.73B / imp. US$3.70B", reference: "US$2.66B" },
          { label: { es: "2023", en: "2023" }, texas: "Escala exportadora alta", florida: "FL exp. US$2.35B / imp. US$4.13B", reference: "US$1.49B" },
          { label: { es: "2024", en: "2024" }, texas: "Escala exportadora alta", florida: "FL exp. US$2.46B / imp. US$4.35B", reference: "US$0.83B" },
          { label: { es: "2025", en: "2025" }, texas: "Colombia no entra en top 5", florida: "Colombia = 5to mercado (~US$2.7B)", reference: "US$1.58B" },
        ],
        bullets: [
          {
            es: "Florida tiene una relacion mas visible con Colombia y eso hace mas facil explicar la entrada por el sureste.",
            en: "Florida has a more visible relationship with Colombia, making it easier to explain entry through the Southeast.",
          },
          {
            es: "Texas no pierde relevancia; simplemente juega mas por volumen total que por cercania comercial directa con Colombia.",
            en: "Texas does not lose relevance; it simply plays more on total volume than on direct trade closeness with Colombia.",
          },
          {
            es: "Para UMO, esto sirve para justificar donde abrir primero conversaciones logisticas y comerciales.",
            en: "For UMO, this helps justify where to open logistics and commercial conversations first.",
          },
        ],
        analysis: {
          keyData: {
            es: "En 2025 Colombia aparece como quinto mercado de exportacion de Florida, mientras Texas no la muestra dentro de su top 5.",
            en: "In 2025 Colombia appears as Florida's fifth export market, while Texas does not show it inside its top 5.",
          },
          meaning: {
            es: "Florida tiene una evidencia mas directa de relacion comercial con Colombia, lo que baja friccion narrativa y operativa para UMO.",
            en: "Florida has more direct evidence of a trade relationship with Colombia, which lowers narrative and operating friction for UMO.",
          },
          impact: {
            es: "UMO puede usar Florida para aterrizar mas rapido, validar operadores y entrar con una historia comercial ya entendida por el mercado.",
            en: "UMO can use Florida to land faster, validate operators and enter with a commercial story the market already understands.",
          },
          score: {
            es: "Florida recibe 5/5 por su relacion comercial visible con Colombia. Texas queda en 4.7/5 porque sigue siendo un gigante exportador, aunque con una senal menos directa hacia Colombia.",
            en: "Florida receives 5/5 because of its visible trade relationship with Colombia. Texas stays at 4.7/5 because it remains an export giant, though with a less direct signal toward Colombia.",
          },
        },
        strategicReading: {
          es: "Aqui Florida toma la delantera porque no solo importa la escala del pais, sino donde Colombia ya tiene huella comercial visible.",
          en: "Florida takes the lead here because scale alone is not enough; what matters is where Colombia already has a visible trade footprint.",
        },
        sources: [
          { label: "U.S. Census Bureau - Foreign Trade Balance", href: "https://www.census.gov/foreign-trade/balance/c3010.html" },
          { label: "USTR Florida Factsheet", href: "https://ustr.gov/map/state-benefits/fl" },
          { label: "USTR Texas Factsheet", href: "https://ustr.gov/map/state-benefits/tx" },
          { label: "SelectFlorida Merchandise Trade Report", href: "https://selectflorida.org/" },
        ],
      },
      {
        id: "ruta-logistica-colombia",
        eyebrow: { es: "Indicador 03", en: "Indicator 03" },
        title: { es: "Ruta logística Colombia - Florida / Texas", en: "Colombia - Florida / Texas logistics route" },
        summary: {
          es: "En este punto la lectura se hace por días de ruta, no por volumen de contenedores. Florida queda mejor para la entrada inicial porque llega más rápido desde Colombia; Texas tarda más, aunque sigue sirviendo cuando la meta pasa a distribución interna y expansión posterior.",
          en: "For this indicator the reading is based on route days, not container volume. Florida performs better for the initial entry because it reaches faster from Colombia; Texas takes longer, although it remains useful when the goal shifts to inland distribution and later expansion.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "9 d 15 h", chartValue: 3.12, score: 3.12 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "6 d", chartValue: 5, score: 5 },
        reference: {
          label: { es: "Lectura UMO", en: "UMO reading" },
          display: "Menos días = mejor entrada",
        },
        chartMax: 5,
        latestLabel: { es: "Ruta estimada 2025", en: "Estimated 2025 route" },
        tableRows: [
          { label: { es: "Salida desde Colombia", en: "Departure from Colombia" }, texas: "Cartagena / Barranquilla", florida: "Cartagena / Barranquilla", reference: "Mismo origen posible" },
          { label: { es: "Llegada principal", en: "Main arrival" }, texas: "Houston", florida: "Port Everglades", reference: "Dos puertas válidas" },
          { label: { es: "Tiempo estimado de ruta", en: "Estimated route time" }, texas: "9 d 15 h", florida: "6 d", reference: "Florida llega primero" },
          { label: { es: "Uso recomendado", en: "Recommended use" }, texas: "Distribución y escala posterior", florida: "Entrada inicial más rápida", reference: "Decisión por fase" },
          { label: { es: "Base de evaluación", en: "Evaluation basis" }, texas: "Más días", florida: "Menos días", reference: "Aquí manda el tiempo" },
        ],
        bullets: [
          {
            es: "Florida ayuda a entrar más rápido desde Cartagena o Barranquilla hacia el sureste.",
            en: "Florida helps UMO enter faster from Cartagena or Barranquilla into the Southeast.",
          },
          {
            es: "Texas sigue sirviendo cuando la meta es cubrir Houston, Dallas, San Antonio y zonas agroindustriales después de entrar.",
            en: "Texas still helps when the goal is to cover Houston, Dallas, San Antonio and agro-industrial areas after entry.",
          },
          {
            es: "Aquí no estamos premiando TEUs; estamos premiando la ruta más corta para arrancar mejor.",
            en: "Here we are not rewarding TEUs; we are rewarding the shorter route for a better start.",
          },
        ],
        analysis: {
          keyData: {
            es: "La ruta hacia Florida se estima en 6 días, mientras la ruta hacia Texas se mueve alrededor de 9 días y 15 horas.",
            en: "The route to Florida is estimated at 6 days, while the route to Texas is around 9 days and 15 hours.",
          },
          meaning: {
            es: "Si el criterio principal es entrar rápido y probar mercado, Florida tiene ventaja clara. Texas entra después cuando ya importa más la distribución que la velocidad inicial.",
            en: "If the main criterion is entering fast and testing the market, Florida has a clear advantage. Texas comes later when distribution matters more than initial speed.",
          },
          impact: {
            es: "UMO puede usar Florida para abrir más rápido, bajar fricción logística al inicio y después evaluar Texas como segunda fase de cobertura y escala.",
            en: "UMO can use Florida to open faster, reduce logistics friction at the start and then evaluate Texas as a second phase for coverage and scale.",
          },
          score: {
            es: "Florida recibe 5/5 porque, en este indicador, la nota se basa en días de ruta y no en volumen portuario. Texas queda en 3.12/5 porque tarda más en llegar desde Colombia.",
            en: "Florida receives 5/5 because, in this indicator, the score is based on route days rather than port volume. Texas lands at 3.12/5 because it takes longer to reach from Colombia.",
          },
        },
        strategicReading: {
          es: "Florida abre más rápido por días de ruta. Texas se reserva para la fase donde importe más cubrir volumen y red interna.",
          en: "Florida opens faster in route days. Texas is better reserved for the phase where volume and inland network matter more.",
        },
        sources: [
          { label: "Port Everglades Cargo Statistics", href: "https://www.porteverglades.net/about-us/statistics/cargo-statistics/" },
          { label: "Port Everglades Transit Times", href: "https://www.porteverglades.net/" },
          { label: "King Ocean Services", href: "https://www.kingocean.com/colombia-port-everglades-florida/" },
          { label: "Port Houston", href: "https://porthouston.com/" },
          { label: "Fluent Cargo", href: "https://www.fluentcargo.com/" },
        ],
      },
    ],
  },
  "entorno-inversion-extranjera-directa": {
    id: "entorno-inversion-extranjera-directa",
    heroEyebrow: {
      es: "ENTREGA 03 / ENTORNO DE INVERSION EXTRANJERA DIRECTA",
      en: "DELIVERY 03 / FOREIGN DIRECT INVESTMENT ENVIRONMENT",
    },
    heroTitle: {
      es: "Florida conecta mejor la entrada; Texas sostiene la escala futura",
      en: "Florida connects entry better; Texas supports future scale",
    },
    heroSummary: {
      es: "Este entorno no busca decir que UMO va a invertir manana. Sirve para mostrar que pasa si la entrada comercial funciona: donde hay mas confianza para crecer, que sectores reciben mas proyectos y cual estado ofrece mejores incentivos para una expansion futura.",
      en: "This environment is not trying to say that UMO will invest tomorrow. It shows what happens if the commercial entry works: where there is more confidence to grow, which sectors receive more projects and which state offers better incentives for a future expansion.",
    },
    presentationBullets: [
      {
        es: "Florida aparece como puerta natural por su relacion historica con capital colombiano y su afinidad latina.",
        en: "Florida appears as a natural gateway because of its historical relationship with Colombian capital and its Latin affinity.",
      },
      {
        es: "Texas gana fuerza cuando la conversacion pasa a industria, logistica, incentivos y expansion B2B.",
        en: "Texas gains strength when the conversation shifts to industry, logistics, incentives and B2B expansion.",
      },
      {
        es: "La lectura final vuelve a ser complementaria: Florida conecta, Texas escala.",
        en: "The final reading is again complementary: Florida connects, Texas scales.",
      },
    ],
    conclusion: {
      es: "La IED deja una conclusion util para exponer. Si UMO busca abrir mercado y construir relaciones iniciales, Florida ofrece una puerta mas natural. Si luego decide crecer con una base mas industrial, logistica o de distribucion, Texas ofrece mejores sectores y mejores incentivos para esa segunda fase.",
      en: "FDI leaves a useful conclusion for presentation. If UMO wants to open the market and build initial relationships, Florida offers a more natural gateway. If it later decides to grow through a more industrial, logistics or distribution-led base, Texas offers better sectors and better incentives for that second phase.",
    },
    indicators: [
      {
        id: "flujos-fdi-colombia-usa",
        eyebrow: { es: "Indicador 01", en: "Indicator 01" },
        title: { es: "Flujos de inversion y relevancia estatal", en: "Investment flows and state relevance" },
        summary: {
          es: "La relacion de inversion Colombia-EE. UU. crece y Florida queda mejor posicionada como puerta comercial para una empresa colombiana que empieza a moverse en Estados Unidos.",
          en: "The Colombia-U.S. investment relationship grows and Florida is better positioned as the commercial gateway for a Colombian company starting to move inside the United States.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "4.3 / 5", chartValue: 4.3, score: 4.3 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "5 / 5", chartValue: 5, score: 5 },
        reference: {
          label: { es: "Colombia - USA 2024", en: "Colombia - U.S. 2024" },
          display: "Stock US$5.174B / Flow US$250M",
        },
        chartMax: 5,
        latestLabel: { es: "Lectura 2024", en: "2024 reading" },
        tableRows: [
          { label: { es: "2020", en: "2020" }, texas: "Lectura industrial futura", florida: "Puerta comercial latina", reference: "Stock US$4.044B / Flow -US$159M" },
          { label: { es: "2021", en: "2021" }, texas: "Texas sigue atractivo", florida: "Florida mantiene afinidad colombiana", reference: "Stock US$4.131B / Flow US$3M" },
          { label: { es: "2022", en: "2022" }, texas: "Ubicacion e incentivos", florida: "45% historico en Florida", reference: "Stock US$4.501B / Flow US$99M" },
          { label: { es: "2023", en: "2023" }, texas: "Potencial industrial", florida: "Concentracion colombiana visible", reference: "Stock US$4.961B / Flow US$173M" },
          { label: { es: "2024", en: "2024" }, texas: "Escala futura", florida: "Entrada natural", reference: "Stock US$5.174B / Flow US$250M" },
        ],
        bullets: [
          {
            es: "Florida ayuda a explicar por que una empresa colombiana entra primero por un territorio ya familiar para inversion y relaciones.",
            en: "Florida helps explain why a Colombian company would first enter through a territory already familiar for investment and relationships.",
          },
          {
            es: "Texas sigue fuerte como segunda lectura, porque combina industria, ubicacion e incentivos.",
            en: "Texas remains strong as a second reading because it combines industry, location and incentives.",
          },
          {
            es: "Para UMO, esto no define la venta inmediata, pero si muestra donde podria consolidarse despues.",
            en: "For UMO, this does not define the immediate sale, but it does show where it could consolidate later.",
          },
        ],
        analysis: {
          keyData: {
            es: "El stock de inversion colombiana en EE. UU. sube de US$4.044B en 2020 a US$5.174B en 2024, y Florida concentra historicamente la mayor lectura estatal.",
            en: "Colombian investment stock in the U.S. rises from US$4.044B in 2020 to US$5.174B in 2024, and Florida holds the strongest historical state reading.",
          },
          meaning: {
            es: "La relacion de inversion crece y Florida aparece como el punto mas natural para una entrada comercial con origen colombiano.",
            en: "The investment relationship grows and Florida appears as the most natural point for a Colombian-origin commercial entry.",
          },
          impact: {
            es: "UMO puede usar Florida para abrir relaciones, validar canal y construir presencia antes de pensar en una escala mayor.",
            en: "UMO can use Florida to open relationships, validate its channel and build presence before thinking about greater scale.",
          },
          score: {
            es: "Florida recibe 5/5 por su relevancia historica en la inversion colombiana hacia EE. UU. Texas queda en 4.3/5 porque sigue siendo atractivo, pero con una evidencia estatal menos directa.",
            en: "Florida receives 5/5 because of its historical relevance in Colombian investment into the U.S. Texas stays at 4.3/5 because it remains attractive, but with less direct state evidence.",
          },
        },
        strategicReading: {
          es: "Florida se siente mas natural para abrir relaciones iniciales; Texas se reserva como paso de consolidacion industrial y comercial.",
          en: "Florida feels more natural for opening initial relationships; Texas is reserved for industrial and commercial consolidation.",
        },
        sources: [
          { label: "SelectUSA Colombia FDI Fact Sheet 2025", href: "https://www.trade.gov/sites/default/files/2025-11/Colombia-508.pdf" },
          { label: "ANDI Colombia-U.S. Investment Roadmap", href: "https://www.andi.com.co/Uploads/Investment%20Roadmap.pdf" },
          { label: "BEA Direct Investment by Country and Industry 2024", href: "https://www.bea.gov/news/2025/direct-investment-country-and-industry-2024" },
        ],
      },
      {
        id: "sectores-receptores-fdi",
        eyebrow: { es: "Indicador 02", en: "Indicator 02" },
        title: { es: "Principales sectores receptores de inversion", en: "Main investment-receiving sectors" },
        summary: {
          es: "Texas presenta mas proyectos greenfield y sectores mas alineados con maquinaria, logistica y operacion B2B; Florida queda mas fuerte como plataforma comercial y de servicios.",
          en: "Texas shows more greenfield projects and sectors more aligned with machinery, logistics and B2B operations; Florida remains stronger as a commercial and services platform.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "1,966 proyectos", chartValue: 1966, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "1,182 proyectos", chartValue: 1182, score: 4.4 },
        reference: {
          label: { es: "Lectura UMO", en: "UMO reading" },
          display: "Texas mas alineado con industria y B2B",
        },
        chartMax: 2200,
        latestLabel: { es: "Dato agregado", en: "Aggregate data" },
        tableRows: [
          { label: { es: "Business Services", en: "Business Services" }, texas: "244", florida: "204", reference: "Back office y soporte B2B" },
          { label: { es: "Software & IT", en: "Software & IT" }, texas: "291", florida: "193", reference: "Canal digital y soporte comercial" },
          { label: { es: "Transport & Warehousing", en: "Transport & Warehousing" }, texas: "128", florida: "65", reference: "Distribucion y logistica" },
          { label: { es: "Industrial Equipment", en: "Industrial Equipment" }, texas: "215", florida: "0", reference: "Encaje directo con maquinaria" },
          { label: { es: "Total greenfield", en: "Total greenfield" }, texas: "1,966", florida: "1,182", reference: "Texas lidera por volumen" },
        ],
        bullets: [
          {
            es: "Texas se parece mas al tipo de ecosistema que UMO necesita para crecer hacia dealers y clientes de maquinaria.",
            en: "Texas looks more like the type of ecosystem UMO needs to grow toward dealers and machinery customers.",
          },
          {
            es: "Florida sigue siendo util para oficina comercial, distribucion y networking con empresas latinas y de servicios.",
            en: "Florida remains useful for a commercial office, distribution and networking with Latin and service companies.",
          },
          {
            es: "El dato no obliga a abandonar Florida; solo muestra que Texas se alinea mejor con la escala industrial.",
            en: "The data does not force UMO to abandon Florida; it only shows that Texas aligns better with industrial scale.",
          },
        ],
        analysis: {
          keyData: {
            es: "Texas suma 1,966 proyectos greenfield frente a 1,182 en Florida y destaca en equipo industrial, energia y logistica.",
            en: "Texas totals 1,966 greenfield projects versus 1,182 in Florida and stands out in industrial equipment, energy and logistics.",
          },
          meaning: {
            es: "Texas ofrece un ecosistema mas cercano a manufactura, maquinaria, almacenamiento y expansion comercial B2B.",
            en: "Texas offers an ecosystem closer to manufacturing, machinery, warehousing and B2B commercial expansion.",
          },
          impact: {
            es: "Si UMO quiere pasar de vender a construir una presencia mas robusta, Texas da una base mas compatible con ese salto.",
            en: "If UMO wants to move from selling to building a stronger presence, Texas provides a more compatible base for that step.",
          },
          score: {
            es: "Texas recibe 5/5 por volumen y encaje sectorial. Florida queda en 4.4/5 porque es fuerte para servicios y distribucion, pero menos alineada con maquinaria.",
            en: "Texas receives 5/5 for volume and sector fit. Florida remains at 4.4/5 because it is strong for services and distribution, but less aligned with machinery.",
          },
        },
        strategicReading: {
          es: "Texas es el territorio que mejor soporta una segunda fase industrial y B2B. Florida sirve mejor como plataforma de relacion y entrada comercial.",
          en: "Texas is the territory that best supports an industrial and B2B second phase. Florida works better as a relationship and commercial-entry platform.",
        },
        sources: [
          { label: "SelectUSA Florida FDI Fact Sheet 2026", href: "https://www.trade.gov/sites/default/files/2026-03/Florida-508.pdf" },
          { label: "SelectUSA Texas FDI Fact Sheet 2026", href: "https://www.trade.gov/sites/default/files/2026-03/Texas-508.pdf" },
        ],
      },
      {
        id: "incentivos-inversion",
        eyebrow: { es: "Indicador 03", en: "Indicator 03" },
        title: { es: "Incentivos a la inversion", en: "Investment incentives" },
        summary: {
          es: "Los dos estados ofrecen incentivos utiles, pero Texas presenta un portafolio mas amplio y mas claro para una expansion industrial o logistica posterior.",
          en: "Both states offer useful incentives, but Texas presents a broader and clearer portfolio for a later industrial or logistics expansion.",
        },
        texas: { label: { es: "Texas", en: "Texas" }, display: "8 programas", chartValue: 8, score: 5 },
        florida: { label: { es: "Florida", en: "Florida" }, display: "6 programas", chartValue: 6, score: 4.6 },
        reference: {
          label: { es: "Lectura UMO", en: "UMO reading" },
          display: "Texas ofrece mayor amplitud de programas",
        },
        chartMax: 10,
        latestLabel: { es: "Programas verificados", en: "Verified programs" },
        tableRows: [
          { label: { es: "Capital y grants", en: "Capital and grants" }, texas: "TEF / JETI", florida: "CITC / HIPI", reference: "Escala alta" },
          { label: { es: "Zonas e incentivos fiscales", en: "Zones and tax incentives" }, texas: "Enterprise Zone / Opportunity Zones", florida: "Sales & use / corporate tax incentives", reference: "Localizacion y costo" },
          { label: { es: "Capacitacion", en: "Training" }, texas: "Skills Development Fund", florida: "QRT / Incumbent Worker", reference: "Equipo local" },
          { label: { es: "Financiacion", en: "Financing" }, texas: "TSBCI / Industrial Revenue Bonds", florida: "FloridaFlex / support tools", reference: "Fase de expansion" },
        ],
        bullets: [
          {
            es: "Texas ofrece mas instrumentos y mas claridad si UMO decide crecer con bodega, equipo comercial o socios de distribucion.",
            en: "Texas offers more instruments and more clarity if UMO decides to grow with warehousing, a commercial team or distribution partners.",
          },
          {
            es: "Florida no queda debil: tambien da apoyo fuerte en entrenamiento e incentivos tributarios.",
            en: "Florida does not stay weak: it also provides strong support in training and tax incentives.",
          },
          {
            es: "La diferencia esta en amplitud y encaje con proyectos industriales o logisticos mas grandes.",
            en: "The difference lies in breadth and fit with larger industrial or logistics projects.",
          },
        ],
        analysis: {
          keyData: {
            es: "Texas suma 8 programas relevantes verificados y Florida 6, con enfoques distintos segun escala y tipo de proyecto.",
            en: "Texas totals 8 verified relevant programs and Florida 6, with different focuses depending on scale and project type.",
          },
          meaning: {
            es: "Texas entrega mas opciones para una expansion futura; Florida acompana mejor la entrada y la formacion del equipo.",
            en: "Texas delivers more options for future expansion; Florida better supports entry and team training.",
          },
          impact: {
            es: "UMO gana margen de maniobra si el proyecto evoluciona hacia presencia local, alianzas o una estructura logistica propia.",
            en: "UMO gains room to maneuver if the project evolves toward a local presence, partnerships or its own logistics structure.",
          },
          score: {
            es: "Texas recibe 5/5 por amplitud y claridad de programas. Florida queda en 4.6/5 porque tambien ofrece incentivos fuertes, aunque con menor variedad total.",
            en: "Texas receives 5/5 for breadth and clarity of programs. Florida stays at 4.6/5 because it also offers strong incentives, though with less overall variety.",
          },
        },
        strategicReading: {
          es: "Texas encaja mejor con una segunda fase de expansion robusta. Florida acompana bien la entrada, entrenamiento y consolidacion inicial.",
          en: "Texas fits better with a robust second expansion phase. Florida supports entry, training and early consolidation well.",
        },
        sources: [
          { label: "Texas Governor - Incentive Programs", href: "https://gov.texas.gov/business/page/incentives" },
          { label: "TxEDC - Texas Business Incentives", href: "https://businessintexas.com/why-texas/taxes-incentives/incentives/" },
          { label: "Florida Department of Revenue - Tax Incentives", href: "https://floridarevenue.com/taxes/taxesfees/Pages/tax_incentives.aspx" },
          { label: "SelectFlorida - Capital Investment Tax Credit", href: "https://selectflorida.org/wp-content/uploads/incentive-capital-investment-tax-credit.pdf" },
          { label: "CareerSource Florida - Quick Response Training", href: "https://careersourceflorida.com/wp-content/uploads/2025/06/2025-26_QRT-Guidelines.pdf" },
        ],
      },
    ],
  },
});

export function getEnvironmentDeepDive(id: string) {
  return environmentDeepDiveMap[id];
}
