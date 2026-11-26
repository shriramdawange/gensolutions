import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CareerApplicationForm from "@/components/career-application-form";
import { getCareerOpening } from "@/lib/careers";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug:string }> };

export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug}=await params; const opening=await getCareerOpening(slug);
  return {title:opening ? opening.title : "Open role"};
}

export default async function CareerRolePage({params}:Props) {
  const {slug}=await params; const role=await getCareerOpening(slug);
  if (!role) notFound();
  return <>
    <SiteHeader />
    <main id="top" className="davan-careers">
      <section className="section-wrap career-role-hero">
        <div className="crumb"><a href="/">HOME</a><span>/</span><a href="/careers">CAREERS</a><span>/</span><span>{role.slug.toUpperCase()}</span></div>
        <a className="career-back-link" href="/careers">← All openings</a>
        <span className="career-kicker"><span /> DAVAN TECHNOLOGIES · INTERNSHIP</span>
        <h1>{role.title}</h1><p>{role.summary}</p>
        <div className="career-role-meta"><span>{role.vacancies} {role.vacancies===1?"VACANCY":"VACANCIES"}</span><span>{role.hours_per_day} HOURS / DAY</span><span>START DATE · 05 DECEMBER 2026</span></div>
      </section>
      {role.slug==="management-intern" && <section className="section-wrap career-poster-wrap">
        <img className="career-management-poster" src="/davan-management-intern.webp" alt="DAVAN Technologies is hiring a Management Intern: one vacancy, four hours per day, starting 05 December 2026." />
      </section>}
      <section className="section-wrap career-role-body">
        <div className="career-role-description">
          <span className="section-kicker">01 / THE ROLE</span><h2>What you will<br />work on.</h2><p>{role.description}</p>
          <h3>Responsibilities</h3><ul>{role.responsibilities.map(item=><li key={item}>{item}</li>)}</ul>
          <h3>What we are looking for</h3><ul>{role.requirements.map(item=><li key={item}>{item}</li>)}</ul>
          <h3>Relevant skills</h3><div className="career-tags">{role.skills.map(skill=><span key={skill}>{skill}</span>)}</div>
        </div>
        <aside className="career-application-aside">
          <span className="section-kicker">02 / APPLICATION</span><h2>Apply for<br /><span className="gradient-text">this role.</span></h2>
          <p>Share your details and a PDF resume. Skills are suggested from your resume and remain editable before submission.</p>
          <a className="button button-primary" href="#apply-form">Start application ↓</a>
        </aside>
      </section>
      <section className="section-wrap career-form-section" id="apply-form"><CareerApplicationForm opening={role} /></section>
    </main>
    <SiteFooter />
  </>;
}
