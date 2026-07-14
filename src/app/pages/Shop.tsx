import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Drawer } from "vaul";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, CATEGORIES, CONDITIONS, SIZES, PRICE_RANGES } from "../data/products";

function matchesPrice(price: number, range: string) {
  switch (range) {
    case "Under $150":
      return price < 150;
    case "$150 – $180":
      return price >= 150 && price <= 180;
    case "$180+":
      return price > 180;
    default:
      return true;
  }
}

export function Shop() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState<string>("All");
  const [size, setSize] = useState("Any size");
  const [price, setPrice] = useState("Any price");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Preselect filters when arriving via query params (e.g. from the home shop bar).
  useEffect(() => {
    const c = searchParams.get("condition");
    if (c && (CONDITIONS as readonly string[]).includes(c)) setCondition(c);

    const cat = searchParams.get("category");
    if (cat && CATEGORIES.includes(cat)) setCategory(cat);

    const sz = searchParams.get("size");
    if (sz && SIZES.includes(sz)) setSize(sz);

    const pr = searchParams.get("price");
    if (pr && PRICE_RANGES.includes(pr)) setPrice(pr);

    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (condition === "All" || p.condition === condition) &&
          matchesPrice(p.price, price) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, condition, price, query],
  );

  const Filters = () => (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-[13px] uppercase tracking-wider text-black/50">Condition</p>
        <div className="space-y-1.5">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`block text-[14px] transition-colors ${
                condition === c ? "font-semibold text-black" : "text-black/55 hover:text-black"
              }`}
            >
              {c === "Pre-loved" ? "Pre-loved / Thrifted" : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[13px] uppercase tracking-wider text-black/50">Category</p>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block text-[14px] transition-colors ${
                category === c ? "font-semibold text-black" : "text-black/55 hover:text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[13px] uppercase tracking-wider text-black/50">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`border px-3 py-1.5 text-[13px] transition-colors ${
                size === s ? "border-black bg-black text-white" : "text-black/70 hover:border-black/60"
              }`}
              style={size === s ? undefined : { borderColor: "var(--ls-grey-300)" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[13px] uppercase tracking-wider text-black/50">Price</p>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setPrice(r)}
              className={`block text-[14px] transition-colors ${
                price === r ? "font-semibold text-black" : "text-black/55 hover:text-black"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
      {/* Heading + search on the same row so the search aligns to the title */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1
          className="uppercase leading-none text-black text-[40px] md:text-[56px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {condition === "Pre-loved" ? "Pre-loved shoes" : condition === "New" ? "New shoes" : "All shoes"}
        </h1>

        <div className="flex items-center gap-3 sm:ml-auto">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 border py-2.5 px-3 text-[14px] text-black md:hidden"
            style={{ borderColor: "var(--ls-grey-300)" }}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sneakers"
              className="w-full border py-2.5 pl-9 pr-3 text-[14px] text-black placeholder:text-black/40 focus:border-black/60 focus:outline-none"
              style={{ borderColor: "var(--ls-grey-300)" }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Left filters — desktop */}
        <aside className="hidden w-56 shrink-0 md:block">
          <Filters />
        </aside>

        {/* Right product grid */}
        <div className="flex-1">
          <p className="mb-5 text-[13px] text-black/50">{filtered.length} products</p>
          {filtered.length === 0 ? (
            <p className="text-[14px] text-black/50">No shoes match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters bottom sheet */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-[80] mt-24 flex max-h-[85vh] flex-col overflow-y-auto rounded-t-2xl bg-white p-5 pb-8 outline-none">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/15" />
            <div className="mb-5 flex items-center justify-between">
              <Drawer.Title className="text-[18px] font-semibold text-black">Filters</Drawer.Title>
              <button aria-label="Close" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <Filters />
            <button
              onClick={() => setOpen(false)}
              className="mt-8 w-full py-3.5 text-[14px] font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: "var(--ls-ink)" }}
            >
              Show {filtered.length} results
            </button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
