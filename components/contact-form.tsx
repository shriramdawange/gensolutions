"use client";

import { FormEvent, useState } from "react";

type State = { kind: "idle" | "loading" | "success" | "error"; message: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState({ kind: "loading", message: "Sending your enquiry…" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your message. Please email us directly.");
      setState({ kind: "success", message: "Thanks for reaching out. Your enquiry has been sent." });
      form.reset();
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please email hello.gensolutions@gmail.com."
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading"><span className="mono">PROJECT ENQUIRY / 001</span><span className="form-required">* REQUIRED</span></div>
      <div className="form-row">
        <label>Your name *<input name="name" autoComplete="name" placeholder="What should we call you?" required maxLength={100} /></label>
        <label>Work email *<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
      </div>
      <label>What can we help with? *
        <select name="interest" required defaultValue="">
          <option value="" disabled>Select an area</option>
          <option>AI engineering & agents</option>
          <option>Software / platform development</option>
          <option>Research & development</option>
          <option>Product collaboration</option>
          <option>Careers / joining the team</option>
          <option>Other / not sure yet</option>
        </select>
      </label>
      <label>Tell us a little about it *<textarea name="message" rows={4} placeholder="The challenge, the idea, the outcome you have in mind…" required minLength={10} maxLength={5000} /></label>
      <div className="form-bottom"><span>We’ll use these details only to respond to your enquiry.</span><button className="button button-primary" type="submit" disabled={state.kind === "loading"}>{state.kind === "loading" ? "Sending…" : "Send enquiry"} <span>↗</span></button></div>
      {state.message && <p className={`form-status ${state.kind}`} role="status" aria-live="polite">{state.message}</p>}
      <p className="form-fallback">Prefer email? <a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a></p>
    </form>
  );
}
