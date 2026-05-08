import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Cpu,
  Download,
  Globe2,
  Landmark,
  Scale,
  Truck,
} from "lucide-react";
import type { ComponentType } from "react";
import type { Locale } from "../i18n/copy";
import { environmentEntries, environmentIntro, type EnvironmentEntry } from "../data/environmentAnalysis";

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  "entorno-cultural-social": Globe2,
  "entorno-politico-legal": Scale,
  "entorno-tecnologico-geoambiental": Cpu,
  "entorno-comercio-internacional": Truck,
  "entorno-inversion-extranjera-directa": Landmark,
};

function StatusBadge({ entry, locale }: { entry: EnvironmentEntry; locale: Locale }) {
  const isAvailable = entry.status === "available";
  const Icon = isAvailable ? CheckCircle2 : Clock3;

  return (
    <span className={`environment-status-badge${isAvailable ? " is-available" : " is-pending"}`}>
      <Icon size={14} />
      {isAvailable
        ? locale === "es"
          ? "Archivo disponible"
          : "File available"
        : locale === "es"
          ? "Pendiente por cargar"
          : "Pending upload"}
    </span>
  );
}

export function EnvironmentOverviewCard({ entry, locale }: { entry: EnvironmentEntry; locale: Locale }) {
  const Icon = iconMap[entry.id] ?? Globe2;

  return (
    <motion.a
      href={`#${entry.id}`}
      className={`environment-overview-card${entry.status === "available" ? " is-available" : ""}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.32 }}
    >
      <div className="environment-overview-head">
        <div className="environment-icon-box">
          <Icon size={18} />
        </div>
        <StatusBadge entry={entry} locale={locale} />
      </div>
      <span>{entry.focus[locale]}</span>
      <h3>{entry.title[locale]}</h3>
      <p>{entry.summary[locale]}</p>
      <ul>
        {entry.indicators.slice(0, 3).map((indicator) => (
          <li key={indicator[locale]}>{indicator[locale]}</li>
        ))}
      </ul>
      <strong>
        {locale === "es" ? "Ver entorno" : "Open environment"} <ArrowDownRight size={16} />
      </strong>
    </motion.a>
  );
}

export function EnvironmentSectionCard({
  entry,
  locale,
  embedded = false,
}: {
  entry: EnvironmentEntry;
  locale: Locale;
  embedded?: boolean;
}) {
  const Icon = iconMap[entry.id] ?? Globe2;
  const isAvailable = entry.status === "available";
  const content = (
    <>
      {!embedded ? (
        <div className="environment-section-head">
          <div className="environment-section-heading">
            <div className="environment-icon-box">
              <Icon size={20} />
            </div>
            <div>
              <span>{locale === "es" ? "Entorno individual" : "Individual environment"}</span>
              <h2>{entry.title[locale]}</h2>
            </div>
          </div>
          <StatusBadge entry={entry} locale={locale} />
        </div>
      ) : null}

      <div className="environment-section-layout">
        <article className="environment-copy-card">
          <span>{locale === "es" ? "Lectura del entorno" : "Environment reading"}</span>
          <p>{entry.description[locale]}</p>
          <div className="environment-note-band">
            <strong>{locale === "es" ? "Para que sirve" : "Why it matters"}</strong>
            <p>{entry.strategicRole[locale]}</p>
          </div>
        </article>

        <article className="environment-file-card">
          <span>{locale === "es" ? "Estado del archivo" : "File status"}</span>
          <h3>
            {isAvailable
              ? locale === "es"
                ? "Fuente conectada"
                : "Connected source"
              : locale === "es"
                ? "Espacio preparado"
                : "Prepared space"}
          </h3>
          <p>
            {isAvailable
              ? entry.file?.description[locale]
              : locale === "es"
                ? "El modulo ya esta creado. Cuando subas el archivo, aqui quedaran el acceso, la lectura y los soportes visuales sin tocar la estructura general."
                : "The module is already created. When the file is uploaded, this is where access, reading and visual support will live without changing the overall structure."}
          </p>
          {entry.file ? (
            <>
              <div className="environment-file-metadata">
                {entry.file.metadata.map((item) => (
                  <i key={`${entry.id}-${item}`}>{item}</i>
                ))}
              </div>
              <div className="environment-file-actions">
                <a href={entry.file.href} target="_blank" rel="noreferrer">
                  <ArrowUpRight size={16} />
                  {entry.file.openLabel[locale]}
                </a>
                <a href={entry.file.href} download>
                  <Download size={16} />
                  {entry.file.downloadLabel[locale]}
                </a>
              </div>
            </>
          ) : (
            <div className="environment-placeholder-box">
              <Clock3 size={16} />
              <span>{locale === "es" ? "Proximamente" : "Coming soon"}</span>
            </div>
          )}
        </article>
      </div>

      <div className="environment-detail-grid">
        <article className="environment-indicator-card">
          <span>{locale === "es" ? "Indicadores principales" : "Main indicators"}</span>
          <ul>
            {entry.indicators.map((indicator) => (
              <li key={indicator[locale]}>{indicator[locale]}</li>
            ))}
          </ul>
        </article>
        <article className="environment-indicator-card">
          <span>{locale === "es" ? "Enfoque de exposicion" : "Presentation focus"}</span>
          <p>{entry.focus[locale]}</p>
          {entry.notes?.map((note) => <p key={note[locale]}>{note[locale]}</p>)}
        </article>
      </div>

      {entry.signals?.length ? (
        <div className="environment-signal-grid">
          {entry.signals.map((signal) => (
            <article key={signal.title[locale]} className="environment-signal-card">
              <span>{signal.title[locale]}</span>
              <div className="environment-signal-values">
                <div>
                  <small>Florida</small>
                  <strong>{signal.florida}</strong>
                </div>
                <div>
                  <small>Texas</small>
                  <strong>{signal.texas}</strong>
                </div>
                <div>
                  <small>{signal.referenceLabel?.[locale] ?? (locale === "es" ? "EE. UU." : "U.S.")}</small>
                  <strong>{signal.national}</strong>
                </div>
              </div>
              <p>{signal.reading[locale]}</p>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return <div className={`environment-section-card${isAvailable ? " is-available" : ""} is-embedded`}>{content}</div>;
  }

  return <section id={entry.id} className={`environment-section-card${isAvailable ? " is-available" : ""}`}>{content}</section>;
}

export default function EnvironmentAnalysisPage({ locale }: { locale: Locale }) {
  const availableCount = environmentEntries.filter((entry) => entry.status === "available").length;
  const pendingCount = environmentEntries.length - availableCount;

  return (
    <main className="environment-page">
      <section className="environment-hero-card">
        <div className="section-intro environment-intro">
          <span>{environmentIntro.eyebrow[locale]}</span>
          <h1>{environmentIntro.title[locale]}</h1>
          <p>{environmentIntro.summary[locale]}</p>
        </div>

        <div className="environment-hero-side">
          <article>
            <small>{locale === "es" ? "Entornos" : "Environments"}</small>
            <strong>{environmentEntries.length}</strong>
          </article>
          <article>
            <small>{locale === "es" ? "Archivos activos" : "Active files"}</small>
            <strong>{availableCount}</strong>
          </article>
          <article>
            <small>{locale === "es" ? "Pendientes" : "Pending"}</small>
            <strong>{pendingCount}</strong>
          </article>
        </div>
      </section>

      <section className="environment-overview-panel">
        <div className="environment-overview-copy">
          <span>{locale === "es" ? "Vista general integrada" : "Integrated overview"}</span>
          <h2>
            {locale === "es"
              ? "Cinco entornos, una sola lectura de viabilidad"
              : "Five environments, one viability reading"}
          </h2>
          <p>{environmentIntro.integratedNote[locale]}</p>
        </div>
        <div className="environment-overview-grid">
          {environmentEntries.map((entry) => (
            <EnvironmentOverviewCard key={entry.id} entry={entry} locale={locale} />
          ))}
        </div>
      </section>

      <nav className="environment-jump-nav" aria-label={locale === "es" ? "Navegacion de entornos" : "Environment navigation"}>
        {environmentEntries.map((entry) => (
          <a key={entry.id} href={`#${entry.id}`}>
            {entry.shortTitle[locale]}
          </a>
        ))}
      </nav>

      <section className="environment-section-stack">
        {environmentEntries.map((entry) => (
          <EnvironmentSectionCard key={entry.id} entry={entry} locale={locale} />
        ))}
      </section>
    </main>
  );
}
