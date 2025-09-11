export default function ImageBanner({ blok }) {

/*
Om det finns en länk i Storyblok (t.ex. till en sida eller produkt)
så används den som href, annars undefined (dvs ingen länk).
*/
  const href = blok.link?.cached_url ? `/${blok.link.cached_url}` : undefined;

  return (
    <section className="bg-neutral-200">

{/* 
Banner är klickbar bara om href finns 
*/}      
      <a href={href} className="block">

 {/* 
 Om det finns en bild i Storyblok 
 */}        
        {blok.image?.filename ? (
          <img
            src={blok.image.filename} //bildens URL
            alt="" //alt-text är tom eftersom bilden är dekorativ

/*
fyller hela bredden
ehåller 16:6 proportion på små skärmar
beskär bilden snyggt
på medium skärmar ändra proportion → 16:5
på stora skärmar → 16:4
*/
            className="w-full aspect-[16/6] object-cover md:aspect-[16/5] lg:aspect-[16/4]"
          />
        ) : (

/*
Fallback om ingen bild är uppladdad
*/
          <div className="mx-auto max-w-6xl px-4 aspect-[16/6] md:aspect-[16/5]" />
        )}
      </a>
    </section>
  );
}


