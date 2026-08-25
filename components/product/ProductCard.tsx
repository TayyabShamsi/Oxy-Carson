import Link from "next/link";
import ShoeArt from "./ShoeArt";
import { formatPrice, type Product } from "@/lib/products";
import s from "./ProductCard.module.css";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) {
  const lead = product.colorways[0];

  return (
    <Link href={`/product/${product.slug}`} className={s.card}>
      <div className={s.frame}>
        {typeof index === "number" && (
          <span className={`numeral ${s.corner}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className={s.art}>
          <ShoeArt art={product.art} colorway={lead} title={`${product.name} in ${lead.name}`} />
        </div>
      </div>

      <div className={s.meta}>
        <span className={s.name}>{product.name}</span>
        <span className={s.price}>{formatPrice(product.priceGBP)}</span>
      </div>
      <p className={`label ${s.tagline}`}>{product.tagline}</p>

      <div className={s.swatches} aria-hidden="true">
        {product.colorways.map((c) => (
          <span key={c.id} className={s.swatch} style={{ background: c.swatch }} />
        ))}
      </div>
    </Link>
  );
}
