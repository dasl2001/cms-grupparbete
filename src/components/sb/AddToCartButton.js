/*
"use client" talar om för Next.js att detta är en *client component*.
Det betyder att koden körs i webbläsaren (och får använda interaktivitet som onClick).
*/
"use client";

/*
En enkel knapp som visar ett alert när man lägger till i kundvagn
*/
export default function AddToCartButton({ product }) {

/*
Klick-händelse: körs när användaren trycker på knappen 
*/   
  const handleClick = () => {

/*
Visa en popup (alert) som bekräftar att produkten lagts i kundvagnen
product?.name används om den finns, annars "Item"
*/
    alert(`${product?.name || "Item"} added to cart`);
  };

/*
margin-top: 1.5rem (24px)
rundade hörn (extra stora)
svart bakgrund
padding: 1.5rem sidledes, 0.75rem vertikalt
vit text
när musen hovrar → lite genomskinlig (90%)
bättre tillgänglighet för skärmläsare
*/
  return (
    <button
      onClick={handleClick}
      className="mt-6 rounded-xl bg-black px-6 py-3 text-white hover:opacity-90"
      aria-label="Add to cart"
    >
      Add to cart
    </button>
  );
}

