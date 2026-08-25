# CARSON

Brand site for Carson — leather footwear, made in Agra since 1995.

Next.js (App Router) + TypeScript. No CSS framework: the design system is
hand-written tokens in `app/globals.css` plus co-located CSS modules, because
this design depends on exact letter-spacing and hairline opacities.

---

## Running it locally

You need **Node 20 or newer** (built and verified on 22.x). Check with `node -v`.

```bash
git clone https://github.com/TayyabShamsi/Oxy-Carson.git
cd Oxy-Carson
git checkout claude/oxycarson-website-design-04ko52

npm install
npm run dev
```

Then open **http://localhost:3000**.

To see it exactly as it would ship (faster, pre-rendered):

```bash
npm run build
npm start
```

---

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, collection, the 1995 story, how it's made |
| `/collection` | Grid, filterable by category (`?c=Boots`) |
| `/product/[slug]` | Product page — colourway, size, add to bag, specification |
| `/workshop` | The long-form story: leather, design, the hand, the standard |
| `/contact` | Enquiries, wholesale, shipping and returns |
| `/care` | Sizing table and how to keep the leather |

---

## Before this goes live

Everything below is deliberately unfinished rather than faked. Nothing on the
site claims something that has not been confirmed.

- [ ] **Prices are sample values.** Set real ones in `lib/products.ts`. The cart
      needs numbers to compute a total, so placeholders would have broken it.
- [ ] **Product names are proposals.** Rename freely in the same file.
- [ ] **Contact details are `[BRACKETED]` placeholders** in `app/contact/page.tsx`.
- [ ] **Photography.** Every shoe is drawn as SVG. See below.
- [ ] **Waitlist.** Set `WAITLIST_WEBHOOK_URL` to a Klaviyo / Mailchimp /
      Formspree endpoint. Until then `/api/waitlist` refuses honestly instead of
      pretending to have saved an address.
- [ ] **Checkout.** The cart is real; payment is not wired. The button is
      disabled and says so. Wire Stripe or Shopify in
      `components/cart/CartDrawer.tsx` — line items already carry everything a
      checkout session needs.
- [ ] **Indexing is switched off** (`robots: { index: false }` in
      `app/layout.tsx`). Turn it on at launch.
- [ ] **Trademark.** Rights are held for *Carson Overseas* and *OxyCarson*, not
      *Carson* standalone. See `brand/BRIEF.md` §1.
- [ ] **Unverified claims.** Goodyear welt and vegetable tanning are absent
      everywhere on purpose. Do not add them until confirmed.

---

## Photography

`components/product/ShoeArt.tsx` draws all four silhouettes as vector art. They
are a stand-in, not a destination — real photographs of real shoes will beat the
best drawing in that file.

Replacing them is a contained job: swap the `<ShoeArt>` call sites for `<Image>`
and add the file paths to `lib/products.ts`. Nothing else in the layout changes.

---

## Where decisions live

`brand/BRIEF.md` is the single source of truth for positioning, the story, which
construction claims are defensible, and the reasoning behind the two judgement
calls that shaped the site — not naming clients, and stating Agra plainly.
