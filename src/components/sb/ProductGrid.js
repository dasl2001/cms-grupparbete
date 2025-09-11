
import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";

/**
 * richTextToPlain
 * Omvandlar Storybloks RichText (dokumentschema) till en enkel sträng.
 * - Hanterar både objekt (med content-array) och rena strängar.
 * - Returnerar tom sträng om inget innehåll finns.
 */
function richTextToPlain(richtext) {
  if (!richtext) return "";
  if (typeof richtext === "object" && Array.isArray(richtext.content)) {
    return richtext.content
      .map((block) =>
        Array.isArray(block.content)
          ? block.content.map((inner) => inner.text || "").join("")
          : ""
      )
      .join("\n")
      .trim();
  }
  if (typeof richtext === "string") return richtext.trim();
  return "";
}

/**
 * norm
 * Storyblok-bilder kan komma som URL:er som börjar med "//" (protokoll-relative).
 * Denna helper säkrar att vi alltid får ett giltigt https-URL.
 */
const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);

/**
 * ProductGrid
 * Serverkomponent (async) som:
 * 1) Hämtar senaste produktstories från Storyblok (draft-läge)
 * 2) Renderar en grid med bild, namn och pris
 * 3) Har en CTA-länk till /products och valfri introtext
 */
export default async function ProductGrid({ blok }) {
  // Hämta Storyblok-klienten
  const sb = getStoryblokApi();

  // Antal produkter per sida kommer från blok (fallback till 3)
  const perPage = blok?.per_page ?? blok?.number ?? 3;

  // Hämta stories av typen "productDetailPage" under "products/"
  const { data } = await sb.get("cdn/stories", {
    starts_with: "products/",
    content_type: "productDetailPage",
    version: "draft",                // "draft" för förhandsvisning i Storyblok (byt till "published" i produktion)
    per_page: perPage,
    sort_by: "first_published_at:desc", // nyast först
  });

  // Extrahera resultat + rubrik/intro från blok
  const products = data?.stories ?? [];
  const title = blok?.title || "Our latest arrivals";
  const textPlain = blok?.text ? richTextToPlain(blok.text) : "";

  return (
    <section className="bg-gray-50 relative">
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-16">
        {/* Sektionstitel */}
        <h2 className="text-center text-2xl font-semibold">{title}</h2>

        {/* Valfri introduktionstext, konverterad till plain text */}
        {textPlain && (
          <div className="mt-3 text-center text-sm text-neutral-700 max-w-2xl mx-auto whitespace-pre-line">
            {textPlain}
          </div>
        )}

        {/* Call to action till alla produkter */}
        <div className="mt-5 text-center relative z-30">
          <Link
            href="/products"
            className="inline-flex rounded-md border px-6 py-2 text-sm bg-white shadow-sm hover:bg-neutral-50"
          >
            {blok?.link_label || "Go to products"}
          </Link>
        </div>

        {/* Produktgrid */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-0 justify-items-center">
          {products.map((p, i) => {
            const c = p.content || {};

            // Försök hitta en huvudbild:
            // 1) c.image.filename
            // 2) första bilden i c.images[]
            const filename =
              c.image?.filename ||
              (Array.isArray(c.images) && c.images[0]?.filename) ||
              null;


            const base = filename ? norm(filename) : null;

            // Storyblok Image Service: lägg till transform "/m/736x1042"
            // för att få en passande storlek (dubbelt mot visad ~368x521 för skarpare bild på retina)
            const src = base ? `${base}/m/736x1042` : null;

            // Lyft (visuell effekt): det mittersta kortet i varje rad om 3 lyfts upp lite
            const lift = i % 3 === 1 ? "-mt-[85px]" : "";

            return (
              <Link
                key={p.id}
                href={`/${p.full_slug}`}           // Länk till produktsidan
                className={`group block ${lift} relative z-0`}
              >
                {/* Bildcontainer med exakt proportioner (aspect-ratio) och fast storlek på desktop */}
                <div className="relative overflow-hidden rounded-lg bg-gray-200 w-full aspect-[368/521] lg:w-[368px] lg:h-[521px]">
                  {src && (
                    <Image
                      src={src}
                      alt={c.image?.alt || c.name || p.name || "Product"} // alt-text fallback
                      fill                            // fyll hela containern
                      className="object-cover transition-transform duration-300 group-hover:scale-105" // zoom på hover
                      sizes="(min-width:1024px) 368px, 50vw" // hint till browserns bildval (desktop vs mobil)
                      priority={i < 3}              // prioritera första 3 bilderna för snabb LCP
                    />
                  )}
                  {/* Subtil hover-overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                </div>

                {/* Text under bilden: produktnamn + pris (om finns) */}
                <div className="mt-3 flex items-baseline justify-between w-full lg:w-[368px]">
                  <span className="text-sm font-medium truncate">
                    {c.name || p.name}
                  </span>
                  {c.price && (
                    <span className="text-sm opacity-70">{c.price} kr</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


