import Link from "next/link";
import InView from "./in-view";

export type Crumb = { label: string; href?: string };

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  background
}: {
  crumbs: Crumb[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  background?: React.ReactNode;
}) {
  return (
    <section className="k-sub-hero">
      {background}
      <InView className="k-rv" threshold={0.1}>
        <div className="k-crumb">
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
              {i < crumbs.length - 1 ? " /" : ""}
            </span>
          ))}
        </div>
        {eyebrow ? <div className="k-eyebrow k-eyebrow-center">{eyebrow}</div> : null}
        <h1 className="k-sub-title">{title}</h1>
        {lead ? <p className="k-lead">{lead}</p> : null}
        {actions ? <div className="k-hero-actions k-center">{actions}</div> : null}
      </InView>
    </section>
  );
}
