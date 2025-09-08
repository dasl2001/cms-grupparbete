"use client";
import Link from "next/link";

const ITEMS = [
  { key: "all", label: "All" },
  { key: "home", label: "Home" },
  { key: "away", label: "Away" },
];

export default function ShopMenu({ active = "all" }) {
  return (
    <div className="mb-8 text-center">

      <nav className="mt-4 flex flex-wrap justify-center gap-2">
        {ITEMS.map((it) => (
          <Link
            key={it.key}
            href={it.key === "all" ? "/products" : `/products?category=${it.key}`}
            className={`rounded border px-3 py-1 text-sm ${
              it.key === active ? "bg-black text-white" : "hover:bg-neutral-50"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
