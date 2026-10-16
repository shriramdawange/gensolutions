import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import InView from "@/components/in-view";
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
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "PROJECTS", href: "/work" }, { label: product.name.toUpperCase() }]}
          eyebrow={
            <span>
              {product.code} · {product.type}
            </span>
          }
          title={
            <>
              {product.name}
              <span className="k-accent">.</span>
            </>
          }
          lead={product.desc}
          actions={
            <>
              <div className="k-tags" style={{ justifyContent: "center" }}>
                {product.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="k-status">
                <i aria-hidden="true" />
                {product.status}
              </span>
            </>
          }
        />

        <section className="k-block">
          <div className="k-wrap">
            <InView className="k-rv">
              <div className="k-prose">
                {product.long.map((para, i) => (
                  <p key={i} className={i === 0 ? "k-prose-lead" : undefined}>
                    {para}
                  </p>
                ))}
              </div>
            </InView>

            <div className="k-cards" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              {product.focus.map((f) => (
                <article className="k-card" key={f.title}>
                  <h3 style={{ marginTop: 0 }}>{f.title}</h3>
                  <p>{f.copy}</p>
                </article>
              ))}
            </div>

            <InView className="k-rv">
              <h2 className="k-block-title">What is next.</h2>
              <ul className="k-list">
                {product.roadmap.map((step, i) => (
                  <li key={step}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    {step}
                  </li>
                ))}
              </ul>
            </InView>

            <div className="k-hero-actions" style={{ marginTop: "2.5rem" }}>
              <Link className="k-btn k-btn--solid" href="/contact">
                Know more — talk to us <span className="k-btn-arrow">↗</span>
              </Link>
              <Link className="k-btn" href="/work">
                ← All projects
              </Link>
            </div>
          </div>
        </section>

        <section className="k-block">
          <div className="k-wrap">
            <div className="k-hero-actions" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div className="k-eyebrow">Honest status</div>
                <h2 className="k-block-title" style={{ marginTop: "0.75rem" }}>
                  {product.status}.
                </h2>
              </div>
              <Link className="k-btn k-btn--solid" href="/contact">
                Discuss this initiative <span className="k-btn-arrow">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
