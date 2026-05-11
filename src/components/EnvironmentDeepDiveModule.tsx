import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "../i18n/copy";
import {
  getEnvironmentDeepDive,
  type EnvironmentDeepDive,
  type EnvironmentIndicatorDetail,
} from "../data/environmentDeepDive";

const texasLabel = {
  es: "Texas",
  en: "Texas",
} satisfies Record<Locale, string>;

const floridaLabel = {
  es: "Florida",
  en: "Florida",
} satisfies Record<Locale, string>;

const nationalLabel = {
  es: "Nacional",
  en: "National",
} satisfies Record<Locale, string>;

function formatScoreValue(value: number) {
  return value.toFixed(2).replace(/\.?0+$/, "");
}

function inferUnit(indicator: EnvironmentIndicatorDetail) {
  const sample = `${indicator.texas.display} ${indicator.florida.display}`;

  if (sample.includes("USD")) return "currency";
  if (sample.includes("%")) return "percent";
  if (sample.includes("F")) return "temperature";
  return "score";
}

function formatTick(value: number, indicator: EnvironmentIndicatorDetail) {
  const unit = inferUnit(indicator);

  if (unit === "currency") return `USD ${value.toFixed(0)}`;
  if (unit === "percent") return `${value.toFixed(1)}%`;
  if (unit === "temperature") return `${value.toFixed(0)} F`;
  return value.toFixed(1).replace(/\.0$/, "");
}

function getTooltipProps(index: number, total: number, left: string) {
  if (index <= 0) {
    return {
      className: "macro-chart-tooltip is-left-edge",
      style: undefined,
    };
  }

  if (index >= total - 1) {
    return {
      className: "macro-chart-tooltip is-right-edge",
      style: undefined,
    };
  }

  return {
    className: "macro-chart-tooltip",
    style: { left },
  };
}

function EnvironmentLineChart({
  indicator,
  locale,
}: {
  indicator: EnvironmentIndicatorDetail;
  locale: Locale;
}) {
  const series = indicator.series ?? [];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hasNational = series.some((point) => typeof point.national === "number");

  const chart = useMemo(() => {
    const width = 620;
    const height = 250;
    const left = 52;
    const right = 20;
    const top = 18;
    const bottom = 42;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const values = series.flatMap((point) =>
      [point.texas, point.florida, typeof point.national === "number" ? point.national : undefined].filter(
        (value): value is number => typeof value === "number",
      ),
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max((max - min) * 0.16, inferUnit(indicator) === "score" ? 0.25 : 0.6);
    const domainMin = Math.max(0, min - padding);
    const domainMax = max + padding;
    const xStep = series.length > 1 ? plotWidth / (series.length - 1) : plotWidth;
    const toY = (value: number) => top + (1 - (value - domainMin) / (domainMax - domainMin || 1)) * plotHeight;
    const points = series.map((point, index) => ({
      ...point,
      x: left + xStep * index,
      texasY: toY(point.texas),
      floridaY: toY(point.florida),
      nationalY: typeof point.national === "number" ? toY(point.national) : undefined,
    }));
    const gridValues = Array.from({ length: 5 }, (_, index) => {
      const value = domainMin + ((domainMax - domainMin) / 4) * index;
      return {
        value,
        y: toY(value),
      };
    });

    return { width, height, left, plotWidth, points, gridValues };
  }, [indicator, series]);

  if (!series.length) return null;

  const activePoint = typeof activeIndex === "number" ? chart.points[activeIndex] : undefined;
  const tooltipLeft = activePoint
    ? `${((activePoint.x - chart.left) / chart.plotWidth) * 100}%`
    : "50%";
  const tooltipProps =
    typeof activeIndex === "number"
      ? getTooltipProps(activeIndex, chart.points.length, tooltipLeft)
      : undefined;

  return (
    <div className="macro-chart-shell">
      <div className="macro-chart-legend">
        <span className="legend-item legend-texas">{texasLabel[locale]}</span>
        <span className="legend-item legend-florida">{floridaLabel[locale]}</span>
        {hasNational ? <span className="legend-item legend-national">{nationalLabel[locale]}</span> : null}
      </div>
      <div className="macro-chart-frame">
        {activePoint && tooltipProps ? (
          <div className={tooltipProps.className} style={tooltipProps.style}>
            <strong>{activePoint.year}</strong>
            <span>
              {texasLabel[locale]}: {formatTick(activePoint.texas, indicator)}
            </span>
            <span>
              {floridaLabel[locale]}: {formatTick(activePoint.florida, indicator)}
            </span>
            {typeof activePoint.national === "number" ? (
              <span>
                {nationalLabel[locale]}: {formatTick(activePoint.national, indicator)}
              </span>
            ) : null}
            {activePoint.note ? <span>{activePoint.note[locale]}</span> : null}
          </div>
        ) : null}
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="macro-chart-svg" role="img" aria-label={indicator.title[locale]}>
          {chart.gridValues.map((tick) => (
            <g key={`${indicator.id}-${tick.value}`}>
              <line className="macro-grid-line" x1={52} x2={600} y1={tick.y} y2={tick.y} />
              <text className="macro-axis-label" x={8} y={tick.y + 4}>
                {formatTick(tick.value, indicator)}
              </text>
            </g>
          ))}

          <polyline
            className="macro-line macro-line-texas"
            points={chart.points.map((point) => `${point.x},${point.texasY}`).join(" ")}
          />
          <polyline
            className="macro-line macro-line-florida"
            points={chart.points.map((point) => `${point.x},${point.floridaY}`).join(" ")}
          />
          {hasNational ? (
            <polyline
              className="macro-line macro-line-national"
              points={chart.points
                .flatMap((point) =>
                  typeof point.nationalY === "number" ? [`${point.x},${point.nationalY}`] : [],
                )
                .join(" ")}
            />
          ) : null}

          {chart.points.map((point, index) => (
            <g key={`${indicator.id}-${point.year}`}>
              <circle
                className={`macro-point macro-point-texas${activeIndex === index ? " is-active" : ""}`}
                cx={point.x}
                cy={point.texasY}
                r={activeIndex === index ? 5 : 4}
              />
              <circle
                className={`macro-point macro-point-florida${activeIndex === index ? " is-active" : ""}`}
                cx={point.x}
                cy={point.floridaY}
                r={activeIndex === index ? 5 : 4}
              />
              {typeof point.nationalY === "number" ? (
                <circle
                  className={`macro-point macro-point-national${activeIndex === index ? " is-active" : ""}`}
                  cx={point.x}
                  cy={point.nationalY}
                  r={activeIndex === index ? 4 : 3}
                />
              ) : null}
              <text className="macro-axis-label year" x={point.x} y={230}>
                {point.year}
              </text>
              <rect
                className="macro-hit-area"
                x={Math.max(0, point.x - 30)}
                y={0}
                width={60}
                height={220}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                aria-label={`${indicator.title[locale]} ${point.year}`}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function EnvironmentComparisonChart({
  indicator,
  locale,
}: {
  indicator: EnvironmentIndicatorDetail;
  locale: Locale;
}) {
  const max = indicator.chartMax ?? Math.max(indicator.texas.chartValue ?? 0, indicator.florida.chartValue ?? 0, indicator.reference?.chartValue ?? 0, 1);
  const items = [
    {
      key: "texas",
      label: texasLabel[locale],
      value: indicator.texas.chartValue ?? 0,
      display: indicator.texas.display,
      className: "is-texas",
    },
    {
      key: "florida",
      label: floridaLabel[locale],
      value: indicator.florida.chartValue ?? 0,
      display: indicator.florida.display,
      className: "is-florida",
    },
  ];

  return (
    <div className="macro-chart-shell">
      <div className="macro-chart-legend">
        <span className="legend-item legend-texas">{texasLabel[locale]}</span>
        <span className="legend-item legend-florida">{floridaLabel[locale]}</span>
        {indicator.reference ? <span className="legend-item legend-national">{indicator.reference.label[locale]}</span> : null}
      </div>
      <div className="macro-chart-frame environment-bar-chart-frame">
        <div className="environment-bar-chart">
          {items.map((item) => (
            <div key={`${indicator.id}-${item.key}`} className="environment-bar-row">
              <span>{item.label}</span>
              <div className="environment-bar-track">
                <i className={item.className} style={{ width: `${Math.max(6, (item.value / max) * 100)}%` }} />
              </div>
              <strong>{item.display}</strong>
            </div>
          ))}
        </div>
        {indicator.reference ? (
          <div className="environment-reference-band">
            <small>{indicator.reference.label[locale]}</small>
            <strong>{indicator.reference.display}</strong>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EnvironmentMiniTable({
  indicator,
  locale,
}: {
  indicator: EnvironmentIndicatorDetail;
  locale: Locale;
}) {
  return (
    <div className="macro-table-shell">
      <div className="macro-table-head">
        <span>{locale === "es" ? "Mini tabla de apoyo" : "Support mini table"}</span>
      </div>
      <div className="macro-table-scroll">
        <table className="macro-mini-table">
          <thead>
            <tr>
              <th>{locale === "es" ? "Referencia" : "Reference"}</th>
              <th>{texasLabel[locale]}</th>
              <th>{floridaLabel[locale]}</th>
              <th>{indicator.reference?.label[locale] ?? nationalLabel[locale]}</th>
            </tr>
          </thead>
          <tbody>
            {indicator.tableRows.map((row) => (
              <tr key={`${indicator.id}-${row.label.en}`}>
                <th>{row.label[locale]}</th>
                <td>{row.texas}</td>
                <td>{row.florida}</td>
                <td>{row.reference ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {indicator.strategicReading ? <p className="macro-footnote">{indicator.strategicReading[locale]}</p> : null}
    </div>
  );
}

function EnvironmentIndicatorCard({
  indicator,
  locale,
}: {
  indicator: EnvironmentIndicatorDetail;
  locale: Locale;
}) {
  return (
    <article className="indicator-card">
      <header className="indicator-card-head">
        <div>
          <span>{indicator.eyebrow[locale]}</span>
          <h3>{indicator.title[locale]}</h3>
        </div>
        <div className="score-pair">
          <div className="score-chip">
            <small>{texasLabel[locale]}</small>
            <strong>{formatScoreValue(indicator.texas.score)}</strong>
          </div>
          <div className="score-chip">
            <small>{floridaLabel[locale]}</small>
            <strong>{formatScoreValue(indicator.florida.score)}</strong>
          </div>
        </div>
      </header>

      <p className="indicator-summary">{indicator.summary[locale]}</p>

      <ul className="indicator-bullet-list">
        {indicator.bullets.map((bullet) => (
          <li key={`${indicator.id}-${bullet.es}`}>{bullet[locale]}</li>
        ))}
      </ul>

      {indicator.series?.length ? (
        <EnvironmentLineChart indicator={indicator} locale={locale} />
      ) : (
        <EnvironmentComparisonChart indicator={indicator} locale={locale} />
      )}

      <EnvironmentMiniTable indicator={indicator} locale={locale} />

      <div className="indicator-analysis-grid">
        <article className="analysis-block">
          <span>{locale === "es" ? "Dato clave" : "Key data"}</span>
          <p>{indicator.analysis.keyData[locale]}</p>
        </article>
        <article className="analysis-block">
          <span>{locale === "es" ? "Que significa" : "What it means"}</span>
          <p>{indicator.analysis.meaning[locale]}</p>
        </article>
        <article className="analysis-block">
          <span>{locale === "es" ? "Impacto para UMO" : "Impact on UMO"}</span>
          <p>{indicator.analysis.impact[locale]}</p>
        </article>
        <article className="analysis-block rating-block">
          <span>{locale === "es" ? "Calificacion" : "Score reading"}</span>
          <p>{indicator.analysis.score[locale]}</p>
        </article>
      </div>

      <div className="indicator-sources">
        <div className="sources-head">
          <span>{locale === "es" ? "Fuentes" : "Sources"}</span>
        </div>
        <div className="sources-links">
          {indicator.sources.map((source) =>
            source.href ? (
              <a key={`${indicator.id}-${source.href}`} href={source.href} target="_blank" rel="noreferrer">
                {source.label} <ArrowUpRight size={14} />
              </a>
            ) : (
              <span key={`${indicator.id}-${source.label}`} className="sources-static-tag">
                {source.label}
              </span>
            ),
          )}
        </div>
      </div>
    </article>
  );
}

function EnvironmentSummaryMatrix({
  deepDive,
  locale,
}: {
  deepDive: EnvironmentDeepDive;
  locale: Locale;
}) {
  const summary = useMemo(() => {
    const rows = deepDive.indicators.map((indicator) => ({
      id: indicator.id,
      title: indicator.title[locale],
      texas: indicator.texas.score,
      florida: indicator.florida.score,
      stronger:
        indicator.texas.score === indicator.florida.score
          ? locale === "es"
            ? "Empate tecnico"
            : "Technical tie"
          : indicator.texas.score > indicator.florida.score
            ? texasLabel[locale]
            : floridaLabel[locale],
      reading: indicator.strategicReading?.[locale] ?? indicator.summary[locale],
    }));

    const texasAverage =
      rows.reduce((total, row) => total + row.texas, 0) / Math.max(rows.length, 1);
    const floridaAverage =
      rows.reduce((total, row) => total + row.florida, 0) / Math.max(rows.length, 1);

    return { rows, texasAverage, floridaAverage };
  }, [deepDive, locale]);

  return (
    <section className="macro-summary-section">
      <div className="macro-summary-head">
        <span>{locale === "es" ? "Lectura consolidada" : "Consolidated reading"}</span>
        <h3>{locale === "es" ? "Matriz de lectura del entorno" : "Environment reading matrix"}</h3>
        <p>
          {locale === "es"
            ? "La matriz resume que entorno favorece mas a cada estado y como debe explicarse esa diferencia frente al contexto general del pais."
            : "The matrix summarizes which signals favor each state and how that difference should be explained against the broader country context."}
        </p>
      </div>
      <div className="macro-table-scroll">
        <table className="macro-mini-table macro-summary-table">
          <thead>
            <tr>
              <th>{locale === "es" ? "Indicador" : "Indicator"}</th>
              <th>{texasLabel[locale]}</th>
              <th>{floridaLabel[locale]}</th>
              <th>{locale === "es" ? "Lectura principal" : "Main reading"}</th>
              <th>{locale === "es" ? "Interpretacion" : "Interpretation"}</th>
            </tr>
          </thead>
          <tbody>
            {summary.rows.map((row) => (
              <tr key={row.id}>
                <th>{row.title}</th>
                <td>{formatScoreValue(row.texas)}</td>
                <td>{formatScoreValue(row.florida)}</td>
                <td>{row.stronger}</td>
                <td>{row.reading}</td>
              </tr>
            ))}
            <tr className="summary-average-row">
              <th>{locale === "es" ? "Promedio del entorno" : "Environment average"}</th>
              <td>{formatScoreValue(summary.texasAverage)}</td>
              <td>{formatScoreValue(summary.floridaAverage)}</td>
              <td>{summary.texasAverage > summary.floridaAverage ? texasLabel[locale] : floridaLabel[locale]}</td>
              <td>
                {summary.texasAverage > summary.floridaAverage
                  ? locale === "es"
                    ? "Texas queda levemente mas fuerte en este entorno, pero la lectura sigue siendo complementaria frente al pais."
                    : "Texas ends slightly stronger in this environment, though the reading remains complementary against the broader country context."
                  : locale === "es"
                    ? "Florida queda levemente mas fuerte en este entorno, pero la lectura sigue siendo complementaria frente al pais."
                    : "Florida ends slightly stronger in this environment, though the reading remains complementary against the broader country context."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function EnvironmentDeepDiveModule({
  deepDive,
  locale,
  embedded = false,
  supportLinks = [],
}: {
  deepDive: EnvironmentDeepDive;
  locale: Locale;
  embedded?: boolean;
  supportLinks?: { label: string; href: string }[];
}) {
  return (
    <div className={`macro-module-shell environment-deep-dive${embedded ? " is-embedded" : ""}`}>
      {!embedded ? (
        <section className="macro-executive-hero">
          <div className="macro-executive-copy">
            <span>{deepDive.heroEyebrow[locale]}</span>
            <h3>{deepDive.heroTitle[locale]}</h3>
            <p>{deepDive.heroSummary[locale]}</p>
          </div>
          <div className="macro-support-links">
            {supportLinks.length
              ? supportLinks.map((link) => (
                  <a key={`${deepDive.id}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <ArrowUpRight size={14} />
                  </a>
                ))
              : deepDive.presentationBullets.map((bullet) => (
                  <div key={bullet.es} className="sources-static-tag environment-hero-pill">
                    {bullet[locale]}
                  </div>
                ))}
          </div>
        </section>
      ) : (
        <section className="macro-presentation-grid">
          {deepDive.presentationBullets.map((bullet, index) => (
            <article key={`${deepDive.id}-${index}`} className="micro-note-card">
              <span>{locale === "es" ? `Lectura ${index + 1}` : `Reading ${index + 1}`}</span>
              <p>{bullet[locale]}</p>
            </article>
          ))}
        </section>
      )}

      {!embedded ? (
        <section className="macro-presentation-grid">
          {deepDive.presentationBullets.map((bullet, index) => (
            <article key={`${deepDive.id}-hero-${index}`} className="micro-note-card">
              <span>{locale === "es" ? `Lectura ${index + 1}` : `Reading ${index + 1}`}</span>
              <p>{bullet[locale]}</p>
            </article>
          ))}
        </section>
      ) : null}

      <section className="macro-methodology-card">
        <div className="macro-summary-head">
          <span>{locale === "es" ? "Como leer la puntuacion" : "How to read the score"}</span>
          <h3>{locale === "es" ? "Escala simple para exponer" : "Simple scale for presentation"}</h3>
          <p>
            {locale === "es"
              ? "La puntuacion va de 1 a 5 y sirve para explicar que tan favorable es cada indicador para UMO. No busca poner a Texas y Florida a pelear entre si, sino mostrar por que ambos sobresalen frente al pais y que rol aporta cada uno."
              : "The score runs from 1 to 5 and explains how favorable each indicator is for UMO. It does not try to make Texas and Florida fight each other; it shows why both stand out against the country and what role each one contributes."}
          </p>
        </div>
        <div className="method-scale">
          <div className="method-scale-chip">1 = {locale === "es" ? "Debil" : "Weak"}</div>
          <div className="method-scale-chip">2 = {locale === "es" ? "Bajo" : "Low"}</div>
          <div className="method-scale-chip">3 = {locale === "es" ? "Aceptable" : "Acceptable"}</div>
          <div className="method-scale-chip">4 = {locale === "es" ? "Fuerte" : "Strong"}</div>
          <div className="method-scale-chip">5 = {locale === "es" ? "Muy fuerte" : "Very strong"}</div>
        </div>
      </section>

      <section className="indicator-stack">
        {deepDive.indicators.map((indicator) => (
          <EnvironmentIndicatorCard key={indicator.id} indicator={indicator} locale={locale} />
        ))}
      </section>

      <EnvironmentSummaryMatrix deepDive={deepDive} locale={locale} />

      <section className="macro-conclusion-card">
        <div className="macro-summary-head">
          <span>{locale === "es" ? "Cierre ejecutivo" : "Executive close"}</span>
          <h3>{locale === "es" ? "Lo que este entorno confirma" : "What this environment confirms"}</h3>
          <p>{deepDive.conclusion[locale]}</p>
        </div>
      </section>
    </div>
  );
}

export default function EnvironmentDeepDiveById({
  id,
  locale,
  embedded = false,
  supportLinks,
}: {
  id: string;
  locale: Locale;
  embedded?: boolean;
  supportLinks?: { label: string; href: string }[];
}) {
  const deepDive = getEnvironmentDeepDive(id);

  if (!deepDive) return null;

  return <EnvironmentDeepDiveModule deepDive={deepDive} locale={locale} embedded={embedded} supportLinks={supportLinks} />;
}
