/*
Importera hjälpfunktionerna för att prata med Storyblok.
Vår helper som kan rendera både Rich Text-fält och vanliga textfält säkert.
Komponent för filter-menyn (kategorier).
Komponent som listar produkter i en grid.
*/
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import { renderSbText } from "@/utils/safeRichText";
import ShopMenu from "@/components/sb/ShopMenu";
import ProductsGrid from "@/components/sb/ProductsGrid";


/*
I Next.js 15 är searchParams asynkron → därför await
Vi plockar ut "category" (t.ex. ?category=away), annars använder vi "all"
*/
export default async function ProductsPage({ searchParams }) {
  const { category = "all" } = (await searchParams) ?? {};

/*
Hämta Storyblok API-instansen.
*/
  const sb = getStoryblokApi();

/*
Hämta innehållet för sidan "products" från Storyblok.
published i prod, draft i development.
*/
  const { data } = await sb.get("cdn/stories/products", { version: getStoryblokVersion() });

/*
Plocka ut sidans innehåll och hjälpare för att hitta hero-komponenten.
*/
  const content = data?.story?.content || {};

/*
body innehåller block (t.ex. hero, textblock).
*/
  const body = Array.isArray(content.body) ? content.body : [];

/*
Leta upp hero-blocket.
*/
  const hero = body.find((b) => b.component === "hero");

/*
Rubriken → försök ta från hero.title, annars från sidans titel.
*/
  const title = hero?.title || content.title || "See our products";

/*
Stöd för både Rich Text-fält ("text") och vanligt textfält (t.ex. "textfield", "subtitle")
Texten → funkar oavsett om fältet är Rich Text eller vanligt textfält.
*/
  const rawHeroText = hero?.text ?? hero?.textfield ?? content.text ?? content.subtitle;

  return (
    <main>

{/* 
Hero-del utan bild: bara rubrik + text 
*/}        
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold">{title}</h1>

{/* 
Rendera texten (rich text eller plain) med vår helper 
*/}
        <div className="mt-2 text-sm text-neutral-600 max-w-2xl mx-auto">
          {renderSbText(rawHeroText) || (
            <p>Discover our latest football jerseys. Click a product to view details.</p>
          )}
        </div>

{/* 
 Filter-menyn (ShopMenu) 
*/}
        <div className="mt-5 flex justify-center">
          <ShopMenu active={category} />
        </div>
      </section>

{/* 
Själva produktgridden 
*/}
      <section className="mx-auto max-w-6xl px-4 pb-16">

{/* 
Visar 8 produkter per sida och filtrerar på category 
*/}
        <ProductsGrid perPage={8} category={category} />
      </section>
    </main>
  );
}

