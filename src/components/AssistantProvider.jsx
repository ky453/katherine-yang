import { useEffect, useRef, useState } from "react";
import { AssistantContext } from "../lib/assistantContext.js";
import { answerFromNotes, MAX_QUESTION_LENGTH, requestAnswer } from "../lib/assistant.js";

const ENDPOINT = (import.meta.env.VITE_ASK_KATHERINE_URL || "").trim();

export default function AssistantProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [notesMode, setNotesMode] = useState(!ENDPOINT);
  const controllerRef = useRef(null);
  const messageNumber = useRef(0);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function ask(value, retry = false) {
    const text = value.trim();
    if (!text || text.length > MAX_QUESTION_LENGTH || controllerRef.current) return;
    const history = retry ? error.history : messages.map(({ role, content }) => ({ role, content: content.slice(0, 1800) }));
    const controller = new AbortController();
    controllerRef.current = controller;
    setError(null);
    if (!retry) setMessages((previous) => [...previous, { id: ++messageNumber.current, role: "user", content: text }]);
    setPending(true);
    try {
      const result = notesMode
        ? answerFromNotes(text, history)
        : await requestAnswer(ENDPOINT, text, history, AbortSignal.any([controller.signal, AbortSignal.timeout(30000)]));
      if (controller.signal.aborted) return;
      setMessages((previous) => [...previous, {
        id: ++messageNumber.current, role: "assistant", content: result.answer,
        sourceIds: result.sourceIds, mode: result.mode,
      }]);
    } catch (failure) {
      if (!controller.signal.aborted) setError({ question: text, history, message: failure.name === "TimeoutError" ? "The answer is taking longer than expected. Please try again, or read the portfolio notes." : failure.message });
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setPending(false);
      }
    }
  }

  function startOver() {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setPending(false);
    setMessages([]);
    setError(null);
    setNotesMode(!ENDPOINT);
  }

  function readNotes() {
    const result = answerFromNotes(error.question, error.history);
    setMessages((previous) => [...previous, {
      id: ++messageNumber.current, role: "assistant", content: result.answer,
      sourceIds: result.sourceIds, mode: "notes",
    }]);
    setNotesMode(true);
    setError(null);
  }

  return <AssistantContext value={{ messages, pending, error, notesMode, ask, startOver, readNotes }}>{children}</AssistantContext>;
}
