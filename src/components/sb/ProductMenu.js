export default function ProductMenu({ blok }) {
  const cats = Array.isArray(blok.categories) ? blok.categories : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="flex gap-2 flex-wrap">
        {cats.map((c) => (
          <a
            key={c}
            href={`/products?cat=${c}`}
            className="px-3 py-1 border rounded text-sm"
          >
            {c}
          </a>
        ))}
        <a href="/products" className="px-3 py-1 border rounded text-sm">
          All
        </a>
      </div>
    </div>
  );
}
