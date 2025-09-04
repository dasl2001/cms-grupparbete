import { useState } from "react";

export default function SearchBar({ blok }) {
  const [query, setQuery] = useState("");

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={blok.placeholder || "Sök produkter..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>Sök</button>
    </section>
  );
}

