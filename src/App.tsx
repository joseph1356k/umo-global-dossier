import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  ChevronRight,
  Database,
  FileText,
  Image as ImageIcon,
  Languages,
  Menu,
  X,
} from "lucide-react";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  deliveries,
  diagnosticMetrics,
  documents,
  objectives,
  team,
  type Delivery,
  type DocumentItem,
} from "./data/content";
import { copy, type Locale } from "./i18n/copy";

const DossierScene = lazy(() =>
  import("./components/DossierScene").then((module) => ({ default: module.DossierScene })),
);

const iconByType = {
  pdf: FileText,
  image: ImageIcon,
  spreadsheet: Database,
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

function useCopy(locale: Locale) {
  return copy[locale];
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
  const t = useCopy(locale);
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "/entregas", label: t.nav.archive },
    { href: "/#diagnostico", label: t.nav.diagnostic },
    { href: "/#canvas", label: t.nav.canvas },
    { href: "/#equipo", label: t.nav.team },
    { href: "/#objetivos", label: t.nav.goals },
  ];

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="UMO Global Dossier">
        <span>UMO</span>
        <small>Global Dossier</small>
      </Link>
      <nav className="desktop-nav" aria-label="Principal">
        {navItems.map((item) =>
          item.href.startsWith("/#") ? (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ) : (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ),
        )}
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
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ locale, backend }: { locale: Locale; backend: BackendSnapshot }) {
  const t = useCopy(locale);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 80]);
  const readiness = backend.project?.readiness ?? 40;

  return (
    <section className="hero">
      <Suspense fallback={<div className="scene-shell scene-fallback" />}>
        <DossierScene />
      </Suspense>
      <div className="scan-layer" />
      <motion.div className="hero-meta" style={{ y }}>
        <span>{t.hero.kicker}</span>
        <span>LAT 6.280 / LON -75.443</span>
      </motion.div>
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.1 }}
      >
        <span className="case-label">{t.hero.status}</span>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.subtitle}</p>
        <div className="hero-actions">
          <Link to="/entregas" className="primary-action">
            {t.hero.primary} <ArrowUpRight size={18} />
          </Link>
          <a href="#diagnostico" className="secondary-action">
            {t.hero.secondary}
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
          <small>{t.hero.market}</small>
          <strong>USA</strong>
        </div>
        <div>
          <small>{t.hero.route}</small>
          <strong>ACTIVE</strong>
        </div>
        <div>
          <small>READINESS</small>
          <strong>{readiness}%</strong>
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

function DeliveryTile({ delivery, locale, index }: { delivery: Delivery; locale: Locale; index: number }) {
  const t = useCopy(locale);
  return (
    <motion.article
      className="delivery-tile"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.48, delay: index * 0.08 }}
    >
      <div className="tile-index">{delivery.code}</div>
      <div className="tile-body">
        <span>{delivery.status[locale]}</span>
        <h3>{delivery.title[locale]}</h3>
        <p>{delivery.summary[locale]}</p>
      </div>
      <div className="tile-tags">
        {delivery.tags.map((tag) => (
          <i key={tag}>{tag}</i>
        ))}
      </div>
      <div className="tile-footer">
        <small>
          {delivery.documents.length} {t.archive.docs}
        </small>
        <Link to={`/entregas/${delivery.id}`}>
          {t.archive.open} <ChevronRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}

function ArchivePreview({ locale }: { locale: Locale }) {
  const t = useCopy(locale);
  return (
    <section className="archive-section" id="entregas">
      <SectionIntro eyebrow="ARCHIVE / 01" title={t.archive.title} subtitle={t.archive.subtitle} />
      <div className="delivery-grid">
        {deliveries.map((delivery, index) => (
          <DeliveryTile key={delivery.id} delivery={delivery} locale={locale} index={index} />
        ))}
      </div>
    </section>
  );
}

function Diagnostic({ locale }: { locale: Locale }) {
  const t = useCopy(locale);
  return (
    <section className="diagnostic-section" id="diagnostico">
      <SectionIntro eyebrow="RADAR / 02" title={t.diagnostic.title} subtitle={t.diagnostic.subtitle} />
      <div className="diagnostic-layout">
        <motion.div
          className="score-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span>{t.diagnostic.total}</span>
          <strong>40.0%</strong>
          <p>{t.diagnostic.insight}</p>
        </motion.div>
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
    </section>
  );
}

function DocumentPanel({ item, locale }: { item: DocumentItem; locale: Locale }) {
  const t = useCopy(locale);
  const Icon = iconByType[item.type];
  return (
    <article className="document-panel">
      {item.preview ? (
        <img src={item.preview} alt={item.title[locale]} />
      ) : (
        <div className="document-icon">
          <Icon size={34} />
        </div>
      )}
      <div>
        <span>{item.category[locale]}</span>
        <h3>{item.title[locale]}</h3>
        <p>{item.description[locale]}</p>
        <a href={item.href} target="_blank" rel="noreferrer">
          {item.type === "image" ? t.archive.view : t.archive.download}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

function CanvasAndMatrices({ locale }: { locale: Locale }) {
  const t = useCopy(locale);
  const visualDocs = documents.filter((doc) => doc.type === "image" && doc.id !== "umo-panorama");
  return (
    <section className="canvas-section" id="canvas">
      <SectionIntro eyebrow="MODELS / 03" title={t.canvas.title} subtitle={t.canvas.subtitle} />
      <div className="visual-docs">
        {visualDocs.map((doc) => (
          <DocumentPanel key={doc.id} item={doc} locale={locale} />
        ))}
      </div>
    </section>
  );
}

function Team({ locale }: { locale: Locale }) {
  const t = useCopy(locale);
  return (
    <section className="team-section" id="equipo">
      <SectionIntro eyebrow="CREW / 04" title={t.team.title} subtitle={t.team.subtitle} />
      <div className="purpose-band">
        <span>{t.team.purpose}</span>
        <p>{t.team.purposeText}</p>
      </div>
      <div className="team-grid">
        {team.map((member, index) => (
          <motion.article
            className="member-file"
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <small>SUBJECT 0{index + 1}</small>
            <h3>{member.name}</h3>
            <span>{member.role[locale]}</span>
            <p>{member.strengths[locale]}</p>
            <i>{member.focus[locale]}</i>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Goals({ locale }: { locale: Locale }) {
  const t = useCopy(locale);
  return (
    <section className="goals-section" id="objetivos">
      <SectionIntro eyebrow="MISSION / 05" title={t.goals.title} subtitle={t.goals.subtitle} />
      <div className="goal-rail">
        {objectives.map((objective, index) => (
          <article key={objective.id}>
            <small>0{index + 1}</small>
            <h3>{objective.label[locale]}</h3>
            <p>{objective.text[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomePage({ locale, backend }: { locale: Locale; backend: BackendSnapshot }) {
  return (
    <>
      <Hero locale={locale} backend={backend} />
      <main>
        <ArchivePreview locale={locale} />
        <Diagnostic locale={locale} />
        <CanvasAndMatrices locale={locale} />
        <Team locale={locale} />
        <Goals locale={locale} />
      </main>
    </>
  );
}

function ArchivePage({ locale }: { locale: Locale }) {
  const t = useCopy(locale);
  const [filter, setFilter] = useState("all");
  const tags = useMemo(() => Array.from(new Set(deliveries.flatMap((delivery) => delivery.tags))), []);
  const visible = filter === "all" ? deliveries : deliveries.filter((delivery) => delivery.tags.includes(filter));

  return (
    <main className="page-shell archive-page">
      <SectionIntro eyebrow="FULL ARCHIVE" title={t.archive.title} subtitle={t.archive.subtitle} />
      <div className="filter-strip">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          {t.archive.all}
        </button>
        {tags.map((tag) => (
          <button className={filter === tag ? "active" : ""} key={tag} onClick={() => setFilter(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <div className="delivery-grid archive-grid">
        {visible.map((delivery, index) => (
          <DeliveryTile key={delivery.id} delivery={delivery} locale={locale} index={index} />
        ))}
      </div>
    </main>
  );
}

function DeliveryDetail({ locale }: { locale: Locale }) {
  const params = useParams();
  const navigate = useNavigate();
  const t = useCopy(locale);
  const delivery = deliveries.find((item) => item.id === params.id);

  if (!delivery) {
    return (
      <main className="page-shell">
        <button className="back-button" onClick={() => navigate("/entregas")}>
          {t.nav.back}
        </button>
        <h1>404</h1>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page">
      <button className="back-button" onClick={() => navigate("/entregas")}>
        {t.nav.back}
      </button>
      <section className="detail-hero">
        <span>{delivery.code}</span>
        <h1>{delivery.title[locale]}</h1>
        <p>{delivery.summary[locale]}</p>
        <div className="tile-tags">
          {delivery.tags.map((tag) => (
            <i key={tag}>{tag}</i>
          ))}
        </div>
      </section>
      <section className="detail-grid">
        <div>
          <h2>{t.detail.contents}</h2>
          <div className="document-stack">
            {delivery.documents.map((doc) => (
              <DocumentPanel key={doc.id} item={doc} locale={locale} />
            ))}
          </div>
        </div>
        <aside className="signals-panel">
          <span>{t.detail.signals}</span>
          {delivery.signals.map((signal, index) => (
            <p key={signal[locale]}>
              <small>0{index + 1}</small>
              {signal[locale]}
            </p>
          ))}
        </aside>
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
        <Route path="/" element={<HomePage locale={locale} backend={backend} />} />
        <Route path="/entregas" element={<ArchivePage locale={locale} />} />
        <Route path="/entregas/:id" element={<DeliveryDetail locale={locale} />} />
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
