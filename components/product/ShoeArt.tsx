import type { Colorway, SilhouetteArt } from "@/lib/products";

/**
 * Vector product illustration.
 *
 * There is no product photography yet, so every shoe on this site is drawn.
 * Each silhouette takes a Colorway, so one drawing serves every finish.
 *
 * These are a stand-in and are meant to be replaced: real photographs of real
 * shoes will beat the best drawing here. Swap them by replacing the <ShoeArt>
 * call sites — the layout around them does not need to change.
 *
 * ---------------------------------------------------------------------------
 * How these were constructed (read before editing a path)
 *
 * Profiles are plotted against measured length-to-height ratios rather than
 * drawn by eye, because eyeballing a shoe reliably produces a loaf. Toe points
 * left. Every shoe is 540px long, x from 92 to 632, ground at y=300.
 *
 *   silhouette    length : height     topline y     toe-box crest y
 *   sneaker           2.70 : 1           100              170
 *   loafer            4.00 : 1           165              189
 *   chelsea           2.15 : 1            49              176
 *   lace boot         2.30 : 1            65              176
 *
 * Four things decide whether it reads as footwear:
 *
 *  1. RATIO. A sneaker is 2.7 times as long as it is tall. Draw it at 3.6 and
 *     it flattens into a bread loaf no amount of detailing will rescue.
 *  2. TOE-BOX VOLUME. The crest sits about 62% of the way up to the topline.
 *     Flatten it and all the mass slides to the back — the other way to get a
 *     loaf.
 *  3. A TIGHT HEEL. The back of a real shoe is nearly vertical. Round it
 *     generously and it turns into a dome.
 *  4. THE COLLAR OPENING. The single element that makes a silhouette read as
 *     footwear rather than a shape. Every closed shoe here has one.
 *
 * The upper is drawn FIRST and the sole painted over it, so the upper's bottom
 * edge is hidden and the welt line stays clean.
 * ---------------------------------------------------------------------------
 */

type Props = {
  art: SilhouetteArt;
  colorway: Colorway;
  /** Decorative in grids where the product name is already read out. */
  title?: string;
  className?: string;
  shadow?: boolean;
};

export default function ShoeArt({
  art,
  colorway,
  title,
  className,
  shadow = true,
}: Props) {
  const Silhouette = ART[art];
  return (
    <svg
      viewBox="0 0 720 340"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      {shadow && (
        <ellipse cx="360" cy="312" rx="252" ry="7.5" fill="#17140f" opacity="0.1" />
      )}
      <Silhouette c={colorway} />
    </svg>
  );
}

type SProps = { c: Colorway };

/** Uppers that clip their collar opening, hoisted so the clipPath reuses them. */
const LOW_TOP_UPPER =
  "M92,258 C96,244 104,234 114,224 C124,210 134,199 146,190 C158,181 170,177 184,175 C202,172 220,170 238,170 C258,170 277,169 297,168 C314,167 331,166 346,162 C361,158 376,154 389,148 C402,141 415,135 427,128 C441,120 456,114 470,110 C486,105 503,102 519,101 C531,100 544,100 556,100 C566,101 573,105 578,110 C587,119 594,131 600,145 C607,162 612,182 616,200 C621,222 628,244 632,258 Z";
const LOAFER_UPPER =
  "M92,268 C98,258 108,248 119,240 C131,228 144,217 157,208 C171,198 188,193 205,192 C227,190 249,189 270,189 C288,189 307,191 324,194 C337,197 348,201 356,205 C370,210 385,213 400,212 C415,211 429,209 443,205 C458,201 472,197 486,192 C501,186 515,181 529,176 C543,171 555,167 567,166 C577,166 587,168 594,172 C602,182 610,198 616,215 C622,236 628,256 632,268 Z";

function Stitch({
  d,
  c,
  dash = "3 5",
  width = 1.4,
  opacity = 1,
}: {
  d: string;
  c: Colorway;
  dash?: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={c.seam}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/** A soft highlight so flat colour still reads as leather. */
function Sheen({ d }: { d: string }) {
  return <path d={d} fill="#ffffff" opacity="0.11" />;
}

/* -- 01 · low-top sneaker -------------------------------------------------- */

function LowTop({ c }: SProps) {
  return (
    <g>
      <path
        d={LOW_TOP_UPPER}
        fill={c.upper}
        stroke={c.eyelet}
        strokeOpacity={0.42}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Sheen d="M130,204 C150,186 170,180 198,177 C232,173 274,175 320,172 C352,169 384,156 416,134 C446,114 486,105 522,102 C482,112 446,126 416,148 C384,171 346,181 302,183 C238,186 162,190 130,204 Z" />

      {/* collar opening, clipped so it cannot bite through the topline */}
      <clipPath id="carson-clip-lowtop">
        <path d={LOW_TOP_UPPER} />
      </clipPath>
      <ellipse
        clipPath="url(#carson-clip-lowtop)"
        cx="508"
        cy="113"
        rx="68"
        ry="10"
        transform="rotate(-5 508 113)"
        fill={c.eyelet}
        fillOpacity={0.5}
      />

      {/* tongue under the lacing */}
      <path
        d="M344,166 C356,148 376,130 400,116 L416,110 C392,126 370,144 358,170 Z"
        fill={c.upperShade}
      />

      <g stroke={c.lace} strokeWidth={4.4} strokeLinecap="round" fill="none">
        <path d="M348,158 L384,146" />
        <path d="M370,147 L406,135" />
        <path d="M392,136 L428,124" />
        <path d="M412,126 L448,114" />
      </g>
      <g fill={c.eyelet}>
        <circle cx="354" cy="166" r="3.6" />
        <circle cx="376" cy="155" r="3.6" />
        <circle cx="398" cy="144" r="3.6" />
        <circle cx="420" cy="132" r="3.6" />
        <circle cx="440" cy="122" r="3.6" />
      </g>

      <Stitch d="M192,176 C200,208 204,238 206,258" c={c} />
      <Stitch d="M348,166 C358,198 364,232 366,258" c={c} />
      <Stitch d="M560,101 C554,144 560,208 566,258" c={c} />

      {/* cupsole with a visible sidewall */}
      <path
        d="M80,262 C62,272 60,292 84,300 L634,300 C662,299 674,278 664,258 C500,268 210,270 80,262 Z"
        fill={c.sole}
        stroke={c.eyelet}
        strokeOpacity={0.34}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M88,282 C250,291 470,291 664,276"
        fill="none"
        stroke={c.seam}
        strokeWidth={1.3}
        opacity={0.32}
      />
    </g>
  );
}

/* -- 02 · chelsea boot ----------------------------------------------------- */

function Chelsea({ c }: SProps) {
  return (
    <g>
      <path
        d="M92,264 C96,250 106,240 119,232 C130,218 144,207 157,198 C171,188 185,182 200,180 C222,177 244,176 265,176 C283,176 302,177 319,178 C331,178 340,177 346,172 C355,165 362,156 367,146 C374,136 379,126 384,116 C388,106 391,96 394,86 C397,76 400,67 405,60 C412,52 421,50 432,50 C461,49 490,49 519,49 C537,49 553,51 567,55 C576,60 581,68 583,78 C588,91 592,105 594,118 C598,132 602,146 605,160 C609,175 613,190 616,204 C621,226 628,250 632,264 Z"
        fill={c.upper}
        stroke={c.eyelet}
        strokeOpacity={0.42}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Sheen d="M132,210 C154,192 176,184 208,181 C242,177 284,179 322,178 C334,177 342,168 348,154 C360,120 374,82 388,54 C382,90 370,132 362,164 C356,182 342,190 320,192 C254,197 162,196 132,210 Z" />

      {/* elastic gore, following the ankle taper */}
      <path
        d="M498,56 L562,54 C565,94 568,140 574,178 C576,188 570,194 560,195 L510,197 C502,197 497,192 496,184 C494,142 495,98 498,56 Z"
        fill={c.upperShade}
      />
      <g stroke={c.seam} strokeWidth={1} opacity={0.36}>
        <path d="M512,55 L525,196" />
        <path d="M528,55 L541,196" />
        <path d="M544,54 L557,195" />
      </g>

      {/* pull tab */}
      <path
        d="M570,55 L567,28 C566,19 573,11 582,10 C592,9 600,16 601,25 L604,53 L593,54 L590,27 C590,22 587,19 583,19 C579,20 577,23 577,28 L581,56 Z"
        fill={c.upperShade}
      />

      <Stitch d="M208,182 C214,216 218,244 220,262" c={c} />
      <Stitch d="M344,174 C354,152 364,120 374,86" c={c} />
      <path
        d="M408,55 C440,51 500,51 564,55"
        fill="none"
        stroke={c.seam}
        strokeWidth={1.2}
        opacity={0.45}
      />

      <path
        d="M82,266 C64,276 62,294 86,300 L630,300 C656,299 668,282 658,262 C500,270 212,272 82,266 Z"
        fill={c.sole}
        stroke={c.eyelet}
        strokeOpacity={0.34}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Stitch d="M90,282 C250,291 460,291 656,274" c={c} dash="2 6" opacity={0.42} />
    </g>
  );
}

/* -- 03 · penny loafer ----------------------------------------------------- */

function Loafer({ c }: SProps) {
  return (
    <g>
      <path
        d={LOAFER_UPPER}
        fill={c.upper}
        stroke={c.eyelet}
        strokeOpacity={0.42}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Sheen d="M126,226 C150,210 176,201 206,198 C238,195 272,197 304,202 C276,201 244,200 214,202 C176,205 144,214 126,226 Z" />

      {/* collar opening, clipped so it cannot bite through the topline */}
      <clipPath id="carson-clip-loafer">
        <path d={LOAFER_UPPER} />
      </clipPath>
      <ellipse
        clipPath="url(#carson-clip-loafer)"
        cx="452"
        cy="196"
        rx="88"
        ry="10.5"
        transform="rotate(-11 452 196)"
        fill={c.eyelet}
        fillOpacity={0.5}
      />

      {/* penny strap with its keyhole */}
      <path
        d="M280,186 C302,186 326,191 344,201 L336,217 C320,207 300,202 280,202 Z"
        fill={c.upperShade}
      />
      <rect
        x="298"
        y="191"
        width="23"
        height="5.5"
        rx="2.75"
        fill={c.eyelet}
        opacity="0.55"
        transform="rotate(10 310 194)"
      />

      <Stitch d="M124,228 C160,206 196,196 232,192" c={c} />
      <Stitch d="M278,188 C302,188 328,193 346,203" c={c} dash="2 4" />
      <Stitch d="M560,169 C574,196 588,234 594,266" c={c} />

      {/* wedge sole: thin at the toe, built up under the heel */}
      <path
        d="M82,270 C64,278 62,294 86,300 L630,300 C656,298 668,278 658,254 C500,266 212,272 82,270 Z"
        fill={c.sole}
        stroke={c.eyelet}
        strokeOpacity={0.34}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M92,284 C250,292 460,289 656,268"
        fill="none"
        stroke={c.seam}
        strokeWidth={1.2}
        opacity={0.36}
      />
    </g>
  );
}

/* -- 04 · lace-up boot ----------------------------------------------------- */

function LaceBoot({ c }: SProps) {
  return (
    <g>
      <path
        d="M92,264 C96,250 106,240 119,232 C130,218 144,207 157,198 C171,188 185,182 200,180 C222,177 246,176 267,176 C285,176 304,177 321,178 C333,178 342,177 348,172 C357,165 364,157 369,148 C376,139 381,130 386,120 C390,110 393,101 396,92 C399,83 402,76 407,70 C414,63 423,60 434,60 C463,59 492,59 521,59 C539,59 555,61 569,65 C578,70 583,78 585,88 C590,101 594,115 596,128 C600,142 604,156 607,170 C611,185 615,198 618,210 C622,230 628,252 632,264 Z"
        fill={c.upper}
        stroke={c.eyelet}
        strokeOpacity={0.42}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Sheen d="M132,210 C154,192 176,184 208,181 C244,177 288,179 326,178 C338,177 346,168 352,154 C364,124 378,92 392,64 C386,98 374,138 366,168 C360,186 346,192 324,194 C256,199 162,196 132,210 Z" />

      {/* tongue behind the lacing */}
      <path
        d="M344,188 C350,156 358,120 366,86 L390,80 C382,114 374,152 370,192 Z"
        fill={c.upperShade}
      />

      <g stroke={c.lace} strokeWidth={4.2} strokeLinecap="round" fill="none">
        <path d="M368,172 L342,178" />
        <path d="M374,150 L348,156" />
        <path d="M380,128 L354,134" />
        <path d="M386,106 L360,112" />
        <path d="M392,86 L366,92" />
      </g>
      <g fill={c.eyelet}>
        <circle cx="372" cy="176" r="3.6" />
        <circle cx="378" cy="154" r="3.6" />
        <circle cx="384" cy="132" r="3.6" />
        <circle cx="390" cy="110" r="3.6" />
        <circle cx="396" cy="90" r="3.6" />
      </g>

      <Stitch d="M208,182 C214,216 218,244 220,262" c={c} />
      <Stitch d="M408,66 C418,132 426,206 430,262" c={c} />
      <path
        d="M410,64 C444,60 500,60 566,64"
        fill="none"
        stroke={c.seam}
        strokeWidth={1.2}
        opacity={0.45}
      />

      {/* heavier sole, and a welt worth resoling */}
      <path
        d="M80,262 C60,274 58,296 84,304 L628,304 C656,302 670,282 658,256 C500,266 210,270 80,262 Z"
        fill={c.sole}
        stroke={c.eyelet}
        strokeOpacity={0.34}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Stitch
        d="M90,282 C250,292 460,292 656,270"
        c={c}
        dash="3 5"
        width={1.9}
        opacity={0.8}
      />
    </g>
  );
}

const ART: Record<SilhouetteArt, (p: SProps) => React.JSX.Element> = {
  "low-top": LowTop,
  chelsea: Chelsea,
  loafer: Loafer,
  "lace-boot": LaceBoot,
};
