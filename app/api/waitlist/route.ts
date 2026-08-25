import { NextResponse } from "next/server";

/**
 * Launch-waitlist endpoint.
 *
 * TO GO LIVE: set WAITLIST_WEBHOOK_URL to a destination that accepts a JSON
 * POST — a Klaviyo/Mailchimp webhook, a Formspree or Zapier endpoint, or your
 * own handler. Until it is set this route refuses honestly rather than
 * pretending an address was captured.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email: unknown;

  try {
    const body = await request.json();
    email = (body as { email?: unknown })?.email;
  } catch {
    return NextResponse.json({ message: "Malformed request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 254) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const destination = process.env.WAITLIST_WEBHOOK_URL;

  if (!destination) {
    return NextResponse.json(
      {
        message:
          "The waitlist is not connected yet. Please write to hello@carson.example instead.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        source: "carson-site",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
  } catch {
    return NextResponse.json(
      { message: "We could not save that just now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thank you. We will write when the first release is ready.",
  });
}
