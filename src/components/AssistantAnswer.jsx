import { parseAnswer, parseInline } from "../lib/answerFormatting.js";

function Inline({ text }) {
  return parseInline(text).map((part, index) => part.bold ? <strong key={index}>{part.text}</strong> : part.text);
}

export default function AssistantAnswer({ text, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return <div className="ask-katherine-answer">{parseAnswer(text).map((block, index) => {
    if (block.type === "heading") return <Heading key={index}><Inline text={block.text} /></Heading>;
    if (block.type === "list" || block.type === "ordered-list") {
      const List = block.type === "list" ? "ul" : "ol";
      return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}><Inline text={item} /></li>)}</List>;
    }
    return <p key={index}><Inline text={block.text} /></p>;
  })}</div>;
}
