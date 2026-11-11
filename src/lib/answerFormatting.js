// A deliberately small text format: headings, lists, paragraphs, and bold.
// HTML, images, and generated links are never interpreted or made interactive.
export function parseInline(text) {
  return text.split(/(\*\*[^*\n]+\*\*)/g).filter(Boolean).map((part) => (
    part.startsWith("**") && part.endsWith("**")
      ? { text: part.slice(2, -2), bold: true }
      : { text: part, bold: false }
  ));
}

function readableParagraphs(text) {
  if (text.split(/\s+/).length <= 65) return [text];
  const sentences = text.match(/.+?(?:[.!?](?:[”"'])?\s+|$)/g) || [text];
  const paragraphs = [];
  let current = "";
  for (const sentence of sentences) {
    if (current && `${current} ${sentence}`.split(/\s+/).length > 55) {
      paragraphs.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs;
}

export function parseAnswer(text) {
  const blocks = [];
  let paragraph = [];
  function flush() {
    if (paragraph.length) {
      blocks.push(...readableParagraphs(paragraph.join(" ")).map((content) => ({ type: "paragraph", text: content })));
      paragraph = [];
    }
  }
  for (const raw of text.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const heading = /^#{1,4}\s+(.+?)\s*#*$/.exec(line);
    const item = /^(?:([-*•])|\d+[.)])\s+(.+)$/.exec(line);
    if (heading) {
      flush(); blocks.push({ type: "heading", text: heading[1] });
    } else if (item) {
      flush();
      const type = item[1] ? "list" : "ordered-list";
      const previous = blocks.at(-1);
      if (previous?.type === type) previous.items.push(item[2]);
      else blocks.push({ type, items: [item[2]] });
    } else paragraph.push(line);
  }
  flush();
  return blocks;
}
