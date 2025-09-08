export default function ImageWithText({ blok }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center">
      {/* Rubrik */}
      {blok.title && (
        <h2 className="text-2xl font-semibold">{blok.title}</h2>
      )}

      {/* Text */}
      {blok.text && (
        <p className="mt-4 text-sm text-neutral-700 whitespace-pre-line">
          {blok.text}
        </p>
      )}
    </section>
  );
}


