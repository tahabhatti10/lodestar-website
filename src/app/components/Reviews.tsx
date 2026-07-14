import { useState } from "react";
import { Star, Send } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const SEED: Review[] = [
  { id: 1, name: "Ayesha K.", rating: 5, text: "The Triple Black is unreal in person. Fit true to size and the comfort is next level.", date: "Jul 2026" },
  { id: 2, name: "Daniyal R.", rating: 4, text: "Clean silhouette, super versatile. Wish they had more colourways though!", date: "Jun 2026" },
];

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          aria-label={`${n} star`}
        >
          <Star
            size={18}
            className={n <= value ? "fill-black text-black" : "text-black/25"}
          />
        </button>
      ))}
    </div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(SEED);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setReviews((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        rating,
        text: text.trim(),
        date: "Jul 2026",
      },
      ...prev,
    ]);
    setName("");
    setText("");
    setRating(5);
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
      <h2
        className="mb-8 uppercase leading-none text-black text-[32px] md:text-[44px]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        Leave a review
      </h2>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-2 block text-[13px] uppercase tracking-wider text-black/50">
              Your rating
            </label>
            <Stars value={rating} onChange={setRating} />
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full border px-4 py-3 text-[14px] text-black placeholder:text-black/40 focus:border-black/60 focus:outline-none"
            style={{ borderColor: "var(--ls-grey-300)" }}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts about your Lodestars…"
            rows={4}
            className="w-full resize-none border px-4 py-3 text-[14px] text-black placeholder:text-black/40 focus:border-black/60 focus:outline-none"
            style={{ borderColor: "var(--ls-grey-300)" }}
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--ls-ink)" }}
          >
            Post review
            <Send size={15} />
          </button>
        </form>

        {/* List */}
        <div className="space-y-5">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="border-b pb-5"
              style={{ borderColor: "var(--ls-grey-300)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-black">{r.name}</span>
                <span className="text-[12px] text-black/40">{r.date}</span>
              </div>
              <div className="mt-1">
                <Stars value={r.rating} />
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-black/70">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
