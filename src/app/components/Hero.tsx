import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import heroBg from "../../imports/IMG_4145-1.PNG";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-bleed background photo */}
      <div
        className="relative h-[520px] w-full md:h-[640px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Legibility scrim over the lower-left */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Overlay content — lower-left */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-12 md:px-8 md:pb-16">
          <h1
            className="max-w-[14ch] uppercase leading-[0.9] text-white text-[64px] md:text-[120px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Move without limits
          </h1>

          <div className="mt-5 max-w-md">
            <p className="text-[16px] leading-snug text-white/85">
              Engineered for the everyday.
              <br />
              Built for the ones who never stand still.
            </p>
            <p className="mt-2 text-[13px] text-white/60">
              Fall / Winter 2026 — the Lodestar Low collection.
            </p>
          </div>

          <Link
            to="/shop"
            className="group mt-7 inline-flex items-center gap-2 bg-white px-8 py-4 text-[14px] font-semibold uppercase tracking-wider text-black transition-transform hover:-translate-y-0.5"
          >
            Shop collection
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
