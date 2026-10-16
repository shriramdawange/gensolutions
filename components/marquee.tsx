export default function Marquee({
  items,
  className = "",
  duration = 30
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  return (
    <div className={`k-marquee ${className}`} aria-hidden="true">
      <div className="k-marquee-track" style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((half) => (
          <div className="k-marquee-group" key={half}>
            {items.map((item, i) => (
              <span key={`${item}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}>
                <span>{item}</span>
                <span className="k-mark">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
