import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { KNOWLEDGE, SOURCES, SUGGESTED_QUESTIONS } from "../content/katherineKnowledge.js";
import { answerFromNotes, findNotes, requestAnswer, sourcesFor } from "../src/lib/assistant.js";

test("suggested questions lead to the intended notes without a configured model", () => {
  const expected = ["internships", "ai-overview", "duolingo", "movies"];
  SUGGESTED_QUESTIONS.forEach((question, index) => assert.equal(findNotes(question)[0]?.id, expected[index], question));
});

test("specific questions find payments, storage, agents, and attribution", () => {
  for (const [question, id] of [
    ["What did Katherine do at CloudSky?", "cloudsky"],
    ["Tell me about her CloudSky internship", "cloudsky"],
    ["Tell me about her Alipay payment requirements", "payments"],
    ["How did the data disk renewal work?", "storage"],
    ["What did she learn about RAG chunking?", "agents-rag"],
    ["Did she cause the 66% growth?", "growth"],
    ["What is PantryPilot?", "pantry"],
    ["What did she do at HONOR?", "honor"],
    ["What was her role at China Merchants Bank?", "bank"],
    ["Can she code in Python?", "skills"],
    ["How can I contact Katherine?", "contact"],
  ]) assert.equal(findNotes(question)[0]?.id, id, question);
});

test("notes preserve the growth attribution boundary and unknown details", () => {
  assert.match(answerFromNotes("Did Katherine cause the growth?").answer, /not results causally attributed/);
  for (const question of ["What is her salary at CloudSky?", "What is the weather?", "Does Katherine have work authorization?"]) {
    const answer = answerFromNotes(question);
    assert.match(answer.answer, /don't have that detail/);
    assert.deepEqual(answer.sourceIds, []);
  }
});

test("notes support a contextual follow-up and report their actual mode", () => {
  const answer = answerFromNotes("Tell me more", [{ role: "user", content: "What is PantryPilot?" }]);
  assert.equal(answer.mode, "notes");
  assert.match(answer.answer, /WebLLM/);
});

test("public knowledge is English and references approved sources", () => {
  assert.equal(new Set(KNOWLEDGE.map((note) => note.id)).size, KNOWLEDGE.length);
  for (const note of KNOWLEDGE) {
    assert.doesNotMatch(note.text, /[\u3400-\u9fff]/);
    assert.ok(note.sourceIds.every((id) => Object.hasOwn(SOURCES, id)));
  }
  assert.ok(existsSync(new URL("../public/assets/Katherine_Yang_PM_Resume.pdf", import.meta.url)));
  assert.deepEqual(sourcesFor(["resume", "javascript:alert(1)", "resume", "constructor", null, { toString: null }]), [SOURCES.resume]);
});

test("client handles rate limits, malformed replies, and unapproved citations", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => new Response("", { status: 429 });
  await assert.rejects(requestAnswer("/api/ask", "Hello", []), /try again in a minute/);
  globalThis.fetch = async () => Response.json({ answer: "", sourceIds: [] });
  await assert.rejects(requestAnswer("/api/ask", "Hello", []), /couldn't be loaded/);
  globalThis.fetch = async () => Response.json({ answer: "An answer.", sourceIds: ["resume", "https://untrusted.example/"] });
  const result = await requestAnswer("/api/ask", "Hello", []);
  assert.deepEqual(result.sourceIds, ["resume"]);
  assert.equal(result.mode, "ai");
});
