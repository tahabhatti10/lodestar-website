import { Hero } from "../components/Hero";
import { ShopBar } from "../components/ShopBar";
import { ProductGrid } from "../components/ProductGrid";
import { PromoBanner } from "../components/PromoBanner";
import { Reviews } from "../components/Reviews";
import { ContactSection } from "../components/ContactSection";

export function Home() {
  return (
    <>
      <Hero />
      <ShopBar />
      <ProductGrid />
      <PromoBanner />
      <Reviews />
      <ContactSection />
    </>
  );
}
