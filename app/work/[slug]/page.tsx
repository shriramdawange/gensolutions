import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { products } from "@/lib/site-data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return { title: p ? `${p.name} — Project` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((x) => x.slug === slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><a href="/work">PROJECTS</a><span>/</span><span>{product.name.toUpperCase()}</span></div>
          <div className="section-kicker" style={{ marginTop: 18 }}><span>{product.code}</span> / {product.type}</div>
          <h1>{product.name}<span className="accent">.</span></h1>
          <p>{product.desc}</p>
          <div className="tag-row">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div><span className="status-pill"><i />{product.status}</span></div>
        </div>

        <section className="section-wrap" style={{ paddingBottom: 20 }}>
          {product.long.map((para, i) => (
            <p key={i} className={i === 0 ? "large-copy" : undefined} style={i === 0 ? {} : { color: "var(--muted)", fontSize: 14, lineHeight: 1.9 }}>{para}</p>
          ))}
          <div className="detail-grid">
            {product.focus.map((f) => (
              <div className="detail-cell" key={f.title}><h3>{f.title}</h3><p>{f.copy}</p></div>
            ))}
          </div>
          <h2 style={{ marginTop: 44 }}>What is next.</h2>
          <ul className="check-list">
            {product.roadmap.map((step, i) => <li key={step}><b>{String(i + 1).padStart(2, "0")}</b>{step}</li>)}
          </ul>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <a className="know-more" href="/#contact">Know more — talk to us <span>↗</span></a>
            <a className="know-more quiet" href="/work">← All projects</a>
          </div>
        </section>

        <div className="section-wrap subpage-cta">
          <div><div className="section-kicker"><span>GS</span> / HONEST STATUS</div><h2 style={{ margin: 0 }}>{product.status}.</h2></div>
          <a className="know-more" href="/#contact">Discuss this initiative <span>↗</span></a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
