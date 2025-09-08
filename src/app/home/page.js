import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {
  const sb = getStoryblokApi();
  const { data } = await sb.get("cdn/stories/home", { version: "draft" });
  return (
    <>
        <StoryblokStory key={data.story._uid} story={data.story} />
    </>
  );
}


