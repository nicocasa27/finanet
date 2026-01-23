import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full pt-32 pb-20 px-4 md:px-6 flex flex-col items-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        {/* Headings */}
        <div className="flex flex-col items-center leading-none text-5xl md:text-7xl lg:text-8xl">
          <h1 className="font-serif tracking-tight text-foreground">
            Claridad financiera,
          </h1>
          <h2 className="font-sans font-normal tracking-tight text-foreground mt-2 md:mt-4">
            diseñada para crecer
          </h2>
        </div>

        {/* Subtitle */}
        <p className="font-serif text-lg md:text-2xl text-foreground/80 max-w-2xl leading-relaxed">
          Domina tus números, reduce gastos y acelera tu crecimiento con confianza.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-14 text-base font-mono">
            <Link to="/auth">
              Comenzar gratis
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground/5 rounded-none px-8 h-14 text-base font-mono">
            <Link to="/features">
              Explorar plataforma
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-5xl mt-12 md:mt-20">
          <div className="aspect-[16/10] rounded-3xl overflow-hidden border-2 border-foreground relative bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
            <img 
              src="https://placehold.co/1920x1200/png?text=Dashboard+Preview" 
              alt="Dashboard Preview" 
              className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
