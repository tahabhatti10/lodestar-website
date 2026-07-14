import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{ backgroundColor: "var(--ls-grey-100)" }}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.condition === "Pre-loved" && (
          <span
            className="absolute left-2 top-2 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ backgroundColor: "var(--ls-ink)" }}
          >
            Pre-loved
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[14px] leading-snug text-black">{product.name}</h3>
          <p className="mt-0.5 text-[12px] text-black/45">{product.category}</p>
        </div>
        <span className="text-[14px] font-semibold text-black">${product.price}</span>
      </div>
    </Link>
  );
}
