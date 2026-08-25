import type { Metadata } from "next";
import Reveal from "@/components/site/Reveal";
import Bar from "@/components/site/Bar";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Carson — enquiries, wholesale, shipping and returns.",
};

/**
 * ⚠️ Every bracketed value below is a placeholder. Nothing here was supplied,
 *    so nothing here was invented. Replace before launch.
 */
const BLOCKS = [
  {
    numeral: "I",
    head: "Enquiries",
    lines: ["[EMAIL ADDRESS]", "[PHONE NUMBER]"],
    note: "We answer within two working days.",
  },
  {
    numeral: "II",
    head: "Wholesale",
    lines: ["[WHOLESALE EMAIL]"],
    note: "Line sheets and terms on request. We have supplied international buyers since 1995.",
  },
  {
    numeral: "III",
    head: "The workshop",
    lines: ["Carson", "[STREET ADDRESS]", "Agra, Uttar Pradesh", "India"],
    note: "Visits by appointment.",
  },
];

const POLICIES = [
  {
    head: "Shipping",
    body: "Shipping is free worldwide. Pairs are made to order and leave the workshop within [N] working days; delivery takes a further [N–N] days depending on destination. Duties are included in the price shown.",
  },
  {
    head: "Returns",
    body: "Unworn pairs may be returned within [N] days for a full refund, in the original box. Return shipping is free. If a pair does not fit, we will exchange the size rather than refund it — tell us and we will send the right one.",
  },
  {
    head: "Repairs",
    body: "We built these to be repaired. Write to us before you throw a pair away — resoling and re-finishing are usually possible, and always cheaper than replacing them.",
  },
];

export default function ContactPage() {
  return (
    <div className="shell">
      <section
        style={{
          textAlign: "center",
          paddingBlock: "clamp(34px, 5vw, 72px) clamp(28px, 4vw, 48px)",
        }}
      >
        <p className="label muted">Contact</p>
        <h1 className="display display-xl" style={{ marginTop: 12 }}>
          Talk to the workshop
        </h1>
        <p
          className="lede"
          style={{ maxWidth: 470, marginInline: "auto", marginTop: 18 }}
        >
          There is no call centre between you and the people who make these. Write,
          and someone who has held the shoe will answer.
        </p>
      </section>

      <Bar weight="xs" />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "clamp(28px, 4vw, 56px)",
          paddingBlock: "clamp(40px, 5vw, 68px)",
        }}
      >
        {BLOCKS.map((block, i) => (
          <Reveal key={block.head} delay={i * 90}>
            <span className="label muted">{block.numeral}</span>
            <h2 className="display display-s" style={{ marginTop: 10 }}>
              {block.head}
            </h2>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
              {block.lines.map((line) => (
                <span key={line} className="body" style={{ fontSize: "0.9375rem" }}>
                  {line}
                </span>
              ))}
            </div>
            <p className="label muted" style={{ marginTop: 14 }}>
              {block.note}
            </p>
          </Reveal>
        ))}
      </section>

      <Bar weight="xs" />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(28px, 4vw, 56px)",
          paddingBlock: "clamp(44px, 5vw, 72px) clamp(64px, 8vw, 110px)",
        }}
      >
        {POLICIES.map((policy, i) => (
          <Reveal key={policy.head} delay={i * 90}>
            <h2 className="label">{policy.head}</h2>
            <p className="body" style={{ marginTop: 12, fontSize: "0.9375rem" }}>
              {policy.body}
            </p>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
