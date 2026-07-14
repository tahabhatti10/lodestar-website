Design a responsive checkout page for "Lodestar," a minimal, 
Nike-inspired sneaker e-commerce site. Build both desktop and mobile 
web layouts, visually consistent with the homepage, product page, and 
cart page (same color and type system) — but with a simplified navbar, 
explained below, since checkout pages convert better with fewer exits.

NAVBAR (simplified for checkout): Fixed top bar, black background, 
white text. Left: "Lodestar" logotype only — no center nav links 
(Home/Contact/Men/Women/Unisex removed on purpose here, standard 
practice on checkout to reduce drop-off). Right: small padlock icon 
plus "Secure Checkout" label in place of search/cart icons. Same 
treatment on mobile — no hamburger menu.

PROGRESS INDICATOR: Below the navbar, a 3-step breadcrumb — "Cart → 
Information & Payment → Confirmation" — current step shown bold black, 
other steps in muted grey. Centered on desktop; condenses to three 
numbered dots on mobile to save vertical space.

LAYOUT: Two-column on desktop — forms on the left (~60% width), order 
summary on the right (~40% width, sticky on scroll). On mobile, order 
summary collapses into a tappable "Order Summary ▾" accordion pinned 
above the form, showing just item count and total when collapsed.

CONTACT SECTION:
- Small heading "Contact"
- Phone number field (primary identifier — this is how orders get 
  confirmed and tracked)
- Email field, marked optional
- Small grey note: "No account needed — track your order with your 
  phone number after checkout"

SHIPPING ADDRESS SECTION:
- Small heading "Shipping Address"
- Full name field
- Address line 1, Address line 2 (optional)
- City field, Province dropdown
- "Save this address for next time" checkbox

DELIVERY METHOD SECTION:
- Small heading "Delivery"
- One selectable row, pre-selected: "Standard Delivery — 3-5 business 
  days — Free" (leave room to add more rows later if express shipping 
  is introduced)

PAYMENT METHOD SECTION:
- Small heading "Payment"
- Five selectable method tiles in a row (wrap to 2-3 per row on 
  mobile), each with its logo/icon and label: Card, COD, Easypaisa, 
  JazzCash, NayaPay. Selected tile shown with black border or black 
  fill.
- Panel beneath the tiles changes based on which is selected:
  - Card: standard form — card number, expiry, CVV, cardholder name, 
    small padlock icon with "Payments processed securely" microcopy
  - COD: short note only — "Pay with cash when your order arrives. 
    Our team may call to confirm before shipping."
  - Easypaisa / JazzCash / NayaPay: single mobile wallet number field 
    plus microcopy — "You'll receive a prompt on your [wallet] app to 
    approve the payment"

ORDER SUMMARY PANEL (right column desktop / accordion on mobile):
- Compact line items — thumbnail, name, size, qty, price (denser than 
  the full cart page version, review-only, no quantity editing here)
- Promo code field + "Apply" button (or, if already applied on the 
  cart page, show it applied with a small "Remove" link instead)
- Subtotal, Shipping, Tax rows, divider, then Total in bold, larger 
  type

LEGAL & PLACE ORDER:
- Checkbox: "I agree to the Terms of Service and Privacy Policy," 
  both terms shown as inline underlined links
- Full-width primary button, solid black, white text — label changes 
  with payment method: "Place Order" for COD, "Pay Rs. [total]" for 
  Card/Easypaisa/JazzCash/NayaPay
- Small centered trust line beneath: padlock icon + "Your information 
  is encrypted and secure"

ORDER CONFIRMATION SCREEN (annotate as a separate view, shown after 
"Place Order" is submitted):
- Centered black checkmark icon
- "Thank you! Your order is confirmed" heading
- Order number displayed prominently (e.g. "Order #LS10234")
- Estimated delivery window
- Order recap: line items, shipping address, payment method used
- For COD orders specifically, small note: "We'll call [phone number] 
  to confirm your order before it ships"
- Two buttons: "Track Your Order" (outline) and "Continue Shopping" 
  (solid black)

FOOTER: Light grey background, centered pill-shaped black "dock" 
containing three icons only — Instagram, WhatsApp, Email. Keep this 
even on checkout; small enough not to distract, useful if someone has 
a question mid-purchase.

COLOR PALETTE: Base white/grey/black. For dark elements (navbar, 
buttons, footer dock, selected payment tiles), pull exact tone values 
from the iOS 27 (Liquid Glass) kit already in this Figma file rather 
than generic black.

TYPOGRAPHY: Headings in a bold condensed uppercase sans — Anton or 
Bebas Neue (same visual family as Nike's branding, not the licensed 
Nike typeface). Body, form fields, and UI text in the system font 
stack (-apple-system, BlinkMacSystemFont), falling back to Inter.

RESPONSIVE: Primary breakpoint ~768px. On mobile: progress indicator 
condenses to dots, order summary becomes a collapsed accordion above 
the form, payment tiles wrap to 2-3 per row, and the "Place Order" / 
"Pay" button becomes a fixed bottom bar so it's reachable without 
scrolling back up.