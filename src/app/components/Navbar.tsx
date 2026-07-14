import { useState } from "react";
import { Link } from "react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import logo from "../../imports/IMG_4064.PNG";
import { useCart } from "../context/CartContext";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Contact", to: "/contact" },
  { label: "Men", to: "/shop" },
  { label: "Women", to: "/shop" },
  { label: "Unisex", to: "/shop" },
  { label: "Pre-loved", to: "/shop?condition=Pre-loved" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 text-white"
      style={{ backgroundColor: "var(--ls-ink)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
        {/* Left: logo mark — inverted to white with its white background
            knocked out via the screen blend over the dark navbar. */}
        <Link to="/" aria-label="Lodestar home" className="flex items-center">
          <img
            src={logo}
            alt="Lodestar"
            className="h-9 w-9 object-contain"
            style={{ filter: "invert(1)", mixBlendMode: "screen" }}
          />
        </Link>

        {/* Center: desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[14px] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/shop"
            aria-label="Search"
            className="text-white/90 transition-colors hover:text-white"
          >
            <Search size={20} strokeWidth={1.8} />
          </Link>
          <Link
            to="/checkout"
            aria-label="Cart"
            className="relative text-white/90 transition-colors hover:text-white"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-black">
                {count}
              </span>
            )}
          </Link>
          {/* Hamburger (mobile only) */}
          <button
            aria-label="Menu"
            className="md:hidden text-white/90 transition-colors hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav
          className="md:hidden border-t px-5 py-2"
          style={{ backgroundColor: "var(--ls-ink)", borderColor: "var(--ls-ink-700)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[15px] text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
