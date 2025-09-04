/*
ImageBanner-komponenten visar en stor klickbar bild 
*/
export default function ImageBanner({ blok }) {

/*
Hämta bildens URL från Storyblok (om den finns)
*/
  const img = blok.image?.filename;

/*
Hämta länkens URL från Storyblok (om den finns), annars undefined
*/
  const href = blok.link?.cached_url ? `/${blok.link.cached_url}` : undefined;
  return (
/*
Sektion som centrerar innehållet och sätter maxbredd
*/
    <section className="mx-auto max-w-6xl px-4">

{/* 
Gör hela bannern klickbar med en <a>-tagg 
*/}
      <a href={href} className="block">

{/* 
Wrapper med fixad höjd/bredd (16:6), ljusgrå bakgrund, rundade hörn 
*/}
        <div className="aspect-[16/6] bg-neutral-200 rounded-2xl overflow-hidden">


{/* 
Visa bilden om den finns, annars bara den grå bakgrunden 
*/}
          {img && (
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </a>
    </section>
  );
}
