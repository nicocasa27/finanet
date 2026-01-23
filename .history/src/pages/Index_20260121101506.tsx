import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { ScrollManager } from "@/components/ui/scroll-manager";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <ScrollManager />
      
      <Navbar />
      <main>
        {/* Gradient Background Wrapper for Hero and Features */}
        <div className="relative">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 via-background to-background pointer-events-none" />
           <Hero />
           <Features />
        </div>
        
        {/* Marquee Divider */}
        <div className="py-6 md:py-8 bg-foreground text-background overflow-hidden select-none">
            <div className="marquee-track font-mono text-xs md:text-sm uppercase tracking-[0.3em]">
                <span className="mx-4 md:mx-8">Finanzas</span><span>•</span>
                <span className="mx-4 md:mx-8">Control</span><span>•</span>
                <span className="mx-4 md:mx-8">Crecimiento</span><span>•</span>
                <span className="mx-4 md:mx-8">Claridad</span><span>•</span>
                <span className="mx-4 md:mx-8">Resultados</span><span>•</span>
                <span className="mx-4 md:mx-8">Estrategia</span><span>•</span>
                <span className="mx-4 md:mx-8">Reportes</span><span>•</span>
                <span className="mx-4 md:mx-8">Prisma</span><span>•</span>
                <span className="mx-4 md:mx-8">Finanzas</span><span>•</span>
                <span className="mx-4 md:mx-8">Control</span><span>•</span>
                <span className="mx-4 md:mx-8">Crecimiento</span><span>•</span>
                <span className="mx-4 md:mx-8">Claridad</span><span>•</span>
            </div>
        </div>

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
