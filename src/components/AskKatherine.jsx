import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SUGGESTED_QUESTIONS } from "../../content/katherineKnowledge.js";
import { answerFromNotes, MAX_QUESTION_LENGTH, requestAnswer, sourcesFor } from "../lib/assistant.js";
import { assetUrl } from "../lib/assets.js";
import "./AskKatherine.css";

const ENDPOINT = (import.meta.env.VITE_ASK_KATHERINE_URL || "").trim();

export default function AskKatherine() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [notesMode, setNotesMode] = useState(!ENDPOINT);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const controllerRef = useRef(null);
  const restoreFocus = useRef(true);
  const messageNumber = useRef(0);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    inputRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (restoreFocus.current) trigger?.focus({ preventScroll: true });
      restoreFocus.current = true;
    };
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [messages, pending, error]);
  useEffect(() => () => controllerRef.current?.abort(), []);

  async function ask(value, retry = false) {
    const text = value.trim();
    if (!text || text.length > MAX_QUESTION_LENGTH || controllerRef.current) return;
    const history = retry ? error.history : messages.map(({ role, content }) => ({ role, content: content.slice(0, 1800) }));
    const controller = new AbortController();
    controllerRef.current = controller;
    setQuestion("");
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
        inputRef.current?.focus({ preventScroll: true });
      }
    }
  }

  function startOver() {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setPending(false);
    setMessages([]);
    setQuestion("");
    setError(null);
    setNotesMode(!ENDPOINT);
    inputRef.current?.focus();
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

  return (
    <>
      <button type="button" className="ask-katherine-launcher" ref={triggerRef}
        aria-haspopup="dialog" aria-controls="ask-katherine-dialog" aria-expanded={open}
        onClick={() => setOpen(true)}>
        <span className="ask-katherine-spark" aria-hidden="true">✳</span>
        Ask Katherine <span aria-hidden="true">↗</span>
      </button>
      {createPortal(
        <dialog className="ask-katherine-dialog" id="ask-katherine-dialog" ref={dialogRef}
          aria-labelledby="ask-katherine-title" aria-describedby="ask-katherine-description"
          onCancel={(event) => { event.preventDefault(); setOpen(false); }}
          onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}>
          <div className="ask-katherine-panel">
            <header className="ask-katherine-header">
              <div>
                <span className="ask-katherine-eyebrow">A LITTLE MORE CONTEXT</span>
                <h2 id="ask-katherine-title">Ask Katherine<span aria-hidden="true">↗</span></h2>
              </div>
              <button type="button" className="ask-katherine-close" onClick={() => setOpen(false)} aria-label="Close Ask Katherine">×</button>
            </header>
            <div className="ask-katherine-mode" id="ask-katherine-description">
              <span className={`ask-katherine-dot${notesMode ? "" : " ask-katherine-dot--ai"}`} aria-hidden="true" />
              {notesMode ? "Portfolio notes · prepared answers" : "AI guide · grounded in my work"}
            </div>
            <div className="ask-katherine-conversation">
              {messages.length === 0 && (
                <div className="ask-katherine-welcome">
                  <span className="hand">the story behind the résumé</span>
                  <h3>What are you<br />curious about?</h3>
                  <p>{notesMode
                    ? "Explore prepared English notes about my internships, projects, and how I work. These answers come from my résumé and project descriptions."
                    : "An AI guide to my internships, projects, and how I work, using my résumé and project notes. It can make mistakes; follow the sources for context."}</p>
                  <div className="ask-katherine-suggestions" aria-label="Suggested questions">
                    {SUGGESTED_QUESTIONS.map((suggestion) => (
                      <button type="button" key={suggestion} onClick={() => ask(suggestion)}>
                        {suggestion}<span aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div role="log" aria-label="Conversation with the portfolio guide" aria-live="polite" aria-relevant="additions" className="ask-katherine-messages">
                {messages.map((message) => (
                  <article className={`ask-katherine-message ask-katherine-message--${message.role}`} key={message.id}>
                    <span className="ask-katherine-message-label">{message.role === "user" ? "YOU" : message.mode === "notes" ? "FROM THE PORTFOLIO NOTES" : "KATHERINE’S AI GUIDE"}</span>
                    <p>{message.content}</p>
                    {message.sourceIds?.length > 0 && (
                      <nav className="ask-katherine-sources" aria-label="Answer sources">
                        {sourcesFor(message.sourceIds).map((source) => {
                          const internal = source.href.startsWith("#/");
                          return <a key={source.id} href={internal ? source.href : assetUrl(source.href)}
                            target={internal ? undefined : "_blank"} rel={internal ? undefined : "noreferrer"}
                            onClick={() => { if (internal) { restoreFocus.current = false; setOpen(false); } }}>
                            {source.label} <span aria-hidden="true">↗</span>
                          </a>;
                        })}
                      </nav>
                    )}
                  </article>
                ))}
              </div>
              {pending && <p className="ask-katherine-thinking" role="status">Looking through Katherine’s work<span aria-hidden="true">…</span></p>}
              {error && (
                <div className="ask-katherine-error" role="alert">
                  <p>{error.message}</p>
                  <button type="button" onClick={() => ask(error.question, true)}>Try again</button>
                  <button type="button" onClick={readNotes}>Read portfolio notes</button>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="ask-katherine-bottom">
              {messages.length > 0 && <button type="button" className="ask-katherine-reset" onClick={startOver}>Start a new conversation ↻</button>}
              <form className="ask-katherine-form" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
                <label className="ask-katherine-sr-only" htmlFor="ask-katherine-input">Your question about Katherine</label>
                <textarea id="ask-katherine-input" ref={inputRef} value={question} rows={2}
                  maxLength={MAX_QUESTION_LENGTH} placeholder="Ask about my work…" disabled={pending}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                      event.preventDefault(); ask(question);
                    }
                  }} />
                <button type="submit" disabled={pending || !question.trim()} aria-label="Send question"><span aria-hidden="true">↑</span></button>
              </form>
              <p className="ask-katherine-footnote">{notesMode ? "Prepared notes, not live AI. " : "Questions are sent to OpenAI. "}For a conversation with me, <a href="mailto:ky453@cornell.edu">say hello ↗</a></p>
            </div>
          </div>
        </dialog>, document.body,
      )}
    </>
  );
}
