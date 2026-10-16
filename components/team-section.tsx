import Link from "next/link";
import { team } from "@/lib/site-data";

export default function TeamSection() {
  return (
    <section className="k-team" id="team" aria-labelledby="gs-team-title">
      <div className="k-wrap">
        <header className="k-block-head">
          <div className="k-eyebrow">People / 001 — 004</div>
          <h2 id="gs-team-title" className="k-block-title">
            The <span className="k-display">team.</span>
          </h2>
          <p>Different disciplines. One engineering mindset.</p>
        </header>

        <div className="k-roster">
          {team.map((member) => {
            const isFounder = member.role.includes("FOUNDER");
            return (
              <article className={`k-roster-row${isFounder ? " is-founder" : ""}`} key={member.number}>
                <span className="k-roster-num">{member.number}</span>
                <h3 className="k-roster-name">{member.name}</h3>
                <span className="k-roster-role">{member.role}</span>
                {isFounder ? (
                  <Link className="k-roster-link" href="/founder" aria-label={`View ${member.name} portfolio`}>
                    Portfolio
                  </Link>
                ) : (
                  <span className="k-roster-arrow" aria-hidden="true">
                    ↗
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <footer className="k-team-foot">
          <span>BUILT ON CURIOSITY.</span>
          <span className="k-mark">✳</span>
          <span>CONNECTED BY ENGINEERING.</span>
        </footer>
      </div>
    </section>
  );
}
