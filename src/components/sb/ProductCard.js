// ProductCard.js
"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ story }) {
  const c = story.content || {};
  const filename =
    c.image?.filename ||
    (Array.isArray(c.images) && c.images[0]?.filename) ||
    null;

  const normalized = filename
    ? (filename.startsWith("//") ? `https:${filename}` : filename)
    : null;

  return (
    <Link href={`/${story.full_slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        {normalized && (
          <Image
            src={`${normalized}/m/600x800`}
            alt={c.image?.alt || c.name || story.name || "Product"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width:1024px) 320px, 33vw"
          />
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-sm font-medium">{c.name || story.name}</span>
        {c.price && <span className="text-sm opacity-70">{c.price} kr</span>}
      </div>
    </Link>
  );
}





