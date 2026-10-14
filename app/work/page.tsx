import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { products } from "@/lib/site-data";

export const metadata: Metadata = { title: "Projects" };

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>PROJECTS</span></div>
          <h1>Ideas becoming<br /><span className="gradient-text">something real.</span></h1>
          <p>Three bets in motion — food redistribution, medical logistics and environmental intelligence. Each page shows the problem, the approach and what is next.</p>
        </div>
        <section className="work-section" id="work">
          <div className="section-wrap">
            <div className="product-list">
              {products.map((product) => (
                <article className={`product-card ${product.className}`} key={product.name}>
                  <div className="product-visual">
                    <div className="product-visual-grid" />
                    <div className="product-symbol">{product.mark}<span /></div>
                    <span className="product-index mono">{product.code}</span>
                    <span className="product-orbit orbit-a" /><span className="product-orbit orbit-b" />
                  </div>
                  <div className="product-info">
                    <div className="product-type">{product.type}</div>
                    <h3>{product.name}<span className="product-period">.</span></h3>
                    <p>{product.desc}</p>
                    <div className="tag-row">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                    <div className="product-bottom">
                      <span className="status-pill"><i />{product.status}</span>
                      <a href={`/work/${product.slug}`} aria-label={`Know more about ${product.name}`}>Know more about it <span>→</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="portfolio-note">Portfolio note: status is shown transparently; inclusion here does not imply public launch or commercial availability.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
