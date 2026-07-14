import { Mail, Instagram, MessageCircle } from "lucide-react";
import contactBg from "../../imports/Syed_Sarib_Use_the_exact_sneaker_shown_in_the_reference_image__same_colorwa_6ae51251-dfa6-4bde-87d9-0916ac2012d8.png";

export function ContactSection() {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div
        className="relative min-h-[520px] w-full bg-cover bg-center md:min-h-[600px]"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        {/* Scrim for legibility — heavier on the left where the copy lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

        <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 px-5 py-16 md:px-8 md:py-24">
          {/* Fun heading */}
          <div className="max-w-2xl">
            <p className="mb-3 text-[13px] uppercase tracking-[0.25em] text-white/60">
              Say hello
            </p>
            <h2
              className="uppercase leading-[0.9] text-white text-[52px] md:text-[92px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Slide into
              <br />
              our DMs
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">
              Questions, hype, or fit checks — we're always around. Lodestar is a
              Pakistan-based crew obsessed with clean silhouettes and honest
              pricing. Reach out, we actually reply.
            </p>
          </div>

          {/* Left-aligned contact options */}
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <a
              href="mailto:sxtudios@gmail.com"
              className="group flex items-center gap-3 border border-white/20 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Mail size={20} className="text-white" />
              <div>
                <p className="text-[12px] uppercase tracking-wider text-white/50">Email us</p>
                <p className="text-[14px] text-white">sxtudios@gmail.com</p>
              </div>
            </a>

            <a
              href="https://instagram.com/lodestarpk"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-white/20 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Instagram size={20} className="text-white" />
              <div>
                <p className="text-[12px] uppercase tracking-wider text-white/50">Instagram</p>
                <p className="text-[14px] text-white">@lodestarpk</p>
              </div>
            </a>

            <a
              href="https://wa.me/923707503981"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-white/20 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/10 sm:col-span-2"
            >
              <MessageCircle size={20} className="text-white" />
              <div>
                <p className="text-[12px] uppercase tracking-wider text-white/50">WhatsApp</p>
                <p className="text-[14px] text-white">+92 370 7503981</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
