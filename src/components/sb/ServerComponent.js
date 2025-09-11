
import { components } from "@/lib/storyblok"
import { StoryblokServerComponent } from "@storyblok/react/rsc"     
import DoesNotExist from "./DoesNotExist"

/*
Tar emot ett "blok" från Storyblok
*/
export default function ServerComponent({ blok }) {

/*
Hämtar rätt komponentnamn från vår komponentlista (components.js)
*/
    const Component = components[blok.component];

/*
Om ingen matchande komponent hittas → rendera fallback-komponenten <DoesNotExist>
Annars rendera den komponent som matchar blok.component
*/
    if(!Component) {
        return <DoesNotExist blok={blok} />
    }
    return <StoryblokServerComponent blok={blok} />
}