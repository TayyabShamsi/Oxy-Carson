import Link from "next/link";
import Rule from "@/components/site/Rule";

export default function NotFound() {
  return (
    <div
      className="shell"
      style={{
        textAlign: "center",
        paddingBlock: "clamp(80px, 12vw, 160px)",
        maxWidth: 560,
      }}
    >
      <p className="numeral">404</p>
      <h1 className="display display-l" style={{ marginTop: 14 }}>
        Nothing on this last
      </h1>
      <p className="body" style={{ marginTop: 16 }}>
        The page you were looking for is not here. It may have moved, or it may
        never have existed.
      </p>
      <div style={{ marginTop: 34 }}>
        <Rule />
      </div>
      <div style={{ marginTop: 34 }}>
        <Link href="/collection" className="btn label">
          View the collection
          <svg width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M0 4.5h13M9.5 1l3.5 3.5-3.5 3.5" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
