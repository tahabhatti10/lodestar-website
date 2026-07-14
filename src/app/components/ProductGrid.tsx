import { Link } from "react-router";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "../data/products";

export function ProductGrid() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
      <div className="mb-6 flex items-end justify-between">
        <h2
          className="uppercase leading-none text-black text-[32px] md:text-[44px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          New arrivals
        </h2>
        <Link to="/shop" className="text-[13px] text-black/50 underline-offset-4 hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
