/* ───────────────────────────────────────────────────────
   PROJECT DATA
   Single source of truth for both the homepage preview
   cards and the modal case-study views.

   To add a fourth project later:
   1. Add its id to PROJECT_ORDER (controls sequence + count).
   2. Add a matching entry to PROJECTS below, using
      buildSections() for the standard case-study shape.
   3. Give it an `art` scene — either reuse "cloudsky" /
      "sidequest" / "honor", or add a new case to
      components/ProjectArt.jsx (there's a generic
      placeholder scene for any art key it doesn't recognize,
      so nothing breaks if you skip that step at first).
   ─────────────────────────────────────────────────────── */

export const PROJECT_ORDER = ["cloudsky", "sidequest", "honor"];

const SECTION_PROMPTS = {
  context:
    "[Add: the situation before you got involved — team, timeline, what already existed]",
  role: "[Add: what you specifically owned vs. what the wider team owned]",
  noticed:
    "[Add: the observation, data point, or user behavior that changed how you saw the problem]",
  did: "[Add: the concrete steps you took — research, specs, prototypes, meetings, decisions you drove]",
  tradeoffs:
    "[Add: a real decision where you had to choose between two reasonable options, and why]",
  process:
    "[Add: screenshots, flows, Figma files, or artifacts from the actual process]",
  outcome:
    "[Add: what shipped, what changed, and how you know — metrics, feedback, or qualitative signal]",
  learned: "[Add: something you'd do differently, or a belief this project changed]",
};

function buildSections({ overview, question }) {
  return [
    { heading: "Overview", body: overview },
    { heading: "The question", body: question },
    { heading: "Context", body: SECTION_PROMPTS.context, placeholder: true },
    { heading: "My role", body: SECTION_PROMPTS.role, placeholder: true },
    { heading: "What I noticed", body: SECTION_PROMPTS.noticed, placeholder: true },
    { heading: "What I did", body: SECTION_PROMPTS.did, placeholder: true },
    {
      heading: "Decisions & tradeoffs",
      body: SECTION_PROMPTS.tradeoffs,
      placeholder: true,
    },
    {
      heading: "Process & artifacts",
      body: SECTION_PROMPTS.process,
      placeholder: true,
    },
    { heading: "Outcome", body: SECTION_PROMPTS.outcome, placeholder: true },
    { heading: "What I learned", body: SECTION_PROMPTS.learned, placeholder: true },
  ];
}

export const PROJECTS = {
  cloudsky: {
    id: "cloudsky",
    number: "01",
    eyebrow: "PRODUCT MANAGEMENT INTERN",
    title: "CloudSky",
    question: "What happens when a player runs out of balance mid-game?",
    summary:
      "I owned a slice of the billing experience for a cloud gaming product — the part that shows up exactly when someone's having fun and the money runs out. Getting that moment right meant sitting between user trust, revenue, and engineering constraints, and deciding what actually deserved to be fixed first.",
    tags: ["Product strategy", "UX", "Monetization", "Cross-functional"],
    art: "cloudsky",
    sections: buildSections({
      overview:
        "I owned a slice of the billing experience for a cloud gaming product — the part that shows up exactly when someone's having fun and the money runs out. Getting that moment right meant sitting between user trust, revenue, and engineering constraints, and deciding what actually deserved to be fixed first.",
      question: "What happens when a player runs out of balance mid-game?",
    }),
  },
  sidequest: {
    id: "sidequest",
    number: "02",
    eyebrow: "PRODUCT + DESIGN + BUILD",
    title: "Sidequest",
    question:
      "Why do activity apps recommend things without knowing what I can actually afford?",
    summary:
      "A concept I designed and built end to end, where budget is part of the recommendation instead of an asterisk at checkout. 'What can I do tonight' should already know what's in your wallet.",
    tags: ["0→1", "Research", "Interaction design", "Frontend"],
    art: "sidequest",
    sections: buildSections({
      overview:
        "A concept I designed and built end to end, where budget is part of the recommendation instead of an asterisk at checkout. 'What can I do tonight' should already know what's in your wallet.",
      question:
        "Why do activity apps recommend things without knowing what I can actually afford?",
    }),
  },
  honor: {
    id: "honor",
    number: "03",
    eyebrow: "UX / MOTION DESIGN",
    title: "HONOR",
    question:
      "When does motion make an interface easier to understand, rather than just prettier?",
    summary:
      "A motion exploration into the difference between decoration and clarity — using movement to show hierarchy and guide attention on purpose, as part of a system, not a flourish on top of one.",
    tags: ["Motion systems", "Mobile UX", "Prototyping"],
    art: "honor",
    sections: buildSections({
      overview:
        "A motion exploration into the difference between decoration and clarity — using movement to show hierarchy and guide attention on purpose, as part of a system, not a flourish on top of one.",
      question:
        "When does motion make an interface easier to understand, rather than just prettier?",
    }),
  },
};

export const projectList = PROJECT_ORDER.map((id) => PROJECTS[id]);
