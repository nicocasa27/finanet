import { Link } from "react-router-dom";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section className="relative w-full pt-32 pb-20 px-4 md:px-6 flex flex-col items-center text-center bg-gradient-to-b from-blue-100/50 via-background to-background">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-12">
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
        <p className="font-serif text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
          Domina tus números, reduce gastos y acelera tu crecimiento con confianza.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            to="/auth"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-14 text-base font-mono border-2 border-foreground flex items-center justify-center gap-2.5 transition-all hover:scale-105"
          >
            <div className="w-1 h-1 bg-background rounded-full"></div>
            Solicitar demo
          </Link>
          <Link 
            to="/features"
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none px-8 h-14 text-base font-mono flex items-center justify-center transition-all hover:scale-105"
          >
            Explorar plataforma →
          </Link>
        </div>

        {/* Dashboard Preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}
