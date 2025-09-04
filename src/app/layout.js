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

  const renderMaybe = (blok) => (blok ? <StoryblokComponent blok={blok} /> : null);

  return (
    <html lang="sv">
      <body className="bg-white text-black">
        {renderMaybe(cfg?.topStrip)}
        {renderMaybe(cfg?.header)}
        <main>{children}</main>
        {renderMaybe(cfg?.footer)}
      </body>
    </html>
  );
}
