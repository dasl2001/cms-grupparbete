import { getStoryblokApi } from "@storyblok/react/rsc";
import ProductCard from "./ProductCard";

export default async function ProductList({ blok }) {

/*
Skapa en Storyblok-klient
*/  
  const sb = getStoryblokApi();

/*
Läs inställningar från blok i Storyblok
productFolder = mapp där produkterna ligger (default "products")
limit = max antal produkter att visa (default 8)

*/
  const folder = blok.productFolder || "products";
  const limit = blok.limit || 8;

/*
Hämta produkter från Storyblok
bara sidor i t.ex. "products/"
bara stories av typen "product"
bara publicerade (ändra till "draft" i dev om du vill se opublicerat)
antal att hämta
sortera på senaste publicerade
*/
  const { data } = await sb.get("cdn/stories", {
    starts_with: `${folder}/`,
    content_type: "product",            
    version: "published",               
    per_page: limit,
    sort_by: "published_at:desc",
  });

/*
Produkterna kommer som "stories" i Storyblok-svaret
*/
  const products = data?.stories || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">

{/* 
Rubrik 
*/}      
      {blok.title && <h2 className="text-lg font-semibold mb-4">{blok.title}</h2>}

{/* 
Grid med produkterna 
*/}      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.uuid} story={p} />)}
      </div>
    </section>
  );
}

