import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {
  const sb = getStoryblokApi();
  const { data } = await sb.get("cdn/stories/home", { version: "draft" });
  const body = data?.story?.content?.body || [];
  return (
    <>
      {body.map((b) => (
        <StoryblokStory key={b._uid} story={data.story} />
      ))}
    </>
  );
}


