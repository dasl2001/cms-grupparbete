/*
Detta är en speciell fil i Next.js App Router.
När du exporterar en funktion här genererar Next.js automatiskt en `robots.txt`-fil
som sökmotorer (Google, Bing, etc.) kan läsa.
*/
export default function robots() {

/*
Bestäm vilken bas-URL som ska användas för länkarna i robots.txt.
Först försöker vi hämta den från en environment variable (NEXT_PUBLIC_SITE_URL).
Om den inte finns så använder vi din Vercel-domän direkt.
*/
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cms-grupparbete.vercel.app";

/*
Här returnerar vi ett objekt som Next.js omvandlar till text i robots.txt
*/
  return {

/*
Regler för alla web-crawlers
"*" betyder: gäller för ALLA robotar
tillåt att hela siten får indexeras
blockera vissa delar (de ska inte indexeras)
interna API-endpoints
admin-sidor (om du har)
preview-läge
utkast
*/
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/preview", "/draft"],
    },

/*
Länk till sitemap.xml (viktig för SEO – gör det lättare för Google att hitta alla sidor)
*/
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
