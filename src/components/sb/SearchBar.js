"use client"; // Talar om för Next.js att den här komponenten körs på klienten (i webbläsaren)

import { useEffect, useState } from "react";
import Link from "next/link";

// Enkel sökkomponent med debounce och dropdown-resultat
export default function SearchBar({ placeholder = "Search" }) {
  // q = det som användaren skriver just nu
  const [q, setQ] = useState("");
  // debounced = q fördröjt med 300ms för att undvika att söka för ofta
  const [debounced, setDebounced] = useState("");
  // items = sökträffar från API:et
  const [items, setItems] = useState([]);
  // loading = visar om en sökförfrågan pågår
  const [loading, setLoading] = useState(false);

  // Debounce: vänta 300ms efter att användaren slutat skriva innan vi "låser" q till debounced.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 300);
    return () => clearTimeout(t); // rensa timeout om q ändras igen innan 300ms
  }, [q]);

  // När debounced ändras (dvs. användaren pausat skrivandet) hämtar vi resultat.
  useEffect(() => {
    // Om söksträngen är tom: nollställ listan och gör inget API-anrop
    if (!debounced) {
      setItems([]);
      return;
    }

    setLoading(true); // visa att laddning pågår

    // Hämta från ditt API-endpoint, kodar frågesträngen korrekt
    fetch(`/api/search?q=${encodeURIComponent(debounced)}`)
      .then((r) => r.json())           // tolka svaret som JSON
      .then((d) => setItems(d.items || [])) // sätt träffar (fallback till tom array)
      .finally(() => setLoading(false));    // oavsett resultat, sluta ladda
  }, [debounced]);

  return (
    // "relative" behövs för att dropdown-positioneringen (absolute) ska funka
    <div className="relative w-64">
      {/* Sökfältet */}
      <input
        className="w-full h-10 rounded border px-3 text-sm"
        placeholder={placeholder}      // valfri placeholder-prop
        value={q}                       // kontrollerad input: värde kommer från state
        onChange={(e) => setQ(e.target.value)} // uppdatera q när användaren skriver
        aria-label="Search products"    // tillgänglighet: beskriv vad fältet gör
        role="combobox"                 // hint till skärmläsare om combobox-beteende
        aria-expanded={q && (loading || items.length > 0) ? "true" : "false"} // om listan visas
        aria-controls="search-results"  // koppla till listans id
        autoComplete="off"              // undvik browserns egna förslag
      />

      {/* Resultat-lista: visas bara när användaren har skrivit något
          OCH vi antingen laddar eller har träffar */}
      {(q && (loading || items.length > 0)) && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
          {/* Laddningsindikator */}
          {loading && (
            <div className="p-2 text-xs text-neutral-500">Searching…</div>
          )}

          {/* Tomt resultat (visas först när laddning är klar och inga träffar finns) */}
          {!loading && items.length === 0 && (
            <div className="p-2 text-xs text-neutral-500">No results</div>
          )}

          {/* Lista med träffar */}
          {!loading && items.length > 0 && (
            <ul
              id="search-results"
              className="max-h-64 overflow-auto" // begränsa höjd + scroll
              role="listbox"                     // tillgänglighet för resultatslista
            >
              {items.map((p) => (
                <li key={p.id} role="option">
                  {/* Varje träff är en länk till produktsidan (slug) */}
                  <Link
                    className="block px-3 py-2 text-sm hover:bg-neutral-50"
                    href={p.slug}
                  >
                    {/* Visa namn + ev. pris */}
                    {p.name} {p.price ? `– ${p.price} kr` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

