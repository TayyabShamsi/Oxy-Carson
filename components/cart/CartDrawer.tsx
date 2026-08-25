"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import ShoeArt from "@/components/product/ShoeArt";
import { formatPrice, getProduct } from "@/lib/products";
import s from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count } = useCart();

  return (
    <>
      <div
        className={`${s.scrim} ${isOpen ? s.scrimOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`${s.panel} ${isOpen ? s.panelOpen : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: true } : {})}
      >
        <div className={s.head}>
          <span className="label">
            Your bag {count > 0 ? `(${count})` : ""}
          </span>
          <button type="button" className={s.close} onClick={close} aria-label="Close bag">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M1 1l13 13M14 1L1 14" />
            </svg>
          </button>
        </div>

        <div className={s.body}>
          {lines.length === 0 ? (
            <div className={s.empty}>
              <p className="body">Your bag is empty.</p>
              <Link href="/collection" className="label link-underline" style={{ marginTop: 20 }} onClick={close}>
                View the collection
                <Arrow />
              </Link>
            </div>
          ) : (
            <ul>
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                const colorway =
                  product.colorways.find((c) => c.id === line.colorwayId) ??
                  product.colorways[0];

                return (
                  <li key={line.id} className={s.line}>
                    <div className={s.thumb}>
                      <ShoeArt art={product.art} colorway={colorway} shadow={false} />
                    </div>
                    <div>
                      <div className={s.lineTop}>
                        <Link href={`/product/${product.slug}`} className={s.name} onClick={close}>
                          {product.name}
                        </Link>
                        <span style={{ fontVariantNumeric: "tabular-nums" }}>
                          {formatPrice(product.priceGBP * line.qty)}
                        </span>
                      </div>
                      <div className={`label ${s.meta}`}>
                        {colorway.name} · UK {line.size}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className={s.qty}>
                          <button
                            type="button"
                            className={s.qtyBtn}
                            onClick={() => setQty(line.id, line.qty - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <svg width="9" height="1" viewBox="0 0 9 1" stroke="currentColor" strokeWidth="1">
                              <path d="M0 .5h9" />
                            </svg>
                          </button>
                          <span className={s.qtyNum}>{line.qty}</span>
                          <button
                            type="button"
                            className={s.qtyBtn}
                            onClick={() => setQty(line.id, line.qty + 1)}
                            disabled={line.qty >= 10}
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <svg width="9" height="9" viewBox="0 0 9 9" stroke="currentColor" strokeWidth="1">
                              <path d="M4.5 0v9M0 4.5h9" />
                            </svg>
                          </button>
                        </div>
                        <button
                          type="button"
                          className={`label ${s.removeBtn}`}
                          onClick={() => remove(line.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className={s.foot}>
            <div className={s.totalRow}>
              <span className="label">Subtotal</span>
              <span className={s.total}>{formatPrice(subtotal)}</span>
            </div>
            <button type="button" className="btn label" disabled>
              Checkout
            </button>
            <p className={`label ${s.note}`}>
              Checkout opens with the first release
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function Arrow() {
  return (
    <svg width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 4.5h13M9.5 1l3.5 3.5-3.5 3.5" />
    </svg>
  );
}
