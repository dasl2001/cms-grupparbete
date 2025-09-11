export function richTextToPlain(richtext) {

/*
Om richtext saknas eller inte har ett content-fält som är en array → returnera tom sträng
*/
  if (!richtext || !Array.isArray(richtext.content)) return "";

/*
Annars: loopa igenom alla "block" i richtexten
*/
  return richtext.content
    .map((block) => {

/*
Om blocket har ett content-fält 
*/
      if (Array.isArray(block.content)) {
/*
Loopa igenom inner-content och plocka ut texten
*/
        return block.content.map((inner) => inner.text || "").join("");
      }

/*
Om blocket inte har content → returnera tom sträng
*/
      return "";
    })

/*
Slå ihop alla block med radbrytning
*/
    .join("\n")

/*
Trimma bort onödiga mellanslag i början/slutet
*/
    .trim();
}
