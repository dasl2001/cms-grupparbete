/*
use client" gör detta till en *client component* i Next.js
eftersom vi använder interaktivitet (useState + onSubmit).
*/
"use client";
import { useState } from "react";

/*
Footer tar emot ett Storyblok-blok (från config)
där innehållet för nyhetsbrev, kolumner och copyright ligger.
*/
export default function Footer({ blok }) {

/*
Säkerställ att columns är en array (annars blir det tom array)
*/
  const columns = Array.isArray(blok.columns) ? blok.columns : [];

/*
State för e-postfältet i nyhetsbrevs-formuläret
*/
  const [email, setEmail] = useState("");

/*
Hanterar submit av formuläret
hindrar att sidan laddas om
enkel feedback
rensar inputfältet
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for signing up!");
    setEmail(""); 
  };

  return (
    <footer className="bg-neutral-100 border-t flex justify-center">
      <div
        className="w-[1400px] h-[419px] px-8 py-12 flex flex-col justify-between"
      >

{/* 
rubrik, text, inputfält för e-post + en knapp. 
När man trycker på knappen körs handleSubmit som just nu bara visar en alert.
*/}
        <div className="mb-6 max-w-sm">
          <h3 className="text-lg font-semibold">
            {blok.newsletter_title || "Sign up for our newsletter"}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            {blok.newsletter_text ||
              "Be the first to know about special offers and new releases."}
          </p>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={blok.newsletter_placeholder || "Email Address"}
              className="flex-1 h-9 rounded border px-3 text-sm"
              required
            />
            <button
              type="submit"
              className="h-9 px-3 rounded border text-sm hover:bg-neutral-200"
            >
              {blok.newsletter_cta || "Sign Up"}
            </button>
          </form>
        </div>

{/* 
Just nu bara text – länkarna är "inaktiverade" p.g.a. cursor-default + pointer-events-none
redaktören kan lägga in kolumner i Storyblok (t.ex. “Company”, “Help”, “Social”), 
och dessa renderas automatiskt. 
*/}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col._uid}>
              <div className="font-medium mb-2">{col.title}</div>
              <ul className="space-y-1 text-sm">
                {(col.links || []).map((l) => (
                  <li key={l._uid}>
                    <a className="text-black hover:underline cursor-default pointer-events-none">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

{/* 
Om fältet finns i Storyblok visas det längst ner. 
*/}
        {blok.copyright && (
          <div className="text-center text-xs text-neutral-500">
            {blok.copyright}
          </div>
        )}
      </div>
    </footer>
  );
}







