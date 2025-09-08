"use client";

export default function AddToCartButton({ product }) {
  const handleClick = () => {
    alert(`${product?.name || "Item"} added to cart`);
  };

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

