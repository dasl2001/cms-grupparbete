import ServerComponent from "@/components/sb/ServerComponent";
import "./globals.css";
import { getStoryblokApi } from "@/lib/storyblok";

export default async function RootLayout({ children }) {
  const sb = getStoryblokApi();
  let cfg;
  try {
    const { data } = await sb.get("cdn/stories/config", { version: "draft" });
    cfg = data?.story?.content;
  } catch {
    cfg = null;
  }

  const topStrip = cfg?.body?.find(b => b.component === "topStrip");
  const header = cfg?.body?.find(b => b.component === "header");
  const footer = cfg?.body?.find(b => b.component === "footer");

  const renderMaybe = (blok) => (blok ? <ServerComponent blok={blok} /> : null);
  return (
    <html lang="sv">
      <body className="bg-white text-black">
        {renderMaybe(topStrip)}
        {renderMaybe(header)}
        <main>{children}</main>
        {renderMaybe(footer)}
      </body>
    </html>
  );
}
