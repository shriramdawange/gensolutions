import InView from "./in-view";

const METRICS = [
  { value: "04", label: "Disciplines", desc: "AI, engineering, research and product under one roof." },
  { value: "03", label: "Products", desc: "Initiatives in development, research and pilot." },
  { value: "06", label: "Domains", desc: "Healthcare, food, climate, logistics and beyond." },
  { value: "12", label: "Years", desc: "Combined engineering and product experience." }
];

export default function Metrics() {
  return (
    <section className="k-section k-metrics" aria-label="By the numbers">
      <div className="k-wrap">
        <InView className="k-metrics-grid" threshold={0.3}>
          {METRICS.map((m, i) => (
            <div className="k-metric" key={m.label}>
              <div className="k-metric-value">
                <div className="k-metric-rise" style={{ transitionDelay: `${i * 0.12}s` }}>
                  {m.value}
                  <span className="k-metric-label">{m.label}</span>
                </div>
              </div>
              <p className="k-metric-desc">{m.desc}</p>
            </div>
          ))}
        </InView>
      </div>
    </section>
  );
}
