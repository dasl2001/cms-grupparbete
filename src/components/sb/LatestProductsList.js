import { getStoryblokApi } from "@storyblok/react/rsc";
import ProductCard from "./ProductCard";

export default async function LatestProductsList({ blok }) {
  const sb = getStoryblokApi();
  const { data } = await sb.get("cdn/stories", {
    starts_with: `${blok.productFolder || "products"}/`,
    content_type: "productDetailPage",
    version: "published",
    per_page: blok.limit || 3,
    sort_by: "published_at:desc",
  });
  const products = data?.stories || [];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        {blok.title && <h2 className="text-xl font-semibold">{blok.title}</h2>}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={p.uuid} className={i === 1 ? "sm:-mt-6" : ""}>
              <ProductCard story={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

