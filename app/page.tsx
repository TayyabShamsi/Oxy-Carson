import Link from "next/link";
import MaskHeading from "@/components/site/MaskHeading";
import Reveal from "@/components/site/Reveal";
import Bar from "@/components/site/Bar";
import Arrow from "@/components/site/Arrow";
import ShoeArt from "@/components/product/ShoeArt";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice, products } from "@/lib/products";
import s from "./page.module.css";

const HERO = products.find((p) => p.slug === "the-carson-low")!;
const HERO_COLORWAY = HERO.colorways.find((c) => c.id === "cognac")!;

const FACTS = ["Est. 1995", "Full-grain leather", "SA-8000 certified", "Agra, India"];

const LEDGER = [
  { key: "Founded", value: "1995" },
  { key: "Design", value: "Italian house" },
  { key: "Leather", value: "Our own tanneries" },
  { key: "Standard", value: "SA-8000 audited" },
];

const CRAFT = [
  {
    title: "We buy the hide, not the shoe",
    body: "Most brands at this price buy finished shoes and put a logo on the tongue. We source full-grain leather ourselves, through a tannery network we have used for decades, and we reject what does not meet the standard before it is ever cut.",
  },
  {
    title: "A machine cannot judge tension",
    body: "Most of the work is machine work, and we will not pretend otherwise. But the parts that decide whether a shoe holds its shape in a year — the apron, the collar, the finishing at the seams — are done by hand, by people who have done nothing else for twenty years.",
  },
  {
    title: "Audited, not asserted",
    body: "Our workshop is SA-8000 certified and subject to ethical and technical audit. That is a document somebody else signs, not a promise we make about ourselves. It is the difference between a claim and a fact.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className={`shell ${s.hero}`}>
        <div className={s.heroType}>
          <MaskHeading
            className="display display-hero"
            lines={["Made by the", "people who", "make it."]}
            baseDelay={120}
            step={95}
          />

          <Reveal delay={480} className={s.heroMeta}>
            <p className="lede">
              Carson has made leather footwear in Agra since 1995 — for thirty
              years, under other people&rsquo;s names.
            </p>
            <Link href="/collection" className="label link-underline">
              Explore the collection
              <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className={s.heroRule}>
          <Bar weight="lg" bleed animate={false} />
          <div className={`label ${s.heroFacts}`}>
            {FACTS.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>

        {/* the crossing: the shoe breaks the band */}
        <div className={s.stage}>
          <div className={s.band} aria-hidden="true" />
          <div className={s.heroArt}>
            <ShoeArt
              art={HERO.art}
              colorway={HERO_COLORWAY}
              title={`${HERO.name} in ${HERO_COLORWAY.name}`}
              shadow={false}
            />
          </div>
          <div className={`label ${s.stageCaption}`}>
            <span className={s.capName}>{HERO.name}</span>
            <span className="muted">
              {HERO_COLORWAY.name} full-grain — {formatPrice(HERO.priceGBP)}
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- collection */}
      <section className="shell section">
        <Reveal className={s.sectionHead}>
          <div>
            <Bar weight="xs" animate={false} />
            <h2 className="display display-xl" style={{ marginTop: 22 }}>
              Four shoes<br />to begin with
            </h2>
          </div>
          <div>
            <p className="body">
              We would rather make four things properly than forty badly. Each
              one is a shape this workshop has made for other people for years,
              built now to our own specification.
            </p>
            <div className={s.headActions} style={{ marginTop: 22 }}>
              <Link href="/collection" className="label link-underline">
                All four
                <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className={s.grid}>
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- story */}
      <section className="inverted">
        <Bar weight="lg" bleed animate={false} />
        <div className="shell section">
          <div className={s.argue}>
            <Reveal>
              <p className="label muted">Since 1995</p>
              <h2 className="display display-xl" style={{ marginTop: 18 }}>
                For thirty years, our work left in someone else&rsquo;s box.
              </h2>
              <p className={s.pull}>You have probably already worn our work.</p>
              <p className="body">
                Carson began as a workshop that made footwear for other
                people&rsquo;s labels — exported to Europe, the United States
                and across Asia, to a standard set by buyers who did not accept
                excuses. We are still that workshop. The only thing that has
                changed is whose name goes on the box.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Nearly every new footwear brand is a marketing team that found a
                factory. We are the factory.
              </p>
              <div style={{ marginTop: 34 }}>
                <Link href="/workshop" className="label link-underline">
                  Inside the workshop
                  <Arrow />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className={s.ledger}>
                {LEDGER.map((row) => (
                  <div key={row.key} className={s.ledgerRow}>
                    <span className="label muted">{row.key}</span>
                    <span className={s.ledgerVal}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- craft */}
      <section className="shell section">
        <Reveal>
          <Bar weight="md" animate={false} />
          <h2 className="display display-xl" style={{ marginTop: 24, marginBottom: 44 }}>
            Three things worth knowing
          </h2>
        </Reveal>

        <div className={s.craft}>
          {CRAFT.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className={s.craftItem}>
              <Bar weight="xs" />
              <h3 className="display display-s" style={{ marginTop: 4 }}>
                {item.title}
              </h3>
              <p className="body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- closing */}
      <section className="shell section-tight">
        <Bar weight="md" />
        <Reveal className={s.closing} delay={80}>
          <h2 className="display display-l" style={{ marginTop: 34 }}>
            Italian design. Indian hands.<br />One name on the box.
          </h2>
          <Link href="/collection" className="btn label" style={{ marginTop: 34 }}>
            Shop the collection
            <Arrow />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
