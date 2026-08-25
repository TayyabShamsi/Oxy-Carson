import Link from "next/link";
import MaskHeading from "@/components/site/MaskHeading";
import Reveal from "@/components/site/Reveal";
import Rule from "@/components/site/Rule";
import ShoeArt from "@/components/product/ShoeArt";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice, products } from "@/lib/products";
import s from "./page.module.css";

const HERO = products.find((p) => p.slug === "the-carson-low")!;
const HERO_COLORWAY = HERO.colorways.find((c) => c.id === "cognac")!;

const FACTS = [
  "Est. 1995",
  "Full-grain leather",
  "SA-8000 certified",
  "Made in Agra, India",
];

const LEDGER = [
  { key: "Founded", value: "1995" },
  { key: "Design", value: "Italian house, seasonal" },
  { key: "Leather", value: "Our own tanneries" },
  { key: "Standard", value: "SA-8000 audited" },
];

const CRAFT = [
  {
    numeral: "I",
    title: "We buy the hide, not the shoe",
    body: "Most brands at this price buy finished shoes and put a logo on the tongue. We source full-grain leather ourselves, through a tannery network we have used for decades, and we reject what does not meet the standard before it is ever cut.",
  },
  {
    numeral: "II",
    title: "A machine cannot judge tension",
    body: "Most of the work is machine work, and we will not pretend otherwise. But the parts that decide whether a shoe holds its shape in a year — the apron, the collar, the finishing at the seams — are done by hand, by people who have done nothing else for twenty years.",
  },
  {
    numeral: "III",
    title: "Audited, not asserted",
    body: "Our workshop is SA-8000 certified and subject to ethical and technical audit. That is a document somebody else signs, not a promise we make about ourselves. It is the difference between a claim and a fact.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className={`shell ${s.hero}`}>
        <p className="numeral">The First Collection</p>

        <MaskHeading
          className="display display-xl"
          lines={["The maker", "steps forward."]}
          baseDelay={140}
        />

        <Reveal delay={520}>
          <p className={`lede ${s.heroLede}`}>
            Since 1995 we have made leather footwear for brands across Europe,
            the US and Asia. The same bench, the same hands — now under our own
            name.
          </p>
        </Reveal>

        <div className={s.heroArt}>
          <ShoeArt
            art={HERO.art}
            colorway={HERO_COLORWAY}
            title={`${HERO.name} in ${HERO_COLORWAY.name}`}
          />
        </div>

        <Reveal delay={80}>
          <div className={s.heroCaption}>
            <span className={s.capName}>{HERO.name}</span>
            <span className={s.capDash} />
            <span className="label muted">{HERO_COLORWAY.name} full-grain</span>
            <span className={s.capDash} />
            <span className="muted">{formatPrice(HERO.priceGBP)}</span>
          </div>

          <div className={s.heroCta}>
            <Link href="/collection" className="label link-underline">
              Explore the collection
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>

      <div className="shell">
        <Rule />
        <div className={`label ${s.facts}`}>
          {FACTS.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- collection */}
      <section className="shell section">
        <Reveal className={s.head}>
          <p className="numeral">The Collection</p>
          <h2 className="display display-l">Four shoes to begin with</h2>
          <p className={`body ${s.headWide}`}>
            We would rather make four things properly than forty badly. Each one
            is a shape this workshop has made for other people for years, built
            now to our own specification.
          </p>
        </Reveal>

        <div className={s.grid}>
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- story */}
      <section className={s.story}>
        <div className="shell section">
          <div className={s.storyInner}>
            <Reveal>
              <div className={s.storyCopy}>
                <p className="numeral">Since 1995</p>
                <h2 className="display display-l" style={{ marginTop: 14 }}>
                  For thirty years, our work left in someone else&rsquo;s box.
                </h2>
                <p className={s.pull}>
                  You have probably already worn our work.
                </p>
                <p className="body">
                  Carson began as a workshop that made footwear for other
                  people&rsquo;s labels — exported to Europe, the United States
                  and across Asia, to a standard set by buyers who did not
                  accept excuses. We are still that workshop. The only thing
                  that has changed is whose name goes on the box.
                </p>
                <p className="body" style={{ marginTop: 18 }}>
                  Nearly every new footwear brand is a marketing team that found
                  a factory. We are the factory.
                </p>
                <div style={{ marginTop: 30 }}>
                  <Link href="/workshop" className="label link-underline">
                    Inside the workshop
                    <Arrow />
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className={s.ledger}>
                {LEDGER.map((row) => (
                  <div key={row.key} className={s.ledgerRow}>
                    <span className={`label ${s.ledgerKey}`}>{row.key}</span>
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
        <Reveal className={s.head}>
          <p className="numeral">How it is made</p>
          <h2 className="display display-l">Three things worth knowing</h2>
        </Reveal>

        <div className={s.craft}>
          {CRAFT.map((item, i) => (
            <Reveal key={item.numeral} delay={i * 110} className={s.craftItem}>
              <Rule className={s.craftRule} />
              <span className="numeral">{item.numeral}</span>
              <h3 className="display display-s">{item.title}</h3>
              <p className="body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- closing */}
      <section className="shell section-tight">
        <Reveal className={s.closing}>
          <h2 className="display display-m">
            Italian design. Indian hands. One name on the box.
          </h2>
          <p className="body" style={{ marginTop: 16 }}>
            Designed each season with an Italian design house, cut from leather
            we source ourselves, and finished in Agra — the largest footwear
            city in India, and the reason this shoe costs what it does rather
            than three times more.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/collection" className="btn label">
              Shop the collection
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Arrow() {
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
      <path d="M0 4.5h13M9.5 1l3.5 3.5-3.5 3.5" />
    </svg>
  );
}
