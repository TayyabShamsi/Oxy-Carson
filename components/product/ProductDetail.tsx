"use client";

import { useState } from "react";
import ShoeArt from "./ShoeArt";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, SIZES, type Product } from "@/lib/products";
import s from "./ProductDetail.module.css";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [colorwayId, setColorwayId] = useState(product.colorways[0].id);
  const [size, setSize] = useState<string | null>(null);
  const [openPanel, setOpenPanel] = useState<string | null>("details");

  const colorway =
    product.colorways.find((c) => c.id === colorwayId) ?? product.colorways[0];

  const panels = [
    {
      id: "details",
      title: "Materials & making",
      content: (
        <div className={s.bullets}>
          {product.details.map((d) => (
            <div key={d} className={s.bullet}>
              <span className={s.bulletTick} aria-hidden="true" />
              <span className="body" style={{ fontSize: "0.9063rem" }}>
                {d}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "spec",
      title: "Specification",
      content: (
        <div>
          {product.construction.map((row) => (
            <div key={row.label} className={s.specRow}>
              <span className="label muted">{row.label}</span>
              <span className="body" style={{ fontSize: "0.9063rem", textAlign: "right" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "fit",
      title: "Sizing & care",
      content: (
        <p className="body" style={{ fontSize: "0.9063rem" }}>
          {product.construction[0]?.value.includes("half size")
            ? "This last runs roomy — consider a half size down. "
            : "This last runs true to size. "}
          Leather stretches across the width, not the length, so buy the length
          you need and let the fit come to you. Keep them on cedar trees, brush
          them after wear, and cream them twice a year.
        </p>
      ),
    },
  ];

  return (
    <div className={`shell ${s.wrap}`}>
      {/* ------------------------------------------------------------ gallery */}
      <div className={s.gallery}>
        <div className={s.stage}>
          <span className={`label muted ${s.stageTag}`}>{product.category}</span>
          <div className={s.stageArt} key={colorway.id}>
            <ShoeArt
              art={product.art}
              colorway={colorway}
              title={`${product.name} in ${colorway.name}`}
            />
          </div>
          <span className={`label ${s.stageNote}`}>Agra, India</span>
        </div>
      </div>

      {/* --------------------------------------------------------------- info */}
      <div className={s.info}>
        <p className="label muted">{product.tagline}</p>
        <h1 className={`display display-l ${s.name}`}>{product.name}</h1>

        <div className={s.priceRow}>
          <span className={s.price}>{formatPrice(product.priceGBP)}</span>
          <span className="label muted">Includes duties</span>
        </div>

        <p className={`body ${s.desc}`}>{product.description}</p>

        {/* colourway */}
        <div className={s.block}>
          <div className={s.blockHead}>
            <span className="label">Colour</span>
            <span className="label muted">{colorway.name}</span>
          </div>
          <div className={s.swatches} role="radiogroup" aria-label="Colour">
            {product.colorways.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={c.id === colorway.id}
                aria-label={c.name}
                title={c.name}
                className={`${s.swatch} ${c.id === colorway.id ? s.swatchActive : ""}`}
                style={{ background: c.swatch }}
                onClick={() => setColorwayId(c.id)}
              />
            ))}
          </div>
        </div>

        {/* size */}
        <div className={s.block}>
          <div className={s.blockHead}>
            <span className="label">Size</span>
            <span className="label muted">UK / EU</span>
          </div>
          <div className={s.sizes} role="radiogroup" aria-label="Size">
            {SIZES.map((sz) => (
              <button
                key={sz.uk}
                type="button"
                role="radio"
                aria-checked={size === sz.uk}
                className={`label ${s.size} ${size === sz.uk ? s.sizeActive : ""}`}
                onClick={() => setSize(sz.uk)}
              >
                {sz.uk}
                <span className={s.sizeEu}>EU {sz.eu}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={s.actions}>
          <button
            type="button"
            className={`btn label ${s.addBtn}`}
            disabled={!size}
            onClick={() => size && add(product.slug, colorway.id, size)}
          >
            {size ? "Add to bag" : "Select a size"}
          </button>
          <p className={`label ${s.hint}`}>
            Free shipping and returns · Made to order in Agra
          </p>
        </div>

        {/* accordion */}
        <div className={s.acc}>
          {panels.map((panel) => {
            const open = openPanel === panel.id;
            return (
              <div
                key={panel.id}
                className={`${s.accItem} ${open ? s.accOpen : ""}`}
              >
                <button
                  type="button"
                  className={s.accBtn}
                  aria-expanded={open}
                  onClick={() => setOpenPanel(open ? null : panel.id)}
                >
                  <span className="label">{panel.title}</span>
                  <span className={s.accIcon} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>
                <div className={`${s.accPanel} ${open ? s.accPanelOpen : ""}`}>
                  <div className={s.accInner}>
                    <div className={s.accBody}>{panel.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
