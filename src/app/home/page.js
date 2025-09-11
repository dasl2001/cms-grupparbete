/*
Importera våra hjälpfunktioner för Storyblok API.
Importera StoryblokStory-komponenten som kan rendera en hel story direkt.
*/
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {

/*
Hämta en instans av Storyblok API:t som vi kan använda för att göra requests.
*/
  const sb = getStoryblokApi();

/*
Gör ett anrop till Storyblok för att hämta storyn med slug "home".
getStoryblokVersion() avgör om vi hämtar draft-versionen (för utveckling)
eller published-versionen.
*/
  const { data } = await sb.get("cdn/stories/home", { version: getStoryblokVersion() });

/*
Returnera JSX som renderar ut vår Storyblok-story.
StoryblokStory tar hand om att matcha fälten och komponenterna från Storyblok till våra React-komponenter.
*/
  return (

        <StoryblokStory key={data.story._uid} story={data.story} />

  );
}


