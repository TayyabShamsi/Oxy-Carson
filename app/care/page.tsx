import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import Rule from "@/components/site/Rule";
import { SIZES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sizing & Care",
  description:
    "How Carson shoes fit, and how to keep full-grain leather for a decade rather than a season.",
};

const CARE = [
  {
    numeral: "I",
    title: "Rest them",
    body: "Do not wear the same pair two days running. Leather absorbs a surprising amount of moisture in a day and needs the next one to give it back. A pair worn every other day lasts more than twice as long as a pair worn daily — this is the single cheapest thing you can do for them.",
  },
  {
    numeral: "II",
    title: "Tree them",
    body: "Cedar shoe trees, put in while the shoe is still warm. They pull the creases flat as the leather dries and stop the toe curling upward. This matters more than polish and almost nobody does it.",
  },
  {
    numeral: "III",
    title: "Brush, then cream",
    body: "A horsehair brush after each wear takes off the dust that dries leather out. Twice a year, a neutral or matching cream — not wax — worked in and left overnight. Wax builds a shell and cracks; cream feeds the hide.",
  },
  {
    numeral: "IV",
    title: "Resole them",
    body: "A worn sole is not the end of a shoe, it is a service. Write to us before you replace a pair; in most cases we can bring them back for a fraction of what a new pair costs.",
  },
];

export default function CarePage() {
  return (
    <div className="shell">
      <section
        style={{
          textAlign: "center",
          paddingBlock: "clamp(34px, 5vw, 72px) clamp(28px, 4vw, 48px)",
        }}
      >
        <p className="numeral">Sizing &amp; Care</p>
        <h1 className="display display-xl" style={{ marginTop: 12 }}>
          Made to be kept
        </h1>
        <p
          className="lede"
          style={{ maxWidth: 500, marginInline: "auto", marginTop: 18 }}
        >
          A full-grain shoe that is looked after outlasts eight pairs that are
          not. None of this is difficult.
        </p>
      </section>

      <Rule />

      {/* ------------------------------------------------------------- sizing */}
      <section className="section-tight">
        <Reveal>
          <div style={{ maxWidth: 620, marginInline: "auto", textAlign: "center" }}>
            <h2 className="display display-m">Sizing</h2>
            <p className="body" style={{ marginTop: 14 }}>
              Our lasts run true to size unless the product page says otherwise.
              Leather stretches across the width and not the length, so choose
              the length you need and let the width come to you over the first
              fortnight.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="scroll-x" style={{ marginTop: 32 }}>
            <table
              style={{
                width: "100%",
                minWidth: 520,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    className="label muted"
                    style={{
                      textAlign: "left",
                      paddingBlock: 12,
                      borderBottom: "1px solid var(--rule-strong)",
                      fontWeight: 400,
                    }}
                  >
                    UK
                  </th>
                  {SIZES.map((s) => (
                    <th
                      key={s.uk}
                      className="label"
                      style={{
                        paddingBlock: 12,
                        borderBottom: "1px solid var(--rule-strong)",
                        fontWeight: 400,
                      }}
                    >
                      {s.uk}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="label muted"
                    style={{ paddingBlock: 14, borderBottom: "1px solid var(--rule)" }}
                  >
                    EU
                  </td>
                  {SIZES.map((s) => (
                    <td
                      key={s.uk}
                      className="label"
                      style={{
                        textAlign: "center",
                        paddingBlock: 14,
                        borderBottom: "1px solid var(--rule)",
                      }}
                    >
                      {s.eu}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="label muted" style={{ paddingBlock: 14 }}>
                    US
                  </td>
                  {SIZES.map((s) => (
                    <td
                      key={s.uk}
                      className="label"
                      style={{ textAlign: "center", paddingBlock: 14 }}
                    >
                      {Number(s.uk) + 1}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <Rule />

      {/* --------------------------------------------------------------- care */}
      <section className="section">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(34px, 4vw, 54px)" }}>
            <p className="numeral">Care</p>
            <h2 className="display display-l" style={{ marginTop: 12 }}>
              Four habits
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(28px, 3.4vw, 52px)",
          }}
        >
          {CARE.map((item, i) => (
            <Reveal key={item.numeral} delay={i * 90}>
              <span className="numeral">{item.numeral}</span>
              <h3 className="display display-s" style={{ marginTop: 10 }}>
                {item.title}
              </h3>
              <p className="body" style={{ marginTop: 12, fontSize: "0.9375rem" }}>
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p style={{ textAlign: "center", marginTop: "clamp(40px, 5vw, 64px)" }}>
            <Link href="/contact" className="label link-underline">
              Ask us about a repair
              <svg width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M0 4.5h13M9.5 1l3.5 3.5-3.5 3.5" />
              </svg>
            </Link>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
