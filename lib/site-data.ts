export type Product = {
  slug: string;
  code: string;
  name: string;
  type: string;
  desc: string;
  long: string[];
  mark: string;
  className: string;
  status: string;
  tags: string[];
  focus: { title: string; copy: string }[];
  roadmap: string[];
};

export const services = [
  { slug: "ai-intelligence", n: "01", title: "AI & Intelligence", copy: "AI agents, retrieval systems, intelligent workflows and applied machine learning designed around real problems.", tags: ["Agentic AI", "RAG systems", "Applied ML"], detail: ["Scoped pilots with eval harnesses before any production promise.", "Retrieval pipelines grounded in your own documents and data.", "Agent workflows with human checkpoints where it matters."] },
  { slug: "engineering", n: "02", title: "Engineering", copy: "Reliable digital products and platforms—from early architecture through implementation, integration and deployment.", tags: ["Web platforms", "APIs", "Cloud systems"], detail: ["Architecture reviews and thin vertical slices first.", "Typed APIs, observable deployments, documented handoffs.", "Maintenance paths, not black boxes."] },
  { slug: "research-development", n: "03", title: "Research & Development", copy: "Explore difficult questions, validate ideas with experiments and turn promising research into working systems.", tags: ["Prototyping", "Evaluation", "Technical research"], detail: ["Hypothesis, experiment design, and falsifiable success criteria.", "Prototypes instrumented for measurement from day one.", "Go / no-go memos with evidence attached."] },
  { slug: "product-innovation", n: "04", title: "Product Innovation", copy: "Build products with a clear purpose, a practical roadmap and room to evolve as real users teach us more.", tags: ["Product strategy", "MVPs", "Iteration"], detail: ["Problem interviews before roadmaps.", "Smallest lovable releases with tight feedback loops.", "Kill criteria written before build starts."] },
];

export const products: Product[] = [
  {
    slug: "zerobite",
    code: "GS / 001",
    name: "ZeroBite",
    type: "FOOD REDISTRIBUTION · SOCIAL IMPACT",
    desc: "Save Food. Share Hope. A food-rescue platform connecting surplus food with communities that need it — coordination, safety and measurable impact.",
    long: [
      "ZeroBite is an India-focused social-impact initiative: businesses and communities redirect safe, edible surplus food to people in need through verified nonprofit partners. Donated food is never a revenue stream; beneficiaries are never charged.",
      "The platform is a coordination and record-keeping layer — donor listing → partner match → pickup and handoff → distribution → impact record. Status: restart / discovery and MVP planning, targeting launch within three months of the October 2026 restart. Planned direction: Flutter mobile app + web admin portal on Supabase (PostgreSQL, Auth, Storage).",
    ],
    mark: "Z",
    className: "zero",
    status: "Restart / discovery — MVP planning",
    tags: ["Food rescue", "NGOs", "Supabase", "Flutter"],
    focus: [
      { title: "Six questions", copy: "What food, where and by when, is it safe, which verified partner can collect, was handoff completed, what can be reported." },
      { title: "Safety first", copy: "FSSAI surplus-food recovery rules, acceptance criteria, time-temperature controls, incident process — before volume." },
      { title: "Measured impact", copy: "Listings, acceptances, completed pickups, quantities rescued — measured figures separated from estimates." },
    ],
    roadmap: ["Discovery: donor + NGO interviews", "Define journeys, roles, safety procedures", "Build: listings, matching, handoff tracking", "Controlled pilot with verified partners", "Launch readiness: security, legal, support"],
  },
  {
    slug: "airlance",
    code: "GS / 002",
    name: "AIRLANCE",
    type: "MEDICAL LOGISTICS",
    desc: "A product initiative focused on making medical logistics more coordinated, responsive and dependable.",
    long: [
      "Moving blood, samples and medicines across a city is a coordination problem with lives attached. Delays hide in phone calls, paper slips and unclear ownership.",
      "AIRLANCE is our initiative to give every consignment a live owner, a priority lane and an auditable trail — from pickup to cold-chain handoff.",
    ],
    mark: "A",
    className: "air",
    status: "Product initiative",
    tags: ["Healthcare", "Logistics", "Coordination"],
    focus: [
      { title: "Dispatch", copy: "Priority-aware dispatch with live ETAs for hospitals, labs and riders." },
      { title: "Cold-chain", copy: "Custody checkpoints with temperature attestations at each handoff." },
      { title: "Audit", copy: "A single timeline per consignment — who touched it, when, and why." },
    ],
    roadmap: ["Consignment timeline prototype", "Hospital + lab pilot ring", "Cold-chain attestations", "Escalation playbooks"],
  },
  {
    slug: "vayu-sentinel",
    code: "GS / 003",
    name: "VAYU-SENTINEL",
    type: "DELHI-NCR AIR-QUALITY FORECASTING",
    desc: "Physics-informed, weather-coupled PM2.5 forecasting for Delhi-NCR — hourly T+1 through T+72, with honest uncertainty and leakage-safe evaluation.",
    long: [
      "VAYU-SENTINEL combines CPCB pollution observations with meteorological context and regional transport signals (FIRMS, GFAS, CAMS) to estimate how PM2.5 evolves over the next 72 hours. V1 baseline: scikit-learn HistGradientBoosting; research direction spans direct horizon models, graph transport learning and calibrated uncertainty, served via FastAPI + dashboard.",
      "Honest status, as the research notes require: historical V1 results exist (T+1 R² ≈ 0.92 on matching artefacts), but the full 72-horizon V3 run is not executed. Every horizon must be validated separately — architecture alone implies no readiness.",
    ],
    mark: "V",
    className: "vayu",
    status: "Research prototype — validating",
    tags: ["PM2.5", "Python", "FastAPI", "CPCB"],
    focus: [
      { title: "Weather coupling", copy: "Wind, mixing, boundary-layer dynamics and regional transport — not autoregression alone." },
      { title: "Leakage-safe evals", copy: "Chronological splits, issue-time weather only, per-horizon scores against persistence and climatology." },
      { title: "Calibrated output", copy: "Forecasts with coverage-tested intervals and metadata — never false precision." },
    ],
    roadmap: ["Reproducible V1 baseline + manifest", "Multi-horizon integrity + leakage tests", "Weather + fire/aerosol context", "Physics-informed graph research", "Calibrated serving + freshness monitoring"],
  },
];

export const process = [
  ["01", "Understand", "Define the problem, the people affected and what success should look like."],
  ["02", "Research", "Test assumptions, explore constraints and choose an approach with evidence."],
  ["03", "Engineer", "Build the smallest robust solution that can be evaluated in the real world."],
  ["04", "Validate", "Measure, improve and prepare the solution for responsible deployment."],
] as const;

export const team = [
  { number: "01", name: "SHRIRAM DAWANGE", role: "FOUNDER & LEAD ENGINEER", initials: "SD", accent: "green" },
  { number: "02", name: "SUDHANSHU YADAV", role: "ENGINEERING", initials: "SY", accent: "cyan" },
  { number: "03", name: "DEVANSHU DAWARE", role: "DESIGN & PRODUCT", initials: "DD", accent: "green" },
  { number: "04", name: "CHINMAY RAKHONDE", role: "ENGINEERING & OPERATIONS", initials: "CR", accent: "cyan" },
] as const;
