import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import Features from "@/components/sections/Features";
import AwardsAndStats from "@/components/sections/AwardsAndStats";
import VideoShowcase from "@/components/sections/VideoShowcase";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/faq";
import Blog from "@/components/sections/blog";
import Footer from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <ProductGrid />
      <VideoShowcase />
      <AwardsAndStats />
      <Testimonials />
      <Blog />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
