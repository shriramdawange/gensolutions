import Link from "next/link";
import InView from "./in-view";

export default function CtaBand() {
  return (
    <InView className="k-cta k-rv" threshold={0.3}>
      <div className="k-wrap">
        <h2 className="k-cta-title">
          <span className="k-mask">
            <span>Less theatre.</span>
          </span>
          <span className="k-mask">
            <span style={{ transitionDelay: "0.1s" }}>
              More <span className="k-display">engineering.</span>
            </span>
          </span>
        </h2>
        <p>
          Good work is a process, not a reveal. If you have a problem worth solving, we would like to hear about it.
        </p>
        <Link className="k-btn k-btn--solid" href="/start-project">
          Start a project <span className="k-btn-arrow">↗</span>
        </Link>
      </div>
    </InView>
  );
}
