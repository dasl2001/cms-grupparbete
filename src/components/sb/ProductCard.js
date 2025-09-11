/*
klientkomponent (interaktiv med hover-effekter)
*/
"use client";

import Link from "next/link";
import Image from "next/image";

/*
Hämtar innehållet från Storyblok-storyn
*/
export default function ProductCard({ story }) {
  const c = story.content || {};

/*
Försöker hitta en bild (antingen "image" eller första i "images"-listan)
*/  
  const filename =
    c.image?.filename ||
    (Array.isArray(c.images) && c.images[0]?.filename) ||
    null;

/*
Normaliserar URL (lägger till https: om den börjar med //)
*/
  const normalized = filename
    ? (filename.startsWith("//") ? `https:${filename}` : filename)
    : null;

  return (
    <Link href={`/${story.full_slug}`} className="group block">

{/* 
Bildcontainer med proportion 3:4 
*/}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        {normalized && (
          <Image
            src={`${normalized}/m/600x800`} //hämtar optimerad variant från Storyblok (600x800)
            alt={c.image?.alt || c.name || story.name || "Product"} //alt-text 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width:1024px) 320px, 33vw" //storlek för olika skärmstorlekar
            priority={false} //ladda inte med hög prioritet 
          />
        )}
      </div>

{/* 
Namn + pris under bilden 
*/}
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-sm font-medium">{c.name || story.name}</span>
        {c.price && <span className="text-sm opacity-70">{c.price} kr</span>}
      </div>
    </Link>
  );
}





