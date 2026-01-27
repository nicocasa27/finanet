import { Calculator, DollarSign, Package, TrendingUp, FileText, Smartphone, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Costeo por receta",
    description: "Agrega ingredientes y calcula automáticamente el costo de cada producto.",
    size: "large",
  },
  {
    icon: DollarSign,
    title: "Precio sugerido",
    description: "Sabemos cuánto debes cobrar.",
    size: "small",
  },
  {
    icon: Package,
    title: "Insumos",
    description: "Tu inventario de materias primas.",
    size: "small",
  },
  {
    icon: TrendingUp,
    title: "Simulador",
    description: "¿Qué pasa si sube un ingrediente? Proyecta impactos en tu margen antes de que pasen.",
    size: "medium",
  },
  {
    icon: FileText,
    title: "Reportes PDF",
    description: "Listos para clases.",
    size: "small",
  },
  {
    icon: Smartphone,
    title: "Móvil",
    description: "Desde tu celular.",
    size: "small",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-4 md:px-6 w-full bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        {/* Header - Left aligned */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-sm text-background/60 uppercase tracking-wider mb-4">
            [ Funcionalidades ]
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Herramientas que
            <br />
            <span className="text-secondary">hacen la diferencia</span>
          </h2>
        </div>
        
        {/* Bento Grid - Asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large card - spans 2 cols and 2 rows */}
          <div className="col-span-2 row-span-2 bg-background text-foreground p-8 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[400px] group hover:bg-secondary/10 transition-colors duration-300">
            <div>
              <Calculator className="h-10 w-10 text-secondary mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Costeo por receta
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Agrega ingredientes con sus cantidades y costos. El sistema calcula automáticamente cuánto te cuesta producir cada unidad.
              </p>
            </div>
            <div className="flex items-center gap-2 text-secondary font-medium group-hover:gap-4 transition-all">
              <span>Ver cómo funciona</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Small cards */}
          <div className="bg-background/10 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[180px] border border-background/20 hover:border-secondary/50 transition-colors">
            <DollarSign className="h-8 w-8 text-secondary" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-lg mb-1">Precio sugerido</h3>
              <p className="text-background/70 text-sm">Sabemos cuánto cobrar.</p>
            </div>
          </div>

          <div className="bg-background/10 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[180px] border border-background/20 hover:border-secondary/50 transition-colors">
            <Package className="h-8 w-8 text-secondary" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-lg mb-1">Inventario</h3>
              <p className="text-background/70 text-sm">Tus materias primas.</p>
            </div>
          </div>

          {/* Medium card - spans 2 cols */}
          <div className="col-span-2 bg-secondary text-foreground p-8 flex flex-col justify-between min-h-[180px]">
            <TrendingUp className="h-8 w-8 text-foreground" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-xl mb-2">Simulador de escenarios</h3>
              <p className="text-foreground/80">
                ¿Qué pasa si sube la harina 20%? Proyecta antes de que pase.
              </p>
            </div>
          </div>

          {/* Two more small cards */}
          <div className="bg-background text-foreground p-6 flex flex-col justify-between min-h-[180px] hover:bg-secondary/10 transition-colors">
            <FileText className="h-8 w-8 text-secondary" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-lg mb-1">Reportes PDF</h3>
              <p className="text-muted-foreground text-sm">Para tus clases.</p>
            </div>
          </div>

          <div className="bg-background text-foreground p-6 flex flex-col justify-between min-h-[180px] hover:bg-secondary/10 transition-colors">
            <Smartphone className="h-8 w-8 text-secondary" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-lg mb-1">100% Móvil</h3>
              <p className="text-muted-foreground text-sm">Desde tu celular.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
