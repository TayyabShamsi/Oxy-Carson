import type { Metadata } from "next";
import Reveal from "@/components/site/Reveal";
import Bar from "@/components/site/Bar";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Carson — enquiries, wholesale, shipping and returns.",
};

/**
 * The workshop address and line are the real, publicly listed details of the
 * manufacturing firm in Agra. They are here because they are true, and because
 * they back up what the rest of the site claims about where these are made.
 *
 * ⚠️ Anything still [BRACKETED] was not supplied and was not invented.
 *
 * ⚠️ Before launch, get a BRAND-dedicated email and phone line. The number
 *    below reaches a factory switchboard set up for trade buyers, not a
 *    customer who has just spent £300 on a pair of boots.
 */
const BLOCKS = [
  {
    head: "Enquiries",
    lines: ["[BRAND EMAIL ADDRESS]"],
    note: "We answer within two working days.",
  },
  {
    head: "Wholesale",
    lines: ["[WHOLESALE EMAIL]", "+91 562 264 0330"],
    note: "Line sheets and terms on request. We have supplied international buyers since 1995.",
  },
  {
    head: "The workshop",
    lines: [
      "B-9, 10 & 11, EPIP",
      "Industrial Area, Shastripuram",
      "Agra 282007",
      "Uttar Pradesh, India",
    ],
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
      <section className={s.head}>
        <h1 className="display display-xl">
          Talk to the<br />workshop
        </h1>
        <p className="lede">
          There is no call centre between you and the people who make these.
          Write, and someone who has held the shoe will answer.
        </p>
      </section>

      <Bar weight="md" />

      <section className={s.blocks}>
        {BLOCKS.map((block, i) => (
          <Reveal key={block.head} delay={i * 80}>
            <Bar weight="xs" animate={false} />
            <h2 className="display display-s" style={{ marginTop: 18 }}>
              {block.head}
            </h2>
            <div className={s.lines}>
              {block.lines.map((line) => (
                <span key={line} className="body" style={{ fontSize: "0.9375rem" }}>
                  {line}
                </span>
              ))}
            </div>
            <p className="label muted" style={{ marginTop: 16 }}>
              {block.note}
            </p>
          </Reveal>
        ))}
      </section>

      <Bar weight="xs" />

      <section className={s.policies}>
        {POLICIES.map((policy, i) => (
          <Reveal key={policy.head} delay={i * 80}>
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
