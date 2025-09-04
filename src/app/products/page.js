import { getStoryblokApi, StoryblokComponent } from "@/lib/storyblok";

export default async function ProductsPage() {
  const sb = getStoryblokApi();
  const { data } = await sb.get("cdn/stories/products", { version: "draft" });
  const body = data?.story?.content?.body || [];

  return (
    <>
      {body.map((b) => (
        <StoryblokComponent key={b._uid} blok={b} />
      ))}
    </>
  );
}

