import { Link } from "react-router-dom";
import { ArrowRight, Zap, Package, TrendingUp, DollarSign } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-accent/20 to-background" />
      
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start gap-6 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/20 border-2 border-primary rounded-full">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Nuevo: Simulador de escenarios
            </span>
          </div>

          {/* Headings - Left aligned like inspiration */}
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-primary">
              Calcula tus costos.
            </h1>
            {/* Highlighted text box like SpendsIn pink box */}
            <div className="bg-secondary px-4 py-2 -rotate-1">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                Cobra lo justo.
              </h2>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            La herramienta de costeo para emprendedores universitarios. 
            Sabe exactamente cuánto te cuesta producir y cuánto debes cobrar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start pt-2">
            <Link 
              to="/auth"
              className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <span>Comenzar gratis</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="#features"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              Ver cómo funciona
            </Link>
          </div>
        </div>

        {/* Right: Floating UI Cards like SpendsIn */}
        <div className="relative h-[500px] lg:h-[600px] hidden md:block">
          {/* Main product card */}
          <div className="absolute top-8 right-0 w-72 bg-white rounded-2xl p-5 shadow-brutal border-2 border-primary transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-primary">Brownies x6</p>
                <p className="text-sm text-muted-foreground">Recién calculado</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Costo total</span>
                <span className="font-semibold text-primary">$45.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Precio sugerido</span>
                <span className="font-semibold text-secondary">$90.00</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Margen</span>
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-bold">
                  50%
                </span>
              </div>
            </div>
          </div>

          {/* Chart card */}
          <div className="absolute top-48 left-0 w-64 bg-white rounded-2xl p-5 shadow-brutal border-2 border-primary transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-primary">Tu margen promedio</p>
              <span className="px-2 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                +12.5%
              </span>
            </div>
            {/* Simple bar chart */}
            <div className="flex items-end gap-2 h-24">
              {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-accent rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Últimos 7 productos</p>
          </div>

          {/* Profit indicator */}
          <div className="absolute bottom-16 right-8 w-56 bg-primary rounded-2xl p-4 shadow-brutal-lg text-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80">Ganancia estimada</p>
                <p className="text-xl font-bold">$450/mes</p>
              </div>
            </div>
          </div>

          {/* Small accent card */}
          <div className="absolute bottom-32 left-12 bg-secondary rounded-xl p-3 shadow-brutal-sm border-2 border-primary transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-white">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Precio justo calculado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
