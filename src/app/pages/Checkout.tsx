import { useState } from "react";
import { Link } from "react-router";
import {
  Lock,
  ChevronDown,
  CreditCard,
  Banknote,
  Wallet,
  Smartphone,
  CircleCheck,
} from "lucide-react";
import { CheckoutNavbar } from "../components/CheckoutNavbar";
import { Footer } from "../components/Footer";
import { PRODUCTS } from "../data/products";

const PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Kashmir"];

type PaymentMethod = "card" | "cod" | "easypaisa" | "jazzcash" | "nayapay";

const PAYMENTS: { id: PaymentMethod; label: string; Icon: typeof CreditCard }[] = [
  { id: "card", label: "Card", Icon: CreditCard },
  { id: "cod", label: "COD", Icon: Banknote },
  { id: "easypaisa", label: "Easypaisa", Icon: Wallet },
  { id: "jazzcash", label: "JazzCash", Icon: Smartphone },
  { id: "nayapay", label: "NayaPay", Icon: Wallet },
];

// Mock cart contents (review-only on checkout).
const ITEMS = [
  { ...PRODUCTS[0], size: "US 9", qty: 1 },
  { ...PRODUCTS[3], size: "US 10", qty: 1 },
];

function Field({
  label,
  optional,
  ...props
}: { label: string; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] text-black/60">
        {label}
        {optional && <span className="text-black/35"> (optional)</span>}
      </span>
      <input
        {...props}
        className="w-full border px-4 py-3 text-[14px] text-black placeholder:text-black/35 focus:border-black/60 focus:outline-none"
        style={{ borderColor: "var(--ls-grey-300)" }}
      />
    </label>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-4 uppercase leading-none text-black text-[24px] md:text-[28px]"
      style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}

export function Checkout() {
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [province, setProvince] = useState("");
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promoApplied ? 500 : 0;
  const shipping = 0;
  const tax = 0;
  const total = subtotal * 1 + shipping + tax - discount;
  const itemCount = ITEMS.reduce((s, i) => s + i.qty, 0);

  const placeLabel = payment === "cod" ? "Place Order" : `Pay Rs. ${total.toLocaleString()}`;

  const placeOrder = () => {
    if (!agreed) return;
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  /* ---------------- Confirmation view ---------------- */
  if (done) {
    return (
      <div className="min-h-screen w-full bg-white text-black">
        <CheckoutNavbar />
        <div className="h-16" />
        <div className="mx-auto max-w-2xl px-5 py-16 text-center md:py-24">
          <CircleCheck size={64} className="mx-auto text-black" strokeWidth={1.5} />
          <h1
            className="mt-6 uppercase leading-[0.95] text-black text-[40px] md:text-[52px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Thank you! Your order is confirmed
          </h1>
          <p className="mt-4 text-[15px] text-black/60">
            Order number
          </p>
          <p className="text-[26px] font-semibold text-black">Order #LS10234</p>
          <p className="mt-2 text-[14px] text-black/60">
            Estimated delivery: 3–5 business days
          </p>

          {/* Recap */}
          <div
            className="mx-auto mt-10 border p-5 text-left"
            style={{ borderColor: "var(--ls-grey-300)" }}
          >
            <p className="mb-3 text-[13px] uppercase tracking-wider text-black/50">Order recap</p>
            {ITEMS.map((i) => (
              <div key={i.id} className="flex items-center justify-between py-1.5 text-[14px]">
                <span className="text-black/75">
                  {i.name} · {i.size} · ×{i.qty}
                </span>
                <span className="font-medium text-black">Rs. {(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="mt-4 space-y-1 border-t pt-4 text-[13px] text-black/60" style={{ borderColor: "var(--ls-grey-300)" }}>
              <p><span className="text-black/45">Ship to: </span>House 12, Gulberg III, Lahore, Punjab</p>
              <p className="capitalize"><span className="text-black/45">Payment: </span>{payment === "cod" ? "Cash on delivery" : payment}</p>
            </div>
          </div>

          {payment === "cod" && (
            <p className="mt-4 text-[13px] text-black/55">
              We'll call {phone || "your number"} to confirm your order before it ships.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              className="border px-8 py-3.5 text-[14px] font-semibold uppercase tracking-wider text-black transition-colors hover:border-black/60"
              style={{ borderColor: "var(--ls-grey-300)" }}
            >
              Track Your Order
            </button>
            <Link
              to="/shop"
              className="px-8 py-3.5 text-[14px] font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: "var(--ls-ink)" }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ---------------- Order summary (shared) ---------------- */
  const OrderSummaryBody = () => (
    <>
      <div className="space-y-4">
        {ITEMS.map((i) => (
          <div key={i.id} className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center border text-[9px] uppercase tracking-wider text-black/30"
              style={{ backgroundColor: "var(--ls-grey-100)", borderColor: "var(--ls-grey-300)" }}
            >
              Img
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-black">{i.name}</p>
              <p className="text-[12px] text-black/50">Size {i.size} · Qty {i.qty}</p>
            </div>
            <span className="text-[13px] font-medium text-black">Rs. {(i.price * i.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Promo */}
      <div className="mt-5">
        {promoApplied ? (
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-black/70">Promo <span className="font-medium">LODE500</span> applied</span>
            <button onClick={() => setPromoApplied(false)} className="text-black/50 underline">Remove</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
              className="min-w-0 flex-1 border px-3 py-2.5 text-[13px] focus:border-black/60 focus:outline-none"
              style={{ borderColor: "var(--ls-grey-300)" }}
            />
            <button
              onClick={() => promo.trim() && setPromoApplied(true)}
              className="px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: "var(--ls-ink)" }}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="mt-5 space-y-2 text-[14px]">
        <div className="flex justify-between text-black/70">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-black/70">
            <span>Discount</span>
            <span>− Rs. {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-black/70">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-black/70">
          <span>Tax</span>
          <span>—</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--ls-grey-300)" }}>
        <span className="text-[15px] font-semibold text-black">Total</span>
        <span className="text-[20px] font-semibold text-black">Rs. {total.toLocaleString()}</span>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <CheckoutNavbar />
      <div className="h-16" />

      {/* Progress indicator */}
      <div className="border-b" style={{ borderColor: "var(--ls-grey-300)" }}>
        <div className="mx-auto max-w-[1400px] px-5 py-4 md:px-8">
          {/* Desktop breadcrumb */}
          <div className="hidden items-center justify-center gap-3 text-[14px] md:flex">
            <span className="text-black/40">Cart</span>
            <span className="text-black/30">→</span>
            <span className="font-semibold text-black">Information &amp; Payment</span>
            <span className="text-black/30">→</span>
            <span className="text-black/40">Confirmation</span>
          </div>
          {/* Mobile dots */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-semibold ${
                  n === 2 ? "text-white" : "text-black/40"
                }`}
                style={{ backgroundColor: n === 2 ? "var(--ls-ink)" : "var(--ls-grey-100)" }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile order summary accordion */}
      <div className="border-b md:hidden" style={{ borderColor: "var(--ls-grey-300)" }}>
        <button
          onClick={() => setSummaryOpen((v) => !v)}
          className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4"
        >
          <span className="flex items-center gap-2 text-[14px] text-black">
            Order Summary
            <ChevronDown size={16} className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
          </span>
          <span className="text-[14px] text-black/60">
            {itemCount} items · <span className="font-semibold text-black">Rs. {total.toLocaleString()}</span>
          </span>
        </button>
        {summaryOpen && <div className="mx-auto max-w-[1400px] px-5 pb-5">{OrderSummaryBody()}</div>}
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-8 pb-28 md:grid-cols-[6fr_4fr] md:px-8 md:py-12 md:pb-12">
        {/* Left: forms */}
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <SectionHeading>Contact</SectionHeading>
            <div className="space-y-4">
              <Field
                label="Phone number"
                type="tel"
                placeholder="+92 3XX XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Field label="Email" optional type="email" placeholder="you@email.com" />
              <p className="text-[12px] text-black/45">
                No account needed — track your order with your phone number after checkout.
              </p>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <SectionHeading>Shipping Address</SectionHeading>
            <div className="space-y-4">
              <Field label="Full name" placeholder="Full name" />
              <Field label="Address line 1" placeholder="Street address" />
              <Field label="Address line 2" optional placeholder="Apartment, suite, etc." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" placeholder="City" />
                {/* Province dropdown */}
                <div className="relative">
                  <span className="mb-1.5 block text-[13px] text-black/60">Province</span>
                  <button
                    type="button"
                    onClick={() => setProvinceOpen((v) => !v)}
                    className="flex w-full items-center justify-between border px-4 py-3 text-[14px] focus:outline-none"
                    style={{ borderColor: "var(--ls-grey-300)" }}
                  >
                    <span className={province ? "text-black" : "text-black/35"}>
                      {province || "Select province"}
                    </span>
                    <ChevronDown size={16} className="text-black/40" />
                  </button>
                  {provinceOpen && (
                    <div
                      className="absolute z-20 mt-1 max-h-56 w-full overflow-auto border bg-white shadow-lg"
                      style={{ borderColor: "var(--ls-grey-300)" }}
                    >
                      {PROVINCES.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setProvince(p);
                            setProvinceOpen(false);
                          }}
                          className="block w-full px-4 py-2.5 text-left text-[14px] text-black hover:bg-[var(--ls-grey-100)]"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 text-[14px] text-black/70">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="h-4 w-4 accent-black"
                />
                Save this address for next time
              </label>
            </div>
          </section>

          {/* Delivery */}
          <section>
            <SectionHeading>Delivery</SectionHeading>
            <div
              className="flex items-center justify-between border-2 border-black p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-black">
                  <span className="h-2.5 w-2.5 rounded-full bg-black" />
                </span>
                <div>
                  <p className="text-[14px] font-medium text-black">Standard Delivery</p>
                  <p className="text-[13px] text-black/50">3–5 business days</p>
                </div>
              </div>
              <span className="text-[14px] font-semibold text-black">Free</span>
            </div>
          </section>

          {/* Payment */}
          <section>
            <SectionHeading>Payment</SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {PAYMENTS.map(({ id, label, Icon }) => {
                const selected = payment === id;
                return (
                  <button
                    key={id}
                    onClick={() => setPayment(id)}
                    className={`flex flex-col items-center gap-2 border-2 px-2 py-4 transition-colors ${
                      selected ? "border-black bg-black text-white" : "text-black"
                    }`}
                    style={selected ? undefined : { borderColor: "var(--ls-grey-300)" }}
                  >
                    <Icon size={22} />
                    <span className="text-[12px] font-medium">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic panel */}
            <div className="mt-4 border p-5" style={{ borderColor: "var(--ls-grey-300)" }}>
              {payment === "card" && (
                <div className="space-y-4">
                  <Field label="Card number" placeholder="1234 5678 9012 3456" inputMode="numeric" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry" placeholder="MM / YY" />
                    <Field label="CVV" placeholder="123" inputMode="numeric" />
                  </div>
                  <Field label="Cardholder name" placeholder="Name on card" />
                  <p className="flex items-center gap-1.5 text-[12px] text-black/45">
                    <Lock size={13} /> Payments processed securely
                  </p>
                </div>
              )}
              {payment === "cod" && (
                <p className="text-[14px] leading-relaxed text-black/70">
                  Pay with cash when your order arrives. Our team may call to confirm before shipping.
                </p>
              )}
              {(payment === "easypaisa" || payment === "jazzcash" || payment === "nayapay") && (
                <div className="space-y-3">
                  <Field label="Mobile wallet number" type="tel" placeholder="+92 3XX XXXXXXX" />
                  <p className="text-[12px] text-black/45">
                    You'll receive a prompt on your{" "}
                    {payment === "easypaisa" ? "Easypaisa" : payment === "jazzcash" ? "JazzCash" : "NayaPay"} app to
                    approve the payment.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Legal + desktop place order */}
          <section className="space-y-5">
            <label className="flex cursor-pointer items-start gap-2.5 text-[14px] text-black/70">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-black"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" target="_blank" className="text-black underline">Terms of Service</Link> and{" "}
                <Link to="/privacy" target="_blank" className="text-black underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              onClick={placeOrder}
              disabled={!agreed}
              className="hidden w-full py-4 text-[14px] font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 md:block"
              style={{ backgroundColor: "var(--ls-ink)" }}
            >
              {placeLabel}
            </button>
            <p className="hidden items-center justify-center gap-1.5 text-center text-[12px] text-black/45 md:flex">
              <Lock size={13} /> Your information is encrypted and secure
            </p>
          </section>
        </div>

        {/* Right: sticky order summary (desktop) */}
        <aside className="hidden md:block">
          <div
            className="sticky top-24 border p-6"
            style={{ borderColor: "var(--ls-grey-300)" }}
          >
            <h2
              className="mb-5 uppercase leading-none text-black text-[24px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Order Summary
            </h2>
            {OrderSummaryBody()}
          </div>
        </aside>
      </div>

      {/* Mobile fixed bottom place-order bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-white p-4 md:hidden"
        style={{ borderColor: "var(--ls-grey-300)" }}
      >
        <button
          onClick={placeOrder}
          disabled={!agreed}
          className="flex w-full items-center justify-center gap-2 py-3.5 text-[14px] font-semibold uppercase tracking-wider text-white disabled:opacity-40"
          style={{ backgroundColor: "var(--ls-ink)" }}
        >
          <Lock size={14} /> {placeLabel}
        </button>
      </div>

      <Footer />
    </div>
  );
}
