import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const interest = clean(body.interest, 120);
  const message = clean(body.message, 5000);

  if (!name || !emailPattern.test(email) || !interest || message.length < 10) {
    return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello.gensolutions@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "The enquiry form is not connected yet. Please email hello.gensolutions@gmail.com directly." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[GenSolutions website] ${interest} — ${name}`,
        text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "We couldn’t send your enquiry right now. Please email us directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "A temporary sending error occurred. Please email us directly." }, { status: 502 });
  }
}
