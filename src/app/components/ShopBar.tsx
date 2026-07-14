import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Drawer } from "vaul";
import { FilterSelect } from "./FilterSelect";
import { CATEGORIES, SIZES, PRICE_RANGES } from "../data/products";

export function ShopBar() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [size, setSize] = useState(SIZES[0]);
  const [price, setPrice] = useState(PRICE_RANGES[0]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const goToShop = (overrides?: {
    category?: string;
    size?: string;
    price?: string;
    query?: string;
  }) => {
    const c = overrides?.category ?? category;
    const s = overrides?.size ?? size;
    const p = overrides?.price ?? price;
    const q = overrides?.query ?? query;
    const params = new URLSearchParams();
    if (c && c !== "All") params.set("category", c);
    if (s && s !== SIZES[0]) params.set("size", s);
    if (p && p !== PRICE_RANGES[0]) params.set("price", p);
    if (q.trim()) params.set("q", q.trim());
    const qs = params.toString();
    navigate(qs ? `/shop?${qs}` : "/shop");
  };

  const renderSearchForm = (full?: boolean) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        goToShop();
      }}
      className={`relative ${full ? "w-full" : "w-64"}`}
    >
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search sneakers"
        className="w-full border py-2.5 pl-9 pr-3 text-[14px] text-black placeholder:text-black/40 focus:border-black/60 focus:outline-none"
        style={{ borderColor: "var(--ls-grey-300)" }}
      />
    </form>
  );

  return (
    <section className="border-b" style={{ borderColor: "var(--ls-grey-300)" }}>
      <div className="mx-auto max-w-[1400px] px-5 py-4 md:px-8">
        {/* Desktop */}
        <div className="hidden items-center justify-between gap-4 md:flex">
          <div className="flex items-center gap-3">
            <span className="text-[13px] uppercase tracking-wider text-black/50">
              All categories
            </span>
            <FilterSelect
              label="Category"
              options={CATEGORIES}
              value={category}
              onChange={(v) => {
                setCategory(v);
                goToShop({ category: v });
              }}
            />
            <FilterSelect
              label="Size"
              options={SIZES}
              value={size}
              onChange={(v) => {
                setSize(v);
                goToShop({ size: v });
              }}
            />
            <FilterSelect
              label="Price"
              options={PRICE_RANGES}
              value={price}
              onChange={(v) => {
                setPrice(v);
                goToShop({ price: v });
              }}
            />
          </div>
          {renderSearchForm()}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-3 md:hidden">
          {renderSearchForm(true)}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 border py-2.5 text-[14px] text-black"
            style={{ borderColor: "var(--ls-grey-300)" }}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-[80] mt-24 flex flex-col rounded-t-2xl bg-white p-5 pb-8 outline-none">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/15" />
            <div className="mb-5 flex items-center justify-between">
              <Drawer.Title className="text-[18px] font-semibold text-black">
                Filters
              </Drawer.Title>
              <button aria-label="Close" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-[13px] uppercase tracking-wider text-black/50">Category</p>
                <FilterSelect label="Category" options={CATEGORIES} value={category} onChange={setCategory} fullWidth />
              </div>
              <div>
                <p className="mb-2 text-[13px] uppercase tracking-wider text-black/50">Size</p>
                <FilterSelect label="Size" options={SIZES} value={size} onChange={setSize} fullWidth />
              </div>
              <div>
                <p className="mb-2 text-[13px] uppercase tracking-wider text-black/50">Price</p>
                <FilterSelect label="Price" options={PRICE_RANGES} value={price} onChange={setPrice} fullWidth />
              </div>
            </div>

            <button
              onClick={() => {
                setOpen(false);
                goToShop();
              }}
              className="mt-7 w-full py-3.5 text-[14px] font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: "var(--ls-ink)" }}
            >
              Show results
            </button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </section>
  );
}
