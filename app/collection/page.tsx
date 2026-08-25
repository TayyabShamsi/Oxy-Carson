import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import Rule from "@/components/site/Rule";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES, products, type Category } from "@/lib/products";
import s from "./collection.module.css";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Loafers, boots and sneakers in full-grain leather. Made in Agra since 1995.",
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const active: Category = (CATEGORIES as readonly string[]).includes(c ?? "")
    ? (c as Category)
    : "All";

  const shown =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="shell">
      <section className={s.head}>
        <p className="numeral">The Collection</p>
        <h1 className="display display-xl" style={{ marginTop: 12 }}>
          Everything we make
        </h1>
        <p className="lede" style={{ maxWidth: 520, marginInline: "auto", marginTop: 18 }}>
          Four shapes, in full-grain leather we source ourselves. Every pair is
          finished by hand in Agra.
        </p>
      </section>

      <Rule />

      <nav className={s.filters} aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/collection" : `/collection?c=${cat}`}
            className={`label ${s.filter} ${cat === active ? s.filterActive : ""}`}
            aria-current={cat === active ? "page" : undefined}
          >
            {cat}
            <span className={s.filterCount}>
              {cat === "All"
                ? products.length
                : products.filter((p) => p.category === cat).length}
            </span>
          </Link>
        ))}
      </nav>

      <section className={s.grid}>
        {shown.map((product, i) => (
          <Reveal key={product.slug} delay={i * 80}>
            <ProductCard product={product} index={i} />
          </Reveal>
        ))}
      </section>

      {shown.length === 0 && (
        <p className="body" style={{ textAlign: "center", paddingBlock: 80 }}>
          Nothing in this category yet.
        </p>
      )}

      <div className={s.tail}>
        <Rule />
        <p className="label muted" style={{ textAlign: "center", marginTop: 20 }}>
          More shapes follow the first release
        </p>
      </div>
    </div>
  );
}
