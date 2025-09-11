/*
klientkomponent (eftersom vi använder interaktiva länkar och state)
*/
"use client";
import Link from "next/link";

/*
Definiera menyalternativ för shoppen
*/
const ITEMS = [
  { key: "all", label: "All" },
  { key: "home", label: "Home" },
  { key: "away", label: "Away" },
];

export default function ShopMenu({ active = "all" }) {
  return (
    <div className="mb-8 text-center">

{/* 
Navigation 
*/}
      <nav className="mt-4 flex flex-wrap justify-center gap-2">
        {ITEMS.map((it) => (
          <Link
            key={it.key} //Unikt ID för varje menyitem
            href={it.key === "all" ? "/products" : `/products?category=${it.key}`} //Om "all", gå till alla produkter annars, lägg till query-param för kategori
            className={`rounded border px-3 py-1 text-sm ${
              it.key === active ? "bg-black text-white" : "hover:bg-neutral-50" //Aktiv kategori markeras med svart bakgrund & vit text, / Inaktiva får hover-effekt
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
