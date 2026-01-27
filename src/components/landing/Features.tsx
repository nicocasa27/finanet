import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Calculator, DollarSign, Package, TrendingUp, FileText, Smartphone } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Costeo por receta",
    description: "Agrega ingredientes y calcula el costo de producción automáticamente para cada producto.",
    color: "from-primary to-primary/80",
  },
  {
    icon: DollarSign,
    title: "Precio sugerido",
    description: "Te decimos cuánto cobrar para alcanzar el margen de ganancia que deseas.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: Package,
    title: "Inventario de insumos",
    description: "Registra tus materias primas con sus precios y úsalas en múltiples productos.",
    color: "from-success to-success/80",
  },
  {
    icon: TrendingUp,
    title: "Simulador de escenarios",
    description: "¿Qué pasa si sube un ingrediente? Proyecta ganancias y analiza impactos en tu margen.",
    color: "from-warning to-warning/80",
  },
  {
    icon: FileText,
    title: "Exporta reportes",
    description: "Genera reportes PDF listos para tus clases, proyectos de emprendimiento o inversionistas.",
    color: "from-primary to-secondary",
  },
  {
    icon: Smartphone,
    title: "Desde cualquier lugar",
    description: "Accede desde tu celular entre clases. Registra productos y costos en segundos.",
    color: "from-secondary to-primary",
  },
];

export function Features() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 w-full bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Funcionalidades</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Todo lo que necesitas
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              para costear bien
            </span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas diseñadas para emprendedores universitarios que quieren saber cuánto deben cobrar.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease-out ${index * 0.1}s`,
              }}
            >
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-friendly group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
