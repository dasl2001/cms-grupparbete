/*
Hämtar hjälpare för Storyblok: API-instans + vilken version ("draft"/"published") vi ska läsa.
Next.js Image för optimerade bilder
notFound() visar Next.js 404-sida
Köp-knapp
*/
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/sb/AddToCartButton";

/*
Liten hjälpare: normaliserar Storybloks "//a.storyblok.com/..." till giltig "https://..."
*/
const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);


/*
En enkel RichText→plain-text transformer (räcker för beskrivningar).
*/
function richTextToPlain(richtext) {
  if (!richtext || typeof richtext !== "object" || !Array.isArray(richtext.content)) return "";
  return richtext.content
    .map((block) =>
      Array.isArray(block.content) ? block.content.map((inner) => inner.text || "").join("") : ""
    )
    .join("\n")
    .trim();
}

/*
Viktigt i Next 15: props som `params` är ASYNKRONA i serverkomponenter.
Eftersom vi använder catch-all route ([...slug]) får vi en ARRAY och behöver join:a den.
Next 15: params är async + [...slug] => array
*/
export default async function ProductPage({ params }) {

/*
Vänta in params och bygg en slug-sträng (t.ex. ["real-madrid-away-25-26"] -> "real-madrid-away-25-26")
*/
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

/*
Hämta Storyblok-API-instansen.
*/
  const sb = getStoryblokApi();

/*
Försök hämta en specifik produktstory under "products/<slug>".
*/
  let data;
  try {
    ({ data } = await sb.get(`cdn/stories/products/${slugPath}`, {
      version: getStoryblokVersion(),
    }));
  } catch {

/*
Om Storyblok svarar 401/404 etc. → visa 404-sidan.
*/
    return notFound();
  }

/*
Storyn innehåller själva produkten.
*/
  const story = data?.story;
  if (!story) return notFound();

/*
Content är fältobjektet du definierar i Storyblok schemat.
*/
  const c = story.content || {};

/*
Välj bild: först "image", annars första posten i "images"
*/
  const filename =
    c.image?.filename ||
    (Array.isArray(c.images) && c.images[0]?.filename) ||
    null;
  const img = filename ? norm(filename) : null;

/*
Gör om Rich Text-beskrivningen till ren text (om fältet finns).
*/
  const descPlain = c.description ? richTextToPlain(c.description) : "";

/*
Stöd för både single-fält (color) och multioption-fält (colors)
*/
  const rawColors = Array.isArray(c.colors) ? c.colors : c.color ? [c.color] : [];

/*
Normalisera till { label, value }.
*/
  const colors = rawColors.map((item) =>
    typeof item === "string"
      ? { label: item, value: item }
      : { label: item.name || item.value || "Color", value: item.value || item.name }
  );

/*
Hjälp: avgör om värdet kan användas direkt som CSS-färg (hex/namn)
*/
  const isColorValue = (v) =>
    typeof v === "string" &&
    (v.startsWith("#") ||
      ["black","white","red","blue","green","yellow","orange","purple","navy","brown","gray","grey"]
        .includes(v.toLowerCase()));

/* 
Stöd för både single-fält (size) och multioption-fält (sizes) 
Om inget fält finns i Storyblok, fall back till standardlista
*/       
  const sizes = Array.isArray(c.sizes) && c.sizes.length > 0 ? c.sizes : ["XS","S","M","L","XL"];

  return (
/*
Vi ger min-höjd så att absolut placerad bild får utrymme
*/
    <main className="relative mx-auto max-w-6xl px-4 pb-24" style={{ minHeight: 900 }}>
{/*
width: 554px; height: 554px; top: 148px; left: 110px; angle: 0; opacity: 1
*/}
      <div
        className="absolute overflow-hidden rounded-xl bg-gray-100"
        style={{ top: 148, left: 110, width: 554, height: 554, opacity: 1, transform: "rotate(0deg)" }}
      >
        {img && (
          <Image
            src={img}
            alt={c.image?.alt || c.name || story.name}
            fill //fyller container (som vi låst till 554x554)
            className="object-cover object-center"
            sizes="554px" //hjälper Next välja rätt bildstorlek
            priority  //viktigt för "above the fold" bilder
          />
        )}
      </div>

{/* 
INFO-KOLUMN till höger om bilden.
margin-left = 110 (left) + 554 (bildbredd) + 96 (luft) = 760px.
padding-top linjerar topp med bilden. 
*/}
      <div className="relative" style={{ marginLeft: 760, paddingTop: 148 }}>

{/* 
Produktnamn + pris 
*/}        
        <h1 className="text-2xl font-semibold">{c.name || story.name}</h1>
        {c.price && <p className="mt-2 text-lg">{c.price} kr</p>}

{/* 
Färgalternativ (swatches + etikett). 
Visas bara om vi har färger. 
*/}
        {colors.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-medium">Colors</div>
            <div className="mt-2 flex flex-wrap gap-3">
              {colors.map((col, i) => (
                <div key={`${col.label}-${i}`} className="flex items-center gap-2">
                  <span
                    className="inline-block h-6 w-6 rounded-full border"
                    style={isColorValue(col.value) ? { background: col.value } : {}}
                    aria-label={col.label}
                    title={col.label}
                  />
                  <span className="text-sm">{col.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

{/* 
Beskrivning som plain text (radbrytningar bevaras) 
*/}
        {descPlain && <div className="mt-6 text-sm text-neutral-700 whitespace-pre-line">{descPlain}</div>}

{/* 
Storleksknappar (dummy UI – här väljs ingen state än) 
m = margin
t = top
6 = Tailwind spacing-värdet
Enligt Tailwinds standard-skala betyder 6 = 1.5rem = 24px.
mt-6 = lägg till 24px marginal ovanför elementet.
*/}
        <div className="mt-6">
          <div className="text-sm font-medium">Size</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((s, idx) => {
              const label = typeof s === "string" ? s : s.name || s.value || `Size ${idx + 1}`;
              return (
                <button key={`${label}-${idx}`} type="button" className="rounded-md border px-3 py-1 text-sm hover:bg-neutral-50">
                  {label}
                </button>
              );
            })}
          </div>
        </div>

{/* 
Köpknapp – skickar med basinfo om produkten 
mt-8 = lägg till 32px marginal ovanför elementet.
*/}
        <div className="mt-8">
          <AddToCartButton
            product={{ id: story.id, slug: story.full_slug, name: c.name || story.name, price: c.price }}
          />
        </div>
      </div>
    </main>
  );
}
