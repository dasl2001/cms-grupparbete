import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function ProductsPage() {
  const { data } = await getStoryblokApi().get("cdn/stories/products", {
    version: process.env.NODE_ENV === "production" ? "published" : "draft",
  });

  const body = data?.story?.content?.body || [];

  return (
    <>
        <StoryblokStory story={data.story} key={data.story_uid} />
    </>
  );
}
