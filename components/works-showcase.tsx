import Link from "next/link";
import InView from "./in-view";
import { products } from "@/lib/site-data";

function photo(index: number, media: string[], position = "center") {
  if (!media.length) return undefined;
  const src = media[index % media.length];
  return { backgroundImage: `url("${src}")`, backgroundPosition: position } as React.CSSProperties;
}

export default function WorksShowcase() {
  return (
    <div className="k-showcase">
      {products.map((p) => (
        <InView className="k-showcase-item" key={p.slug} threshold={0.12}>
          <div className="k-showcase-rule" />
          <div className="k-showcase-head">
            <div>
              <span className="k-showcase-tag">{p.type}</span>
              <h3 className="k-showcase-name">
                {p.name}
                <span className="k-green">.</span>
              </h3>
            </div>
            <Link className="k-showcase-view" href={`/work/${p.slug}`} data-cursor="View case">
              View project <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="k-showcase-media">
            <Link
              className={`k-tile k-showcase-main k-tile--${p.className}${p.media.length ? " k-tile--photo" : ""}`}
              href={`/work/${p.slug}`}
              aria-label={`${p.name} — view case study`}
            >
              <span className="k-tile-photo" style={photo(0, p.media)} aria-hidden="true" />
              <span className="k-tile-scrim" aria-hidden="true" />
              <span className="k-tile-grid" aria-hidden="true" />
              <span className="k-tile-face" aria-hidden="true">
                <span className="k-tile-mark">{p.mark}</span>
              </span>
              <span className="k-tile-code">{p.code}</span>
            </Link>
            <span
              className={`k-tile k-showcase-side k-tile--side k-tile--${p.className}${p.media.length ? " k-tile--photo" : ""}`}
              aria-hidden="true"
            >
              <span className="k-tile-photo" style={photo(1, p.media, "center 30%")} />
              <span className="k-tile-scrim" />
              <span className="k-tile-grid" />
              <span className="k-tile-status">
                <i />
                {p.status}
              </span>
            </span>
            <div className="k-showcase-gallery" aria-hidden="true">
              {p.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={tag}
                  className={`k-tile k-tile--${p.className}${p.media.length ? " k-tile--photo" : ""}`}
                >
                  <span className="k-tile-photo" style={photo(i + 2, p.media, i % 2 ? "center 65%" : "center")} />
                  <span className="k-tile-scrim" />
                  <span className="k-tile-grid" />
                  <span className="k-tile-caption">{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </InView>
      ))}
    </div>
  );
}
