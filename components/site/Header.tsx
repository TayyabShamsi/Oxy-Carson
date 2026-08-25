"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import s from "./Header.module.css";

const NAV = [
  { href: "/collection", label: "Collection" },
  { href: "/workshop", label: "The Workshop" },
];

const NAV_RIGHT = [{ href: "/contact", label: "Contact" }];

export default function Header() {
  const pathname = usePathname();
  const { count, open, hydrated } = useCart();
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menu);
    return () => document.body.classList.remove("is-locked");
  }, [menu]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className={`${s.header} ${stuck ? s.stuck : ""}`}>
        <div className={`shell ${s.inner}`}>
          <nav className={s.nav} aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label ${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={`${s.burger} ${menu ? s.burgerOpen : ""}`}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link href="/" className={s.wordmark} aria-label="Carson — home">
            CARSON
          </Link>

          <nav className={`${s.nav} ${s.right}`} aria-label="Secondary">
            {NAV_RIGHT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label ${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <button type="button" className={`label ${s.bag}`} onClick={open}>
              Bag
              <span className={s.bagCount}>({hydrated ? count : 0})</span>
            </button>
          </nav>
        </div>
      </header>

      <div
        className={`${s.sheet} ${menu ? s.sheetOpen : ""}`}
        aria-hidden={!menu}
        {...(!menu ? { inert: true } : {})}
      >
        {[...NAV, ...NAV_RIGHT].map((item) => (
          <Link key={item.href} href={item.href} className={s.sheetLink}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
