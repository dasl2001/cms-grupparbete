// utils/safeRichText.js
import { renderRichText } from "@storyblok/react/rsc";

export function renderSbText(value) {
  // Rich Text?
  if (value && typeof value === "object" && value.type === "doc" && Array.isArray(value.content)) {
    return renderRichText(value);
  }
  // Vanligt textfält (string)?
  if (typeof value === "string") {
    return <p>{value}</p>;
  }
  // Tomt eller okänt format → rendera inget
  return null;
}
