import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-primary">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center text-white">
          {/* Icon */}
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 mb-8 border-2 border-white/30">
            <Calculator className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Deja de adivinar,
            <br />
            empieza a calcular
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Únete a cientos de emprendedores universitarios que ya saben exactamente cuánto ganan con cada producto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth" 
              className="group inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg shadow-brutal-lg hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
            >
              <span>Calcular mi primer producto</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
            <span>✓ Gratis para estudiantes</span>
            <span>✓ Sin conocimientos previos</span>
            <span>✓ Listo en 2 minutos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
