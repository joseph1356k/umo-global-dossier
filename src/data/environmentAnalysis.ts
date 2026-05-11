import type { Localized } from "./content";

export type EnvironmentStatus = "available" | "pending";

export type EnvironmentFileLink = {
  label: Localized;
  description: Localized;
  href: string;
  openLabel: Localized;
  downloadLabel: Localized;
  metadata: string[];
};

export type EnvironmentSignal = {
  title: Localized;
  florida: string;
  texas: string;
  national: string;
  referenceLabel?: Localized;
  reading: Localized;
};

export type EnvironmentEntry = {
  id: string;
  title: Localized;
  shortTitle: Localized;
  summary: Localized;
  description: Localized;
  focus: Localized;
  strategicRole: Localized;
  indicators: Localized[];
  status: EnvironmentStatus;
  file?: EnvironmentFileLink;
  notes?: Localized[];
  signals?: EnvironmentSignal[];
};

export const environmentIntro = {
  title: {
    es: "Analisis de Entornos",
    en: "Environment Analysis",
  },
  eyebrow: {
    es: "DIAGNOSTICO AMPLIADO / FLORIDA Y TEXAS",
    en: "EXPANDED DIAGNOSTIC / FLORIDA AND TEXAS",
  },
  summary: {
    es: "El analisis de entornos permite evaluar las condiciones culturales, politicas, legales, tecnologicas, ambientales, comerciales y de inversion que influyen en la viabilidad de internacionalizar UMO hacia el mercado estadounidense. Esta seccion organiza los resultados por entorno y permite comparar de forma clara las oportunidades y riesgos de Florida y Texas.",
    en: "Environment analysis helps evaluate the cultural, political, legal, technological, environmental, commercial and investment conditions that shape UMO's ability to enter the U.S. market. This section organizes the findings by environment and makes the opportunities and risks of Florida and Texas easier to compare.",
  },
  integratedNote: {
    es: "La lectura no se divide en archivos aislados. Cada entorno responde una pregunta distinta sobre demanda, operacion, acceso y escalabilidad para UMO.",
    en: "The reading is not split into isolated files. Each environment answers a different question about demand, operations, access and scalability for UMO.",
  },
};

export const environmentEntries: EnvironmentEntry[] = [
  {
    id: "entorno-cultural-social",
    title: {
      es: "Entorno Cultural y Social",
      en: "Cultural and Social Environment",
    },
    shortTitle: {
      es: "Cultural y Social",
      en: "Cultural and Social",
    },
    summary: {
      es: "Explica habitos de uso, vida suburbana y disposicion del cliente a invertir en jardin, patio y mantenimiento exterior.",
      en: "Explains usage habits, suburban living and customer willingness to spend on yard, patio and outdoor maintenance.",
    },
    description: {
      es: "Este entorno sirve para leer si el producto de UMO entra en una rutina real de uso. Aqui importa si hay hogares, contratistas y negocios acostumbrados a cuidar cesped, jardin y maquinaria exterior, y si existe una cultura de compra de repuestos o mejoras para alargar la vida util del equipo.",
      en: "This environment helps read whether UMO's product fits into a real routine of use. The focus is whether households, contractors and businesses are used to maintaining lawns, gardens and outdoor machinery, and whether there is a culture of buying replacement parts or upgrades to extend equipment life.",
    },
    focus: {
      es: "Demanda cotidiana y comportamiento de uso.",
      en: "Everyday demand and usage behavior.",
    },
    strategicRole: {
      es: "Muestra si Florida y Texas tienen un contexto social que haga natural el uso frecuente de podadoras, tractores ligeros y equipos de paisajismo.",
      en: "Shows whether Florida and Texas have a social context that makes frequent use of mowers, light tractors and landscaping equipment natural.",
    },
    indicators: [
      {
        es: "Tasa de urbanizacion y areas suburbanas.",
        en: "Urbanization rate and suburban areas.",
      },
      {
        es: "Cultura de cuidado del jardin y mantenimiento del hogar.",
        en: "Yard-care and home-maintenance culture.",
      },
      {
        es: "Preferencia por el Do It Yourself.",
        en: "Preference for the Do It Yourself model.",
      },
    ],
    status: "available",
    file: {
      label: {
        es: "Copia de Analisis de entornos.docx",
        en: "Copy of Environment Analysis.docx",
      },
      description: {
        es: "Documento base con desarrollo del entorno cultural y social para Florida y Texas.",
        en: "Source document with the cultural and social environment analysis for Florida and Texas.",
      },
      href: "/assets/content/analisis-entornos.docx",
      openLabel: {
        es: "Abrir documento",
        en: "Open document",
      },
      downloadLabel: {
        es: "Descargar documento",
        en: "Download document",
      },
      metadata: ["Entrega 03", "DOCX", "2 entornos", "Analisis base"],
    },
    notes: [
      {
        es: "Este entorno ya no queda como texto encerrado en Word. La lectura clave se deja visible para exponer por que hay mercado real alrededor del jardin y la maquinaria ligera.",
        en: "This environment no longer stays trapped inside Word. The key reading is visible so it can explain why there is real market demand around lawns and light machinery.",
      },
    ],
    signals: [
      {
        title: {
          es: "Urbanizacion y areas suburbanas",
          en: "Urbanization and suburban areas",
        },
        florida: "93.0%",
        texas: "86.8%",
        national: "Mercado residencial masivo",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Florida y Texas siguen creciendo en vivienda suburbana. Para UMO eso importa porque cada casa con patio implica mas uso de podadoras, mantenimiento y repuestos alrededor del hogar.",
          en: "Florida and Texas keep growing in suburban housing. For UMO that matters because each home with a yard implies more mower use, maintenance and replacement parts around the household.",
        },
      },
      {
        title: {
          es: "Gasto en jardin y mantenimiento",
          en: "Yard-care and maintenance spending",
        },
        florida: "USD 755",
        texas: "USD 712",
        national: "Necesidad cultural sostenida",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "No es un gasto de lujo. El documento muestra que en ambos estados cuidar el cesped es una rutina cultural y muchas veces normativa, lo que sostiene compras repetidas y vida util del equipo.",
          en: "This is not a luxury expense. The document shows that in both states lawn care is a cultural and often normative routine, which supports repeat purchases and equipment upkeep.",
        },
      },
      {
        title: {
          es: "Preferencia por DIY",
          en: "DIY preference",
        },
        florida: "74%",
        texas: "79%",
        national: "Aftermarket directo al usuario",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "El usuario final si esta dispuesto a meter mano al equipo. Eso le abre a UMO una ruta clara de repuesto, upgrade y venta directa sin depender solo del fabricante original.",
          en: "The end user is willing to work on the equipment. That opens a clear route for UMO around replacement parts, upgrades and direct sales without depending only on the original manufacturer.",
        },
      },
    ],
  },
  {
    id: "entorno-politico-legal",
    title: {
      es: "Entorno Politico y Legal",
      en: "Political and Legal Environment",
    },
    shortTitle: {
      es: "Politico y Legal",
      en: "Political and Legal",
    },
    summary: {
      es: "Ubica reglas tributarias, supervivencia empresarial y el marco comercial que afecta la entrada real de UMO.",
      en: "Positions the tax rules, business survival signals and commercial framework that affect UMO's real market entry.",
    },
    description: {
      es: "Este entorno sirve para entender si la operacion puede sostenerse con orden. No solo mira impuestos; tambien muestra que tan estable es abrir relaciones comerciales, vender, cumplir reglas locales y aprovechar el marco Colombia - Estados Unidos.",
      en: "This environment helps understand whether the operation can be sustained in an orderly way. It looks beyond taxes to show how stable it is to open commercial relationships, sell, comply with local rules and use the Colombia-United States framework.",
    },
    focus: {
      es: "Reglas de operacion y carga institucional.",
      en: "Operating rules and institutional load.",
    },
    strategicRole: {
      es: "Permite explicar si el mercado es facil de operar, que costos de cumplimiento pueden aparecer y como ayuda el TLC para que UMO no entre a ciegas.",
      en: "Helps explain whether the market is easy to operate, what compliance costs may appear and how the trade agreement helps UMO avoid entering blindly.",
    },
    indicators: [
      {
        es: "Indice de competitividad tributaria estatal.",
        en: "State tax competitiveness index.",
      },
      {
        es: "Ausencia de impuesto estatal sobre la renta personal.",
        en: "Absence of state personal income tax.",
      },
      {
        es: "Indice de supervivencia de empresas pequenas.",
        en: "Small business survival index.",
      },
      {
        es: "Contexto del Tratado de Libre Comercio Colombia - Estados Unidos.",
        en: "Context of the Colombia-United States free trade agreement.",
      },
    ],
    status: "available",
    file: {
      label: {
        es: "Copia de Analisis de entornos.docx",
        en: "Copy of Environment Analysis.docx",
      },
      description: {
        es: "Documento base con el desarrollo politico y legal para la entrada de UMO en Florida y Texas.",
        en: "Source document with the political and legal analysis for UMO's entry into Florida and Texas.",
      },
      href: "/assets/content/analisis-entornos.docx",
      openLabel: {
        es: "Abrir documento",
        en: "Open document",
      },
      downloadLabel: {
        es: "Descargar documento",
        en: "Download document",
      },
      metadata: ["Entrega 03", "DOCX", "Fiscal y legal", "Marco TLC"],
    },
    notes: [
      {
        es: "La lectura de este entorno no busca abrumar con leyes. La idea es dejar claro por que Florida y Texas permiten operar con costos y reglas favorables para una entrada gradual.",
        en: "This environment is not meant to overwhelm with laws. The point is to make it clear why Florida and Texas allow UMO to operate with favorable rules and costs for a gradual entry.",
      },
    ],
    signals: [
      {
        title: {
          es: "Competitividad tributaria estatal",
          en: "State tax competitiveness",
        },
        florida: "#4",
        texas: "#12",
        national: "Ambos en el grupo fuerte",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Los dos estados aparecen bien parados dentro del mapa fiscal de EE. UU. Eso ayuda a UMO porque baja la presion de costos fijos si decide abrir distribucion, fulfillment o una operacion comercial mas estable.",
          en: "Both states rank well inside the U.S. tax map. That helps UMO because it lowers fixed-cost pressure if it decides to open distribution, fulfillment or a more stable commercial operation.",
        },
      },
      {
        title: {
          es: "Impuesto estatal a la renta personal",
          en: "State personal income tax",
        },
        florida: "0%",
        texas: "0%",
        national: "Mayor ingreso neto disponible",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "En ambos casos el consumidor retiene mas ingreso disponible. Eso vuelve mas viable vender mejoras, sillines premium y repuestos con una sensibilidad de precio menor que en estados mas cargados.",
          en: "In both cases the consumer keeps more disposable income. That makes it more viable to sell upgrades, premium seats and replacement parts with less price sensitivity than in more heavily taxed states.",
        },
      },
      {
        title: {
          es: "Supervivencia de pequenas empresas y TLC",
          en: "Small business survival and FTA",
        },
        florida: ">78%",
        texas: ">78%",
        national: "Arancel 0% para Colombia",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "UMO no entra sola: necesita talleres, minoristas y aliados. El documento muestra que el ecosistema empresarial aguanta y que el TLC mejora rentabilidad al dejar las exportaciones con arancel cero.",
          en: "UMO does not enter alone: it needs workshops, retailers and partners. The document shows that the business ecosystem holds up and that the FTA improves profitability by keeping exports at zero tariff.",
        },
      },
    ],
  },
  {
    id: "entorno-tecnologico-geoambiental",
    title: {
      es: "Entorno Tecnologico y Geoambiental",
      en: "Technological and Geoenvironmental Environment",
    },
    shortTitle: {
      es: "Tecnologico y Geoambiental",
      en: "Technological and Geoenvironmental",
    },
    summary: {
      es: "Conecta e-commerce, temporadas verdes y desgaste ambiental para mostrar por que Florida y Texas si tienen contexto real para el producto.",
      en: "Connects e-commerce, green seasons and environmental wear to show why Florida and Texas do have real context for the product.",
    },
    description: {
      es: "Este archivo analiza indicadores relacionados con el comercio electronico para productos de paisajismo, la temporada de crecimiento favorable y las condiciones ambientales de desgaste en Florida y Texas. Incluye tablas 2021-2025, graficos comparativos, analisis estrategico y calificaciones de impacto para UMO.",
      en: "This file analyzes indicators related to e-commerce for landscaping products, favorable growing seasons and environmental wear conditions in Florida and Texas. It includes 2021-2025 tables, comparative charts, strategic analysis and impact scores for UMO.",
    },
    focus: {
      es: "Frecuencia de uso, desgaste del equipo y oportunidad digital.",
      en: "Frequency of use, equipment wear and digital opportunity.",
    },
    strategicRole: {
      es: "Sirve para mostrar que Florida y Texas no solo son grandes mercados: tambien tienen clima, rutina exterior y canal digital suficientes para justificar una entrada mas afinada al producto de UMO.",
      en: "It helps show that Florida and Texas are not only large markets: they also have climate, outdoor routines and digital channels strong enough to justify a more targeted entry for UMO's product.",
    },
    indicators: [
      {
        es: "Porcentaje de la poblacion que hace compras por e-commerce para productos de paisajismo.",
        en: "Share of the population buying landscaping products through e-commerce.",
      },
      {
        es: "Growing season favorable.",
        en: "Favorable growing season.",
      },
      {
        es: "Condiciones ambientales de desgaste: calor, humedad, radiacion solar y lluvia.",
        en: "Environmental wear conditions: heat, humidity, solar radiation and rain.",
      },
    ],
    status: "available",
    file: {
      label: {
        es: "UMO_TecGeoambiental_indicadores_2021_2025.xlsx",
        en: "UMO_TecGeoambiental_indicadores_2021_2025.xlsx",
      },
      description: {
        es: "Archivo Excel cargado con dashboard, tres indicadores comparativos y hoja de fuentes/metodologia.",
        en: "Excel file uploaded with a dashboard, three comparative indicators and a sources/methodology sheet.",
      },
      href: "/assets/content/umo-tecgeo-entornos.xlsx",
      openLabel: {
        es: "Abrir Excel",
        en: "Open spreadsheet",
      },
      downloadLabel: {
        es: "Descargar Excel",
        en: "Download spreadsheet",
      },
      metadata: ["2021-2025", "5 hojas", "3 indicadores", "1 dashboard"],
    },
    notes: [
      {
        es: "La comparacion ya no queda solo en el archivo: se deja una lectura 2025 visible para exponer rapido.",
        en: "The comparison no longer stays only in the file: a visible 2025 reading is left on the page for quick presentation.",
      },
    ],
    signals: [
      {
        title: {
          es: "E-commerce para paisajismo",
          en: "E-commerce for landscaping",
        },
        florida: "17.5%",
        texas: "17.8%",
        national: "16.4%",
        reading: {
          es: "Texas y Florida quedan por encima del promedio nacional. Eso ayuda a UMO si decide vender por catalogo, marketplace o canal digital especializado.",
          en: "Texas and Florida stay above the national average. That helps UMO if it decides to sell through catalogs, marketplaces or specialized digital channels.",
        },
      },
      {
        title: {
          es: "Growing season favorable",
          en: "Favorable growing season",
        },
        florida: "72.3 F",
        texas: "67.7 F",
        national: "54.6 F",
        reading: {
          es: "Ambos estados muestran temporadas mas calidas y largas que el promedio de EE. UU. Eso se traduce en mas meses de uso de podadoras, jardin y mantenimiento exterior.",
          en: "Both states show warmer and longer seasons than the U.S. average. That translates into more months of mower use, yard work and outdoor maintenance.",
        },
      },
      {
        title: {
          es: "Desgaste ambiental",
          en: "Environmental wear",
        },
        florida: "4.5 / 5",
        texas: "4.7 / 5",
        national: "3.6 / 5",
        reading: {
          es: "Florida y Texas castigan mas el equipo que el promedio nacional. Ese desgaste fortalece el argumento de repuesto, confort y durabilidad para UMO.",
          en: "Florida and Texas stress equipment more than the national average. That wear strengthens UMO's argument around replacement, comfort and durability.",
        },
      },
    ],
  },
  {
    id: "entorno-comercio-internacional",
    title: {
      es: "Entorno de Comercio Internacional",
      en: "International Trade Environment",
    },
    shortTitle: {
      es: "Comercio Internacional",
      en: "International Trade",
    },
    summary: {
      es: "Lee las rutas, instituciones y flujos de comercio que hacen viable mover el producto desde Colombia.",
      en: "Reads the routes, institutions and trade flows that make it viable to move the product from Colombia.",
    },
    description: {
      es: "Este entorno aterriza la salida real del producto. Aqui se debe ver quien apoya la exportacion, como se mueve la balanza comercial y por que la ruta Colombia -> Florida o Colombia -> Texas puede sostener una entrada ordenada.",
      en: "This environment grounds the product's real outbound path. It should show who supports the export process, how trade balances move and why the Colombia -> Florida or Colombia -> Texas route can support an orderly entry.",
    },
    focus: {
      es: "Acceso logistico y soporte exportador.",
      en: "Logistics access and export support.",
    },
    strategicRole: {
      es: "Permite explicar si la entrada tiene respaldo institucional, si la ruta logistica es razonable y si el comercio exterior acompana el crecimiento esperado por UMO.",
      en: "Helps explain whether the entry has institutional backing, whether the logistics route is reasonable and whether trade dynamics support UMO's expected growth.",
    },
    indicators: [
      {
        es: "Instituciones de apoyo al comercio exterior.",
        en: "Institutions that support foreign trade.",
      },
      {
        es: "Evolucion de la balanza comercial entre Colombia y los estados seleccionados.",
        en: "Trade balance evolution between Colombia and the selected states.",
      },
      {
        es: "Ruta logistica Colombia -> Florida / Texas.",
        en: "Logistics route Colombia -> Florida / Texas.",
      },
    ],
    status: "available",
    file: {
      label: {
        es: "UMO_Comercio_Internacional_2021_2025.xlsx",
        en: "UMO_Comercio_Internacional_2021_2025.xlsx",
      },
      description: {
        es: "Excel con dashboard, instituciones de apoyo, balanza comercial, ruta logistica y metodologia de comparacion para Florida y Texas.",
        en: "Spreadsheet with dashboard, support institutions, trade balance, logistics route and comparison methodology for Florida and Texas.",
      },
      href: "/assets/content/umo-comercio-internacional.xlsx",
      openLabel: {
        es: "Abrir Excel",
        en: "Open spreadsheet",
      },
      downloadLabel: {
        es: "Descargar Excel",
        en: "Download spreadsheet",
      },
      metadata: ["2021-2025", "6 hojas", "3 indicadores", "Puertos y comercio"],
    },
    notes: [
      {
        es: "Este entorno ya deja visible la ruta completa: apoyo institucional, lectura comercial con Colombia y capacidad logistica para mover el producto.",
        en: "This environment now leaves the full route visible: institutional support, commercial reading with Colombia and logistics capacity to move the product.",
      },
    ],
    signals: [
      {
        title: {
          es: "Instituciones de apoyo",
          en: "Support institutions",
        },
        florida: "4.8 / 5",
        texas: "5.0 / 5",
        national: "Red binacional activa",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Texas gana por mayor musculo exportador e institucional. Florida tambien es fuerte porque conecta mejor con la entrada por el sureste y la relacion con Colombia.",
          en: "Texas wins through stronger export and institutional muscle. Florida is also strong because it connects better with entry through the southeast and the relationship with Colombia.",
        },
      },
      {
        title: {
          es: "Balanza comercial y relacion con Colombia",
          en: "Trade balance and Colombia link",
        },
        florida: "5.0 / 5",
        texas: "4.7 / 5",
        national: "Comercio bilateral activo",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Florida queda mejor posicionada como puerta de entrada porque Colombia aparece dentro de sus relaciones comerciales visibles. Texas conserva fuerza por escala, pero no por cercania comercial directa con Colombia.",
          en: "Florida is better positioned as an entry gateway because Colombia appears within its visible trade relationships. Texas remains strong by scale, but not by direct commercial closeness to Colombia.",
        },
      },
      {
        title: {
          es: "Ruta logistica y capacidad portuaria",
          en: "Logistics route and port capacity",
        },
        florida: "4.9 / 5",
        texas: "5.0 / 5",
        national: "Florida = entrada / Texas = escala",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Florida ofrece entrada mas rapida desde Colombia; Texas gana cuando la meta es escalar distribucion B2B con puertos mas grandes y mejor red interna.",
          en: "Florida offers a faster entry from Colombia; Texas wins when the goal is to scale B2B distribution with larger ports and a stronger internal network.",
        },
      },
    ],
  },
  {
    id: "entorno-inversion-extranjera-directa",
    title: {
      es: "Entorno de Inversion Extranjera Directa",
      en: "Foreign Direct Investment Environment",
    },
    shortTitle: {
      es: "Inversion Extranjera Directa",
      en: "Foreign Direct Investment",
    },
    summary: {
      es: "Ayuda a leer que tan atractivo es el territorio para capital, alianzas y plataformas de crecimiento a mediano plazo.",
      en: "Helps read how attractive the territory is for capital, partnerships and medium-term growth platforms.",
    },
    description: {
      es: "Este entorno no se limita a capital financiero. Tambien muestra si Florida y Texas concentran sectores receptores, incentivos y condiciones que faciliten una presencia comercial mas robusta para UMO si la entrada inicial funciona.",
      en: "This environment is not limited to financial capital. It also shows whether Florida and Texas concentrate receiving sectors, incentives and conditions that could support a stronger commercial presence for UMO if the initial entry works.",
    },
    focus: {
      es: "Confianza de inversion y escalabilidad futura.",
      en: "Investment confidence and future scalability.",
    },
    strategicRole: {
      es: "Sirve para explicar si despues de vender hay espacio para crecer con alianzas, presencia comercial o estructuras mas estables en el territorio.",
      en: "Helps explain whether, after selling, there is room to grow through partnerships, commercial presence or more stable structures in the territory.",
    },
    indicators: [
      {
        es: "Flujos de inversion entre Colombia y los estados seleccionados.",
        en: "Investment flows between Colombia and the selected states.",
      },
      {
        es: "Principales sectores receptores de inversion.",
        en: "Main investment-receiving sectors.",
      },
      {
        es: "Incentivos a la inversion en los estados seleccionados.",
        en: "Investment incentives in the selected states.",
      },
    ],
    status: "available",
    file: {
      label: {
        es: "UMO_Inversion_Extranjera_Directa_2020_2024.xlsx",
        en: "UMO_Inversion_Extranjera_Directa_2020_2024.xlsx",
      },
      description: {
        es: "Excel con flujos de inversion Colombia-EE. UU., sectores receptores, incentivos estatales y conclusion estrategica para Florida y Texas.",
        en: "Spreadsheet with Colombia-U.S. investment flows, receiving sectors, state incentives and a strategic conclusion for Florida and Texas.",
      },
      href: "/assets/content/umo-inversion-extranjera-directa.xlsx",
      openLabel: {
        es: "Abrir Excel",
        en: "Open spreadsheet",
      },
      downloadLabel: {
        es: "Descargar Excel",
        en: "Download spreadsheet",
      },
      metadata: ["2020-2024", "6 hojas", "3 indicadores", "FDI e incentivos"],
    },
    notes: [
      {
        es: "La lectura de IED no se queda en capital abstracto. Se traduce en confianza de inversion, sectores compatibles e incentivos utiles si UMO decide escalar despues de la entrada comercial.",
        en: "The FDI reading does not stay at the level of abstract capital. It translates into investment confidence, compatible sectors and useful incentives if UMO decides to scale after the commercial entry.",
      },
    ],
    signals: [
      {
        title: {
          es: "Flujos de inversion y relevancia estatal",
          en: "Investment flows and state relevance",
        },
        florida: "5.0 / 5",
        texas: "4.3 / 5",
        national: "Relacion Colombia-USA en crecimiento",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Florida aparece como puerta comercial natural para empresas colombianas. Texas tambien atrae, pero en este punto Florida tiene una referencia mas directa.",
          en: "Florida appears as a natural commercial gateway for Colombian firms. Texas also attracts investment, but at this point Florida has the more direct reference.",
        },
      },
      {
        title: {
          es: "Sectores receptores de inversion",
          en: "Investment-receiving sectors",
        },
        florida: "4.4 / 5",
        texas: "5.0 / 5",
        national: "Texas mas alineado con industria",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Texas queda mejor alineado con industria, logistica y B2B. Florida sirve mas como plataforma comercial y de relacion con Latinoamerica.",
          en: "Texas is better aligned with industry, logistics and B2B. Florida works more as a commercial platform and a bridge to Latin America.",
        },
      },
      {
        title: {
          es: "Incentivos a la inversion",
          en: "Investment incentives",
        },
        florida: "4.6 / 5",
        texas: "5.0 / 5",
        national: "Texas ofrece portafolio mas amplio",
        referenceLabel: {
          es: "Lectura USA",
          en: "U.S. reading",
        },
        reading: {
          es: "Texas ofrece un paquete mas amplio y claro para una fase futura de expansion. Florida tambien es fuerte, sobre todo para entrenamiento y soporte a la entrada.",
          en: "Texas offers a broader and clearer package for a future expansion phase. Florida is also strong, especially for training and entry support.",
        },
      },
    ],
  },
];

export function getEnvironmentEntry(id: string) {
  return environmentEntries.find((entry) => entry.id === id);
}
