export function richTextToPlain(richtext) {
  if (!richtext || !Array.isArray(richtext.content)) return "";

  return richtext.content
    .map((block) => {
      if (Array.isArray(block.content)) {
        return block.content.map((inner) => inner.text || "").join("");
      }
      return "";
    })
    .join("\n")
    .trim();
}
