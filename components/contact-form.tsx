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
    <form className="k-form" onSubmit={handleSubmit}>
      <div className="k-form-head">
        <span>Project enquiry / 001</span>
        <span className="k-form-required">* Required</span>
      </div>
      <div className="k-form-row">
        <label className="k-field">
          Your name *
          <input className="k-input" name="name" autoComplete="name" placeholder="What should we call you?" required maxLength={100} />
        </label>
        <label className="k-field">
          Work email *
          <input className="k-input" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} />
        </label>
      </div>
      <label className="k-field">
        What can we help with? *
        <select className="k-select" name="interest" required defaultValue="">
          <option value="" disabled>
            Select an area
          </option>
          <option>AI engineering &amp; agents</option>
          <option>Software / platform development</option>
          <option>Research &amp; development</option>
          <option>Product collaboration</option>
          <option>Careers / joining the team</option>
          <option>Other / not sure yet</option>
        </select>
      </label>
      <label className="k-field">
        Tell us a little about it *
        <textarea
          className="k-textarea"
          name="message"
          rows={4}
          placeholder="The challenge, the idea, the outcome you have in mind…"
          required
          minLength={10}
          maxLength={5000}
        />
      </label>
      <div className="k-form-foot">
        <span>We’ll use these details only to respond to your enquiry.</span>
        <button className="k-btn k-btn--solid" type="submit" disabled={state.kind === "loading"}>
          {state.kind === "loading" ? "Sending…" : "Send enquiry"}
          <span className="k-btn-arrow">↗</span>
        </button>
      </div>
      {state.message && (
        <p className={`k-form-status ${state.kind}`} role="status" aria-live="polite">
          {state.message}
        </p>
      )}
      <p className="k-form-fallback">
        Prefer email? <a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a>
      </p>
    </form>
  );
}
