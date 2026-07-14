import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export function Root() {
  const { pathname } = useLocation();
  // Checkout supplies its own simplified navbar + footer, so skip the site chrome.
  const isCheckout = pathname.startsWith("/checkout");

  return (
    <CartProvider>
      <div className="min-h-screen w-full bg-white text-black">
        {isCheckout ? (
          <Outlet />
        ) : (
          <>
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className="h-16" />
            <main>
              <Outlet />
            </main>
            <Footer />
          </>
        )}
      </div>
    </CartProvider>
  );
}
