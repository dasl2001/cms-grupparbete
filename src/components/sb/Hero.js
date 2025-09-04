export default function Hero({ blok }) {
  const categories = ["Home", "Away", "Retro", "Limited", "Football Jersey"];

  return (
    <section className="bg-white py-12 border-b">
      <div className="mx-auto max-w-6xl px-4">
        {/* Rubrik + text */}
        <header className="text-left">
          <h1 className="text-3xl font-semibold">{blok?.title || "Shop Football Jerseys"}</h1>
          {blok?.text && (
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl">{blok.text}</p>
          )}
        </header>

        {/* Meny – bara knappar (Football Jersey "visar alla") */}
        <nav className="mt-6 flex flex-wrap gap-2">
          {categories.map((label) => (
            <button
              key={label}
              type="button"
              className="border rounded px-3 py-1 text-sm hover:bg-neutral-50"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Sort – bara text, ingen funktion */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="border rounded px-3 py-1 text-sm cursor-default"
            aria-disabled="true"
          >
            Sort by <span className="font-semibold ml-1">Popular</span>
          </button>
        </div>
      </div>
    </section>
  );
}

