import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Principles } from "@/components/landing/Principles";
import { Testimonial } from "@/components/landing/Testimonial";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { ScrollManager } from "@/components/ui/scroll-manager";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-foreground">
      <ScrollManager />
      
      <Navbar />
      <main>
        {/* Hero Section with gradient background */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Principles Section */}
        <Principles />
        
        {/* Testimonial/Case Study */}
        <Testimonial />
        
        {/* Additional Sections */}
        <Problem />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
