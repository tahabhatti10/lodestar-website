import { Link } from "react-router";
import { Lock } from "lucide-react";
import logo from "../../imports/IMG_4064.PNG";

export function CheckoutNavbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 text-white"
      style={{ backgroundColor: "var(--ls-ink)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
        {/* Left: logo only — no nav links on checkout to reduce drop-off */}
        <Link to="/" aria-label="Lodestar home" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Lodestar"
            className="h-9 w-9 object-contain"
            style={{ filter: "invert(1)", mixBlendMode: "screen" }}
          />
          <span
            className="tracking-[0.15em] text-[22px] leading-none text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LODESTAR
          </span>
        </Link>

        {/* Right: secure checkout indicator instead of search/cart */}
        <div className="flex items-center gap-2 text-white/80">
          <Lock size={16} />
          <span className="text-[13px]">Secure Checkout</span>
        </div>
      </div>
    </header>
  );
}
