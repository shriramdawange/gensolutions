import InView from "./in-view";

export default function QuoteBand() {
  return (
    <InView className="k-quote k-rv" threshold={0.35}>
      <div className="k-wrap">
        <p className="k-quote-line">
          <span className="k-mask">
            <span>
              We bring a builder&rsquo;s mindset <span className="k-quote-mark">✳</span>
            </span>
          </span>
          <span className="k-mask">
            <span style={{ transitionDelay: "0.1s" }}>to hard problems —</span>
          </span>
          <span className="k-mask">
            <span style={{ transitionDelay: "0.2s" }}>
              engineering with <span className="k-display">intent.</span>
            </span>
          </span>
        </p>
      </div>
    </InView>
  );
}
