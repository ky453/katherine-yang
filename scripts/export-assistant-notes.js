import { mkdirSync, writeFileSync } from "node:fs";
import { KNOWLEDGE } from "../content/katherineKnowledge.js";

const outputDirectory = new URL("../public/assets/", import.meta.url);
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(new URL("katherine-project-notes.txt", outputDirectory), [
  "KATHERINE YANG — PORTFOLIO NOTES",
  "Compiled in English from Katherine's supplied résumé, supplemental project descriptions, and existing portfolio case studies. Interview-coaching instructions and speculative growth explanations are excluded.",
  ...KNOWLEDGE.map((note) => `${note.title}\n\n${note.text}`),
].join("\n\n────────────────────────────────────────\n\n") + "\n");
