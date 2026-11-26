import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getCareerOpenings } from "@/lib/careers";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title:"Careers", description:"Explore current internship openings at DAVAN Technologies." };

function formatDate(value:string) {
  return new Date(value + "T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
}

export default async function CareersPage() {
  const openings = await getCareerOpenings();
  const total = openings.reduce((sum, opening) => sum + opening.vacancies, 0);
  return <>
    <SiteHeader />
    <main id="top" className="davan-careers">
      <section className="section-wrap subpage-hero careers-hero">
        <div className="crumb"><a href="/">HOME</a><span>/</span><span>CAREERS</span></div>
        <div className="career-kicker"><span /> DAVAN TECHNOLOGIES · CAREERS 2026</div>
        <h1>Make your next<br /><span className="gradient-text">move matter.</span></h1>
        <p>Join a team building technology, products and operational systems. We are looking for people who bring hands-on experience, curiosity and ownership.</p>
        <div className="career-stats">
          <div><strong>{total}</strong><span>OPEN POSITIONS</span></div>
          <div><strong>{openings.length}</strong><span>ROLE TYPES</span></div>
          <div><strong>4 HRS</strong><span>PER DAY</span></div>
          <div><strong>05 DEC</strong><span>START DATE · 2026</span></div>
        </div>
      </section>
      <section className="section-wrap career-openings">
        <div className="career-section-heading">
          <div><span className="section-kicker">01 / OPEN POSITIONS</span><h2>Find your place<br />on the team.</h2></div>
          <p>Each role has its own brief, expectations and application form. Select the position that best matches your experience.</p>
        </div>
        <div className="career-opening-list">
          {openings.map((opening,index)=><article className="career-opening-card" key={opening.id}>
            <div className="career-opening-number">0{index+1}</div>
            <div className="career-opening-copy">
              <span className="career-role-label">INTERNSHIP · {opening.vacancies} {opening.vacancies===1?"VACANCY":"VACANCIES"}</span>
              <h3>{opening.title}</h3><p>{opening.summary}</p>
              <div className="career-tags">{opening.skills.slice(0,5).map(skill=><span key={skill}>{skill}</span>)}</div>
            </div>
            <div className="career-opening-meta"><span>{opening.hours_per_day} HOURS / DAY</span><span>STARTS {formatDate(opening.start_date)}</span><a href={"/careers/"+opening.slug}>View role <b>↗</b></a></div>
          </article>)}
        </div>
      </section>
      <section className="section-wrap career-note-section">
        <div className="career-note-card">
          <span className="section-kicker">02 / BEFORE YOU APPLY</span>
          <h2>Experience matters.<br /><span className="gradient-text">Ownership matters more.</span></h2>
          <p>These openings are intended for candidates with relevant hands-on experience. Include real project work, portfolio links or GitHub repositories in your resume so the team can review your application in context.</p>
          <a className="button button-primary" href="#top">Back to positions ↑</a>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
