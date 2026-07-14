interface Section {
  heading: string;
  body: string;
}

function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <h1
        className="mb-4 uppercase leading-none text-black text-[40px] md:text-[56px]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h1>
      <p className="mb-8 text-[13px] text-black/45">Last updated: July 2026</p>
      <p className="mb-8 text-[15px] leading-relaxed text-black/70">{intro}</p>
      <div className="space-y-7">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-2 text-[16px] font-semibold text-black">{s.heading}</h2>
            <p className="text-[14px] leading-relaxed text-black/70">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern your use of the Lodestar website and your purchase of products from us. By placing an order you agree to the terms below."
      sections={[
        { heading: "Orders", body: "All orders are subject to availability and confirmation of the order price. We may contact you via the phone number provided to confirm details before shipping." },
        { heading: "Pricing & Payment", body: "Prices are listed in Pakistani Rupees and include applicable taxes unless stated otherwise. We accept card, cash on delivery, and mobile wallet payments." },
        { heading: "Shipping & Delivery", body: "Standard delivery takes 3–5 business days nationwide. Delivery windows are estimates and may vary due to factors outside our control." },
        { heading: "Returns & Exchanges", body: "We offer a free size exchange within 7 days of delivery, provided items are unworn and in original condition. Pre-loved items are sold as described." },
        { heading: "Contact", body: "Questions about these terms can be sent to sxtudios@gmail.com." },
      ]}
    />
  );
}

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what information Lodestar collects, how we use it, and the choices you have. We only collect what we need to fulfil your orders."
      sections={[
        { heading: "Information We Collect", body: "We collect your phone number, and optionally your email, along with the shipping address you provide at checkout. Payment details are handled securely by our payment partners." },
        { heading: "How We Use It", body: "Your information is used to process, confirm, and deliver your orders, and to contact you about your purchase. We do not sell your data." },
        { heading: "Order Tracking", body: "No account is required — your phone number is used to look up and track your order after checkout." },
        { heading: "Data Security", body: "Information submitted at checkout is encrypted in transit. We retain order data only as long as needed to provide our service and meet legal obligations." },
        { heading: "Contact", body: "For privacy requests, email us at sxtudios@gmail.com." },
      ]}
    />
  );
}
