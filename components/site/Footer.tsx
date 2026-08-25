import Link from "next/link";
import Waitlist from "./Waitlist";
import s from "./Footer.module.css";

const COLUMNS = [
  {
    head: "Shop",
    links: [
      { href: "/collection?c=Loafers", label: "Loafers" },
      { href: "/collection?c=Boots", label: "Boots" },
      { href: "/collection?c=Sneakers", label: "Sneakers" },
      { href: "/collection", label: "Everything" },
    ],
  },
  {
    head: "The House",
    links: [
      { href: "/workshop", label: "The Workshop" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    head: "Help",
    links: [
      { href: "/care", label: "Sizing & Care" },
      { href: "/contact", label: "Shipping & Returns" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="shell">
        <div className={s.waitlist}>
          <p className="label muted">First Release</p>
          <h2 className="display display-m" style={{ marginTop: 14 }}>
            Be told before anyone else.
          </h2>
          <p className="body" style={{ marginTop: 14 }}>
            The first release is small. We will write once when it is ready, and
            not otherwise.
          </p>
          <Waitlist />
        </div>

        <div className="rule" />

        <div className={s.cols}>
          <div className={s.brandCol}>
            <span className={s.wordmark}>CARSON</span>
            <p className="body" style={{ fontSize: "0.9063rem" }}>
              Leather footwear, made in Agra since 1995. Italian design, our own
              hides, finished by hand.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.head}>
              <p className={`label ${s.colHead}`}>{col.head}</p>
              <div className={s.colList}>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className={s.colLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rule rule-plain" />

        <div className={`label ${s.base}`}>
          <span>© {new Date().getFullYear()} Carson</span>
          <span>Made in Agra, India</span>
          <span>SA-8000 certified production</span>
        </div>
      </div>
    </footer>
  );
}
