export default function ImageBanner({ blok }) {
  const href = blok.link?.cached_url ? `/${blok.link.cached_url}` : undefined;

  return (
    <section className="bg-neutral-200">
      <a href={href} className="block">
        {blok.image?.filename ? (
          <img
            src={blok.image.filename}
            alt=""
            className="w-full aspect-[16/6] object-cover md:aspect-[16/5] lg:aspect-[16/4]"
          />
        ) : (
          <div className="mx-auto max-w-6xl px-4 aspect-[16/6] md:aspect-[16/5]" />
        )}
      </a>
    </section>
  );
}


