import "./globals.css";
import ServerComponent from "@/components/sb/ServerComponent";
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";

export default async function RootLayout({ children }) {
  const sb = getStoryblokApi();

  let story = null;
  let cfg = null;
  try {
    const { data } = await sb.get("cdn/stories/config", { version: getStoryblokVersion() });
    story = data?.story || null;
    cfg = story?.content || null;
  } catch {
    cfg = null;
  }

  const body = Array.isArray(cfg?.body) ? cfg.body : [];

  // Hjälpare: case-insensitive matchning på komponent-namn
  const findBy = (...names) =>
    body.find(b => names.map(n => n.toLowerCase()).includes((b?.component || "").toLowerCase()));

  const topstrip = findBy("topstrip", "top_strip", "topStrip");
  const header   = findBy("header");
  const footer   = findBy("footer");

  // Om du har fler blok i config som ska visas före footern
  const rest = body.filter(b => b !== topstrip && b !== header && b !== footer);

  const render = (blok) => (blok ? <ServerComponent blok={blok} story={story} /> : null);

  return (
    <html lang="sv">
      <body className="bg-white text-black min-h-screen flex flex-col">
        {render(topstrip)}
        {render(header)}

        <main className="flex-1">{children}</main>

        {rest.map(b => (
          <ServerComponent key={b._uid} blok={b} story={story} />
        ))}

        {render(footer)}
      </body>
    </html>
  );
}
