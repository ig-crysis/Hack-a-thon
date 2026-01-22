import Hero from "@/components/Landing/Hero";
import Feature from "@/components/Landing/Feature";
import Footer from "@/components/Landing/Footer";
import { Testimonials } from "@/components/Landing/Testinomial";
import CTA from "@/components/Landing/CTA";
import Header from "@/components/Landing/header";
import { SearchForm } from "@/components/search-form";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Decreased padding (py-2) and margin adjustments for a tighter look */}
        <section className="flex flex-col items-center px-4 py-2 md:-mt-14 sm:-mt-8 -mt-12">
          <div className="container max-w-4xl mx-auto text-center space-y-6">
            
            {/* 1. Hero Title & Subtitle */}
            <Hero />
            
            {/* 2. Search Bar: Positioned as the primary call-to-action */}
            <div className="w-full max-w-2xl mx-auto -mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              
            </div>

            {/* 3. Supporting Sections */}
            <Feature />
            <Testimonials />
            <CTA />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}