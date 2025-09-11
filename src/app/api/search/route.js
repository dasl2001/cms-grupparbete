import { NextResponse } from "next/server";
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";

// GET-handlaren (API-route) – Next.js kommer att köra den här när man gör en GET-förfrågan mot /api/search
export async function GET(req) {
  // Plocka ut query-parametrar från URL:en
  const { searchParams } = new URL(req.url);
  // Hämta värdet av "q" (söksträngen), trimma bort mellanslag
  const q = (searchParams.get("q") || "").trim();

  // Om söksträngen är tom → returnera en tom lista direkt (ingen API-anrop mot Storyblok)
  if (!q) return NextResponse.json({ items: [] });

  // Hämta Storyblok API-klienten
  const sb = getStoryblokApi();

  // Skicka en förfrågan till Storyblok CDN API för att hämta stories (innehåll)
  const { data } = await sb.get("cdn/stories", {
    starts_with: "products/",          // bara stories som ligger under "products/"
    content_type: "productDetailPage", // begränsa till den typen av content
    version: getStoryblokVersion(),    // avgör om vi hämtar draft eller public version
    search_term: q,                    // själva sökordet
    per_page: 20,                      // max 20 resultat
    sort_by: "first_published_at:desc" // sortera nyast först
  });

  // Omvandla svar från Storyblok till enklare objekt som vår frontend kan använda
  const items = (data?.stories || []).map((s) => {
    const c = s.content || {}; // innehållet i storyn
    return {
      id: s.id,                         // storyns id
      name: c.name || s.name,           // produktnamn (fallback till storyns namn)
      price: c.price || null,           // pris om det finns
      slug: `/${s.full_slug}`,          // slug (länkväg) till produktsidan
    };
  });

  // Returnera resultatet som JSON till frontend
  return NextResponse.json({ items });
}


