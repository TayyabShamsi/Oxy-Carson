/** The one arrow on the site. Inherits colour so it works on paper and on ink. */
export default function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      {back ? (
        <path d="M16 4.5H2M5.5 1L2 4.5 5.5 8" />
      ) : (
        <path d="M0 4.5h14M10.5 1l3.5 3.5-3.5 3.5" />
      )}
    </svg>
  );
}
