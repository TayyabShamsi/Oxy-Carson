import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/site/Reveal";
import Bar from "@/components/site/Bar";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <nav className="shell" aria-label="Breadcrumb" style={{ paddingTop: 22 }}>
        <Link href="/collection" className="label muted link-underline">
          <BackArrow />
          Collection
        </Link>
      </nav>

      <ProductDetail product={product} />

      <section className="shell" style={{ paddingBottom: "clamp(64px, 8vw, 112px)" }}>
        <Bar weight="xs" />
        <h2
          className="label muted"
          style={{ textAlign: "center", marginBlock: "26px 34px" }}
        >
          Also from the workshop
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(20px, 2.4vw, 34px)",
          }}
        >
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function BackArrow() {
  return (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M15 4.5H2M5.5 1L2 4.5 5.5 8" />
    </svg>
  );
}
