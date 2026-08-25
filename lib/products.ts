/**
 * CARSON — product catalogue.
 *
 * This is the single file to edit when real product data arrives.
 * Everything on the site reads from here: the collection grid, product pages,
 * cart, and structured data.
 *
 * ⚠️ PRICES ARE SAMPLE VALUES. They exist because the cart cannot compute a
 *    total without numbers. They are NOT founder-supplied. Replace every
 *    `priceGBP` before this site goes anywhere near a customer.
 *
 * ⚠️ PRODUCT NAMES ARE PROPOSALS, not decisions. Rename freely.
 *
 * ✅ Construction claims below are limited to what the founder verified:
 *    full-grain leather, hand-finishing, partial hand-stitching, own tannery
 *    sourcing, SA-8000 audited production, made in Agra.
 *    Goodyear welt and vegetable tanning are deliberately ABSENT — do not add
 *    them until they are confirmed.
 */

export const PRICES_ARE_PLACEHOLDER = true;

export type SilhouetteArt = "low-top" | "chelsea" | "loafer" | "lace-boot";

export type Colorway = {
  id: string;
  name: string;
  /** Swatch shown in the picker. */
  swatch: string;
  upper: string;
  upperShade: string;
  sole: string;
  seam: string;
  lace: string;
  eyelet: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Sneakers" | "Boots" | "Loafers";
  art: SilhouetteArt;
  /** One line, shown under the name in the grid. */
  tagline: string;
  /** The paragraph on the product page. */
  description: string;
  priceGBP: number;
  colorways: Colorway[];
  /** Bullet facts. Every one must be defensible. */
  details: string[];
  /** Ordered construction steps shown on the product page. */
  construction: { label: string; value: string }[];
};

export const SIZES = [
  { uk: "6", eu: "40" },
  { uk: "7", eu: "41" },
  { uk: "8", eu: "42" },
  { uk: "9", eu: "43" },
  { uk: "10", eu: "44" },
  { uk: "11", eu: "45" },
  { uk: "12", eu: "46" },
];

const SHARED_DETAILS = [
  "Full-grain leather upper, sourced through our own tannery network in Kolkata and Chennai",
  "Hand-finished; the upper is partly stitched by hand",
  "Leather lining and a cushioned leather-covered footbed",
  "Made in Agra, India, in an SA-8000 certified workshop",
];

export const products: Product[] = [
  {
    slug: "the-bellamy",
    name: "The Bellamy",
    category: "Loafers",
    art: "loafer",
    tagline: "Penny loafer, unlined summer weight",
    description:
      "The shoe our workshop has made longest and best. A slim penny loafer on a low leather sole, cut so the vamp softens across the foot within a fortnight and then holds its shape for years. Hand-finished at the apron, where a machine cannot judge the tension.",
    priceGBP: 245,
    colorways: [
      {
        id: "cognac",
        name: "Cognac",
        swatch: "#B07C4F",
        upper: "#B07C4F",
        upperShade: "#96663D",
        sole: "#8A6440",
        seam: "#7A5433",
        lace: "#EFE9DE",
        eyelet: "#6B4A2E",
      },
      {
        id: "oxblood",
        name: "Oxblood",
        swatch: "#7E322E",
        upper: "#7E322E",
        upperShade: "#682522",
        sole: "#5E2724",
        seam: "#9C5B52",
        lace: "#EFE9DE",
        eyelet: "#4A1B19",
      },
      {
        id: "black",
        name: "Nero",
        swatch: "#221F1C",
        upper: "#26221E",
        upperShade: "#171411",
        sole: "#191614",
        seam: "#5B534A",
        lace: "#EFE9DE",
        eyelet: "#0F0D0B",
      },
    ],
    details: SHARED_DETAILS,
    construction: [
      { label: "Last", value: "Slim almond, true to size" },
      { label: "Upper", value: "Full-grain calf" },
      { label: "Lining", value: "Full leather" },
      { label: "Sole", value: "Leather, rubber top piece" },
    ],
  },
  {
    slug: "the-ashford",
    name: "The Ashford",
    category: "Boots",
    art: "chelsea",
    tagline: "Chelsea boot on a leather sole",
    description:
      "A Chelsea cut close to the ankle, with elastic set deep enough that the line stays clean when the boot is on. The pull tab is a single folded piece of the same hide as the upper — not a ribbon, not a loop of webbing. It is the detail that dates a cheap Chelsea fastest, so we do not economise on it.",
    priceGBP: 320,
    colorways: [
      {
        id: "dark-oak",
        name: "Dark Oak",
        swatch: "#6B4A32",
        upper: "#6B4A32",
        upperShade: "#553A27",
        sole: "#4A3423",
        seam: "#9C7B5C",
        lace: "#EFE9DE",
        eyelet: "#3A2718",
      },
      {
        id: "black",
        name: "Nero",
        swatch: "#221F1C",
        upper: "#26221E",
        upperShade: "#171411",
        sole: "#191614",
        seam: "#5B534A",
        lace: "#EFE9DE",
        eyelet: "#0F0D0B",
      },
    ],
    details: SHARED_DETAILS,
    construction: [
      { label: "Last", value: "Rounded almond, true to size" },
      { label: "Upper", value: "Full-grain calf, single panel" },
      { label: "Gore", value: "Twin-tension elastic" },
      { label: "Sole", value: "Leather, rubber top piece" },
    ],
  },
  {
    slug: "the-carson-low",
    name: "The Carson Low",
    category: "Sneakers",
    art: "low-top",
    tagline: "Low-top sneaker, full-grain calf",
    description:
      "A low-top with nothing on it — no logo, no contrast panel, no branded heel tab. One piece of full-grain calf over a cupsole, so the only thing to look at is the leather and the line. It creases where you walk and stops looking new almost immediately, which is the point.",
    priceGBP: 265,
    colorways: [
      {
        id: "bone",
        name: "Bone",
        swatch: "#DCD5C7",
        upper: "#DCD5C7",
        upperShade: "#C9C1B1",
        sole: "#F0EBE0",
        seam: "#A2977F",
        lace: "#FBF8F1",
        eyelet: "#8A8070",
      },
      {
        id: "cognac",
        name: "Cognac",
        swatch: "#B07C4F",
        upper: "#B07C4F",
        upperShade: "#96663D",
        sole: "#EDE8DE",
        seam: "#7A5433",
        lace: "#F2EDE3",
        eyelet: "#6B4A2E",
      },
      {
        id: "black",
        name: "Nero",
        swatch: "#221F1C",
        upper: "#26221E",
        upperShade: "#171411",
        sole: "#E8E3D8",
        seam: "#5B534A",
        lace: "#F2EDE3",
        eyelet: "#0F0D0B",
      },
    ],
    details: SHARED_DETAILS,
    construction: [
      { label: "Last", value: "Sneaker last, true to size" },
      { label: "Upper", value: "Full-grain calf, minimal panelling" },
      { label: "Lining", value: "Full leather" },
      { label: "Sole", value: "Vulcanised rubber cupsole" },
    ],
  },
  {
    slug: "the-whitcomb",
    name: "The Whitcomb",
    category: "Boots",
    art: "lace-boot",
    tagline: "Lace-up boot, six eyelets",
    description:
      "The heaviest thing we make. Six eyelets, a derby facing that opens wide enough to get into properly, and a sole thick enough to be worth resoling. Built on the same bench as everything else here, to the standard we have exported to since 1995.",
    priceGBP: 340,
    colorways: [
      {
        id: "walnut",
        name: "Walnut",
        swatch: "#7A5334",
        upper: "#7A5334",
        upperShade: "#634128",
        sole: "#3E2C1D",
        seam: "#A98863",
        lace: "#3A2A1B",
        eyelet: "#33220F",
      },
      {
        id: "black",
        name: "Nero",
        swatch: "#221F1C",
        upper: "#26221E",
        upperShade: "#171411",
        sole: "#141210",
        seam: "#5B534A",
        lace: "#100E0C",
        eyelet: "#0F0D0B",
      },
    ],
    details: SHARED_DETAILS,
    construction: [
      { label: "Last", value: "Rounded, roomy; consider a half size down" },
      { label: "Upper", value: "Full-grain calf, derby facing" },
      { label: "Eyelets", value: "Six, blind-set" },
      { label: "Sole", value: "Leather, rubber top piece" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const CATEGORIES = ["All", "Loafers", "Boots", "Sneakers"] as const;
export type Category = (typeof CATEGORIES)[number];

export function formatPrice(gbp: number): string {
  return `£${gbp.toLocaleString("en-GB")}`;
}
