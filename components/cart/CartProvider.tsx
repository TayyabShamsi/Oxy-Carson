"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/products";

/**
 * Cart state.
 *
 * Commerce-ready, not commerce-live: this holds a real cart and computes real
 * totals, but nothing is charged. When payment is wired (Stripe or Shopify),
 * the checkout handler is the only thing that changes — line items already
 * carry everything a checkout session needs.
 */

export type CartLine = {
  /** `${slug}:${colorwayId}:${size}` — the identity of a purchasable variant. */
  id: string;
  slug: string;
  colorwayId: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (slug: string, colorwayId: string, size: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  open: () => void;
  close: () => void;
  /** False until localStorage has been read, so SSR and first paint agree. */
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "carson.cart.v1";

function lineId(slug: string, colorwayId: string, size: string) {
  return `${slug}:${colorwayId}:${size}`;
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.slug === "string" &&
    typeof v.colorwayId === "string" &&
    typeof v.size === "string" &&
    typeof v.qty === "number" &&
    Number.isFinite(v.qty) &&
    v.qty > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Read once on mount. Never during render — the server has no localStorage.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Drop anything malformed or pointing at a product that no longer
          // exists, so an old cart can never break the page.
          setLines(parsed.filter(isCartLine).filter((l) => getProduct(l.slug)));
        }
      }
    } catch {
      // Private mode, cleared storage, corrupt JSON — an empty cart is correct.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage full or blocked. The in-memory cart still works this session.
    }
  }, [lines, hydrated]);

  // Lock the page behind the drawer, and restore scroll when it closes.
  useEffect(() => {
    document.body.classList.toggle("is-locked", isOpen);
    return () => document.body.classList.remove("is-locked");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const add = useCallback((slug: string, colorwayId: string, size: string) => {
    const id = lineId(slug, colorwayId, size);
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { id, slug, colorwayId, size, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 10) } : l)),
    );
  }, []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.slug);
      if (!product) continue;
      count += line.qty;
      subtotal += product.priceGBP * line.qty;
    }
    return { count, subtotal };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      add,
      remove,
      setQty,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      hydrated,
    }),
    [lines, count, subtotal, isOpen, add, remove, setQty, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
