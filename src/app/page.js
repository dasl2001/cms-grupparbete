import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';
import { redirect } from "next/navigation";

export default async function Home() {
  return redirect("/home");
}


