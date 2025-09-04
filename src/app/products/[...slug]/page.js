import { getStoryblokApi } from "@/lib/storyblok";

export default async function ProductDetail({ params }) {
  const sb = getStoryblokApi();
  const { data } = await sb.get(`cdn/stories/products/${params.slug}`, {
    version: "published",
  });

  const p = data?.story?.content;
  if (!p) return <div className="mx-auto max-w-6xl p-6">Product not found.</div>;

  const img = p.images?.[0]?.filename;
  const sizes = Array.isArray(p.sizes) ? p.sizes : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Bild */}
      <div className="bg-neutral-200 rounded-md overflow-hidden">
        {img && <img src={img} alt={p.title} className="w-full h-full object-cover" />}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        {typeof p.price === "number" && <p className="mt-2 text-lg">{p.price} kr</p>}

        {!!sizes.length && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-1">Size</div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <span key={s} className="px-3 py-1 border rounded text-sm">{s}</span>
              ))}
            </div>
          </div>
        )}

        {p.materials && (
          <div className="mt-4 text-xs text-neutral-600">
            <span className="font-medium">MATERIALS: </span>{p.materials}
          </div>
        )}

        {p.description?.content?.[0]?.content?.[0]?.text && (
          <div className="mt-6 text-sm text-neutral-800">
            {p.description.content[0].content[0].text}
          </div>
        )}
      </div>
    </div>
  );
}

