import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";

const norm = (u) => (u ? (u.startsWith("//") ? `https:${u}` : u) : null);

export default async function ProductsGrid({ perPage = 8, category = "all" }) {
  const sb = getStoryblokApi();

  const query = {
    starts_with: "products/",
    content_type: "productDetailPage", // ändra om din typ heter något annat
    version: "draft",                  // byt till "published" i prod
    per_page: perPage,
    sort_by: "first_published_at:desc",
  };

  // Filtrera på single-option fältet "category"
  if (category && category !== "all") {
    query.filter_query = { category: { in: category } };
  }

  const { data } = await sb.get("cdn/stories", query);
  const products = data?.stories ?? [];

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => {
          const c = p.content || {};
          const filename =
            c.image?.filename ||
            (Array.isArray(c.images) && c.images[0]?.filename) ||
            null;
          const src = filename ? `${norm(filename)}` : null;

          return (
            <Link key={p.id} href={`/${p.full_slug}`} className="group block text-center">
              {/* Bildcontainer */}
              <div className="relative w-[265px] h-[331px] mx-auto overflow-hidden border border-gray-200 rounded-lg">
                {src && (
                  <Image
                    src={src}
                    alt={c.image?.alt || c.name || p.name || "Product"}
                    fill
                    className="object-contain bg-[#f6f6f6]"
                    sizes="150px"
                  />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </div>

              {/* Info */}
              <div className="mt-2 space-y-1">
                <div className="text-sm font-medium">{c.name || p.name}</div>
                {c.price && (
                  <div className="text-sm opacity-70">{c.price} kr</div>
                )}
                {c.size && (
                  <div className="text-xs text-neutral-500">Size: {c.size}</div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {products.length === 0 && (
        <p className="mt-10 text-center text-sm text-neutral-600">
          No products found for this category.
        </p>
      )}
    </>
  );
}
