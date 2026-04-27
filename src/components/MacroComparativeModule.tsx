import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  macroConclusion,
  macroExecutiveCards,
  macroHero,
  macroIndicators,
  macroMethodology,
  macroPresentationCards,
  macroReferenceList,
  macroSupportingSources,
  type FiscalMetricRow,
  type MacroIndicator,
  type MacroSeriesPoint,
} from "../data/macroComparative";
import type { Locale } from "../i18n/copy";

const texasLabel = {
  es: "Texas",
  en: "Texas",
} satisfies Record<Locale, string>;

const floridaLabel = {
  es: "Florida",
  en: "Florida",
} satisfies Record<Locale, string>;

function formatValue(value: number, unit: MacroIndicator["unit"], locale: Locale, precision = 1) {
  if (unit === "percent") return `${value.toFixed(precision)}%`;

  if (unit === "currency") {
    return new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return `USD ${value.toFixed(precision)}B`;
}

function formatCompactValue(value: number, unit: MacroIndicator["unit"]) {
  if (unit === "percent") return `${value.toFixed(1)}%`;
  if (unit === "currency") return `USD ${(value / 1000).toFixed(1)}k`;
  return `USD ${value.toFixed(1)}B`;
}

function getStateStronger(indicator: MacroIndicator, locale: Locale) {
  if (indicator.texasScore === indicator.floridaScore) {
    return locale === "es" ? "Lectura compartida" : "Shared reading";
  }

  return indicator.texasScore > indicator.floridaScore ? texasLabel[locale] : floridaLabel[locale];
}

function LineComparisonChart({ indicator, locale }: { indicator: MacroIndicator; locale: Locale }) {
  const series = indicator.series ?? [];
  const [activeIndex, setActiveIndex] = useState(Math.max(series.length - 1, 0));

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
      [point.texas, point.florida, indicator.showNational ? point.national : undefined].filter(
        (value): value is number => typeof value === "number",
      ),
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max((max - min) * 0.18, 0.6);
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
  }, [indicator.showNational, series]);

  const activePoint = chart.points[activeIndex] ?? chart.points[0];
  const tooltipLeft = activePoint
    ? `${((activePoint.x - chart.left) / chart.plotWidth) * 100}%`
    : "50%";

  return (
    <div className="macro-chart-shell">
      <div className="macro-chart-legend">
        <span className="legend-item legend-texas">{texasLabel[locale]}</span>
        <span className="legend-item legend-florida">{floridaLabel[locale]}</span>
        {indicator.showNational ? (
          <span className="legend-item legend-national">{locale === "es" ? "Nacional" : "National"}</span>
        ) : null}
      </div>
      <div className="macro-chart-frame">
        {activePoint ? (
          <div className="macro-chart-tooltip" style={{ left: tooltipLeft }}>
            <strong>{activePoint.year}</strong>
            <span>{texasLabel[locale]}: {formatValue(activePoint.texas, indicator.unit, locale, indicator.precision ?? 1)}</span>
            <span>{floridaLabel[locale]}: {formatValue(activePoint.florida, indicator.unit, locale, indicator.precision ?? 1)}</span>
            {typeof activePoint.national === "number" ? (
              <span>{locale === "es" ? "Nacional" : "National"}: {formatValue(activePoint.national, indicator.unit, locale, indicator.precision ?? 1)}</span>
            ) : null}
          </div>
        ) : null}
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="macro-chart-svg" role="img" aria-label={indicator.title[locale]}>
          {chart.gridValues.map((tick) => (
            <g key={`${indicator.id}-${tick.value}`}>
              <line className="macro-grid-line" x1={52} x2={600} y1={tick.y} y2={tick.y} />
              <text className="macro-axis-label" x={8} y={tick.y + 4}>
                {formatCompactValue(tick.value, indicator.unit)}
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
          {indicator.showNational ? (
            <polyline
              className="macro-line macro-line-national"
              points={chart.points
                .map((point) => `${point.x},${point.nationalY ?? point.texasY}`)
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
                onFocus={() => setActiveIndex(index)}
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

function BarComparisonChart({ indicator, locale }: { indicator: MacroIndicator; locale: Locale }) {
  const series = indicator.series ?? [];
  const [activeIndex, setActiveIndex] = useState(Math.max(series.length - 1, 0));

  const chart = useMemo(() => {
    const width = 620;
    const height = 250;
    const left = 52;
    const right = 20;
    const top = 18;
    const bottom = 42;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const values = series.flatMap((point) => [point.texas, point.florida]);
    const max = Math.max(...values) * 1.18;
    const groupWidth = plotWidth / Math.max(series.length, 1);
    const barWidth = Math.min(30, groupWidth * 0.28);
    const toY = (value: number) => top + (1 - value / (max || 1)) * plotHeight;
    const points = series.map((point, index) => {
      const groupX = left + groupWidth * index + groupWidth / 2;
      return {
        ...point,
        groupX,
        texasX: groupX - barWidth - 6,
        floridaX: groupX + 6,
        texasY: toY(point.texas),
        floridaY: toY(point.florida),
      };
    });
    const gridValues = Array.from({ length: 5 }, (_, index) => {
      const value = (max / 4) * index;
      return {
        value,
        y: toY(value),
      };
    });

    return { width, height, left, plotWidth, points, gridValues, barWidth };
  }, [series]);

  const activePoint = chart.points[activeIndex] ?? chart.points[0];
  const tooltipLeft = activePoint
    ? `${((activePoint.groupX - chart.left) / chart.plotWidth) * 100}%`
    : "50%";

  return (
    <div className="macro-chart-shell">
      <div className="macro-chart-legend">
        <span className="legend-item legend-texas">{texasLabel[locale]}</span>
        <span className="legend-item legend-florida">{floridaLabel[locale]}</span>
      </div>
      <div className="macro-chart-frame">
        {activePoint ? (
          <div className="macro-chart-tooltip" style={{ left: tooltipLeft }}>
            <strong>{activePoint.year}</strong>
            <span>{texasLabel[locale]}: {formatValue(activePoint.texas, indicator.unit, locale, indicator.precision ?? 1)}</span>
            <span>{floridaLabel[locale]}: {formatValue(activePoint.florida, indicator.unit, locale, indicator.precision ?? 1)}</span>
            {activePoint.note ? <span>{activePoint.note[locale]}</span> : null}
          </div>
        ) : null}
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="macro-chart-svg" role="img" aria-label={indicator.title[locale]}>
          {chart.gridValues.map((tick) => (
            <g key={`${indicator.id}-${tick.value}`}>
              <line className="macro-grid-line" x1={52} x2={600} y1={tick.y} y2={tick.y} />
              <text className="macro-axis-label" x={8} y={tick.y + 4}>
                {formatCompactValue(tick.value, indicator.unit)}
              </text>
            </g>
          ))}
          {chart.points.map((point, index) => (
            <g key={`${indicator.id}-${point.year}`}>
              <rect
                className={`macro-bar macro-bar-texas${activeIndex === index ? " is-active" : ""}`}
                x={point.texasX}
                y={point.texasY}
                width={chart.barWidth}
                height={206 - point.texasY}
                rx={4}
              />
              <rect
                className={`macro-bar macro-bar-florida${activeIndex === index ? " is-active" : ""}`}
                x={point.floridaX}
                y={point.floridaY}
                width={chart.barWidth}
                height={206 - point.floridaY}
                rx={4}
              />
              <text className="macro-axis-label year" x={point.groupX} y={230}>
                {point.year}
              </text>
              <rect
                className="macro-hit-area"
                x={point.groupX - 38}
                y={0}
                width={76}
                height={220}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
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

function ComparisonMiniTable({ indicator, locale }: { indicator: MacroIndicator; locale: Locale }) {
  const series = indicator.series ?? [];

  return (
    <div className="macro-table-shell">
      <div className="macro-table-head">
        <span>{locale === "es" ? "Mini tabla 2021-2025" : "2021-2025 mini table"}</span>
      </div>
      <div className="macro-table-scroll">
        <table className="macro-mini-table">
          <thead>
            <tr>
              <th>{locale === "es" ? "Estado" : "State"}</th>
              {series.map((point) => (
                <th key={`${indicator.id}-${point.year}`}>{point.year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{texasLabel[locale]}</th>
              {series.map((point) => (
                <td key={`${indicator.id}-tx-${point.year}`}>{formatValue(point.texas, indicator.unit, locale, indicator.precision ?? 1)}</td>
              ))}
            </tr>
            <tr>
              <th>{floridaLabel[locale]}</th>
              {series.map((point) => (
                <td key={`${indicator.id}-fl-${point.year}`}>{formatValue(point.florida, indicator.unit, locale, indicator.precision ?? 1)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {indicator.footnote ? <p className="macro-footnote">{indicator.footnote[locale]}</p> : null}
    </div>
  );
}

function FiscalMiniTable({
  rows,
  locale,
}: {
  rows: FiscalMetricRow[];
  locale: Locale;
}) {
  const years = ["2021", "2022", "2023", "2024", "2025"];

  return (
    <div className="macro-table-shell">
      <div className="macro-table-head">
        <span>{locale === "es" ? "Contexto fiscal 2021-2025" : "2021-2025 tax context"}</span>
      </div>
      <div className="macro-table-scroll">
        <table className="macro-mini-table fiscal-table">
          <thead>
            <tr>
              <th>{locale === "es" ? "Indicador" : "Indicator"}</th>
              {years.map((year) => (
                <th key={`tx-${year}`}>{year} TX</th>
              ))}
              {years.map((year) => (
                <th key={`fl-${year}`}>{year} FL</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label[locale]}>
                <th>{row.label[locale]}</th>
                {row.texas.map((value, index) => (
                  <td key={`${row.label.en}-tx-${years[index]}`}>{value}</td>
                ))}
                {row.florida.map((value, index) => (
                  <td key={`${row.label.en}-fl-${years[index]}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fiscal-note-grid">
        {rows.map((row) => (
          <article key={`${row.label.en}-note`} className="micro-note-card">
            <span>{row.label[locale]}</span>
            <p>{row.note[locale]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function IndicatorCard({ indicator, locale }: { indicator: MacroIndicator; locale: Locale }) {
  return (
    <article className="indicator-card">
      <header className="indicator-card-head">
        <div>
          <span>{indicator.kicker[locale]}</span>
          <h3>{indicator.title[locale]}</h3>
        </div>
        <div className="score-pair">
          <div className="score-chip">
            <small>{texasLabel[locale]}</small>
            <strong>{indicator.texasScore.toFixed(1)}</strong>
          </div>
          <div className="score-chip">
            <small>{floridaLabel[locale]}</small>
            <strong>{indicator.floridaScore.toFixed(1)}</strong>
          </div>
        </div>
      </header>

      <p className="indicator-summary">{indicator.summary[locale]}</p>

      {indicator.chart === "line" ? <LineComparisonChart indicator={indicator} locale={locale} /> : null}
      {indicator.chart === "bar" ? <BarComparisonChart indicator={indicator} locale={locale} /> : null}
      {indicator.chart === "fiscal" && indicator.fiscalRows ? <FiscalMiniTable rows={indicator.fiscalRows} locale={locale} /> : null}
      {indicator.chart !== "fiscal" ? <ComparisonMiniTable indicator={indicator} locale={locale} /> : null}

      <div className="indicator-analysis-grid">
        <article className="analysis-block">
          <span>{locale === "es" ? "Dato clave" : "Key data"}</span>
          <p>{indicator.keyData[locale]}</p>
        </article>
        <article className="analysis-block">
          <span>{locale === "es" ? "Que significa" : "What it means"}</span>
          <p>{indicator.meaning[locale]}</p>
        </article>
        <article className="analysis-block">
          <span>{locale === "es" ? "Impacto para UMO" : "Impact on UMO"}</span>
          <p>{indicator.impact[locale]}</p>
        </article>
        <article className="analysis-block rating-block">
          <span>{locale === "es" ? "Calificacion" : "Rating"}</span>
          <p><strong>{texasLabel[locale]} {indicator.texasScore.toFixed(1)}/5:</strong> {indicator.texasReason[locale]}</p>
          <p><strong>{floridaLabel[locale]} {indicator.floridaScore.toFixed(1)}/5:</strong> {indicator.floridaReason[locale]}</p>
        </article>
      </div>

      <div className="indicator-sources">
        <div className="sources-head">
          <span>{locale === "es" ? "Fuentes" : "Sources"}</span>
        </div>
        <div className="sources-links">
          {indicator.sources.map((source) => (
            <a key={`${indicator.id}-${source.href}`} href={source.href} target="_blank" rel="noreferrer">
              {source.label[locale]} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
        <div className="sources-apa">
          {indicator.apa.map((reference) => (
            <p key={`${indicator.id}-${reference}`}>{reference}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function SummaryMatrix({ locale }: { locale: Locale }) {
  const summary = useMemo(() => {
    const rows = macroIndicators.map((indicator) => ({
      id: indicator.id,
      title: indicator.title[locale],
      texas: indicator.texasScore,
      florida: indicator.floridaScore,
      stronger: getStateStronger(indicator, locale),
      reading: indicator.strategicReading[locale],
    }));

    const texasAverage =
      rows.reduce((total, row) => total + row.texas, 0) / Math.max(rows.length, 1);
    const floridaAverage =
      rows.reduce((total, row) => total + row.florida, 0) / Math.max(rows.length, 1);

    return { rows, texasAverage, floridaAverage };
  }, [locale]);

  return (
    <section className="macro-summary-section">
      <div className="macro-summary-head">
        <span>{locale === "es" ? "Lectura consolidada" : "Consolidated reading"}</span>
        <h3>{locale === "es" ? "Matriz final de calificacion" : "Final scoring matrix"}</h3>
        <p>
          {locale === "es"
            ? "La tabla resume que estado se fortalece mas en cada indicador y como debe leerse estrategicamente la comparacion."
            : "The table summarizes which state is stronger in each indicator and how the comparison should be read strategically."}
        </p>
      </div>
      <div className="macro-table-scroll">
        <table className="macro-mini-table macro-summary-table">
          <thead>
            <tr>
              <th>{locale === "es" ? "Indicador" : "Indicator"}</th>
              <th>{texasLabel[locale]}</th>
              <th>{floridaLabel[locale]}</th>
              <th>{locale === "es" ? "Estado mas fuerte" : "Stronger state"}</th>
              <th>{locale === "es" ? "Lectura estrategica" : "Strategic reading"}</th>
            </tr>
          </thead>
          <tbody>
            {summary.rows.map((row) => (
              <tr key={row.id}>
                <th>{row.title}</th>
                <td>{row.texas.toFixed(1)}</td>
                <td>{row.florida.toFixed(1)}</td>
                <td>{row.stronger}</td>
                <td>{row.reading}</td>
              </tr>
            ))}
            <tr className="summary-average-row">
              <th>{locale === "es" ? "Promedio final" : "Final average"}</th>
              <td>{summary.texasAverage.toFixed(1)}</td>
              <td>{summary.floridaAverage.toFixed(1)}</td>
              <td>{summary.texasAverage > summary.floridaAverage ? texasLabel[locale] : floridaLabel[locale]}</td>
              <td>
                {summary.texasAverage > summary.floridaAverage
                  ? locale === "es"
                    ? "Texas queda como mercado principal por escala y relacion con maquinaria."
                    : "Texas stands as the main market because of scale and machinery fit."
                  : locale === "es"
                    ? "Florida queda como prioridad, aunque el caso sugiere complementariedad."
                    : "Florida stands as the priority, although the case suggests complementarity."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function MacroComparativeModule({ locale }: { locale: Locale }) {
  return (
    <div className="macro-module-shell">
      <section className="macro-executive-hero">
        <div className="macro-executive-copy">
          <span>MARKET COMPARISON / USA ENTRY</span>
          <h3>{macroHero.title[locale]}</h3>
          <p>{macroHero.subtitle[locale]}</p>
          <p>{macroHero.intro[locale]}</p>
        </div>
        <div className="macro-support-links">
          {macroSupportingSources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
              {source.label[locale]} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </section>

      <section className="macro-route-grid">
        {macroExecutiveCards.map((card) => (
          <article key={card.title[locale]} className="macro-route-card">
            <span>{card.title[locale]}</span>
            <h4>{card.state[locale]}</h4>
            <p>{card.text[locale]}</p>
            <small>{card.detail[locale]}</small>
          </article>
        ))}
      </section>

      <section className="macro-presentation-grid">
        {macroPresentationCards.map((card) => (
          <article key={card.title[locale]} className="micro-note-card">
            <span>{card.title[locale]}</span>
            <p>{card.text[locale]}</p>
          </article>
        ))}
      </section>

      <section className="macro-methodology-card">
        <div className="macro-summary-head">
          <span>{macroMethodology.title[locale]}</span>
          <h3>{locale === "es" ? "Como se lee la calificacion" : "How to read the score"}</h3>
          <p>{macroMethodology.text[locale]}</p>
        </div>
        <div className="method-scale">
          {macroMethodology.scale.map((item) => (
            <div key={item.label[locale]} className="method-scale-chip">
              {item.label[locale]}
            </div>
          ))}
        </div>
      </section>

      <section className="indicator-stack">
        {macroIndicators.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} locale={locale} />
        ))}
      </section>

      <SummaryMatrix locale={locale} />

      <section className="macro-conclusion-card">
        <div className="macro-summary-head">
          <span>{locale === "es" ? "Cierre ejecutivo" : "Executive close"}</span>
          <h3>{macroConclusion.title[locale]}</h3>
          <p>{macroConclusion.text[locale]}</p>
        </div>
        <div className="macro-conclusion-grid">
          {macroConclusion.states.map((state) => (
            <article key={state.state[locale]} className="macro-route-card compact">
              <span>{locale === "es" ? "Rol recomendado" : "Recommended role"}</span>
              <h4>{state.state[locale]}</h4>
              <p>{state.text[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="macro-references-card">
        <div className="macro-summary-head">
          <span>{locale === "es" ? "Referencias APA" : "APA references"}</span>
          <h3>{locale === "es" ? "Fuentes consolidadas" : "Consolidated references"}</h3>
          <p>
            {locale === "es"
              ? "Se mantienen visibles para exposicion, sustento academico y validacion empresarial."
              : "They remain visible for presentation, academic support and business validation."}
          </p>
        </div>
        <div className="reference-list">
          {macroReferenceList.map((reference) => (
            <p key={reference}>{reference}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
