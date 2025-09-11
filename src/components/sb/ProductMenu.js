/*
Hämtar kategorier från Storyblok (fältet "categories")
Om det inte är en array, blir det en tom array istället.
*/
export default function ProductMenu({ blok }) {
  const cats = Array.isArray(blok.categories) ? blok.categories : [];

  return (
/* 
Flexbox som rad med mellanrum och bryts på små skärmar 
*/    
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="flex gap-2 flex-wrap">

{/*
loopar igenom kategorierna och gör en <a>-länk för varje.
href → länken skickar användaren till /products?cat=KategoriNamn.
*/}
        {cats.map((c) => (
          <a
            key={c}
            href={`/products?cat=${c}`}
            className="px-3 py-1 border rounded text-sm"
          >
            {c}
          </a>
        ))}

{/* 
Extra knapp för att visa ALLA produkter 
*/}        
        <a href="/products" className="px-3 py-1 border rounded text-sm">
          All
        </a>
      </div>
    </div>
  );
}
