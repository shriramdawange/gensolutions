"use client";

const team = [
  {
    number: "01",
    name: "SHRIRAM DAWANGE",
    role: "FOUNDER & LEAD ENGINEER",
    initials: "SD",
    accent: "green",
    founder: true,
  },
  {
    number: "02",
    name: "SUDHANSHU YADAV",
    role: "ENGINEERING",
    initials: "SY",
    accent: "cyan",
  },
  {
    number: "03",
    name: "DEVANSHU DAWARE",
    role: "DESIGN & PRODUCT",
    initials: "DD",
    accent: "green",
  },
  {
    number: "04",
    name: "CHINMAY RAKHONDE",
    role: "ENGINEERING & OPERATIONS",
    initials: "CR",
    accent: "cyan",
  },
];

export default function TeamSection() {
  return (
    <section className="gs-team" id="team" aria-labelledby="gs-team-title">
      <div className="gs-team__top">
        <span className="gs-team__brand">
          {"< GENERATIVE_SOLUTIONS />"}
        </span>
        <span className="gs-team__index">PEOPLE / 001—004</span>
      </div>

      <header className="gs-team__heading">
        <span className="gs-team__number">03</span>
        <h2 id="gs-team-title">
          THE <span>TEAM</span>
        </h2>
        <p>Different disciplines. One engineering mindset.</p>
      </header>

      <div className="gs-team__grid">
        {team.map((member) => (
          <article
            className={`gs-team__card gs-team__card--${member.accent}${"founder" in member && member.founder ? " gs-team__card--founder" : ""}`}
            key={member.number}
          >
            <div className="gs-team__portrait">
              <div className="gs-team__portrait-grid" />

              <span className="gs-team__cross" aria-hidden="true">
                +
              </span>

              <span className="gs-team__portrait-index">
                GS / {member.number}
              </span>

              {"founder" in member && member.founder && (
                <span className="gs-team__founder-tag">★ FOUNDER</span>
              )}

              {/*
                Replace this initials placeholder with a real portrait:
                <Image src="/team/shriram.jpg" ... />
                Do not use placeholders as actual employee photos.
              */}
              <div
                className="gs-team__initials"
                aria-label={`Portrait placeholder for ${member.name}`}
              >
                {member.initials}
              </div>

              <span className="gs-team__corner" aria-hidden="true">
                GEN / 01
              </span>
            </div>

            <div className="gs-team__identity">
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              {"founder" in member && member.founder ? (
                <a className="gs-team__founder-link" href="/founder" aria-label={`View ${member.name} portfolio`}>PORTFOLIO <span aria-hidden="true">→</span></a>
              ) : (
                <span className="gs-team__arrow" aria-hidden="true">
                  ↗
                </span>
              )}
            </div>

            <div className="gs-team__card-line" />
          </article>
        ))}
      </div>

      <footer className="gs-team__footer">
        <span>BUILT ON CURIOSITY.</span>
        <span className="gs-team__footer-mark">✳</span>
        <span>CONNECTED BY ENGINEERING.</span>
      </footer>
    </section>
  );
}
