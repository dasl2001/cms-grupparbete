"use client"; 
import Link from "next/link";
import SearchBar from "@/components/sb/SearchBar"; 

/*
Header tar emot ett Storyblok-blok med konfiguration (logo, länkar, sökfält etc.)
*/
export default function Header({ blok }) {
  // Säkerställ att links alltid är en array
  const links = Array.isArray(blok.links) ? blok.links : [];

  return (
    // Sticky + hög z-index så dropdown syns över Hero
    <header className="sticky top-0 z-[200] isolate border-b bg-white/90 backdrop-blur flex justify-center">
      {/* Inre wrapper */}
      <div className="w-[1400px] h-[60px] px-4 flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="font-semibold text-[15px] tracking-tight">
          {blok.logo || "Ecommerce"}
        </Link>

        {/* Navigation (med dropdown-stöd via children) */}
        <nav className="flex gap-2 text-sm relative">
          {links.map((n) => {
            const hasChildren = Array.isArray(n.children) && n.children.length > 0;
            const href = n.custom_url || `/${n.link?.cached_url || ""}`;

            return (
              <div key={n._uid} className="relative group">
                {/* Föräldralänk */}
                <Link
                  href={href}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md
                             text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  {n.label}
                  {hasChildren && (
                    <span className="transition-transform duration-200 group-hover:rotate-180" aria-hidden>
                      ▾
                    </span>
                  )}
                </Link>

                {/* Dropdown */}
                {hasChildren && (
                  <div
                    className="absolute left-0 top-full z-[300] mt-2 w-56
                               rounded-xl border bg-white/95 backdrop-blur
                               shadow-xl ring-1 ring-black/5
                               opacity-0 scale-95 translate-y-1 pointer-events-none
                               group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                               group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto
                               transition duration-200 origin-top"
                  >
                    {/* caret */}
                    <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-white border-l border-t" />
                    <ul className="py-2">
                      {n.children.map((child) => {
                        const childHref = child.custom_url || `/${child.link?.cached_url || ""}`;
                        return (
                          <li key={child._uid}>
                            <Link
                              href={childHref}
                              className="block px-3 py-2 rounded-md mx-2
                                         text-[13px] text-neutral-800
                                         hover:bg-neutral-100 hover:text-black
                                         focus:bg-neutral-100 focus:text-black
                                         transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Högersektion: Sök + ev. varukorg */}
        <div className="ml-auto flex items-center gap-3 text-sm">
          {/* Sökfältet – placeholder kan hämtas från Storyblok */}
          <SearchBar placeholder={blok.search_placeholder || "Search products…"} />

          {blok.show_cart && (
            <Link
              href="/cart"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-neutral-100"
            >
              <span aria-hidden>👜</span>
              <span className="text-neutral-700">{Number(blok.cart_count || 0)}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}



