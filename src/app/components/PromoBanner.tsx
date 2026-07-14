import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import bannerBg from "../../imports/Syed_Sarib_Use_the_exact_sneaker_shown_in_the_reference_image__same_colorwa_df5f216e-86da-4415-8b39-e7343fe590ad.png";

export function PromoBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="relative h-[420px] w-full md:h-[560px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        {/* Scrim favouring the right side for legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/25 to-transparent" />

        {/* Right-aligned overlay content */}
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1400px] flex-col items-end px-5 pb-12 text-right md:px-8 md:pb-16">
          <h2
            className="max-w-[16ch] uppercase leading-[0.9] text-white text-[56px] md:text-[104px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Chase your north star
          </h2>

          <div className="mt-5 max-w-md">
            <p className="text-[16px] leading-snug text-white/85">
              Traction that keeps up with ambition.
              <br />
              Step into the season's boldest silhouette.
            </p>
            <p className="mt-2 text-[13px] text-white/60">
              Limited drop — the Lodestar Olive edition.
            </p>
          </div>

          <Link
            to="/shop"
            className="group mt-7 inline-flex items-center gap-2 px-8 py-4 text-[14px] font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--ls-ink)" }}
          >
            Explore drop
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
