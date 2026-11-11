import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SUGGESTED_QUESTIONS } from "../../content/katherineKnowledge.js";
import { MAX_QUESTION_LENGTH, sourcesFor } from "../lib/assistant.js";
import { useAssistant } from "../lib/assistantContext.js";
import { assetUrl } from "../lib/assets.js";
import AssistantAnswer from "./AssistantAnswer";
import "./AskKatherine.css";

export default function AskKatherine({ inline = false }) {
  const { messages, pending, error, notesMode, ask, startOver, readNotes } = useAssistant();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const conversationRef = useRef(null);
  const restoreFocus = useRef(true);
  const awaitingAnswer = useRef(false);

  useEffect(() => {
    if (!open || inline) return;
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
  }, [open, inline]);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (!conversation) return;
    if (pending || error) conversation.scrollTop = conversation.scrollHeight;
    else if (messages.length) {
      // Keep the beginning of a new answer visible instead of jumping to its sources.
      const latest = conversation.querySelector(".ask-katherine-message:last-child");
      if (latest) conversation.scrollTop += latest.getBoundingClientRect().top - conversation.getBoundingClientRect().top - 16;
    }
    if (!pending && awaitingAnswer.current) {
      awaitingAnswer.current = false;
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [messages, pending, error]);

  function submit(value, retry = false) {
    if (!value.trim() || pending) return;
    awaitingAnswer.current = true;
    setQuestion("");
    ask(value, retry);
  }

  const panel = (
    <div className="ask-katherine-panel">
      <header className="ask-katherine-header">
        <div>
          <h2 id="ask-katherine-title" className="ask-katherine-title">Ask Katherine</h2>
        </div>
        {!inline && <button type="button" className="ask-katherine-close" onClick={() => setOpen(false)} aria-label="Close Ask Katherine">×</button>}
      </header>
      <div className="ask-katherine-mode" id="ask-katherine-description">
        <span className={`ask-katherine-dot${notesMode ? "" : " ask-katherine-dot--ai"}`} aria-hidden="true" />
        {notesMode ? "Prepared portfolio notes" : "AI portfolio assistant"}
      </div>
      <div className="ask-katherine-conversation" ref={conversationRef}>
        {messages.length === 0 && (
          <div className="ask-katherine-welcome">
            <div className="ask-katherine-suggestions" aria-label="Suggested questions">
              {SUGGESTED_QUESTIONS.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => submit(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        <div role="log" aria-label="Conversation with the portfolio guide" aria-live="polite" aria-relevant="additions" className="ask-katherine-messages">
          {messages.map((message) => (
            <article className={`ask-katherine-message ask-katherine-message--${message.role}`} key={message.id}>
              <span className="ask-katherine-message-label">{message.role === "user" ? "You" : message.mode === "notes" ? "Portfolio notes" : "AI assistant"}</span>
              {message.role === "assistant" ? <AssistantAnswer text={message.content} /> : <p>{message.content}</p>}
              {message.sourceIds?.length > 0 && (
                <nav className="ask-katherine-sources" aria-label="Answer sources">
                  <span className="ask-katherine-source-label">Sources</span>
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
        {pending && <p className="ask-katherine-thinking" role="status">Preparing answer…</p>}
        {error && (
          <div className="ask-katherine-error" role="alert">
            <p>{error.message}</p>
            <button type="button" onClick={() => submit(error.question, true)}>Try again</button>
            <button type="button" onClick={readNotes}>Read portfolio notes</button>
          </div>
        )}
      </div>
      <div className="ask-katherine-bottom">
        {messages.length > 0 && <button type="button" className="ask-katherine-reset" onClick={() => { startOver(); setQuestion(""); inputRef.current?.focus(); }}>New conversation</button>}
        <form className="ask-katherine-form" onSubmit={(event) => { event.preventDefault(); submit(question); }}>
          <label className="ask-katherine-sr-only" htmlFor="ask-katherine-input">Your question about Katherine</label>
          <textarea id="ask-katherine-input" ref={inputRef} value={question} rows={2}
            maxLength={MAX_QUESTION_LENGTH} placeholder="Ask about my experience or projects" disabled={pending}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault(); submit(question);
              }
            }} />
          <button type="submit" disabled={pending || !question.trim()} aria-label="Send question"><span aria-hidden="true">↑</span></button>
        </form>
        <p className="ask-katherine-footnote">{notesMode ? "Prepared notes, not live AI. " : "AI answers may be inaccurate. Questions are sent to OpenAI. "}<a href="mailto:ky453@cornell.edu">Contact Katherine</a></p>
      </div>
    </div>
  );

  if (inline) return (
    <section className="home-ai-guide" id="home-ask-katherine" aria-labelledby="ask-katherine-title">
      <div className="ask-katherine-inline">{panel}</div>
    </section>
  );

  return <>
    <button type="button" className="ask-katherine-launcher" ref={triggerRef}
      aria-haspopup="dialog" aria-controls="ask-katherine-dialog" aria-expanded={open}
      onClick={() => setOpen(true)}>
      Ask Katherine
    </button>
    {createPortal(
      <dialog className="ask-katherine-dialog" id="ask-katherine-dialog" ref={dialogRef}
        aria-labelledby="ask-katherine-title" aria-describedby="ask-katherine-description"
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}>
        {panel}
      </dialog>, document.body,
    )}
  </>;
}
