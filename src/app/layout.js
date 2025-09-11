/*
Globala stilar (Tailwind + egna)
ServerComponent är din “dispatcher” som tar ett Storyblok-blok
och renderar rätt React-komponent utifrån component-namnet
Hjälpfunktioner för att prata med Storyblok (API + version)
*/
import "./globals.css";
import ServerComponent from "@/components/sb/ServerComponent";
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";

/*
RootLayout wrapp:ar alla sidor i appen (header/footer etc. bor här)
*/
export default async function RootLayout({ children }) {

/*
Skapa en API-instans mot Storyblok
*/
  const sb = getStoryblokApi();

/*
Hämta "config"-storyn som innehåller globala block (header/footer/topstrip m.m.).
*/
  let story = null;
  let cfg = null;
  try {

/*
 published i prod, draft i dev/preview
*/
    const { data } = await sb.get("cdn/stories/config", { version: getStoryblokVersion() });

/*
Hela story-objektet
Content-fältet där blocken ligger
Om hämtningen misslyckas (t.ex. 401/404) – kör vidare utan config
*/
    story = data?.story || null;
    cfg = story?.content || null;
  } catch {
    cfg = null;
  }

/*
Plocka ut listan av block i configens body (om den finns).
*/
  const body = Array.isArray(cfg?.body) ? cfg.body : [];

/*
Hjälpare: case-insensitive matchning på komponent-namn
*/
  const findBy = (...names) =>
    body.find(b => names.map(n => n.toLowerCase()).includes((b?.component || "").toLowerCase()));

/*
Leta upp specifika block.
*/
  const topstrip = findBy("topstrip", "top_strip", "topStrip");
  const header   = findBy("header");
  const footer   = findBy("footer");

/*
Andra block som ska visas före footern 
*/
  const rest = body.filter(b => b !== topstrip && b !== header && b !== footer);

/*
En liten render-hjälpare så vi slipper null-checks överallt
*/
  const render = (blok) => (blok ? <ServerComponent blok={blok} story={story} /> : null);

/*
Själva layouten som alla sidor får.
*/
  return (
    <html lang="sv">
      <body className="bg-white text-black min-h-screen flex flex-col">

{/* 
Övre informationsremsa – om den finns i config 
*/}        
        {render(topstrip)}

{/* 
Global header – om den finns i config 
*/}        
        {render(header)}

{/* 
Här renderas aktuell sida (page.js) 
*/}
        <main className="flex-1">{children}</main>

{/* 
Eventuella extra block från config som ska ligga före footern 
*/}
        {rest.map(b => (
          <ServerComponent key={b._uid} blok={b} story={story} />
        ))}

{/* 
Global footer – om den finns i config 
*/}
        {render(footer)}
      </body>
    </html>
  );
}
