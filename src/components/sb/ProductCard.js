export default function ProductCard({ story }) {
  const c = story.content;
  const href = `/${story.full_slug}`;
  const img = c.images?.[0]?.filename;
  const sizes = Array.isArray(c.sizes) ? c.sizes : [];

  return (
    <a href={href} className="block">
      <div className="rounded bg-neutral-200 overflow-hidden aspect-[4/3]">
        {img && <img src={img} alt={c.title} className="w-full h-full object-cover" />}
      </div>
      <div className="mt-2 text-xs text-neutral-500">{(c.tags && c.tags[0]) || "Football Jersey"}</div>
      <div className="text-sm font-medium flex items-center gap-2">
        <span className="truncate">{c.title}</span>
        {!!sizes.length && (
          <span className="text-[11px] text-neutral-600 border rounded px-1">
            {sizes[0]}{sizes.length > 1 ? `-${sizes[sizes.length - 1]}` : ""}
          </span>
        )}
      </div>
      {typeof c.price === "number" && <div className="text-sm">{c.price} kr</div>}
    </a>
  );
}




