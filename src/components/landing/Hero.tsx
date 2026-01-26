import { Link } from "react-router-dom";
import { DashboardPreview } from "./DashboardPreview";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full pt-28 pb-16 px-4 md:px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-50" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl blob" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl blob" style={{ animationDelay: '-4s' }} />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-10 z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-friendly">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground/80">+500 emprendedores confían en nosotros</span>
        </div>

        {/* Headings */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-foreground">Tus finanzas,</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              claras y simples
            </span>
          </h1>
          
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Domina tus números, reduce gastos y acelera tu crecimiento con confianza.
            Sin complicaciones, sin hojas de cálculo.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            to="/auth"
            className="group flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-friendly-lg hover:shadow-premium-glow hover:scale-105 transition-all duration-300"
          >
            <span>Comenzar gratis</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="#features"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-foreground/80 hover:text-primary bg-white/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            Ver cómo funciona
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Sin tarjeta requerida</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Configura en 2 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Cancela cuando quieras</span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}
