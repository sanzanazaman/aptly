"use client";
import { useState, useEffect } from "react";

// ─── Google Fonts ───────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  `}</style>
);

// ─── Palette & Global Styles ─────────────────────────────────────────────────
const STYLES = `
  :root {
    --cream: #F7F4EF;
    --stone: #E8E2D9;
    --warm-gray: #B8AFA4;
    --mid: #8C8278;
    --dark: #2C2520;
    --ink: #1A1614;
    --accent: #7A6A5A;
    --soft-border: #DDD7CF;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'DM Sans', sans-serif;
    --radius: 2px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: 28px 48px;
    border-bottom: 1px solid var(--soft-border);
  }
  .nav-logo {
    font-family: var(--serif);
    font-size: 22px; font-weight: 400; letter-spacing: 0.02em;
    color: var(--ink);
  }
  .nav-tag {
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--warm-gray); font-weight: 500;
  }

  /* LANDING */
  .landing {
    flex: 1; display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    padding: 80px 24px; text-align: center;
    gap: 0;
  }
  .landing-eyebrow {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--warm-gray); font-weight: 500; margin-bottom: 32px;
  }
  .landing-headline {
    font-family: var(--serif);
    font-size: clamp(48px, 8vw, 88px);
    font-weight: 300; line-height: 1.05;
    color: var(--ink); margin-bottom: 24px;
    max-width: 700px;
  }
  .landing-headline em { font-style: italic; color: var(--accent); }
  .landing-sub {
    font-size: 16px; color: var(--mid); max-width: 440px;
    line-height: 1.7; margin-bottom: 56px; font-weight: 300;
  }
  .landing-meta {
    display: flex; gap: 32px; justify-content: center;
    font-size: 12px; letter-spacing: 0.08em; color: var(--warm-gray);
    text-transform: uppercase; margin-bottom: 48px;
  }
  .landing-meta span { display: flex; align-items: center; gap: 8px; }
  .landing-meta span::before {
    content: ''; width: 4px; height: 4px;
    border-radius: 50%; background: var(--warm-gray);
  }

  /* BUTTONS */
  .btn-primary {
    background: var(--ink); color: var(--cream);
    border: none; padding: 16px 48px;
    font-family: var(--sans); font-size: 13px;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s ease;
    font-weight: 500;
  }
  .btn-primary:hover { background: var(--accent); }

  .btn-secondary {
    background: transparent; color: var(--mid);
    border: 1px solid var(--soft-border); padding: 14px 32px;
    font-family: var(--sans); font-size: 13px;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s ease; font-weight: 400;
  }
  .btn-secondary:hover { border-color: var(--mid); color: var(--ink); }

  .btn-ghost {
    background: transparent; color: var(--warm-gray);
    border: none; padding: 14px 0;
    font-family: var(--sans); font-size: 13px;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: color 0.2s; font-weight: 400;
  }
  .btn-ghost:hover { color: var(--ink); }

  /* FORM SHELL */
  .form-shell {
    flex: 1; display: flex; flex-direction: column;
    max-width: 720px; margin: 0 auto; width: 100%;
    padding: 0 24px 80px;
  }

  /* PROGRESS */
  .progress-bar-wrap {
    padding: 32px 48px 0;
    display: flex; align-items: center; gap: 16px;
    max-width: 720px; margin: 0 auto; width: 100%;
  }
  .progress-track {
    flex: 1; height: 1px; background: var(--soft-border);
    position: relative; overflow: visible;
  }
  .progress-fill {
    height: 1px; background: var(--ink);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .progress-label {
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--warm-gray); white-space: nowrap; font-weight: 500;
  }

  /* STEP */
  .step-header { padding: 48px 0 40px; }
  .step-number {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--warm-gray); margin-bottom: 16px; font-weight: 500;
  }
  .step-title {
    font-family: var(--serif);
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 300; line-height: 1.15; color: var(--ink);
  }
  .step-title em { font-style: italic; color: var(--accent); }
  .step-desc {
    margin-top: 12px; color: var(--mid);
    font-size: 15px; font-weight: 300; line-height: 1.6;
  }

  /* FIELDS */
  .field-group { display: flex; flex-direction: column; gap: 28px; }

  .field-label {
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--accent); font-weight: 500; margin-bottom: 10px;
    display: block;
  }

  .field-input, .field-textarea, .field-select {
    width: 100%;
    background: transparent;
    border: none; border-bottom: 1px solid var(--soft-border);
    padding: 10px 0; color: var(--ink);
    font-family: var(--sans); font-size: 15px;
    outline: none; transition: border-color 0.2s;
    font-weight: 300;
  }
  .field-input:focus, .field-textarea:focus, .field-select:focus {
    border-color: var(--accent);
  }
  .field-input::placeholder, .field-textarea::placeholder {
    color: var(--warm-gray);
  }
  .field-textarea {
    resize: vertical; min-height: 80px;
  }
  .field-select {
    appearance: none; cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B8AFA4' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 4px center;
  }
  .field-select option { background: var(--cream); }

  .field-error {
    font-size: 12px; color: #C0836A; margin-top: 6px;
    font-style: italic;
  }

  /* TOGGLE */
  .toggle-group {
    display: flex; border: 1px solid var(--soft-border); width: fit-content;
  }
  .toggle-btn {
    padding: 12px 32px; background: transparent;
    border: none; cursor: pointer;
    font-family: var(--sans); font-size: 13px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--warm-gray); transition: all 0.2s; font-weight: 400;
  }
  .toggle-btn.active {
    background: var(--ink); color: var(--cream);
  }

  /* PILLS */
  .pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .pill {
    padding: 9px 18px; border: 1px solid var(--soft-border);
    background: transparent; cursor: pointer;
    font-family: var(--sans); font-size: 13px;
    color: var(--mid); transition: all 0.2s; font-weight: 400;
    letter-spacing: 0.02em;
  }
  .pill:hover { border-color: var(--mid); color: var(--ink); }
  .pill.selected {
    background: var(--ink); color: var(--cream);
    border-color: var(--ink);
  }

  /* YES/NO */
  .yn-group { display: flex; gap: 12px; }
  .yn-btn {
    padding: 10px 28px; border: 1px solid var(--soft-border);
    background: transparent; cursor: pointer;
    font-family: var(--sans); font-size: 13px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--warm-gray); transition: all 0.2s; font-weight: 400;
  }
  .yn-btn.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }

  /* CHECKBOX ROWS */
  .check-list { display: flex; flex-direction: column; gap: 14px; }
  .check-row {
    display: flex; align-items: center; gap: 14px;
    cursor: pointer; font-size: 14px; color: var(--mid);
    font-weight: 300; transition: color 0.2s;
  }
  .check-row:hover { color: var(--ink); }
  .check-box {
    width: 18px; height: 18px; border: 1px solid var(--soft-border);
    flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .check-box.checked { background: var(--ink); border-color: var(--ink); }
  .check-box.checked::after {
    content: ''; width: 5px; height: 9px;
    border: 2px solid var(--cream); border-top: none; border-left: none;
    transform: rotate(45deg) translateY(-1px);
  }

  /* DIVIDER */
  .divider {
    height: 1px; background: var(--soft-border); margin: 8px 0;
  }

  /* NAV ACTIONS */
  .form-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 56px; margin-top: 8px;
    border-top: 1px solid var(--soft-border);
  }

  /* BRIEF / SUMMARY */
  .brief-shell {
    max-width: 720px; margin: 0 auto; width: 100%;
    padding: 48px 24px 80px;
  }
  .brief-header {
    padding-bottom: 40px; border-bottom: 1px solid var(--soft-border);
    margin-bottom: 48px;
  }
  .brief-eyebrow {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--warm-gray); font-weight: 500; margin-bottom: 16px;
  }
  .brief-title {
    font-family: var(--serif); font-size: clamp(32px, 5vw, 52px);
    font-weight: 300; line-height: 1.1; color: var(--ink);
  }
  .brief-title em { font-style: italic; color: var(--accent); }
  .brief-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
  .brief-tag {
    padding: 6px 14px; border: 1px solid var(--soft-border);
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--mid); font-weight: 500;
  }
  .brief-tag.highlight { background: var(--ink); color: var(--cream); border-color: var(--ink); }

  .brief-section { margin-bottom: 48px; }
  .brief-section-title {
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--warm-gray); font-weight: 500; margin-bottom: 20px;
    padding-bottom: 12px; border-bottom: 1px solid var(--soft-border);
  }
  .brief-paragraph {
    font-family: var(--serif); font-size: 20px;
    font-weight: 300; line-height: 1.7; color: var(--ink);
  }

  .brief-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px 48px;
  }
  .brief-item-label {
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--warm-gray); margin-bottom: 4px; font-weight: 500;
  }
  .brief-item-value { font-size: 14px; color: var(--ink); font-weight: 300; }

  .brief-actions {
    display: flex; gap: 16px; padding-top: 48px;
    border-top: 1px solid var(--soft-border);
    flex-wrap: wrap;
  }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .nav { padding: 20px 24px; }
    .progress-bar-wrap { padding: 24px 24px 0; }
    .brief-grid { grid-template-columns: 1fr; gap: 20px; }
    .toggle-btn { padding: 12px 20px; }
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.4s ease both; }
  .fade-up-delay { animation: fadeUp 0.4s ease 0.1s both; }
  .fade-up-delay2 { animation: fadeUp 0.4s ease 0.2s both; }
`;

// ─── Data ────────────────────────────────────────────────────────────────────

const STYLE_OPTIONS = [
  "Japandi", "Scandinavian", "Mid-Century Modern", "Bohemian",
  "Coastal", "Industrial", "Traditional", "Transitional",
  "Contemporary", "Maximalist", "Minimalist", "Art Deco"
];

const COLOR_OPTIONS = [
  "Warm Neutrals", "Cool Neutrals", "Earthy Tones", "Moody Darks",
  "Soft Pastels", "Bold Accents", "Black & White", "Natural Wood Tones"
];

const MATERIAL_OPTIONS = [
  "Natural Linen", "Velvet", "Leather", "Rattan / Cane",
  "Raw Wood", "Marble", "Ceramic", "Brass / Gold",
  "Matte Black Metal", "Terrazzo", "Jute / Sisal", "Glass"
];

const GOAL_OPTIONS = [
  "Make it feel calming", "Better functionality", "More storage",
  "Cohesive aesthetic", "Better lighting", "Entertain guests",
  "Work from home", "Reflect my personality", "Child-friendly", "Pet-friendly"
];

const STEPS = [
  { id: 1, title: "Let's start with the basics", em: "basics" },
  { id: 2, title: "Your space & situation", em: "situation" },
  { id: 3, title: "Goals & frustrations", em: "Goals" },
  { id: 4, title: "Budget & timeline", em: "Budget" },
  { id: 5, title: "Style & materials", em: "Style" },
  { id: 6, title: "Living details", em: "details" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const initForm = () => ({
  projectName: "",
  ownerType: "renter", // renter | owner
  spaceType: "",
  primaryHome: null,
  goals: [],
  frustration: "",
  budget: "",
  timeline: "",
  styleDirection: [],
  colorPreferences: [],
  materialsLiked: [],
  pets: null,
  kids: null,
  storageNeed: null,
  workspace: null,
  furnitureKeep: null,
  furnitureDetails: "",
  // renter
  landlordSafe: null,
  peelAndStick: null,
  canDrill: null,
  tempLighting: null,
  // owner
  openToPainting: null,
  replaceFixtures: null,
  builtIns: null,
  renovationSupport: null,
  finalNotes: "",
});

function generateBrief(f) {
  const styles = f.styleDirection.length ? f.styleDirection.join(", ") : "an eclectic";
  const colors = f.colorPreferences.length ? f.colorPreferences.join(" and ").toLowerCase() : "carefully chosen";
  const materials = f.materialsLiked.length ? f.materialsLiked.join(", ").toLowerCase() : "thoughtfully selected materials";
  const goals = f.goals.length ? f.goals.map(g => g.toLowerCase()).join(", ") : "improve the overall feel";

  const ownerNote = f.ownerType === "renter"
    ? `As a renter, the approach will prioritize ${f.landlordSafe === "yes" ? "landlord-safe, non-permanent solutions" : "reversible yet impactful changes"}${f.peelAndStick === "yes" ? ", with peel-and-stick options for walls and surfaces" : ""}${f.canDrill === "yes" ? ", including some wall-mounted elements" : ""}.`
    : `As the owner, there's full creative latitude — ${f.openToPainting === "yes" ? "painting walls is on the table" : "paint will be kept as-is for now"}${f.replaceFixtures === "yes" ? ", fixtures are open for replacement" : ""}${f.builtIns === "yes" ? ", and custom built-ins are a possibility" : ""}.`;

  const lifestyle = [
    f.pets === "yes" && "pet-friendly durability",
    f.kids === "yes" && "family-safe choices",
    f.storageNeed === "yes" && "smart storage integration",
    f.workspace === "yes" && "a dedicated workspace"
  ].filter(Boolean);

  const lifestyleNote = lifestyle.length
    ? ` The design must also account for ${lifestyle.join(", ")}.`
    : "";

  return `This ${f.spaceType || "space"} project — ${f.projectName || "Untitled"} — calls for a ${styles} aesthetic grounded in ${colors} tones and ${materials}. The primary objectives are to ${goals}. ${ownerNote}${lifestyleNote} ${f.frustration ? `The biggest friction point to resolve: ${f.frustration.toLowerCase()}.` : ""} With a budget of ${f.budget || "TBD"} and a target timeline of ${f.timeline || "TBD"}, this brief serves as the foundation for a considered, intentional transformation.${f.finalNotes ? ` Additional context: ${f.finalNotes}` : ""}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function YesNo({ value, onChange }) {
  return (
    <div className="yn-group">
      {["yes", "no"].map(v => (
        <button key={v} className={`yn-btn${value === v ? " active" : ""}`}
          onClick={() => onChange(v)} type="button">
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}

function Pills({ options, selected, onChange, max }) {
  const toggle = (opt) => {
    if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
    else if (!max || selected.length < max) onChange([...selected, opt]);
  };
  return (
    <div className="pills">
      {options.map(opt => (
        <button key={opt} type="button"
          className={`pill${selected.includes(opt) ? " selected" : ""}`}
          onClick={() => toggle(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function CheckItem({ label, value, onChange }) {
  return (
    <div className="check-row" onClick={() => onChange(!value)}>
      <div className={`check-box${value ? " checked" : ""}`} />
      <span>{label}</span>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      {children}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step1({ form, setForm, errors }) {
  return (
    <div className="field-group fade-up">
      <Field label="Project Name" error={errors.projectName}>
        <input className="field-input" placeholder="e.g. Brooklyn Studio Refresh"
          value={form.projectName}
          onChange={e => setForm({ ...form, projectName: e.target.value })} />
      </Field>
      <Field label="Are you a renter or owner?">
        <div style={{ marginTop: 4 }}>
          <div className="toggle-group">
            {["renter", "owner"].map(t => (
              <button key={t} type="button"
                className={`toggle-btn${form.ownerType === t ? " active" : ""}`}
                onClick={() => setForm({ ...form, ownerType: t })}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Field>
    </div>
  );
}

function Step2({ form, setForm, errors }) {
  return (
    <div className="field-group fade-up">
      <Field label="Space Type" error={errors.spaceType}>
        <select className="field-select"
          value={form.spaceType}
          onChange={e => setForm({ ...form, spaceType: e.target.value })}>
          <option value="">Select a space type…</option>
          {["Studio Apartment","1-Bedroom Apartment","2+ Bedroom Apartment",
            "House","Bedroom Only","Living Room Only","Home Office",
            "Open-Plan Living / Kitchen","Loft"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field label="Is this your primary home?" error={errors.primaryHome}>
        <div style={{ marginTop: 4 }}>
          <YesNo value={form.primaryHome} onChange={v => setForm({ ...form, primaryHome: v })} />
        </div>
      </Field>
    </div>
  );
}

function Step3({ form, setForm, errors }) {
  return (
    <div className="field-group fade-up">
      <Field label="What are your top goals? (pick up to 4)" error={errors.goals}>
        <div style={{ marginTop: 4 }}>
          <Pills options={GOAL_OPTIONS} selected={form.goals} max={4}
            onChange={v => setForm({ ...form, goals: v })} />
        </div>
      </Field>
      <Field label="Biggest frustration with the space right now" error={errors.frustration}>
        <textarea className="field-textarea"
          placeholder="e.g. It feels dark and cluttered, with no clear flow…"
          value={form.frustration}
          onChange={e => setForm({ ...form, frustration: e.target.value })} />
      </Field>
    </div>
  );
}

function Step4({ form, setForm, errors }) {
  return (
    <div className="field-group fade-up">
      <Field label="Total Budget" error={errors.budget}>
        <select className="field-select"
          value={form.budget}
          onChange={e => setForm({ ...form, budget: e.target.value })}>
          <option value="">Select a range…</option>
          {["Under $500","$500–$1,500","$1,500–$5,000","$5,000–$15,000","$15,000+","Flexible / Not sure"].map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>
      <Field label="Desired Timeline" error={errors.timeline}>
        <select className="field-select"
          value={form.timeline}
          onChange={e => setForm({ ...form, timeline: e.target.value })}>
          <option value="">Select a timeline…</option>
          {["ASAP (within a month)","1–3 months","3–6 months","6–12 months","No rush"].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function Step5({ form, setForm, errors }) {
  return (
    <div className="field-group fade-up">
      <Field label="Style Direction (select all that apply)" error={errors.styleDirection}>
        <div style={{ marginTop: 4 }}>
          <Pills options={STYLE_OPTIONS} selected={form.styleDirection}
            onChange={v => setForm({ ...form, styleDirection: v })} />
        </div>
      </Field>
      <Field label="Color Palette Preferences">
        <div style={{ marginTop: 4 }}>
          <Pills options={COLOR_OPTIONS} selected={form.colorPreferences}
            onChange={v => setForm({ ...form, colorPreferences: v })} />
        </div>
      </Field>
      <Field label="Materials You Love">
        <div style={{ marginTop: 4 }}>
          <Pills options={MATERIAL_OPTIONS} selected={form.materialsLiked}
            onChange={v => setForm({ ...form, materialsLiked: v })} />
        </div>
      </Field>
    </div>
  );
}

function Step6({ form, setForm, errors }) {
  const isRenter = form.ownerType === "renter";

  return (
    <div className="field-group fade-up">
      {/* Universal */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px" }}>
        <Field label="Pets?">
          <div style={{ marginTop: 4 }}>
            <YesNo value={form.pets} onChange={v => setForm({ ...form, pets: v })} />
          </div>
        </Field>
        <Field label="Kids?">
          <div style={{ marginTop: 4 }}>
            <YesNo value={form.kids} onChange={v => setForm({ ...form, kids: v })} />
          </div>
        </Field>
        <Field label="Storage needed?">
          <div style={{ marginTop: 4 }}>
            <YesNo value={form.storageNeed} onChange={v => setForm({ ...form, storageNeed: v })} />
          </div>
        </Field>
        <Field label="Work from home?">
          <div style={{ marginTop: 4 }}>
            <YesNo value={form.workspace} onChange={v => setForm({ ...form, workspace: v })} />
          </div>
        </Field>
      </div>

      <Field label="Furniture you want to keep?">
        <div style={{ marginTop: 4 }}>
          <YesNo value={form.furnitureKeep} onChange={v => setForm({ ...form, furnitureKeep: v })} />
        </div>
      </Field>
      {form.furnitureKeep === "yes" && (
        <Field label="Describe the pieces">
          <textarea className="field-textarea"
            placeholder="e.g. Vintage walnut dining table, heirloom armchair…"
            value={form.furnitureDetails}
            onChange={e => setForm({ ...form, furnitureDetails: e.target.value })} />
        </Field>
      )}

      <div className="divider" />

      {/* Conditional */}
      {isRenter ? (
        <div>
          <div className="field-label" style={{ marginBottom: 16 }}>Renter Constraints</div>
          <div className="check-list">
            <CheckItem label="Landlord-safe changes only"
              value={form.landlordSafe === "yes"}
              onChange={v => setForm({ ...form, landlordSafe: v ? "yes" : "no" })} />
            <CheckItem label="Open to peel-and-stick wallpaper / tiles"
              value={form.peelAndStick === "yes"}
              onChange={v => setForm({ ...form, peelAndStick: v ? "yes" : "no" })} />
            <CheckItem label="Allowed to drill walls"
              value={form.canDrill === "yes"}
              onChange={v => setForm({ ...form, canDrill: v ? "yes" : "no" })} />
            <CheckItem label="Interested in temporary lighting solutions"
              value={form.tempLighting === "yes"}
              onChange={v => setForm({ ...form, tempLighting: v ? "yes" : "no" })} />
          </div>
        </div>
      ) : (
        <div>
          <div className="field-label" style={{ marginBottom: 16 }}>Owner Opportunities</div>
          <div className="check-list">
            <CheckItem label="Open to painting walls"
              value={form.openToPainting === "yes"}
              onChange={v => setForm({ ...form, openToPainting: v ? "yes" : "no" })} />
            <CheckItem label="Open to replacing fixtures"
              value={form.replaceFixtures === "yes"}
              onChange={v => setForm({ ...form, replaceFixtures: v ? "yes" : "no" })} />
            <CheckItem label="Open to custom built-ins"
              value={form.builtIns === "yes"}
              onChange={v => setForm({ ...form, builtIns: v ? "yes" : "no" })} />
            <CheckItem label="Interested in renovation support"
              value={form.renovationSupport === "yes"}
              onChange={v => setForm({ ...form, renovationSupport: v ? "yes" : "no" })} />
          </div>
        </div>
      )}

      <div className="divider" />

      <Field label="Final Notes (optional)">
        <textarea className="field-textarea"
          placeholder="Anything else we should know — a vibe, a reference, a constraint…"
          value={form.finalNotes}
          onChange={e => setForm({ ...form, finalNotes: e.target.value })} />
      </Field>
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(step, form) {
  const errs = {};
  if (step === 1) {
    if (!form.projectName.trim()) errs.projectName = "A project name helps set the tone.";
  }
  if (step === 2) {
    if (!form.spaceType) errs.spaceType = "Please select a space type.";
    if (!form.primaryHome) errs.primaryHome = "Please indicate if this is your primary home.";
  }
  if (step === 3) {
    if (form.goals.length === 0) errs.goals = "Select at least one goal.";
    if (!form.frustration.trim()) errs.frustration = "A frustration helps us focus the design.";
  }
  if (step === 4) {
    if (!form.budget) errs.budget = "Please select a budget range.";
    if (!form.timeline) errs.timeline = "Please select a timeline.";
  }
  if (step === 5) {
    if (form.styleDirection.length === 0) errs.styleDirection = "Select at least one style.";
  }
  return errs;
}

// ─── Brief Page ───────────────────────────────────────────────────────────────

function BriefPage({ form, onRestart }) {
  const brief = generateBrief(form);
  const tags = [
    { label: form.ownerType, highlight: true },
    form.spaceType && { label: form.spaceType },
    form.budget && { label: form.budget },
    form.timeline && { label: form.timeline },
    ...form.styleDirection.map(s => ({ label: s })),
  ].filter(Boolean);

  const priorities = [
    form.pets === "yes" && "Pet-friendly",
    form.kids === "yes" && "Kid-friendly",
    form.storageNeed === "yes" && "Storage focus",
    form.workspace === "yes" && "Workspace",
    form.furnitureKeep === "yes" && "Furniture to keep",
    form.ownerType === "renter" && form.landlordSafe === "yes" && "Landlord-safe",
    form.ownerType === "renter" && form.canDrill === "yes" && "Can drill",
    form.ownerType === "owner" && form.openToPainting === "yes" && "Painting OK",
    form.ownerType === "owner" && form.builtIns === "yes" && "Built-ins possible",
  ].filter(Boolean);

  return (
    <div className="brief-shell">
      <div className="brief-header fade-up">
        <div className="brief-eyebrow">Design Brief</div>
        <div className="brief-title">
          {form.projectName || "Untitled Project"} — <em>ready.</em>
        </div>
        <div className="brief-tags">
          {tags.map((t, i) => (
            <span key={i} className={`brief-tag${t.highlight ? " highlight" : ""}`}>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      <div className="brief-section fade-up-delay">
        <div className="brief-section-title">Design Brief</div>
        <p className="brief-paragraph">{brief}</p>
      </div>

      {priorities.length > 0 && (
        <div className="brief-section fade-up-delay">
          <div className="brief-section-title">Key Priorities</div>
          <div className="pills">
            {priorities.map((p, i) => (
              <span key={i} className="pill selected">{p}</span>
            ))}
          </div>
        </div>
      )}

      <div className="brief-section fade-up-delay2">
        <div className="brief-section-title">At a Glance</div>
        <div className="brief-grid">
          <div>
            <div className="brief-item-label">Space</div>
            <div className="brief-item-value">{form.spaceType || "—"}</div>
          </div>
          <div>
            <div className="brief-item-label">Status</div>
            <div className="brief-item-value">{form.ownerType === "renter" ? "Renter" : "Owner"}</div>
          </div>
          <div>
            <div className="brief-item-label">Budget</div>
            <div className="brief-item-value">{form.budget || "—"}</div>
          </div>
          <div>
            <div className="brief-item-label">Timeline</div>
            <div className="brief-item-value">{form.timeline || "—"}</div>
          </div>
          <div>
            <div className="brief-item-label">Styles</div>
            <div className="brief-item-value">{form.styleDirection.join(", ") || "—"}</div>
          </div>
          <div>
            <div className="brief-item-label">Colors</div>
            <div className="brief-item-value">{form.colorPreferences.join(", ") || "—"}</div>
          </div>
          <div>
            <div className="brief-item-label">Materials</div>
            <div className="brief-item-value">{form.materialsLiked.join(", ") || "—"}</div>
          </div>
          <div>
            <div className="brief-item-label">Goals</div>
            <div className="brief-item-value">{form.goals.join(", ") || "—"}</div>
          </div>
          {form.furnitureDetails && (
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="brief-item-label">Furniture to Keep</div>
              <div className="brief-item-value">{form.furnitureDetails}</div>
            </div>
          )}
          {form.finalNotes && (
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="brief-item-label">Additional Notes</div>
              <div className="brief-item-value">{form.finalNotes}</div>
            </div>
          )}
        </div>
      </div>

      <div className="brief-actions fade-up-delay2">

  <form action="https://formspree.io/f/mjgplpop" method="POST">

    <p style={{ marginBottom: "12px", opacity: 0.7 }}>
      where should we send your design brief?
    </p>

    <input
      type="email"
      name="email"
      placeholder="your email"
      required
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px"
      }}
    />

    {/* hidden data from form */}
    <input type="hidden" name="space" value={form.space || ""} />
    <input type="hidden" name="budget" value={form.budget || ""} />
    <input type="hidden" name="timeline" value={form.timeline || ""} />

    <input
      type="hidden"
      name="colors"
      value={form.colorPreferences?.join(", ") || ""}
    />

    <input
      type="hidden"
      name="materials"
      value={form.materialsLiked?.join(", ") || ""}
    />

    <input
      type="hidden"
      name="goals"
      value={form.goals?.join(", ") || ""}
    />

    <input
      type="hidden"
      name="notes"
      value={form.finalNotes || ""}
    />

    <button className="btn-primary" type="submit">
      get your design brief
    </button>

  </form>

  <button className="btn-secondary" onClick={onRestart}>
    Start Over
  </button>

</div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | form | brief
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initForm());
  const [errors, setErrors] = useState({});

  const totalSteps = STEPS.length;
  const progress = (step / totalSteps) * 100;

  const goNext = () => {
    const errs = validate(step, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    if (step < totalSteps) setStep(step + 1);
    else setScreen("brief");
  };

  const goBack = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
    else setScreen("landing");
  };

  const restart = () => {
    setForm(initForm());
    setStep(1);
    setErrors({});
    setScreen("landing");
  };

  const stepInfo = STEPS[step - 1];

  const stepComponent = () => {
    const props = { form, setForm, errors };
    if (step === 1) return <Step1 {...props} />;
    if (step === 2) return <Step2 {...props} />;
    if (step === 3) return <Step3 {...props} />;
    if (step === 4) return <Step4 {...props} />;
    if (step === 5) return <Step5 {...props} />;
    if (step === 6) return <Step6 {...props} />;
  };

  return (
    <>
      <FontLoader />
      <style>{STYLES}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={restart} style={{ cursor: "pointer" }}>
            aptly
          </div>
          <a
  href="https://www.linkedin.com/in/sanzanazaman"
  target="_blank"
  rel="noopener noreferrer"
  className="opacity-60 hover:opacity-100 transition mr-6"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452H16.9V14.89c0-1.328-.025-3.037-1.849-3.037-1.849 0-2.131 1.445-2.131 2.94v5.659H9.373V9h3.405v1.561h.049c.474-.9 1.637-1.849 3.369-1.849 3.601 0 4.267 2.37 4.267 5.455v6.285zM5.337 7.433a1.98 1.98 0 1 1 0-3.96 1.98 1.98 0 0 1 0 3.96zM6.915 20.452H3.759V9h3.156v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
  </svg>
</a>
        </nav>

        {/* LANDING */}
        {screen === "landing" && (
          <main className="landing">
            <div className="landing-eyebrow fade-up">Interior Design Intake</div>
            <h1 className="landing-headline fade-up">
              Your space, <em>intentionally</em> designed
            </h1>
            <p className="landing-sub fade-up-delay">
              Answer a few thoughtful questions and we'll generate a tailored design brief — your starting point for a space that truly feels like you.
            </p>
            <div className="landing-meta fade-up-delay">
              <span>6 steps</span>
              <span>5 minutes</span>
              <span>No signup</span>
            </div>
            <button className="btn-primary fade-up-delay2"
              onClick={() => setScreen("form")}>
              Begin the Intake
            </button>
          </main>
        )}

        {/* FORM */}
        {screen === "form" && (
          <>
            <div className="progress-bar-wrap">
              <span className="progress-label">Step {step} of {totalSteps}</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <main className="form-shell">
              <div className="step-header">
                <div className="step-number fade-up">
                  {stepInfo.title.split(stepInfo.em)[0].trim() && "— "}
                  Step {step}
                </div>
                <h2 className="step-title fade-up">
                  {stepInfo.title.split(stepInfo.em).map((part, i) => (
                    <span key={i}>
                      {part}{i < stepInfo.title.split(stepInfo.em).length - 1 && <em>{stepInfo.em}</em>}
                    </span>
                  ))}
                </h2>
              </div>

              {stepComponent()}

              <div className="form-nav">
                <button className="btn-ghost" onClick={goBack}>
                  ← {step === 1 ? "Home" : "Back"}
                </button>
                <button className="btn-primary" onClick={goNext}>
                  {step === totalSteps ? "Generate Brief" : "Continue"} →
                </button>
              </div>
            </main>
          </>
        )}

        {/* BRIEF */}
        {screen === "brief" && (
          <BriefPage form={form} onRestart={restart} />
        )}

      </div>
    </>
  );
}