import test from "node:test";
import assert from "node:assert/strict";
import { parseAnswer, parseInline } from "../src/lib/answerFormatting.js";
import { answerFromNotes } from "../src/lib/assistant.js";
import { KNOWLEDGE } from "../content/katherineKnowledge.js";
import { NOTE_SUMMARIES } from "../content/assistantSummaries.js";

test("answers preserve paragraph, heading, list, and inline emphasis hierarchy", () => {
  const blocks = parseAnswer("A short answer.\n\n### Her contribution\n- **Research:** Customer feedback.\n- **Delivery:** Product requirements.\n\nContext stays separate.");
  assert.deepEqual(blocks.map((block) => block.type), ["paragraph", "heading", "list", "paragraph"]);
  assert.equal(blocks[2].items.length, 2);
  assert.deepEqual(parseInline(blocks[2].items[0]), [{ text: "Research:", bold: true }, { text: " Customer feedback.", bold: false }]);
});

test("numbered lists and Windows line endings remain readable", () => {
  assert.deepEqual(parseAnswer("### Steps\r\n1. Read the brief.\r\n2. Compare options."), [
    { type: "heading", text: "Steps" },
    { type: "ordered-list", items: ["Read the brief.", "Compare options."] },
  ]);
});

test("legacy prose gets paragraph breaks without dropping or reordering text", () => {
  const sentence = "Katherine mapped cross-platform payment flows and documented edge cases so design and engineering could work from clear requirements. ";
  const text = `Her GPA is 4.004. ${sentence.repeat(7)}`.trim();
  const blocks = parseAnswer(text);
  assert.ok(blocks.length > 1);
  assert.ok(blocks.every((block) => block.type === "paragraph"));
  assert.equal(blocks.map((block) => block.text).join(" "), text);
});

test("HTML and generated links remain inert text", () => {
  const text = '<img src=x onerror="alert(1)"> [click](javascript:alert(1))';
  assert.deepEqual(parseAnswer(text), [{ type: "paragraph", text }]);
  assert.deepEqual(parseInline(text), [{ text, bold: false }]);
});

test("every note has a concise English presentation and detailed follow-ups remain available", () => {
  for (const note of KNOWLEDGE) {
    const summary = NOTE_SUMMARIES[note.id];
    assert.ok(summary, note.id);
    assert.ok(summary.split(/\s+/).length <= 140, note.id);
    assert.doesNotMatch(summary, /[\u3400-\u9fff]/);
    if (note.id !== "contact") assert.ok(parseAnswer(summary).some((block) => block.type === "list"), note.id);
  }
  const answer = answerFromNotes("What did she do at CloudSky?");
  assert.match(answer.answer, /### What she contributed/);
  const details = answerFromNotes("Tell me more", [{ role: "user", content: "What did she do at CloudSky?" }]);
  assert.ok(details.answer.includes(KNOWLEDGE.find((note) => note.id === "cloudsky").text));
});
