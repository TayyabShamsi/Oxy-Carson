import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carson.example"),
  title: {
    default: "Carson — Leather footwear, made in Agra since 1995",
    template: "%s — Carson",
  },
  description:
    "Italian design, full-grain leather from our own tanneries, finished by hand in Agra. For thirty years our work left in someone else's box. This one is ours.",
  openGraph: {
    title: "Carson",
    description:
      "Leather footwear, made in Agra since 1995. Italian design, our own hides, finished by hand.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Scroll reveals are a JS class toggle. Without JS the page must still
            render everything, or a crawler — or anyone on a flaky connection —
            sees a blank site. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.line-mask>span{transform:none!important}.rule-anim{transform:scaleX(1)!important}.rule-anim::after{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>
        <CartProvider>
          <Header />
          <main style={{ minHeight: "60vh" }}>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
