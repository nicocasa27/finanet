import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight } from "lucide-react";

const features = [
  { name: "Productos", free: "3", student: "Ilimitados", pro: "Ilimitados" },
  { name: "Insumos", free: "10", student: "Ilimitados", pro: "Ilimitados" },
  { name: "Emprendimientos", free: "1", student: "3", pro: "Ilimitados" },
  { name: "Calculadora de precio", free: true, student: true, pro: true },
  { name: "Dashboard", free: "Básico", student: "Completo", pro: "Completo" },
  { name: "Simulador de escenarios", free: false, student: true, pro: true },
  { name: "Exportar PDF", free: false, student: true, pro: true },
  { name: "Historial completo", free: false, student: true, pro: true },
  { name: "Colaboradores", free: false, student: false, pro: true },
  { name: "API access", free: false, student: false, pro: true },
  { name: "Soporte prioritario", free: false, student: true, pro: true },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const renderCell = (value: boolean | string) => {
    if (value === true) return <Check className="h-5 w-5 text-secondary" />;
    if (value === false) return <Minus className="h-5 w-5 text-muted-foreground/30" />;
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <section id="pricing" className="py-24 md:py-32 px-4 md:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-4">
            [ Precios ]
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Simple y transparente
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Empieza gratis. Crece cuando lo necesites.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-background border border-border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual
              <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground font-bold">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing table */}
        <div className="bg-background border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 border-b border-border">
            <div className="p-6 md:p-8">
              <span className="font-mono text-sm text-muted-foreground">Características</span>
            </div>
            
            {/* Free */}
            <div className="p-6 md:p-8 border-l border-border">
              <h3 className="text-xl font-bold mb-1">Gratis</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground text-sm">/mes</span>
              </div>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                Comenzar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            {/* Student - Highlighted */}
            <div className="p-6 md:p-8 border-l border-border bg-foreground text-background relative">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-bold">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-1">Estudiante</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">${isYearly ? "790" : "79"}</span>
                <span className="text-background/60 text-sm">/{isYearly ? "año" : "mes"}</span>
              </div>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 text-sm font-medium bg-secondary text-secondary-foreground px-4 py-2 hover:bg-secondary/90 transition-colors"
              >
                Comenzar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            {/* Pro */}
            <div className="p-6 md:p-8 border-l border-border">
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">${isYearly ? "1990" : "199"}</span>
                <span className="text-muted-foreground text-sm">/{isYearly ? "año" : "mes"}</span>
              </div>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                Comenzar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className={`grid grid-cols-4 ${index !== features.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="p-4 md:px-8 md:py-5 flex items-center">
                <span className="text-sm">{feature.name}</span>
              </div>
              <div className="p-4 md:px-8 md:py-5 border-l border-border flex items-center justify-center">
                {renderCell(feature.free)}
              </div>
              <div className="p-4 md:px-8 md:py-5 border-l border-border bg-foreground/5 flex items-center justify-center">
                {renderCell(feature.student)}
              </div>
              <div className="p-4 md:px-8 md:py-5 border-l border-border flex items-center justify-center">
                {renderCell(feature.pro)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          ¿Tienes un grupo de más de 10 estudiantes? <a href="mailto:hola@finanet.app" className="text-secondary hover:underline">Escríbenos</a> para un plan especial.
        </p>
      </div>
    </section>
  );
}
