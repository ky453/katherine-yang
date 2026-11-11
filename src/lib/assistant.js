import { KNOWLEDGE, SOURCES } from "../../content/katherineKnowledge.js";
import { NOTE_SUMMARIES } from "../../content/assistantSummaries.js";

export const MAX_QUESTION_LENGTH = 1000;
export const MAX_HISTORY_MESSAGES = 8;

const STOP_WORDS = new Set("a an and are as at be been can did do does for from had has have her how i in is it katherine me more of on or she some tell that the their there these they this to was were what when where which who why with would about you your".split(" "));
const tokens = (text) => text.toLowerCase().replace(/[^a-z0-9-]/g, " ").split(/\s+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word));

export function sourcesFor(ids) {
  return [...new Set(ids)].filter((id) => typeof id === "string" && Object.hasOwn(SOURCES, id)).map((id) => SOURCES[id]);
}

export function findNotes(question) {
  const lower = question.toLowerCase();
  const words = tokens(question);
  return KNOWLEDGE.map((note) => {
    let score = 0;
    for (const keyword of note.keywords) {
      if (lower.includes(keyword)) score += keyword.includes(" ") ? 12 : /^internships?$/.test(keyword) ? 4 : 6;
    }
    const title = note.title.toLowerCase();
    score += words.filter((word) => title.includes(word)).length * 2;
    return { note, score };
  }).filter(({ score }) => score >= 6).sort((a, b) => b.score - a.score).map(({ note }) => note);
}

export function answerFromNotes(question, history = []) {
  const unknown = {
    answer: "I don't have that detail in Katherine's portfolio notes. You can ask about her internships, AI projects, user research, or technical work, or contact Katherine directly for more information.",
    sourceIds: [], mode: "notes",
  };
  // A topic name alone must not turn a question about unknown private details into a claim.
  if (/salary|compensation|visa|work authorization|birth(day|date)|home address|phone number|relationship|hiring availability/i.test(question)) return unknown;
  let matches = findNotes(question);
  if (!matches.length && /^(tell me more|go on|what else|more details)[?.!\s]*$/i.test(question.trim())) {
    const previous = history.findLast((message) => message.role === "user");
    matches = findNotes(previous?.content || "");
  }
  if (!matches.length) return unknown;
  const selected = matches.slice(0, /compare|difference|both/i.test(question) ? 2 : 1);
  return {
    answer: selected.map((note) => /more detail|tell me more|go on|walk me through|in depth|expand/i.test(question)
      ? `### ${note.title}\n\n${note.text}`
      : NOTE_SUMMARIES[note.id] || `### ${note.title}\n\n${note.text}`).join("\n\n"),
    sourceIds: sourcesFor(selected.flatMap((note) => note.sourceIds)).map((source) => source.id),
    mode: "notes",
  };
}

export async function requestAnswer(endpoint, question, history, signal) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history: history.slice(-MAX_HISTORY_MESSAGES) }),
    signal,
  });
  if (!response.ok) {
    if (response.status === 429) throw new Error("A few too many questions at once. Please try again in a minute.");
    throw new Error("The AI assistant is unavailable right now. Please try again, or read the portfolio notes below.");
  }
  const data = await response.json();
  if (typeof data.answer !== "string" || !data.answer.trim() || !Array.isArray(data.sourceIds)) {
    throw new Error("That answer couldn't be loaded. Please try again.");
  }
  return { answer: data.answer, sourceIds: sourcesFor(data.sourceIds).map((source) => source.id), mode: "ai" };
}
