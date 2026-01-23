import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollManager } from "@/components/ui/scroll-manager";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <ScrollManager />
      
      <Navbar />
      <main>
        <Hero />
        
        {/* Marquee Divider */}
        <div className="py-6 md:py-8 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden border-y border-white/10 select-none">
            <div className="marquee-track font-mono text-xs md:text-sm uppercase tracking-[0.3em]">
                <span className="mx-4 md:mx-8">Finanzas</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Control</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Crecimiento</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Claridad</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Resultados</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Estrategia</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Reportes</span><span className="text-accent">•</span>
                <span className="mx-4 md:mx-8">Prisma</span><span className="text-secondary-foreground">•</span>
                <span className="mx-4 md:mx-8">Finanzas</span><span className="text-secondary-foreground">•</span>
                <span className="mx-4 md:mx-8">Control</span><span className="text-secondary-foreground">•</span>
                <span className="mx-4 md:mx-8">Crecimiento</span><span className="text-secondary-foreground">•</span>
                <span className="mx-4 md:mx-8">Claridad</span><span className="text-secondary-foreground">•</span>
            </div>
        </div>

        <Problem />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
