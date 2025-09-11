/*
Vi hämtar getStoryblokApi och getStoryblokVersion från vår lib/storyblok-fil.
getStoryblokApi() ger oss ett API-objekt som kan prata med Storyblok.
getStoryblokVersion() avgör om vi ska hämta "draft" (utveckling) eller "published" (produktion).
*/
import { getStoryblokApi, getStoryblokVersion } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';

/*
Är en React server component för sidan "About".
*/
export default async function About() {

/*
Hämtar en instans av Storyblok API:t som vi kan använda för att göra requests.
*/
  const sb = getStoryblokApi();


/*
Hämtar datan för storyn med slug "about" från Storyblok.
version: published eller draft beroende på om vi kör i produktion eller utveckling.
*/
  const { data } = await sb.get("cdn/stories/about", { version: getStoryblokVersion() });
/*
Skickar in data.story (dvs. själva innehållet från Storyblok) till <StoryblokStory> som sköter rendering.
*/
  return (
    <>
{/* 
StoryblokStory tar emot den story vi fått från API:t 
och renderar ut innehållet (komponenter och fält) enligt vårt schema i Storyblok
*/}    
      <StoryblokStory key={data.story._uid} story={data.story} />
    </>
  );
}

