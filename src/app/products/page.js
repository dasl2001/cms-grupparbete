import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import ServerComponent from "@/components/sb/ServerComponent";
import ShopMenu from "@/components/sb/ShopMenu";
import ProductsGrid from "@/components/sb/ProductsGrid";

export default async function ProductsPage({ searchParams }) {
  const { category = "all" } = await searchParams; // Next 15
  const sb = getStoryblokApi();

  // Hämta sidan "products" (har Hero + Product List i body)
  const { data } = await sb.get("cdn/stories/products", { version: getStoryblokVersion() });
  const body = data?.story?.content?.body || [];
  const hero = body.find((b) => b.component === "hero");

  return (
    <main>
      {/* Rendera HERO-bloket från Storyblok */}
      {hero && <ServerComponent blok={hero} />}

      {/* Meny + grid */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        <ShopMenu active={category} />
        <ProductsGrid perPage={8} category={category} />
      </section>
    </main>
  );
}
