import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  Building2,
  ChevronDown,
  Database,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Languages,
  Menu,
  PanelLeft,
  X,
} from "lucide-react";
import { Suspense, lazy, memo, useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import {
  agreementConsequences,
  agreementPillars,
  agreementRules,
  canvasBlocks,
  canvasHighlights,
  companyProfile,
  deliveries,
  diagnosticFactors,
  diagnosticMetrics,
  diagnosticRadarSets,
  diagnosticSnapshots,
  entryTestProfiles,
  smartCriteria,
  smartObjective,
  swotBlocks,
  swotDetailedBlocks,
  team,
  viabilityPillars,
  weeklyCadence,
  type Delivery,
  type DocumentItem,
  type WorkModule,
} from "./data/content";
import { type Locale } from "./i18n/copy";

const DossierScene = lazy(() => import("./components/DossierScene"));

const iconByType = {
  pdf: FileText,
  image: ImageIcon,
  spreadsheet: Database,
  external: ExternalLink,
};

type BackendSnapshot = {
  online: boolean;
  project?: {
    readiness: number;
    updatedAt: string;
  };
  totals?: {
    deliveries: number;
    documents: number;
    teamMembers: number;
    objectives: number;
  };
};

type ArchiveItem = {
  delivery: Delivery;
  module: WorkModule;
  tags: string[];
};

const PRESENTATION_VIEW_ID = "recopilacion";

const moduleArchiveTags: Record<string, string[]> = {
  "acuerdo-equipo": ["team", "planning", "governance"],
  "planeacion-equipo": ["team", "planning", "governance"],
  "descripcion-empresa": ["company", "research", "source"],
  "business-model-canvas": ["canvas", "model", "canva", "strategy"],
  "diagnostico-pi": ["diagnostic", "market", "data"],
  dofa: ["swot", "strategy", "analysis"],
  "thermo-seats-smart": ["smart", "strategy", "product"],
  "sostenibilidad-viabilidad": ["sustainability", "viability", "market"],
  "mercado-eeuu": ["market", "research", "pricing"],
  "plan-accion": ["execution", "timeline", "planning"],
  "indicadores-ejecucion": ["execution", "data", "budget"],
};

const archiveItems: ArchiveItem[] = deliveries.flatMap((delivery) =>
  delivery.modules.map((module) => ({
    delivery,
    module,
    tags: Array.from(
      new Set([
        ...(moduleArchiveTags[module.id] ?? []),
        module.type,
        ...module.documents.map((document) => document.type),
      ]),
    ),
  })),
);

function getDeliveryById(id?: string) {
  return deliveries.find((delivery) => delivery.id === id) ?? deliveries[0];
}

function getModuleTags(moduleId: string) {
  return moduleArchiveTags[moduleId] ?? [];
}

function getDocumentCountLabel(count: number, locale: Locale) {
  if (count === 1) return locale === "es" ? "1 documento" : "1 document";
  return locale === "es" ? `${count} documentos` : `${count} documents`;
}

function useDeferredDesktopScene() {
  const [shouldLoadScene, setShouldLoadScene] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frameId = 0;
    let timer = 0;

    frameId = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => setShouldLoadScene(true), 120);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timer);
    };
  }, []);

  return shouldLoadScene;
}

function ScenePlaceholder() {
  return <div className="scene-shell scene-fallback scene-fallback-motion" aria-hidden="true" />;
}

function useBackendSnapshot() {
  const [snapshot, setSnapshot] = useState<BackendSnapshot>({ online: false });

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/project", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        return response.json() as Promise<Omit<BackendSnapshot, "online">>;
      })
      .then((data) => setSnapshot({ ...data, online: true }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSnapshot({ online: false });
      });

    return () => controller.abort();
  }, []);

  return snapshot;
}

function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className="loader-grid" />
      <motion.div
        className="loader-panel"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <span>UMO_GLOBAL_ARCHIVE</span>
        <strong>INITIALIZING CASE FILE</strong>
        <div className="loader-line">
          <motion.i
            initial={{ width: "8%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
          />
        </div>
        <small>MEDELLIN, ANTIOQUIA / ESIC / USA SIGNAL TRACE</small>
      </motion.div>
    </motion.div>
  );
}

function Header({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "/", label: locale === "es" ? "UMO" : "UMO" },
    { href: "/entregas", label: locale === "es" ? "Entregas" : "Deliveries" },
  ];

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="UMO Global Dossier">
        <span>UMO</span>
        <small>Global Dossier</small>
      </Link>
      <nav className="desktop-nav" aria-label="Principal">
        {navItems.map((item) => (
          <NavLink key={item.href} to={item.href} end={item.href === "/"}>
            {item.label}
          </NavLink>
        ))}
        <a href={companyProfile.website} target="_blank" rel="noreferrer">
          {locale === "es" ? "Web oficial" : "Official site"}
        </a>
      </nav>
      <div className="header-actions">
        <button className="lang-toggle" onClick={() => setLocale(locale === "es" ? "en" : "es")}>
          <Languages size={16} />
          {locale === "es" ? "EN" : "ES"}
        </button>
        <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu size={20} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={() => setOpen(false)} aria-label="Cerrar menu">
              <X size={22} />
            </button>
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={companyProfile.website} target="_blank" rel="noreferrer">
              {locale === "es" ? "Web oficial" : "Official site"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CompanyHero({ locale, backend }: { locale: Locale; backend: BackendSnapshot }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 80]);
  const shouldLoadScene = useDeferredDesktopScene();

  return (
    <section className="hero company-hero">
      <ScenePlaceholder />
      {shouldLoadScene && (
        <Suspense fallback={<ScenePlaceholder />}>
          <DossierScene />
        </Suspense>
      )}
      <div className="scan-layer" />
      <motion.div className="hero-meta" style={{ y }}>
        <span>COMPANY PROFILE // INTERNATIONAL DOSSIER</span>
        <span>MEDELLIN, ANTIOQUIA / ESIC</span>
      </motion.div>
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.1 }}
      >
        <span className="case-label">{locale === "es" ? "Empresa foco" : "Focus company"}</span>
        <h1>UMO S.A.</h1>
        <p>
          {locale === "es"
            ? "Empresa colombiana con mas de cinco decadas de experiencia industrial en autopartes, accesorios para movilidad y soluciones de bienestar. Este dossier organiza su ruta de internacionalizacion hacia Estados Unidos."
            : "Colombian company with more than five decades of industrial experience in auto parts, mobility accessories and wellness solutions. This dossier organizes its internationalization route into the United States."}
        </p>
        <div className="hero-actions">
          <Link to="/entregas" className="primary-action">
            {locale === "es" ? "Entrar al archivo" : "Enter archive"} <ArrowUpRight size={18} />
          </Link>
          <a href={companyProfile.website} target="_blank" rel="noreferrer" className="secondary-action">
            {locale === "es" ? "Ver web oficial" : "Open official site"}
          </a>
        </div>
      </motion.div>
      <motion.div
        className="hero-telemetry"
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.25 }}
      >
        <div>
          <small>{locale === "es" ? "Fundacion" : "Founded"}</small>
          <strong>1968</strong>
        </div>
        <div>
          <small>{locale === "es" ? "Experiencia" : "Experience"}</small>
          <strong>{companyProfile.experience} YEARS</strong>
        </div>
        <div>
          <small>{locale === "es" ? "Equipo" : "Team"}</small>
          <strong>{companyProfile.employees}</strong>
        </div>
        <div>
          <small>BACKEND</small>
          <strong>{backend.online ? "ONLINE" : "STATIC"}</strong>
        </div>
      </motion.div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="section-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function CompanyHome({ locale, backend }: { locale: Locale; backend: BackendSnapshot }) {
  return (
    <>
      <CompanyHero locale={locale} backend={backend} />
      <main>
        <section className="company-section">
          <SectionIntro
            eyebrow="UMO / CONTEXT"
            title={locale === "es" ? "Industria, confort y movilidad" : "Industry, comfort and mobility"}
            subtitle={
              locale === "es"
                ? "La home funciona como portada editorial de la empresa: quien es, que produce y por que su caso tiene sentido para internacionalizacion."
                : "The homepage works as the company's editorial cover: who it is, what it makes and why it makes sense as an internationalization case."
            }
          />
          <div className="company-grid">
            <article className="company-profile">
              <Building2 size={24} />
              <h3>{locale === "es" ? "Quienes son" : "Who they are"}</h3>
              <p>
                {locale === "es"
                  ? "UMO S.A. es una empresa colombiana fundada el 18 de octubre de 1968. Su trayectoria combina fabricacion de autopartes, sillines para motos, almohadas y soluciones de bienestar con practicas empresariales responsables."
                  : "UMO S.A. is a Colombian company founded on October 18, 1968. Its track record combines auto parts, motorcycle seats, pillows and wellness solutions with responsible business practices."}
              </p>
            </article>
            <div className="company-stats">
              <div>
                <small>{locale === "es" ? "Empleados" : "Employees"}</small>
                <strong>{companyProfile.employees}</strong>
              </div>
              <div>
                <small>{locale === "es" ? "Aliados" : "Allies"}</small>
                <strong>{companyProfile.allies}</strong>
              </div>
              <div>
                <small>{locale === "es" ? "Certificaciones" : "Certifications"}</small>
                <strong>{companyProfile.certifications.length}</strong>
              </div>
            </div>
          </div>
          <div className="business-lines">
            {companyProfile.lines.map((line) => (
              <article key={line.title.es}>
                <span>{line.title[locale]}</span>
                <p>{line.text[locale]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="company-section">
          <SectionIntro
            eyebrow="TIMELINE / INDUSTRIAL MEMORY"
            title={locale === "es" ? "Una empresa con historia productiva" : "A company with productive history"}
            subtitle={
              locale === "es"
                ? "El dossier parte de una empresa con trayectoria real, no de una idea abstracta. Esa historia sostiene el analisis de entrada a Estados Unidos."
                : "The dossier starts from a company with a real track record, not an abstract idea. That history supports the U.S. entry analysis."
            }
          />
          <div className="timeline-strip">
            {companyProfile.milestones.map((milestone) => (
              <article key={milestone.year}>
                <strong>{milestone.year}</strong>
                <p>{milestone.text[locale]}</p>
              </article>
            ))}
          </div>
          <div className="cert-strip">
            {companyProfile.certifications.map((certification) => (
              <span key={certification}>{certification}</span>
            ))}
          </div>
        </section>

        <section className="company-section">
          <SectionIntro
            eyebrow="USA ENTRY / PROJECT FRAME"
            title={locale === "es" ? "Por que internacionalizar" : "Why internationalize"}
            subtitle={
              locale === "es"
                ? "El proyecto no solo guarda archivos: convierte entregas, matrices y diagnosticos en una lectura ordenada para decidir como UMO podria entrar al mercado estadounidense."
                : "The project does not just store files: it turns submissions, matrices and diagnostics into an organized reading for deciding how UMO could enter the U.S. market."
            }
          />
          <div className="entry-panel">
            <p>
              {locale === "es"
                ? "La entrada a Estados Unidos exige conectar capacidad productiva, canales digitales, representantes comerciales, precio, certificaciones, idioma y diferenciacion de producto. Por eso las entregas viven en un archivo separado, modular y preparado para crecer."
                : "Entering the United States requires connecting production capacity, digital channels, sales representatives, pricing, certifications, language and product differentiation. That is why deliveries live in a separate modular archive ready to scale."}
            </p>
            <Link to="/entregas" className="primary-action">
              {locale === "es" ? "Ver sistema de entregas" : "View delivery system"}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function DocumentActions({ documents, locale }: { documents: DocumentItem[]; locale: Locale }) {
  if (documents.length === 0) {
    return (
      <div className="source-actions empty">
        <span>{locale === "es" ? "Sin archivo cargado aun" : "No file uploaded yet"}</span>
      </div>
    );
  }

  return (
    <div className="source-actions">
      {documents.map((document) => {
        const Icon = iconByType[document.type];
        return (
          <a key={document.id} href={document.href} target="_blank" rel="noreferrer">
            <Icon size={16} />
            {document.actionLabel[locale]}
          </a>
        );
      })}
    </div>
  );
}

function DocumentPreviewList({ documents, locale }: { documents: DocumentItem[]; locale: Locale }) {
  const previewDocuments = documents.filter((document) => document.type === "image" && document.preview);

  if (previewDocuments.length === 0) return null;

  return (
    <div className="visual-docs">
      {previewDocuments.map((document) => (
        <article key={document.id} className="document-panel">
          <img src={document.preview} alt={document.title[locale]} loading="lazy" />
          <div>
            <span>{document.category[locale]}</span>
            <h3>{document.title[locale]}</h3>
            <p>{document.description[locale]}</p>
            <a href={document.href} target="_blank" rel="noreferrer">
              {document.actionLabel[locale]} <ArrowUpRight size={16} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function ModuleFrame({
  module,
  locale,
  children,
}: {
  module: WorkModule;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={module.id}
      className="work-module"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="module-head">
        <span>{module.eyebrow[locale]}</span>
        <h2>{module.title[locale]}</h2>
        <p>{module.summary[locale]}</p>
      </div>
      {children}
      <DocumentActions documents={module.documents} locale={locale} />
    </motion.section>
  );
}

function GenericModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <ModuleContext module={module} locale={locale} />
    </ModuleFrame>
  );
}

function InsightGrid({
  items,
  locale,
  className = "",
}: {
  items: { title: Record<Locale, string>; text: Record<Locale, string> }[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={`insight-grid ${className}`.trim()}>
      {items.map((item) => (
        <article key={item.title[locale]} className="insight-card">
          <span>{item.title[locale]}</span>
          <p>{item.text[locale]}</p>
        </article>
      ))}
    </div>
  );
}

function BulletStack({
  title,
  items,
  locale,
}: {
  title: string;
  items: Record<Locale, string>[];
  locale: Locale;
}) {
  return (
    <article className="bullet-stack">
      <span>{title}</span>
      <ul>
        {items.map((item) => (
          <li key={item[locale]}>{item[locale]}</li>
        ))}
      </ul>
    </article>
  );
}

function RadarCard({
  title,
  labels,
  values,
  locale,
}: {
  title: Record<Locale, string>;
  labels: Record<Locale, string>[];
  values: number[];
  locale: Locale;
}) {
  const center = 120;
  const radius = 78;
  const total = labels.length;
  const levels = [20, 40, 60, 80, 100];

  const toPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const scaled = (radius * value) / 100;
    const x = center + Math.cos(angle) * scaled;
    const y = center + Math.sin(angle) * scaled;
    return `${x},${y}`;
  };

  const polygon = values.map((value, index) => toPoint(value, index)).join(" ");

  return (
    <article className="radar-card">
      <span>{title[locale]}</span>
      <svg viewBox="0 0 240 240" aria-hidden="true">
        {levels.map((level) => {
          const points = labels.map((_, index) => toPoint(level, index)).join(" ");
          return <polygon key={level} points={points} className="radar-grid-line" />;
        })}
        {labels.map((label, index) => {
          const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
          const x = center + Math.cos(angle) * 92;
          const y = center + Math.sin(angle) * 92;
          return (
            <g key={label[locale]}>
              <line x1={center} y1={center} x2={x} y2={y} className="radar-axis" />
              <text x={center + Math.cos(angle) * 108} y={center + Math.sin(angle) * 108} className="radar-label">
                {label[locale]}
              </text>
            </g>
          );
        })}
        <polygon points={polygon} className="radar-data" />
      </svg>
    </article>
  );
}

function PlanningModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <ModuleContext module={module} locale={locale} />
      <div className="cadence-table">
        <div className="cadence-head">
          <span>{locale === "es" ? "Cronograma operativo" : "Operational cadence"}</span>
          <p>
            {locale === "es"
              ? "La planeacion ya no queda escondida en texto corrido. Aqui se ve como se reparte la semana de trabajo y que sale de cada bloque."
              : "Planning no longer stays hidden in a paragraph. This shows how the work week is distributed and what comes out of each block."}
          </p>
        </div>
        <div className="cadence-grid">
          {weeklyCadence.map((row) => (
            <article key={row.day[locale]} className="cadence-row">
              <div>
                <strong>{row.day[locale]}</strong>
                <small>{row.time[locale]}</small>
              </div>
              <p>{row.focus[locale]}</p>
              <span>{row.outcome[locale]}</span>
            </article>
          ))}
        </div>
      </div>
    </ModuleFrame>
  );
}

function CanvasModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <ModuleContext module={module} locale={locale} />
      <InsightGrid items={canvasHighlights} locale={locale} className="canvas-highlight-grid" />
      <div className="matrix-shell">
        <div className="matrix-head">
          <span>{locale === "es" ? "Descripcion del bien y business model canvas" : "Product description and business model canvas"}</span>
        </div>
      <div className="canvas-board">
        {canvasBlocks.map((block) => (
          <article key={block.title.es}>
            <span>{block.title[locale]}</span>
            <p>{block.text[locale]}</p>
          </article>
        ))}
      </div>
      </div>
      <DocumentPreviewList documents={module.documents} locale={locale} />
    </ModuleFrame>
  );
}

function SwotModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <ModuleContext module={module} locale={locale} />
      <div className="swot-summary-grid">
        {swotBlocks.map((block) => (
          <article key={block.title.es} className="insight-card compact">
            <span>{block.title[locale]}</span>
            <p>{block.text[locale]}</p>
          </article>
        ))}
      </div>
      <div className="swot-board detailed">
        {swotDetailedBlocks.map((block) => (
          <article key={block.title[locale]}>
            <span>{block.title[locale]}</span>
            <ul>
              {block.items.map((item) => (
                <li key={item[locale]}>{item[locale]}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <DocumentPreviewList documents={module.documents} locale={locale} />
    </ModuleFrame>
  );
}

function DiagnosticModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <ModuleContext module={module} locale={locale} />
      <div className="diagnostic-layout compact">
        <div className="score-panel">
          <span>{locale === "es" ? "Puntaje total" : "Total score"}</span>
          <strong>40.0%</strong>
          <p>{module.body[0]?.[locale]}</p>
        </div>
        <div className="metric-list">
          {diagnosticMetrics.map((metric) => (
            <div className="metric-row" key={metric.label}>
              <span>{metric.label}</span>
              <div className="metric-track">
                <motion.i
                  className={`tone-${metric.tone}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: metric.value / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <strong>{metric.value}%</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="radar-grid">
        {diagnosticRadarSets.map((dataset) => (
          <RadarCard
            key={dataset.title[locale]}
            title={dataset.title}
            labels={dataset.labels}
            values={dataset.values}
            locale={locale}
          />
        ))}
      </div>
      <div className="snapshot-table">
        <div className="snapshot-table-head">
          <span>{locale === "es" ? "Lectura del Excel" : "Spreadsheet reading"}</span>
          <p>
            {locale === "es"
              ? "La tabla baja a pantalla las dimensiones del diagnostico, con puntaje obtenido y techo maximo, para que la decision se lea sin abrir el archivo."
              : "The table brings the diagnostic dimensions to screen, with achieved and maximum scores, so the decision can be read without opening the file."}
          </p>
        </div>
        <div className="snapshot-grid">
          {diagnosticSnapshots.map((row) => (
            <article key={row.label} className="snapshot-row">
              <strong>{row.label}</strong>
              <span>{row.obtained}</span>
              <small>{row.maximum}</small>
            </article>
          ))}
        </div>
      </div>
      <div className="factor-grid">
        {diagnosticFactors.map((group) => (
          <article key={group.title[locale]} className="factor-card">
            <span>{group.title[locale]}</span>
            <ul>
              {group.items.map((item) => (
                <li key={item[locale]}>{item[locale]}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <DocumentPreviewList documents={module.documents} locale={locale} />
    </ModuleFrame>
  );
}

function TeamModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  const agreementModule = {
    ...module,
    body: module.body.filter((_, index) => ![7, 9, 10].includes(index)),
  };

  return (
    <ModuleFrame module={module} locale={locale}>
      <div className="team-brief-shell">
        <ModuleContext module={agreementModule} locale={locale} className="team-brief" />
      </div>
      <InsightGrid items={agreementPillars} locale={locale} />
      <div className="agreement-grid">
        <BulletStack title={locale === "es" ? "Reglas de trabajo" : "Work rules"} items={agreementRules} locale={locale} />
        <BulletStack title={locale === "es" ? "Consecuencias" : "Consequences"} items={agreementConsequences} locale={locale} />
      </div>
      <div className="entry-profile-grid">
        {entryTestProfiles.map((profile) => (
          <article key={profile.name} className="entry-profile-card">
            <span>{locale === "es" ? "Prueba de entrada" : "Entry test"}</span>
            <h3>{profile.name}</h3>
            <strong>{profile.score}</strong>
            <p>{profile.reading[locale]}</p>
          </article>
        ))}
      </div>
      <div className="team-grid">
        {team.map((member, index) => (
          <article className="member-file" key={member.name}>
            <small>SUBJECT 0{index + 1}</small>
            <h3>{member.name}</h3>
            <span>{member.role[locale]}</span>
            <p>{member.strengths[locale]}</p>
            <i>{member.focus[locale]}</i>
          </article>
        ))}
      </div>
    </ModuleFrame>
  );
}

function SmartModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <div className="smart-objective-card">
        <span>{locale === "es" ? "Objetivo SMART integrado" : "Integrated SMART goal"}</span>
        <p>{smartObjective[locale]}</p>
        <div className="tile-tags">
          <i>12 meses</i>
          <i>Texas</i>
          <i>Georgia</i>
          <i>50-70 unidades</i>
          <i>USD 180-220</i>
        </div>
      </div>
      <InsightGrid items={smartCriteria} locale={locale} />
      <div className="smart-support-grid">
        {module.body.slice(0, 2).map((paragraph) => (
          <article key={paragraph[locale]} className="insight-card">
            <span>{locale === "es" ? "Soporte del producto" : "Product support"}</span>
            <p>{paragraph[locale]}</p>
          </article>
        ))}
      </div>
    </ModuleFrame>
  );
}

function ViabilityModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <ModuleContext module={module} locale={locale} />
      <InsightGrid items={viabilityPillars} locale={locale} />
      <div className="territory-strip">
        {module.highlights.map((highlight) => (
          <article key={highlight[locale]} className="territory-card">
            <HighlightText text={highlight[locale]} />
          </article>
        ))}
      </div>
    </ModuleFrame>
  );
}

function WorkModuleView({ module, locale }: { module: WorkModule; locale: Locale }) {
  if (module.id === "planeacion-equipo") return <PlanningModule module={module} locale={locale} />;
  if (module.id === "thermo-seats-smart") return <SmartModule module={module} locale={locale} />;
  if (module.id === "sostenibilidad-viabilidad") return <ViabilityModule module={module} locale={locale} />;
  if (module.type === "canvas") return <CanvasModule module={module} locale={locale} />;
  if (module.type === "swot") return <SwotModule module={module} locale={locale} />;
  if (module.type === "diagnostic") return <DiagnosticModule module={module} locale={locale} />;
  if (module.type === "team") return <TeamModule module={module} locale={locale} />;
  return <GenericModule module={module} locale={locale} />;
}

const ArchiveWorkTile = memo(function ArchiveWorkTile({ item, locale }: { item: ArchiveItem; locale: Locale }) {
  const { delivery, module, tags } = item;

  return (
    <motion.article
      className="delivery-tile archive-work-tile"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.28 }}
    >
      <div className="tile-body">
        <div className="archive-case-row">
          <span className="tile-index">{delivery.code}</span>
          <span>{module.eyebrow[locale]}</span>
        </div>
        <span>{delivery.status[locale]}</span>
        <h3>{module.title[locale]}</h3>
        <p>{module.summary[locale]}</p>
      </div>
      <div className="tile-tags">
        {tags.slice(0, 4).map((tag) => (
          <i key={`${module.id}-${tag}`}>{tag}</i>
        ))}
      </div>
      <div className="tile-footer">
        <small>{getDocumentCountLabel(module.documents.length, locale)}</small>
        <Link to={`/entregas/${delivery.id}/trabajos/${module.id}`}>
          {locale === "es" ? "Abrir trabajo" : "Open work"} <ArrowUpRight size={18} />
        </Link>
      </div>
    </motion.article>
  );
});

function ModuleContext({
  module,
  locale,
  className = "",
}: {
  module: WorkModule;
  locale: Locale;
  className?: string;
}) {
  if (module.body.length === 0 && module.highlights.length === 0) return null;

  return (
    <div className={`editorial-module module-context ${className}`.trim()}>
      <div>
        {module.body.map((paragraph) => (
          <p key={paragraph[locale]}>{paragraph[locale]}</p>
        ))}
      </div>
      <ul>
        {module.highlights.map((highlight) => (
          <li key={highlight[locale]}>
            <HighlightText text={highlight[locale]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function HighlightText({ text }: { text: string }) {
  const [label, ...rest] = text.split(":");
  const hasLabel = rest.length > 0;
  const content = hasLabel ? rest.join(":").trim() : text;
  const fragments = content.split(/(\d+(?:[.,]\d+)?%?)/g).filter(Boolean);

  return (
    <>
      {hasLabel ? <strong>{label.trim()}:</strong> : null}{" "}
      {fragments.map((fragment, index) => {
        const isValue = /^\d+(?:[.,]\d+)?%?$/.test(fragment);
        if (isValue) {
          return (
            <em key={`${fragment}-${index}`} className="highlight-value">
              {fragment}
            </em>
          );
        }

        return <span key={`${fragment}-${index}`}>{fragment}</span>;
      })}
    </>
  );
}

function getSourceCountLabel(count: number, locale: Locale) {
  if (count === 1) return locale === "es" ? "1 fuente" : "1 source";
  return locale === "es" ? `${count} fuentes` : `${count} sources`;
}

function DeliveryCompilationPanel({ locale }: { locale: Locale }) {
  return (
    <section className="delivery-compilation">
      <div className="compilation-head">
        <span>DELIVERY INDEX / PROJECT MEMORY</span>
        <h3>{locale === "es" ? "Recopilacion de entregas" : "Delivery compilation"}</h3>
        <p>
          {locale === "es"
            ? "Vista concentrada del dossier: cada entrega queda identificada por alcance, cantidad de trabajos y material fuente para que el archivo siga creciendo sin perder orden."
            : "Concentrated dossier view: each delivery is identified by scope, work count and source material so the archive can keep growing without losing order."}
        </p>
      </div>
      <div className="compilation-grid">
        {deliveries.map((delivery) => {
          const sourceCount = delivery.modules.reduce((total, module) => total + module.documents.length, 0);

          return (
            <article key={delivery.id} className={`delivery-tile compilation-tile${delivery.modules.length === 0 ? " is-future" : ""}`}>
              <div className="tile-body">
                <div className="archive-case-row">
                  <span className="tile-index">{delivery.code}</span>
                  <span>{delivery.modules.length > 0 ? delivery.status[locale] : locale === "es" ? "Carpeta futura" : "Future folder"}</span>
                </div>
                <h3>{delivery.title[locale]}</h3>
                <p>{delivery.summary[locale]}</p>
              </div>
              <div className="tile-tags">
                {delivery.tags.slice(0, 4).map((tag) => (
                  <i key={`${delivery.id}-${tag}`}>{tag}</i>
                ))}
              </div>
              <div className="tile-footer">
                <small>
                  {delivery.modules.length} {locale === "es" ? "trabajos" : "works"} / {getSourceCountLabel(sourceCount, locale)}
                </small>
                <Link to={`/entregas/${delivery.id}`}>
                  {locale === "es" ? "Abrir carpeta" : "Open folder"} <ArrowUpRight size={18} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DeliveryFilterDropdown({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const options = [
    {
      value: "all",
      label: locale === "es" ? "Todas las entregas" : "All deliveries",
      meta: locale === "es" ? "Archivo completo" : "Full archive",
    },
    ...deliveries.map((delivery) => ({
      value: delivery.id,
      label: delivery.code,
      meta: delivery.title[locale],
    })),
  ];

  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <div className={`delivery-dropdown${open ? " is-open" : ""}`} ref={dropdownRef}>
      <button
        type="button"
        className="delivery-dropdown-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="delivery-dropdown-copy">
          <span>{selected.label}</span>
          <small>{selected.meta}</small>
        </div>
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="delivery-dropdown-panel" role="listbox" aria-label={locale === "es" ? "Filtro por entrega" : "Delivery filter"}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={option.value === value ? "active" : ""}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              <small>{option.meta}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkJumpDropdown({
  delivery,
  locale,
  activeModule,
}: {
  delivery: Delivery;
  locale: Locale;
  activeModule?: WorkModule | null;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (delivery.modules.length === 0) return null;

  return (
    <div className={`work-jump-dropdown${open ? " is-open" : ""}`} ref={dropdownRef}>
      <button
        type="button"
        className="work-jump-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="work-jump-copy">
          <span>{activeModule ? activeModule.title[locale] : locale === "es" ? "Ir a un trabajo" : "Open a work"}</span>
          <small>
            {activeModule
              ? activeModule.eyebrow[locale]
              : locale === "es"
                ? `${delivery.modules.length} trabajos disponibles`
                : `${delivery.modules.length} works available`}
          </small>
        </div>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="work-jump-panel" role="listbox" aria-label={locale === "es" ? "Selector de trabajo" : "Work selector"}>
          {delivery.modules.map((module) => (
            <Link
              key={module.id}
              className={activeModule?.id === module.id ? "active" : ""}
              to={`/entregas/${delivery.id}/trabajos/${module.id}`}
              onClick={() => setOpen(false)}
            >
              <span>{module.title[locale]}</span>
              <small>{module.eyebrow[locale]}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DeliveriesArchive({ locale }: { locale: Locale }) {
  const [deliveryFilter, setDeliveryFilter] = useState("all");
  const [workFilter, setWorkFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const deferredDeliveryFilter = useDeferredValue(deliveryFilter);
  const deferredWorkFilter = useDeferredValue(workFilter);

  const availableWorkItems = useMemo(
    () =>
      archiveItems.filter((item) => deferredDeliveryFilter === "all" || item.delivery.id === deferredDeliveryFilter),
    [deferredDeliveryFilter],
  );

  useEffect(() => {
    if (workFilter === "all") return;
    const workStillAvailable = availableWorkItems.some((item) => item.module.id === workFilter);
    if (!workStillAvailable) {
      setWorkFilter("all");
    }
  }, [availableWorkItems, workFilter]);

  const filteredItems = useMemo(
    () =>
      availableWorkItems.filter((item) => deferredWorkFilter === "all" || item.module.id === deferredWorkFilter),
    [availableWorkItems, deferredWorkFilter],
  );

  const selectDeliveryFilter = (filter: string) => {
    startTransition(() => setDeliveryFilter(filter));
  };

  const selectWorkFilter = (filter: string) => {
    startTransition(() => setWorkFilter(filter));
  };

  return (
    <main className="archive-board-page" aria-busy={isPending}>
      <SectionIntro
        eyebrow="DOSSIER ARCHIVE / WORK BOARD"
        title={locale === "es" ? "Archivo de entregas" : "Delivery archive"}
        subtitle={
          locale === "es"
            ? "Entrega 01 concentra los trabajos cargados: equipo, planeacion, diagnostico, Canvas, DOFA, SMART y sostenibilidad."
            : "Delivery 01 contains the loaded work: team, planning, diagnostic, Canvas, SWOT, SMART and sustainability."
        }
      />

      <DeliveryCompilationPanel locale={locale} />

      <div className="archive-filter-group">
        <span className="filter-label">{locale === "es" ? "Filtrar por entrega" : "Filter by delivery"}</span>
        <DeliveryFilterDropdown locale={locale} value={deliveryFilter} onChange={selectDeliveryFilter} />
      </div>

      <div className="archive-filter-group">
        <span className="filter-label">{locale === "es" ? "Filtrar por trabajo" : "Filter by work"}</span>
        <div className="filter-strip archive-filter-strip archive-work-filters">
          <button
            className={workFilter === "all" ? "active" : ""}
            onClick={() => selectWorkFilter("all")}
          >
            Todo
          </button>
          {availableWorkItems.map((item) => (
            <button
              key={item.module.id}
              className={workFilter === item.module.id ? "active" : ""}
              onClick={() => selectWorkFilter(item.module.id)}
            >
              <span>{item.module.eyebrow[locale]}</span>
              <strong>{item.module.title[locale]}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="archive-work-grid">
        <AnimatePresence initial={false}>
          {filteredItems.map((item) => (
            <ArchiveWorkTile key={`${item.delivery.id}-${item.module.id}`} item={item} locale={locale} />
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="archive-empty">
          <span>{locale === "es" ? "Sin resultados" : "No results"}</span>
          <p>
            {locale === "es"
              ? "No hay trabajos cargados para esta combinacion de filtros."
              : "No work has been loaded for this filter combination."}
          </p>
        </div>
      )}
    </main>
  );
}

function DeliveriesSidebar({
  activeDelivery,
  locale,
}: {
  activeDelivery: Delivery;
  locale: Locale;
}) {
  return (
    <aside className="delivery-sidebar">
      <div className="sidebar-title">
        <PanelLeft size={18} />
        <span>{locale === "es" ? "Entregas" : "Deliveries"}</span>
      </div>
      <nav aria-label={locale === "es" ? "Navegacion de entregas" : "Delivery navigation"}>
        {deliveries.map((delivery) => (
          <NavLink
            key={delivery.id}
            to={`/entregas/${delivery.id}`}
            className={delivery.id === activeDelivery.id ? "active" : ""}
          >
            <small>{delivery.code}</small>
            <strong>{delivery.title[locale]}</strong>
            <span>{delivery.modules.length} modulos</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function DeliveryHeader({
  title,
  subtitle,
  eyebrow,
  tags,
}: {
  title: string;
  subtitle: string;
  eyebrow: string;
  tags: string[];
}) {
  return (
    <div className="delivery-cover">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="tile-tags">
        {tags.map((tag) => (
          <i key={tag}>{tag}</i>
        ))}
      </div>
    </div>
  );
}

function DeliveryContentNav({
  delivery,
  locale,
  currentView,
  activeModule,
}: {
  delivery: Delivery;
  locale: Locale;
  currentView: "overview" | "compilation" | "module";
  activeModule?: WorkModule | null;
}) {
  return (
    <nav className="module-nav delivery-content-nav" aria-label={locale === "es" ? "Vistas de la entrega" : "Delivery views"}>
      <div className="delivery-nav-primary">
        <NavLink end to={`/entregas/${delivery.id}`}>
          {locale === "es" ? "Trabajos" : "Works"}
        </NavLink>
        <NavLink to={`/entregas/${delivery.id}/${PRESENTATION_VIEW_ID}`}>
          {locale === "es" ? "Recopilacion" : "Compilation"}
        </NavLink>
        {currentView === "module" && activeModule ? (
          <span className="module-nav-indicator">
            {locale === "es" ? "Actual" : "Current"} / {activeModule.title[locale]}
          </span>
        ) : null}
      </div>
      <WorkJumpDropdown delivery={delivery} locale={locale} activeModule={activeModule} />
    </nav>
  );
}

function DeliveryCardGrid({ delivery, locale }: { delivery: Delivery; locale: Locale }) {
  if (delivery.modules.length === 0) {
    return (
      <div className="archive-empty delivery-empty">
        <span>{locale === "es" ? "Sin trabajos cargados" : "No work loaded"}</span>
        <p>
          {locale === "es"
            ? "Esta entrega queda como carpeta futura. Cuando subas archivos, apareceran aqui como trabajos individuales."
            : "This delivery remains as a future folder. When files are uploaded, they will appear here as individual works."}
        </p>
      </div>
    );
  }

  const totalSources = delivery.modules.reduce((sum, module) => sum + module.documents.length, 0);

  return (
    <div className="delivery-grid delivery-card-grid">
      <article className="delivery-tile delivery-summary-card is-special">
        <div className="tile-body">
          <div className="archive-case-row">
            <span className="tile-index">{delivery.code}</span>
            <span>{locale === "es" ? "Tarjeta general" : "General card"}</span>
          </div>
          <h3>{locale === "es" ? "Recopilacion general" : "General compilation"}</h3>
          <p>
            {locale === "es"
              ? "Vista completa para presentar: reúne todos los trabajos de la entrega en una sola navegación y deja ver el contenido integrado de principio a fin."
              : "Complete presentation view: gathers every work in the delivery within a single navigation and shows the integrated content end to end."}
          </p>
        </div>
        <div className="tile-tags">
          <i>{delivery.modules.length} {locale === "es" ? "trabajos" : "works"}</i>
          <i>{getSourceCountLabel(totalSources, locale)}</i>
          <i>{locale === "es" ? "presentacion" : "presentation"}</i>
        </div>
        <div className="tile-footer">
          <small>{locale === "es" ? "Todo organizado junto" : "Everything organized together"}</small>
          <Link to={`/entregas/${delivery.id}/${PRESENTATION_VIEW_ID}`}>
            {locale === "es" ? "Abrir recopilacion" : "Open compilation"} <ArrowUpRight size={18} />
          </Link>
        </div>
      </article>

      {delivery.modules.map((module) => (
        <article key={module.id} className="delivery-tile archive-work-tile">
          <div className="tile-body">
            <div className="archive-case-row">
              <span className="tile-index">{delivery.code}</span>
              <span>{module.eyebrow[locale]}</span>
            </div>
            <span>{locale === "es" ? "Trabajo individual" : "Individual work"}</span>
            <h3>{module.title[locale]}</h3>
            <p>{module.summary[locale]}</p>
          </div>
          <div className="tile-tags">
            {getModuleTags(module.id).slice(0, 4).map((tag) => (
              <i key={`${module.id}-${tag}`}>{tag}</i>
            ))}
          </div>
          <div className="tile-footer">
            <small>{getDocumentCountLabel(module.documents.length, locale)}</small>
            <Link to={`/entregas/${delivery.id}/trabajos/${module.id}`}>
              {locale === "es" ? "Abrir trabajo" : "Open work"} <ArrowUpRight size={18} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function DeliveryWorkspaceShell({
  delivery,
  locale,
  children,
  title,
  subtitle,
  eyebrow,
  tags,
  currentView,
  activeModule,
}: {
  delivery: Delivery;
  locale: Locale;
  children: ReactNode;
  title: string;
  subtitle: string;
  eyebrow: string;
  tags: string[];
  currentView: "overview" | "compilation" | "module";
  activeModule?: WorkModule | null;
}) {
  return (
    <main className="delivery-workspace">
      <DeliveriesSidebar activeDelivery={delivery} locale={locale} />
      <section className="delivery-main">
        <DeliveryHeader title={title} subtitle={subtitle} eyebrow={eyebrow} tags={tags} />
        <DeliveryContentNav delivery={delivery} locale={locale} currentView={currentView} activeModule={activeModule} />
        {children}
      </section>
    </main>
  );
}

function DeliveryOverview({ locale }: { locale: Locale }) {
  const params = useParams();
  const activeDelivery = useMemo(() => getDeliveryById(params.id), [params.id]);

  return (
    <DeliveryWorkspaceShell
      delivery={activeDelivery}
      locale={locale}
      eyebrow={activeDelivery.code}
      title={activeDelivery.title[locale]}
      subtitle={activeDelivery.summary[locale]}
      tags={activeDelivery.tags}
      currentView="overview"
    >
      <DeliveryCardGrid delivery={activeDelivery} locale={locale} />
    </DeliveryWorkspaceShell>
  );
}

function DeliveryPresentation({ locale }: { locale: Locale }) {
  const params = useParams();
  const activeDelivery = useMemo(() => getDeliveryById(params.id), [params.id]);

  return (
    <DeliveryWorkspaceShell
      delivery={activeDelivery}
      locale={locale}
      eyebrow={`${activeDelivery.code} / ${locale === "es" ? "Vista general" : "General view"}`}
      title={locale === "es" ? "Recopilacion general" : "General compilation"}
      subtitle={
        locale === "es"
          ? "Esta es la unica tarjeta pensada para ver toda la entrega junta. Recorre todos los trabajos en una sola presentacion continua."
          : "This is the only card meant to view the whole delivery together. It walks through every work in one continuous presentation."
      }
      tags={[...activeDelivery.tags, "presentation"]}
      currentView="compilation"
    >
      {activeDelivery.modules.length > 0 ? (
        <div className="module-stack">
          {activeDelivery.modules.map((module) => (
            <WorkModuleView key={module.id} module={module} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="archive-empty delivery-empty">
          <span>{locale === "es" ? "Sin trabajos cargados" : "No work loaded"}</span>
          <p>
            {locale === "es"
              ? "Esta entrega aun no tiene trabajos para recopilar."
              : "This delivery does not yet have work to compile."}
          </p>
        </div>
      )}
    </DeliveryWorkspaceShell>
  );
}

function DeliveryWorkPage({ locale }: { locale: Locale }) {
  const params = useParams();
  const activeDelivery = useMemo(() => getDeliveryById(params.id), [params.id]);
  const activeModule = useMemo(
    () => activeDelivery.modules.find((module) => module.id === params.moduleId) ?? activeDelivery.modules[0],
    [activeDelivery, params.moduleId],
  );

  if (!activeModule) {
    return (
      <DeliveryWorkspaceShell
        delivery={activeDelivery}
        locale={locale}
        eyebrow={activeDelivery.code}
        title={activeDelivery.title[locale]}
        subtitle={activeDelivery.summary[locale]}
        tags={activeDelivery.tags}
        currentView="module"
      >
        <div className="archive-empty delivery-empty">
          <span>{locale === "es" ? "Trabajo no encontrado" : "Work not found"}</span>
          <p>
            {locale === "es"
              ? "No se encontro el trabajo solicitado dentro de esta entrega."
              : "The requested work was not found inside this delivery."}
          </p>
        </div>
      </DeliveryWorkspaceShell>
    );
  }

  return (
    <DeliveryWorkspaceShell
      delivery={activeDelivery}
      locale={locale}
      eyebrow={`${activeDelivery.code} / ${activeModule.eyebrow[locale]}`}
      title={activeModule.title[locale]}
      subtitle={activeModule.summary[locale]}
      tags={getModuleTags(activeModule.id)}
      currentView="module"
      activeModule={activeModule}
    >
      <div className="module-stack single-module-stack">
        <WorkModuleView module={activeModule} locale={locale} />
      </div>
    </DeliveryWorkspaceShell>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const [loading, setLoading] = useState(true);
  const backend = useBackendSnapshot();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header locale={locale} setLocale={setLocale} />
      <Routes>
        <Route path="/" element={<CompanyHome locale={locale} backend={backend} />} />
        <Route path="/entregas" element={<DeliveriesArchive locale={locale} />} />
        <Route path="/entregas/:id" element={<DeliveryOverview locale={locale} />} />
        <Route path="/entregas/:id/recopilacion" element={<DeliveryPresentation locale={locale} />} />
        <Route path="/entregas/:id/trabajos/:moduleId" element={<DeliveryWorkPage locale={locale} />} />
      </Routes>
      <footer className="site-footer">
        <div>
          <Box size={18} />
          <span>UMO Global Dossier</span>
        </div>
        <span className={`api-status ${backend.online ? "is-online" : "is-offline"}`}>
          API {backend.online ? "online" : "fallback"}
        </span>
        <p>Internationalization archive // 2026</p>
      </footer>
    </>
  );
}

export default App;
