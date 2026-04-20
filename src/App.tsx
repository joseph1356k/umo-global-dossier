import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  Building2,
  Database,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Languages,
  Menu,
  PanelLeft,
  X,
} from "lucide-react";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import {
  canvasBlocks,
  companyProfile,
  deliveries,
  diagnosticMetrics,
  swotBlocks,
  team,
  type Delivery,
  type DocumentItem,
  type WorkModule,
} from "./data/content";
import { type Locale } from "./i18n/copy";

const DossierScene = lazy(() =>
  import("./components/DossierScene").then((module) => ({ default: module.DossierScene })),
);

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
            transition={{ duration: 1.35, ease: "easeInOut" }}
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

  return (
    <section className="hero company-hero">
      <Suspense fallback={<div className="scene-shell scene-fallback" />}>
        <DossierScene />
      </Suspense>
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
      <div className="editorial-module">
        <div>
          {module.body.map((paragraph) => (
            <p key={paragraph[locale]}>{paragraph[locale]}</p>
          ))}
        </div>
        <ul>
          {module.highlights.map((highlight) => (
            <li key={highlight[locale]}>{highlight[locale]}</li>
          ))}
        </ul>
      </div>
    </ModuleFrame>
  );
}

function CanvasModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <div className="canvas-board">
        {canvasBlocks.map((block) => (
          <article key={block.title.es}>
            <span>{block.title[locale]}</span>
            <p>{block.text[locale]}</p>
          </article>
        ))}
      </div>
    </ModuleFrame>
  );
}

function SwotModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
      <div className="swot-board">
        {swotBlocks.map((block) => (
          <article key={block.title.es}>
            <span>{block.title[locale]}</span>
            <p>{block.text[locale]}</p>
          </article>
        ))}
      </div>
    </ModuleFrame>
  );
}

function DiagnosticModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
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
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <strong>{metric.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </ModuleFrame>
  );
}

function TeamModule({ module, locale }: { module: WorkModule; locale: Locale }) {
  return (
    <ModuleFrame module={module} locale={locale}>
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

function WorkModuleView({ module, locale }: { module: WorkModule; locale: Locale }) {
  if (module.type === "canvas") return <CanvasModule module={module} locale={locale} />;
  if (module.type === "swot") return <SwotModule module={module} locale={locale} />;
  if (module.type === "diagnostic") return <DiagnosticModule module={module} locale={locale} />;
  if (module.type === "team") return <TeamModule module={module} locale={locale} />;
  return <GenericModule module={module} locale={locale} />;
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

function DeliveryWorkspace({ locale }: { locale: Locale }) {
  const params = useParams();
  const activeDelivery = useMemo(
    () => deliveries.find((delivery) => delivery.id === params.id) ?? deliveries[0],
    [params.id],
  );

  return (
    <main className="delivery-workspace">
      <DeliveriesSidebar activeDelivery={activeDelivery} locale={locale} />
      <section className="delivery-main">
        <div className="delivery-cover">
          <span>{activeDelivery.code}</span>
          <h1>{activeDelivery.title[locale]}</h1>
          <p>{activeDelivery.summary[locale]}</p>
          <div className="tile-tags">
            {activeDelivery.tags.map((tag) => (
              <i key={tag}>{tag}</i>
            ))}
          </div>
        </div>
        <nav className="module-nav" aria-label={locale === "es" ? "Trabajos internos" : "Internal work"}>
          {activeDelivery.modules.map((module) => (
            <a key={module.id} href={`#${module.id}`}>
              {module.title[locale]}
            </a>
          ))}
        </nav>
        <div className="module-stack">
          {activeDelivery.modules.map((module) => (
            <WorkModuleView key={module.id} module={module} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const [loading, setLoading] = useState(true);
  const backend = useBackendSnapshot();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1550);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header locale={locale} setLocale={setLocale} />
      <Routes>
        <Route path="/" element={<CompanyHome locale={locale} backend={backend} />} />
        <Route path="/entregas" element={<DeliveryWorkspace locale={locale} />} />
        <Route path="/entregas/:id" element={<DeliveryWorkspace locale={locale} />} />
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
