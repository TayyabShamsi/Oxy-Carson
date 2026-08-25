"use client";

import { useState } from "react";
import s from "./Footer.module.css";

type State = "idle" | "sending" | "done" | "error";

/**
 * Launch waitlist.
 *
 * Posts to /api/waitlist, which forwards to whatever destination is configured
 * in WAITLIST_WEBHOOK_URL. Until that variable is set the API answers 503 and
 * this form says so plainly — it never claims to have stored an address it did
 * not store.
 */
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };

      if (res.ok) {
        setState("done");
        setMessage(data.message ?? "Thank you. We will write when it is ready.");
        setEmail("");
      } else {
        setState("error");
        setMessage(data.message ?? "That did not go through. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("That did not go through. Please try again.");
    }
  }

  return (
    <>
      <form className={s.form} onSubmit={onSubmit}>
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          className={s.input}
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "sending"}
        />
        <button
          type="submit"
          className={`label ${s.submit}`}
          disabled={state === "sending" || email.trim().length === 0}
        >
          {state === "sending" ? "Sending" : "Join"}
        </button>
      </form>
      <p
        className={`label ${s.msg} ${state === "error" ? s.msgError : "muted"}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </>
  );
}
