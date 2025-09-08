// components/sb/ProductGrid.js
import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";

// Helper: Storyblok Richtext -> plain text (utan <p>)
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

const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);

export default async function ProductGrid({ blok }) {
  const sb = getStoryblokApi();
  const perPage = blok?.per_page ?? blok?.number ?? 3;

  const { data } = await sb.get("cdn/stories", {
    starts_with: "products/",
    content_type: "productDetailPage",
    version: "draft",
    per_page: perPage,
    sort_by: "first_published_at:desc",
  });

  const products = data?.stories ?? [];
  const title = blok?.title || "Our latest arrivals";
  const textPlain = blok?.text ? richTextToPlain(blok.text) : "";

  return (
    <section className="bg-gray-50 relative">
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-16">
        {/* Rubrik */}
        <h2 className="text-center text-2xl font-semibold">{title}</h2>

        {/* Text (ren, utan <p>) */}
        {textPlain && (
          <div className="mt-3 text-center text-sm text-neutral-700 max-w-2xl mx-auto whitespace-pre-line">
            {textPlain}
          </div>
        )}

        {/* Länk – hög z-index så inget kan täcka den */}
        <div className="mt-5 text-center relative z-30">
          <Link
            href="/products"
            className="inline-flex rounded-md border px-6 py-2 text-sm bg-white shadow-sm hover:bg-neutral-50"
          >
            {blok?.link_label || "Go to products"}
          </Link>
        </div>

        {/* GRID – extra toppmarginal + låg z-index */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-0 justify-items-center">
          {products.map((p, i) => {
            const c = p.content || {};
            const filename =
              c.image?.filename ||
              (Array.isArray(c.images) && c.images[0]?.filename) ||
              null;
            const base = filename ? norm(filename) : null;
            const src = base ? `${base}/m/736x1042` : null; // 2x för skärpa i 368x521

            // Lyfter EXAKT 85px för mittenkortet (kolumn 2)
            const lift = i % 3 === 1 ? "-mt-[85px]" : "";

            return (
              <Link key={p.id} href={`/${p.full_slug}`} className={`group block ${lift} relative z-0`}>
                {/* Bildcontainer: mobil = proportion, desktop = 368x521 */}
                <div className="relative w-full aspect-[368/521] overflow-hidden rounded-lg bg-gray-200 lg:w-[368px] lg:h-[521px]">
                  {src && (
                    <Image
                      src={src}
                      alt={c.image?.alt || c.name || p.name || "Product"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width:1024px) 368px, 50vw"
                      priority={i < 3}
                    />
                  )}
                  {/* Svag overlay vid hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                </div>

                {/* Namn + pris */}
                <div className="mt-3 flex items-baseline justify-between w-full lg:w-[368px]">
                  <span className="text-sm font-medium truncate">{c.name || p.name}</span>
                  {c.price && <span className="text-sm opacity-70">{c.price} kr</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


