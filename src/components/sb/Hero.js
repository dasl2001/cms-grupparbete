import Image from "next/image";
import Link from "next/link";
import { renderRichText } from "@storyblok/react/rsc";

const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);

export default function Hero({ blok, story }) {
  const TextBlock = () => {
    const t = blok?.text;
    if (!t) return null;

    if (typeof t === "object" && Array.isArray(t.content)) {
      return (
        <div className="mt-2 text-sm text-neutral-600 max-w-3xl mx-auto relative z-10">
          {renderRichText(t)}
        </div>
      );
    }

    if (typeof t === "string") {
      return (
        <p className="mt-2 text-sm text-neutral-600 max-w-3xl mx-auto relative z-10">
          {t}
        </p>
      );
    }
    return null;
  };

  const isAbout = story?.full_slug === "about";

  const mainImg = blok?.image?.filename ? norm(blok.image.filename) : null;   // 1114x521
  const extraImg = blok?.image1?.filename ? norm(blok.image1.filename) : null; // 1400x316

  return (
    <section className="bg-white border-b relative">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center relative z-10">
        <header>
          <h1 className="text-3xl font-semibold relative z-10">
            {blok?.title || "Better football jerseys for the planet"}
          </h1>
          <TextBlock />
        </header>

        {/* Knappen – visas ej på About */}
        {!isAbout && (
          <div className="mt-6 relative z-20">
            <Link
              href="/products"
              className="inline-flex rounded-md border px-6 py-3 text-sm bg-white hover:bg-neutral-50 shadow-sm"
            >
              Shop all
            </Link>
          </div>
        )}
      </div>

      {/* Huvudbild 1114 × 521 */}
      {mainImg && (
        <div className="relative mx-auto max-w-6xl px-4 pb-6 flex justify-center z-0">
          <div className="relative w-full aspect-[1114/521] lg:w-[1114px] lg:h-[521px] overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={mainImg}
              alt={blok.image?.alt || ""}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width:1024px) 100vw, 1114px"
            />
          </div>
        </div>
      )}

      {/* Extra bild 1400 × 316 – visas när fältet image1 är ifyllt */}
      {extraImg && (
        <div className="relative mx-auto max-w-6xl px-4 pb-12 flex justify-center z-0">
          <div className="relative w-full aspect-[1400/316] lg:w-[1400px] lg:h-[316px] overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={extraImg}
              alt={blok.image1?.alt || ""}
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 1400px"
            />
          </div>
        </div>
      )}
    </section>
  );
}
