import { getStoryblokApi } from "@storyblok/react/rsc";
import ProductCard from "./ProductCard";

export default async function ProductList({ blok }) {
  const sb = getStoryblokApi();
  const folder = blok.productFolder || "products";
  const limit = blok.limit || 8;

  const { data } = await sb.get("cdn/stories", {
    starts_with: `${folder}/`,
    content_type: "productDetailPage",
    version: "published",
    per_page: limit,
    sort_by: "published_at:desc",
  });

  const products = data?.stories || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {blok.title && <h2 className="text-lg font-semibold mb-4">{blok.title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.uuid} story={p} />)}
      </div>
    </section>
  );
}

