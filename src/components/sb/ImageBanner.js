export default function ImageBanner({ blok }) {
  const href = blok.link?.cached_url ? `/${blok.link.cached_url}` : undefined;
  return (
    <section className="bg-neutral-200">
      <a href={href} className="block">
        {blok.image?.filename ? (
          <img src={blok.image.filename} alt="" className="w-full h-28 md:h-40 object-cover" />
        ) : (
          <div className="mx-auto max-w-6xl px-4 h-24 md:h-28" />
        )}
      </a>
    </section>
  );
}

