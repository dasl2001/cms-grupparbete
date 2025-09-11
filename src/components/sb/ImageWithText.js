/*
En React-komponent som tar emot ett objekt blok (från Storyblok).
blok innehåller de fält som redaktören fyller i (t.ex. title och text).
*/
export default function ImageWithText({ blok }) {
  return (

/*
Wrapper med Tailwind CSS-klasser:
mx-auto → centrerar sektionen horisontellt
max-w-3xl → maxbredd ca 768px
px-4 py-10 → padding (16px på sidorna, 40px top/botten)
text-center → centrerar all text
*/
    <section className="mx-auto max-w-3xl px-4 py-10 text-center">

{/* 
Rubrik 
*/}
      {blok.title && (
        <h2 className="text-2xl font-semibold">{blok.title}</h2>
      )}

{/* 
Text 
*/}
      {blok.text && (
        <p className="mt-4 text-sm text-neutral-700 whitespace-pre-line">
          {blok.text}
        </p>
      )}
    </section>
  );
}


