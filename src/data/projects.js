/* ───────────────────────────────────────────────────────
   PROJECT DATA
   Single source of truth for Home, Work, and project pages.

   To add a project:
   1. Add its id to PROJECT_ORDER (controls sequence + count).
   2. Add a matching entry to PROJECTS below, using
      buildSections() for the standard case-study shape.
   3. Optionally set `thumbnail` to a real project image in public/.
   4. For a custom layout, register a case-study component in
      components/ProjectContent.jsx. Otherwise `sections` render
      automatically. No route or navigation changes are needed.
   ─────────────────────────────────────────────────────── */

export const PROJECT_ORDER = ["cloudsky", "duolingo", "cornell-movies", "recipe-generator", "sidequest", "honor"];
export const FEATURED_PROJECTS = ["cloudsky", "sidequest"];

function buildSections({ overview, question }) {
  return [
    { heading: "Overview", body: overview },
    { heading: "The question", body: question },
  ];
}

function conciseSections({ overview, role, work }) {
  return [
    { heading: "Overview", body: overview },
    { heading: "My role", body: role },
    { heading: "What I worked on", body: work },
  ];
}

export const PROJECTS = {
  cloudsky: {
    id: "cloudsky",
    number: "01",
    eyebrow: "PRODUCT MANAGER INTERN · SHENZHEN · JUL–AUG 2026",
    title: "CloudSky",
    question: "How should a cloud PC product behave across devices and edge cases?",
    summary:
      "At Cloudsky - Panghe Cloud Gaming, I worked on product requirements and user guidance for a cloud PC service, covering cross-platform payment, local-to-cloud workflows, session controls, and edge states.",
    tags: ["Product requirements", "Cross-platform UX", "Payments", "Cloud PC"],
    sections: buildSections({
      overview:
        "At Cloudsky - Panghe Cloud Gaming, I worked on product requirements and user guidance for a cloud PC service, covering cross-platform payment, local-to-cloud workflows, session controls, and edge states. During the internship period, daily new users grew 66%, active users 49%, and paying users 40%; these figures describe the period, not an outcome attributed to my work.",
      question: "How should a cloud PC product behave across devices and edge cases?",
    }),
  },
  sidequest: {
    id: "sidequest",
    number: "05",
    eyebrow: "PERSONAL PRODUCT CONCEPT",
    title: "Sidequest",
    question:
      "Why do activity apps recommend things without knowing what I can actually afford?",
    summary:
      "An activity-discovery concept that uses budget, time, and personal context to shape recommendations, with optional post-activity memories.",
    tags: ["0→1", "Research", "Interaction design", "Frontend"],
    sections: buildSections({
      overview:
        "An activity-discovery concept that uses budget, time, and personal context to shape recommendations, with optional post-activity memories.",
      question:
        "Why do activity apps recommend things without knowing what I can actually afford?",
    }),
  },
  honor: {
    id: "honor",
    number: "06",
    eyebrow: "UX MOTION DESIGN INTERN · SHENZHEN · JUN–AUG 2025",
    title: "HONOR",
    question:
      "When does motion make an interface easier to understand, rather than just prettier?",
    summary:
      "Designed onboarding interactions across phones, tablets, and foldables, collaborating with UI designers and engineers on motion consistency and implementation.",
    tags: ["Motion systems", "Mobile UX", "Prototyping"],
    sections: buildSections({
      overview:
        "Designed onboarding interactions across phones, tablets, and foldables, collaborating with UI designers and engineers on motion consistency and implementation.",
      question:
        "When does motion make an interface easier to understand, rather than just prettier?",
    }),
  },
  duolingo: {
    id: "duolingo",
    number: "02",
    eyebrow: "DIGITAL PRODUCT DESIGN",
    title: "Duolingo Podcast Feature",
    question: "How could language practice help learners feel ready to listen and speak in the real world?",
    summary: "A product design project exploring the gap between gamified lessons and real-world listening and speaking, with a podcast feature as the direction to develop.",
    tags: ["Customer research", "Product strategy", "Usability testing", "Product metrics"],
    thumbnail: "/assets/photos/duolingo-project/hi-fi.png",
    sections: conciseSections({
      overview: "I looked at where gamified language lessons fell short of real-world listening and speaking practice, including confidence, grammar, and context.",
      role: "I conducted qualitative research, compared possible feature directions, and iterated on the podcast concept after usability testing.",
      work: "I weighed podcast learning, AI pronunciation coaching, and peer exchange against user value, feasibility, and scalability. Testing surfaced friction in finding, playing, and saving podcast content. I also defined engagement, completion, and repeat-listening measures for evaluating adoption and learning behavior after launch.",
    }),
  },
  "cornell-movies": {
    id: "cornell-movies",
    number: "03",
    eyebrow: "FULL-STACK COMMUNITY EVENTS PRODUCT",
    title: "Cornell Movies",
    question: "A full-stack product for discovering community events.",
    summary: "A full-stack event discovery product with search, filters, event details, likes, and loading and error states.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    sections: conciseSections({
      overview: "Cornell Movies is a full-stack community events product for discovering events.",
      role: "I built the application and used Codex, Copilot, and AI-assisted debugging to work through implementation and front-end/back-end integration, checking generated code against product requirements and observed behavior.",
      work: "The product supports event search, filtering, event details, likes, and loading and error states. Its stack includes React, Node.js, Express.js, MongoDB, and REST APIs.",
    }),
  },
  "recipe-generator": {
    id: "recipe-generator",
    number: "04",
    eyebrow: "LOCAL LLM · RECIPE ASSISTANT",
    title: "PantryPilot",
    question: "How can a browser-based recipe assistant adapt suggestions to a person's preferences and constraints?",
    summary: "A task-specific recipe assistant using a local browser LLM to shape recipe suggestions around user preferences and constraints.",
    tags: ["Vue.js", "WebLLM", "Prompt engineering", "PWA"],
    sections: conciseSections({
      overview: "I’m building a recipe assistant that runs a local language model in the browser and turns user preferences and constraints into tailored recipe outputs.",
      role: "I used an AI coding agent guided by an AGENTS.md specification to prototype and refine the application, including configurable personas and output formats.",
      work: "The project uses Vue.js and WebLLM. I adjust prompts and response formats while balancing output quality with latency, and have deployed the experience as an installable progressive web app.",
    }),
  },
};

export const projectList = PROJECT_ORDER.map((id) => PROJECTS[id]);
