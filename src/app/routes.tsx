import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Contact } from "./pages/Contact";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";
import { Terms, Privacy } from "./pages/Legal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: Product },
      { path: "contact", Component: Contact },
      { path: "terms", Component: Terms },
      { path: "privacy", Component: Privacy },
      // Checkout renders its own simplified navbar/footer; Root skips its chrome for it.
      { path: "checkout", Component: Checkout },
    ],
  },
]);
