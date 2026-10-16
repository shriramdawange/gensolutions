"use client";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { n: "01", title: "Tell us", copy: "The problem, the idea, the outcome you want." },
  { n: "02", title: "Scope", copy: "We reply within 2 working days with questions and a scope sketch." },
  { n: "03", title: "Prototype", copy: "A thin slice you can click, measure and challenge." },
  { n: "04", title: "Build", copy: "Iterate in the open with evals and demos." }
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
          message: form.message
        })
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
    <div className="k-sp-form">
      <div className="k-flow">
        <motion.div
          className="k-flow-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (stage + 1) / 4 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
        {STEPS.map((s, i) => (
          <motion.button
            key={s.n}
            type="button"
            onClick={() => setStage(i)}
            className={`k-flow-node ${i <= stage ? "on" : ""} ${i === stage ? "now" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 90, damping: 16 }}
            aria-current={i === stage}
          >
            <span className="k-flow-dot" />
            <span className="k-flow-num">{s.n}</span>
            <span className="k-flow-title">{s.title}</span>
            <span className="k-flow-copy">{s.copy}</span>
          </motion.button>
        ))}
      </div>

      <form className="k-form" onSubmit={submit}>
        <div className="k-form-head">
          <span>
            Project brief / {String(stage + 1).padStart(2, "0")} — {STEPS[stage].title.toUpperCase()}
          </span>
          <span className="k-form-required">* Required</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {stage === 0 && (
              <div className="k-field">
                What do you want to build? *
                <div className="k-pills">
                  {TYPES.map((t) => (
                    <button type="button" key={t} className={`k-pill ${form.type === t ? "on" : ""}`} onClick={() => setForm({ ...form, type: t })}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {stage === 1 && (
              <>
                <div className="k-field">
                  Budget range *
                  <div className="k-pills">
                    {BUDGETS.map((b) => (
                      <button type="button" key={b} className={`k-pill ${form.budget === b ? "on" : ""}`} onClick={() => setForm({ ...form, budget: b })}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="k-field" style={{ marginTop: "1.25rem" }}>
                  Timeline *
                  <div className="k-pills">
                    {TIMELINES.map((t) => (
                      <button type="button" key={t} className={`k-pill ${form.timeline === t ? "on" : ""}`} onClick={() => setForm({ ...form, timeline: t })}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            {stage >= 2 && (
              <>
                <div className="k-form-row">
                  <label className="k-field">
                    Your name *
                    <input className="k-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" placeholder="What should we call you?" required maxLength={100} />
                  </label>
                  <label className="k-field">
                    Work email *
                    <input className="k-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} />
                  </label>
                </div>
                <label className="k-field" style={{ marginTop: "1.25rem" }}>
                  The brief — problem, users, outcome *
                  <textarea className="k-textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="What is broken or missing? Who feels it? What does success look like?" required minLength={10} maxLength={5000} />
                </label>
                <p className="k-pill-summary" style={{ marginTop: "1rem" }}>
                  {form.type} · {form.budget} · {form.timeline}
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="k-form-foot">
          <span>{stage < 2 ? "Pick an option to continue." : "We reply within 2 working days."}</span>
          <span className="k-form-actions">
            {stage > 0 && (
              <button className="k-btn" type="button" onClick={() => setStage(stage - 1)}>
                ← Back
              </button>
            )}
            {stage < 2 ? (
              <button className="k-btn k-btn--solid" type="button" onClick={() => setStage(stage + 1)}>
                Continue →
              </button>
            ) : (
              <button className="k-btn k-btn--solid" type="submit" disabled={status.kind === "loading"}>
                {status.kind === "loading" ? "Sending…" : "Send brief"} <span className="k-btn-arrow">↗</span>
              </button>
            )}
          </span>
        </div>
        {status.message && (
          <p className={`k-form-status ${status.kind}`} role="status" aria-live="polite">
            {status.message}
          </p>
        )}
        <p className="k-form-fallback">
          Prefer email? <a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a>
        </p>
      </form>
    </div>
  );
}
