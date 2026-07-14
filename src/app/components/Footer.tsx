import { Link } from "react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import logo from "../../imports/IMG_4064.PNG";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--ls-grey-100)" }}>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-5 py-12 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Lodestar home">
          <img
            src={logo}
            alt="Lodestar"
            className="h-7 w-7 shrink-0 object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
          <span
            className="tracking-[0.15em] text-[22px] leading-none text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LODESTAR
          </span>
        </Link>

        {/* Pill-shaped dock */}
        <div
          className="flex items-center gap-2 rounded-full px-3 py-2"
          style={{ backgroundColor: "var(--ls-ink)" }}
        >
          <a
            href="https://instagram.com/lodestarpk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://wa.me/923707503981"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href="mailto:sxtudios@gmail.com"
            aria-label="Email"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-[13px] text-black/45">© 2026 Lodestar. Move without limits.</p>
      </div>
    </footer>
  );
}
