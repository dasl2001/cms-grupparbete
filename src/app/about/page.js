import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function About() {
  const sb = getStoryblokApi();

  const { data } = await sb.get("cdn/stories/about", { version: getStoryblokVersion() });
  return (
    <>
      <StoryblokStory key={data.story._uid} story={data.story} />
    </>
  );
}

