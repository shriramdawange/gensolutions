"use client";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { n: "01", title: "Tell us", copy: "The problem, the idea, the outcome you want." },
  { n: "02", title: "Scope", copy: "We reply within 2 working days with questions and a scope sketch." },
  { n: "03", title: "Prototype", copy: "A thin slice you can click, measure and challenge." },
  { n: "04", title: "Build", copy: "Iterate in the open with evals and demos." },
];

const TYPES = ["AI engineering & agents", "Software / platform development", "Research & development", "Product collaboration", "Other / not sure yet"];
const BUDGETS = ["< ₹50k", "₹50k – ₹2L", "₹2L – ₹10L", "₹10L+", "Grant / research"];
const TIMELINES = ["ASAP", "1–2 months", "3–6 months", "Exploring"];

export default function StartProjectClient() {
  const [stage, setStage] = useState(0);
  const [form, setForm] = useState({ type: TYPES[0], budget: BUDGETS[1], timeline: TIMELINES[1], name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({ kind: "idle", message: "" });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "loading", message: "Sending your project brief…" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          interest: `${form.type} · ${form.budget} · ${form.timeline}`,
          message: form.message,
        }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Could not send. Please email us directly.");
      setStatus({ kind: "success", message: "Brief received. We reply within 2 working days." });
      setStage(3);
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <>
      {/* animated timeline */}
      <div className="sp-timeline">
        <motion.div
          className="sp-timeline-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (stage + 1) / 4 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
        {STEPS.map((s, i) => (
          <motion.button
            key={s.n}
            type="button"
            onClick={() => setStage(i)}
            className={`sp-node ${i <= stage ? "on" : ""} ${i === stage ? "now" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 90, damping: 16 }}
            aria-current={i === stage}
          >
            <span className="sp-dot" />
            <span className="sp-n mono">{s.n}</span>
            <span className="sp-t">{s.title}</span>
            <span className="sp-c">{s.copy}</span>
          </motion.button>
        ))}
      </div>

      {/* stepped form */}
      <form className="contact-form sp-form" onSubmit={submit}>
        <div className="form-heading"><span className="mono">PROJECT BRIEF / {String(stage + 1).padStart(2, "0")} — {STEPS[stage].title.toUpperCase()}</span><span className="form-required">* REQUIRED</span></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {stage === 0 && (
              <label>What do you want to build? *
                <div className="sp-pills">
                  {TYPES.map((t) => (
                    <button type="button" key={t} className={form.type === t ? "on" : ""} onClick={() => setForm({ ...form, type: t })}>{t}</button>
                  ))}
                </div>
              </label>
            )}
            {stage === 1 && (
              <>
                <label>Budget range *
                  <div className="sp-pills">
                    {BUDGETS.map((b) => (
                      <button type="button" key={b} className={form.budget === b ? "on" : ""} onClick={() => setForm({ ...form, budget: b })}>{b}</button>
                    ))}
                  </div>
                </label>
                <label>Timeline *
                  <div className="sp-pills">
                    {TIMELINES.map((t) => (
                      <button type="button" key={t} className={form.timeline === t ? "on" : ""} onClick={() => setForm({ ...form, timeline: t })}>{t}</button>
                    ))}
                  </div>
                </label>
              </>
            )}
            {stage >= 2 && (
              <>
                <div className="form-row">
                  <label>Your name *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" placeholder="What should we call you?" required maxLength={100} /></label>
                  <label>Work email *<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
                </div>
                <label>The brief — problem, users, outcome *<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="What is broken or missing? Who feels it? What does success look like?" required minLength={10} maxLength={5000} /></label>
                <p className="sp-summary mono">{form.type} · {form.budget} · {form.timeline}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="form-bottom">
          <span>{stage < 2 ? "Pick an option to continue." : "We reply within 2 working days."}</span>
          <span style={{ display: "flex", gap: 10 }}>
            {stage > 0 && <button className="button button-quiet" type="button" onClick={() => setStage(stage - 1)}>← Back</button>}
            {stage < 2
              ? <button className="button button-primary" type="button" onClick={() => setStage(stage + 1)}>Continue →</button>
              : <button className="button button-primary" type="submit" disabled={status.kind === "loading"}>{status.kind === "loading" ? "Sending…" : "Send brief"} <span>↗</span></button>}
          </span>
        </div>
        {status.message && <p className={`form-status ${status.kind}`} role="status" aria-live="polite">{status.message}</p>}
        <p className="form-fallback">Prefer email? <a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a></p>
      </form>
    </>
  );
}
