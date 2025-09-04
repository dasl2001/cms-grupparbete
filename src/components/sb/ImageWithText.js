export default function ImageWithText({ blok }) {
  const reverse = !!blok.imageRight;
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
      {!reverse && (
        <div className="rounded overflow-hidden bg-neutral-200">
          {blok.image?.filename && <img src={blok.image.filename} alt="" className="w-full h-full object-cover" />}
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold">{blok.title}</h2>
        {blok.text && <p className="mt-2 text-sm text-neutral-700 whitespace-pre-line">{blok.text}</p>}
        {blok.cta?.cached_url && (
          <a href={`/${blok.cta.cached_url}`} className="mt-4 inline-block border rounded px-4 py-2 text-sm">Shop now</a>
        )}
      </div>
      {reverse && (
        <div className="rounded overflow-hidden bg-neutral-200">
          {blok.image?.filename && <img src={blok.image.filename} alt="" className="w-full h-full object-cover" />}
        </div>
      )}
    </section>
  );
}

