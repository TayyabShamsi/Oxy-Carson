import type { Metadata } from "next";
import Link from "next/link";
import MaskHeading from "@/components/site/MaskHeading";
import Reveal from "@/components/site/Reveal";
import Rule from "@/components/site/Rule";
import s from "./workshop.module.css";

export const metadata: Metadata = {
  title: "The Workshop",
  description:
    "Carson has made leather footwear in Agra since 1995 — for other people's labels. Italian design, our own hides, SA-8000 certified production.",
};

const STATS = [
  { value: "1995", label: "Making shoes since" },
  { value: "Italy", label: "Seasonal design partner" },
  { value: "Own", label: "Leather sourcing" },
  { value: "SA-8000", label: "Certified production" },
];

const CHAPTERS = [
  {
    numeral: "I",
    title: "The leather",
    body: [
      "We do not buy finished shoes. We buy hides — full-grain, through a tannery network across Kolkata and Chennai that we have used for most of the company's life, and that knows what we will and will not accept.",
      "This is the part of the business that most brands at this price never touch. They order a shoe to a spec sheet and hope. We choose the material first and build to what it can do, which is why the leather on a Carson creases rather than cracks.",
    ],
  },
  {
    numeral: "II",
    title: "The design",
    body: [
      "Each season our footwear designs are developed with an Italian design house. That relationship is thirty years of our own pattern-cutting experience meeting people who do nothing but draw shoes for a living.",
      "It is also the honest answer to a question people ask about Indian manufacture: who decided the shape? Italian design, Indian hands. Neither half apologises for the other.",
    ],
  },
  {
    numeral: "III",
    title: "The hand",
    body: [
      "Most of the work is machine work. We will not tell you otherwise, and you should be suspicious of any brand at this price that does.",
      "But the parts that decide whether a shoe still holds its shape in a year are done by hand: the apron, the collar, the finishing at the seams. Tension is a judgement, and a machine cannot make it. The people who make it here have been making it for twenty years.",
    ],
  },
  {
    numeral: "IV",
    title: "The standard",
    body: [
      "Our workshop is SA-8000 certified and subject to ethical and technical audit — a third party inspects how this place runs and signs their name to it.",
      "That is not a value we claim about ourselves in a paragraph like this one. It is a document, renewed, that somebody else is accountable for. At a time when every brand describes itself as responsible, we would rather point at the certificate.",
    ],
  },
];

export default function WorkshopPage() {
  return (
    <>
      <section className={`shell ${s.hero}`}>
        <p className="numeral">The Workshop</p>
        <MaskHeading
          className="display display-xl"
          lines={["Thirty years", "on the same bench."]}
          baseDelay={120}
        />
        <Reveal delay={480}>
          <p className="lede" style={{ marginTop: 22, maxWidth: 560, marginInline: "auto" }}>
            Carson has been making leather footwear in Agra since 1995. For most
            of that time, under somebody else&rsquo;s name.
          </p>
        </Reveal>
      </section>

      <div className="shell">
        <Rule />
      </div>

      <section className="shell section-tight">
        <Reveal className={`body ${s.prose}`}>
          <p>
            We began as a manufacturer and exporter — shoes made here, shipped to
            buyers in Europe, the United States, the Gulf and Southeast Asia, and
            sold under labels that were not ours. That work never stopped. It is
            still how this company earns its living, and it is the reason we know
            what a good shoe costs to make.
          </p>
          <p>
            Carson is what happens when a workshop with thirty years of that
            behind it decides to put its own name on the box. Nothing about the
            bench has changed. The leather comes from the same tanneries, cut by
            the same hands, to the same export standard. What changed is that
            there is now no one between the people who make the shoe and the
            person who wears it — and no one taking a margin for the introduction.
          </p>
        </Reveal>
      </section>

      <Reveal className={`shell ${s.pull}`}>
        You have probably already worn our work.
      </Reveal>

      <div className="shell">
        <Rule />
        <div className={s.stats}>
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className={s.statValue}>{stat.value}</div>
              <div className={`label ${s.statLabel}`}>{stat.label}</div>
            </Reveal>
          ))}
        </div>
        <Rule />
      </div>

      <section className="shell section">
        <div className={s.chapters}>
          {CHAPTERS.map((chapter, i) => (
            <Reveal key={chapter.numeral} delay={i * 60} className={s.chapter}>
              <div className={s.chapterHead}>
                <span className="numeral">{chapter.numeral}</span>
                <h2 className="display display-m">{chapter.title}</h2>
              </div>
              <div className={`body ${s.chapterBody}`}>
                {chapter.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={s.agra}>
        <div className="shell section">
          <Reveal className={s.agraInner}>
            <p className="numeral">Agra, India</p>
            <h2 className="display display-l" style={{ marginTop: 14 }}>
              Where the shoes are made
            </h2>
            <p className="body" style={{ marginTop: 18 }}>
              Agra is the largest footwear manufacturing city in India. It has
              made leather for centuries, and it supplies a great deal of what
              Europe wears without ever being named on the label. To anyone in
              this trade it is a credential in the way Northampton or the Marche
              is a credential.
            </p>
            <p className="body" style={{ marginTop: 18 }}>
              We say so plainly, because the alternative is to hide it, and a
              brand that hides where its shoes are made is telling you something
              about how it feels about them. We feel fine about it. This is a
              city that knows how to make a shoe, and our shoes are better for
              being made here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`shell ${s.closing}`}>
        <Reveal>
          <h2 className="display display-m">See what thirty years makes.</h2>
          <div style={{ marginTop: 26 }}>
            <Link href="/collection" className="btn label">
              The collection
              <svg width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M0 4.5h13M9.5 1l3.5 3.5-3.5 3.5" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
