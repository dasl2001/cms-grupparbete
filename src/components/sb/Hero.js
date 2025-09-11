/*
Hero-sektionen på startsidan (och ev. andra sidor)
Visar titel, text, knappar och bilder.
Redaktören kan nu även ändra bakgrundsfärg via fältet "bg_color" i Storyblok.
*/

import Image from "next/image";
import Link from "next/link";
import { renderRichText } from "@storyblok/react/rsc";

/*
Hjälpfunktion som fixar länkar från Storyblok
→ Om en bildlänk börjar med "//" läggs https: till i början.
*/
const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);

export default function Hero({ blok, story }) {
  /*
  Intern komponent för att rendera textfältet.
  Kan vara:
    - Rich Text (Storyblok-format) → renderas med renderRichText
    - Vanlig sträng → visas i ett <p>
  */
  const TextBlock = () => {
    const t = blok?.text;
    if (!t) return null;

    if (typeof t === "object" && Array.isArray(t.content)) {
      // Rich Text
      return (
        <div className="mt-2 text-sm text-neutral-600 max-w-3xl mx-auto relative z-20">
          {renderRichText(t)}
        </div>
      );
    }

    if (typeof t === "string") {
      // Vanlig textsträng
      return (
        <p className="mt-2 text-sm text-neutral-600 max-w-3xl mx-auto relative z-20">
          {t}
        </p>
      );
    }
    return null;
  };

  /*
  Hjälp: avgör om vi är på "about"-sidan
  → då döljs "Shop all"-knappen.
  */
  const isAbout = story?.full_slug === "about";

  /*
  Hämta bilderna från Storyblok (om de finns).
  - mainImg = huvudbild (1114x521)
  - extraImg = extrabild (1400x316)
  */
  const mainImg = blok?.image?.filename ? norm(blok.image.filename) : null;
  const extraImg = blok?.image1?.filename ? norm(blok.image1.filename) : null;

  /*
  NYTT: Dynamisk bakgrundsfärg.
  Redaktören kan ange en färg i fältet "bg_color" i Storyblok.
  Om inget är ifyllt används vit (#ffffff).
  */
  const bg =
    typeof blok?.bg_color === "string" && blok.bg_color.trim()
      ? blok.bg_color
      : "#ffffff";

  return (
    // Bakgrundsfärgen styrs nu av redaktören via bg_color
    <section
      className="relative border-b"
      style={{ minHeight: 1300, backgroundColor: bg }}
    >
      {/* Titel, text och ev. knapp */}
      <div className="mx-auto max-w-6xl px-4 pt-12 text-center relative z-30">
        <h1 className="text-3xl font-semibold">
          {blok?.title || "Better football jerseys for the planet"}
        </h1>
        <TextBlock />

        {/* "Shop all"-knappen visas bara om vi INTE är på /about */}
        {!isAbout && (
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex rounded-md border px-6 py-3 text-sm bg-white hover:bg-neutral-50 shadow-sm"
            >
              Shop all
            </Link>
          </div>
        )}
      </div>

      {/* Huvudbilden (1114x521), centrerad */}
      {mainImg && (
        <div
          className="absolute overflow-hidden rounded-xl bg-gray-100 z-10 opacity-100"
          style={{
            top: 381, // 381px ner från toppen
            left: "50%", // mitten av sidan
            transform: "translateX(-50%)", // centrera exakt
            width: 1114,
            height: 521,
          }}
        >
          <Image
            src={mainImg}
            alt={blok.image?.alt || ""}
            fill
            className="object-cover object-center"
            sizes="1114px"
            priority
          />
        </div>
      )}

      {/* Extra bild (1400x316), centrerad längre ner */}
      {extraImg && (
        <div
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-gray-100 z-0 opacity-100"
          style={{
            top: 972,
            width: 1400,
            height: 316,
          }}
        >
          <Image
            src={extraImg}
            alt={blok.image1?.alt || ""}
            fill
            className="object-cover object-center"
            sizes="1400px"
          />
        </div>
      )}
    </section>
  );
}
