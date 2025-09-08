import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/sb/AddToCartButton";

// Helper: Storyblok Richtext -> plain text (ingen <p>)
function richTextToPlain(richtext) {
  if (!richtext || typeof richtext !== "object" || !Array.isArray(richtext.content)) {
    return "";
  }
  return richtext.content
    .map((block) =>
      Array.isArray(block.content)
        ? block.content.map((inner) => inner.text || "").join("")
        : ""
    )
    .join("\n")
    .trim();
}

export default async function ProductPage({ params }) {
  const { slug } = await params; // Next 15
  const sb = getStoryblokApi();

  const { data } = await sb.get(`cdn/stories/products/${slug}`, {
    version: getStoryblokVersion, 
  });

  const story = data?.story;
  if (!story) return notFound();

  const c = story.content || {};
  const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);

  // Bild
  const filename =
    c.image?.filename ||
    (Array.isArray(c.images) && c.images[0]?.filename) ||
    null;
  const img = filename ? norm(filename) : null;

  // Beskrivning (plain text)
  const descPlain = c.description ? richTextToPlain(c.description) : "";

  // Färger (valfritt fält)
  const rawColors = Array.isArray(c.colors) ? c.colors : c.color ? [c.color] : [];
  const colors = rawColors.map((item) =>
    typeof item === "string"
      ? { label: item, value: item }
      : { label: item.name || item.value || "Color", value: item.value || item.name }
  );
  const isColorValue = (v) =>
    typeof v === "string" &&
    (v.startsWith("#") ||
      [
        "black","white","red","blue","green","yellow",
        "orange","purple","navy","brown","gray","grey",
      ].includes(v.toLowerCase()));

  // Storlekar som knappar
  const sizes = Array.isArray(c.sizes) && c.sizes.length > 0 ? c.sizes : ["XS","S","M","L","XL"];

  return (
    <div
      className="mx-auto max-w-6xl grid gap-10 px-4 py-12
                 md:grid-cols-[554px_1fr]"  // lås första kolumnen till 554px
    >
      {/* Bild */}
      <div className="relative w-full h-[554px] overflow-hidden rounded-xl bg-gray-100 mx-auto">
        {img && (
          <Image
            src={img}
            alt={c.image?.alt || c.name || story.name}
            fill
            className="object-cover object-center"
            priority
            sizes="(min-width:768px) 554px, 100vw"
          />
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-semibold">{c.name || story.name}</h1>
        {c.price && <p className="mt-2 text-lg">{c.price} kr</p>}

        {/* Colors (om finns) */}
        {colors.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-medium">Colors</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((col, i) => (
                <div key={`${col.label}-${i}`} className="flex items-center gap-2">
                  <span
                    className="inline-block h-5 w-5 rounded-full border"
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

        {/* Beskrivning */}
        {descPlain && (
          <div className="mt-6 text-sm text-neutral-700 whitespace-pre-line">
            {descPlain}
          </div>
        )}

        {/* Size-knappar */}
        <div className="mt-6">
          <div className="text-sm font-medium">Size</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((s, idx) => {
              const label = typeof s === "string" ? s : s.name || s.value || `Size ${idx+1}`;
              return (
                <button
                  key={`${label}-${idx}`}
                  type="button"
                  className="rounded-md border px-3 py-1 text-sm hover:bg-neutral-50"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size & Fit Guide + Model info */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-sm font-medium">Size & Fit Guide</h3>
          <p className="mt-4 text-sm text-neutral-600">
            Model information not available.
          </p>
        </div>

        {/* Add to cart */}
        <AddToCartButton
          product={{
            id: story.id,
            slug: story.full_slug,
            name: c.name || story.name,
            price: c.price,
          }}
        />
      </div>
    </div>
  );
}






