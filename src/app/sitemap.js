/*
Detta är en specialfil i Next.js App Router.
Next.js genererar automatiskt en `sitemap.xml` från funktionen nedan.
*/
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";

/*
Sitemap måste exportera en async-funktion.
Next.js anropar den och förväntar sig en array med objekt (en per URL).
*/
export default async function sitemap() {

/*
Hämtar en instans av Storyblok-API:t
*/
  const sb = getStoryblokApi();

/*
Bas-URL för sajten. Hämtas från en miljövariabel om den finns,
annars hårdkodas din Vercel-domän.
*/
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cms-grupparbete.vercel.app";

/*
Statiska sidor som innehåller:
dagens datum
tips till sökmotorer
högst prioritet
*/
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

/*
Dynamiska produktsidor från Storyblok
*/
  let products = [];
  try {

/*
Hämta alla stories under "products/" som är av typen "productDetailPage"
bara sidor under /products
din komponenttyp i Storyblok
published i prod, draft i dev
max antal per request
sortera nyaste först
*/
    const { data } = await sb.get("cdn/stories", {
      starts_with: "products/",
      content_type: "productDetailPage",
      version: getStoryblokVersion(),
      per_page: 100,
      sort_by: "first_published_at:desc",
    });

/*
Mappa Storyblok-data till rätt format för sitemap
ex: https://site.com/products/real-madrid-home
om publiceringsdatum finns
annars första publicering
fallback: dagens datum
*/
    products = (data?.stories || []).map((s) => ({
      url: `${baseUrl}/${s.full_slug}`,
      lastModified: s.published_at || s.first_published_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (e) {

/*
Om API:t misslyckas → ingen produkt läggs till
*/
    products = [];
  }

/*
Returnera alla sidor (statiska + dynamiska)
*/
  return [...staticPages, ...products];
}
