import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Star,
  Heart,
  ChevronDown,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { SizeGuide } from "../components/SizeGuide";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

const COLORS = [
  { name: "Triple Black", value: "#1c1c1e" },
  { name: "Storm Grey", value: "#8e8e93" },
  { name: "Bone", value: "#e6e1d8" },
];

const SIZES = [
  { label: "US 7", available: true },
  { label: "US 8", available: true },
  { label: "US 9", available: false },
  { label: "US 10", available: true },
  { label: "US 11", available: false },
  { label: "US 12", available: true },
];

const REVIEWS = [
  { id: 1, name: "Ayesha K.", rating: 5, text: "Unreal in person. Fit true to size and the comfort is next level." },
  { id: 2, name: "Daniyal R.", rating: 4, text: "Clean silhouette, super versatile. Wish they had more colourways!" },
  { id: 3, name: "Hamza S.", rating: 5, text: "Best pair I've bought this year. Delivery was quick too." },
  { id: 4, name: "Mariam T.", rating: 4, text: "Love the minimal look. Runs slightly narrow but nothing major." },
];

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= value ? "fill-black text-black" : "text-black/25"}
        />
      ))}
    </div>
  );
}

export function Product() {
  const { id } = useParams();
  const product = useMemo(
    () => PRODUCTS.find((p) => String(p.id) === id) ?? PRODUCTS[0],
    [id],
  );

  const { addItem } = useCart();
  const navigate = useNavigate();
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const alsoLike = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (added) {
      navigate("/checkout");
      return;
    }
    addItem();
    setAdded(true);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 md:py-12">
      {/* Main product area */}
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Gallery */}
        <div>
          <div
            className="flex aspect-square w-full items-center justify-center"
            style={{ backgroundColor: "var(--ls-grey-100)" }}
          >
            <span className="text-[13px] uppercase tracking-widest text-black/30">
              Product image
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {["Angle 1", "Angle 2", "Angle 3"].map((label) => (
              <div
                key={label}
                className="flex aspect-square items-center justify-center border"
                style={{ backgroundColor: "var(--ls-grey-100)", borderColor: "var(--ls-grey-300)" }}
              >
                <span className="text-[11px] uppercase tracking-wider text-black/25">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div>
          <p className="text-[13px] text-black/45">{product.gender}'s sneakers</p>
          <h1
            className="mt-1 uppercase leading-[0.95] text-black text-[40px] md:text-[52px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {product.name}
          </h1>

          <a href="#reviews" className="mt-3 inline-flex items-center gap-2 hover:underline">
            <Stars value={4} />
            <span className="text-[13px] text-black/55">{REVIEWS.length} reviews</span>
          </a>

          <p className="mt-4 text-[22px] font-semibold text-black">${product.price}</p>

          {/* Color selector */}
          <div className="mt-6">
            <p className="mb-2 text-[13px] uppercase tracking-wider text-black/50">
              Colour — {COLORS[color].name}
            </p>
            <div className="flex items-center gap-3">
              {COLORS.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColor(i)}
                  aria-label={c.name}
                  className={`h-7 w-7 rounded-full border-2 transition-all ${
                    color === i ? "border-black" : "border-transparent"
                  }`}
                  style={{ boxShadow: color === i ? "0 0 0 1px white inset" : undefined }}
                >
                  <span
                    className="block h-full w-full rounded-full border"
                    style={{ backgroundColor: c.value, borderColor: "var(--ls-grey-300)" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] uppercase tracking-wider text-black/50">Select size</p>
              <SizeGuide
                trigger={
                  <button className="text-[13px] text-black/55 underline underline-offset-2">
                    Size guide
                  </button>
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {SIZES.map((s, i) => (
                <button
                  key={s.label}
                  disabled={!s.available}
                  onClick={() => setSize(i)}
                  className={`border py-3 text-[14px] transition-colors ${
                    !s.available
                      ? "cursor-not-allowed text-black/30 line-through"
                      : size === i
                        ? "border-black bg-black text-white"
                        : "text-black hover:border-black/60"
                  }`}
                  style={
                    !s.available
                      ? { borderColor: "var(--ls-grey-300)", backgroundColor: "var(--ls-grey-100)" }
                      : size === i
                        ? undefined
                        : { borderColor: "var(--ls-grey-300)" }
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex items-stretch gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 text-[14px] font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--ls-ink)" }}
            >
              {added ? "Open cart" : "Add to cart"}
            </button>
            <button
              aria-label="Add to wishlist"
              aria-pressed={wishlisted}
              onClick={() => setWishlisted((v) => !v)}
              className="flex aspect-square items-center justify-center border px-4 transition-colors hover:border-black/60"
              style={{ borderColor: "var(--ls-grey-300)" }}
            >
              <Heart size={20} className={wishlisted ? "fill-black text-black" : "text-black"} />
            </button>
          </div>

          {/* Trust lines */}
          <div className="mt-6 space-y-2.5">
            <div className="flex items-center gap-3 text-[13px] text-black/70">
              <Truck size={17} className="text-black/50" />
              Cash on delivery available nationwide
            </div>
            <div className="flex items-center gap-3 text-[13px] text-black/70">
              <RefreshCcw size={17} className="text-black/50" />
              Free size exchange within 7 days
            </div>
          </div>

          {/* Description collapsible */}
          <div className="mt-7 border-t" style={{ borderColor: "var(--ls-grey-300)" }}>
            <button
              onClick={() => setDescOpen((v) => !v)}
              className="flex w-full items-center justify-between py-4 text-[15px] font-semibold text-black"
            >
              Description
              <ChevronDown
                size={18}
                className={`transition-transform ${descOpen ? "rotate-180" : ""}`}
              />
            </button>
            {descOpen && (
              <p className="pb-5 text-[14px] leading-relaxed text-black/70">
                The {product.name} pairs a premium leather upper with a cushioned
                foam midsole and durable rubber outsole. A minimal, everyday
                silhouette built for all-day comfort and clean styling — engineered
                to move without limits.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* You may also like */}
      <section className="mt-16 md:mt-24">
        <h2
          className="mb-6 uppercase leading-none text-black text-[32px] md:text-[44px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          You may also like
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {alsoLike.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mt-16 md:mt-24">
        <div className="mb-6 flex items-end justify-between">
          <h2
            className="uppercase leading-none text-black text-[32px] md:text-[44px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Reviews
          </h2>
          <a href="#reviews" className="text-[13px] text-black/50 underline-offset-4 hover:underline">
            See all
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="border p-4 md:p-5"
              style={{ borderColor: "var(--ls-grey-300)" }}
            >
              <Stars value={r.rating} />
              <p className="mt-2 text-[14px] font-semibold text-black">{r.name}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-black/65">{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
