import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const features = [{
  id: "001",
  title: "Control",
  description: "Ingresos, gastos y flujo de caja bajo control total."
}, {
  id: "002",
  title: "Proyección",
  description: "Anticipa tu cierre de mes y toma decisiones informadas."
}, {
  id: "003",
  title: "Reportes",
  description: "Estados financieros automáticos y listos para exportar."
}, {
  id: "004",
  title: "Acción",
  description: "Insights operativos para mejorar tu rentabilidad."
}];
export function Features() {
  const [mounted, setMounted] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power2.out",
        delay: 0.2
      });
    }
  }, []);
  return <section className="py-20 md:py-32 px-4 md:px-6 w-full bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-center mb-12 md:mb-20 max-w-3xl mx-auto">
          Todo lo que necesitas para medir, modelar y actuar.
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          
          {/* Left Content (Image) */}
          <div className="w-full md:w-1/2" ref={imageRef}>
            <div className="aspect-[4/3] relative w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden border-2 border-foreground/20 p-6">
              {/* Simulated Feature Preview - Control Panel */}
              <div className="h-full flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
                  <div>
                    <h3 className="font-sans font-medium text-lg text-foreground">Control Financiero</h3>
                    <p className="font-mono text-xs text-foreground/60 mt-1">Vista general</p>
                  </div>
                  
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="bg-white rounded-lg p-3 border border-foreground/10">
                    <p className="font-mono text-xs text-foreground/60 mb-1">Ingresos</p>
                    <p className="font-sans text-xl font-medium tabular-nums">${mounted ? "45.2K" : "0"}</p>
                    <div className="mt-2 h-1 bg-success/30 rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{
                      width: mounted ? "75%" : "0%"
                    }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-foreground/10">
                    <p className="font-mono text-xs text-foreground/60 mb-1">Gastos</p>
                    <p className="font-sans text-xl font-medium tabular-nums">${mounted ? "28.5K" : "0"}</p>
                    <div className="mt-2 h-1 bg-destructive/30 rounded-full overflow-hidden">
                      <div className="h-full bg-destructive rounded-full" style={{
                      width: mounted ? "60%" : "0%"
                    }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-foreground/10">
                    <p className="font-mono text-xs text-foreground/60 mb-1">Utilidad</p>
                    <p className="font-sans text-xl font-medium tabular-nums text-success">${mounted ? "16.7K" : "0"}</p>
                    <p className="text-xs text-success mt-1">↑ 12%</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-foreground/10">
                    <p className="font-mono text-xs text-foreground/60 mb-1">Margen</p>
                    <p className="font-sans text-xl font-medium tabular-nums">37%</p>
                    <div className="mt-2 h-1 bg-accent/30 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{
                      width: mounted ? "37%" : "0%"
                    }}></div>
                    </div>
                  </div>
                </div>

                {/* Category List */}
                <div className="bg-white rounded-lg p-3 border border-foreground/10">
                  <p className="font-mono text-xs text-foreground/60 mb-2">Top categorías</p>
                  <div className="space-y-2">
                    {[{
                    name: "Ventas",
                    amount: "$32.1K",
                    width: 85
                  }, {
                    name: "Servicios",
                    amount: "$13.1K",
                    width: 35
                  }, {
                    name: "Otros",
                    amount: "$5.2K",
                    width: 15
                  }].map((cat, i) => <div key={i} className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
                          <div className="h-full bg-foreground rounded-full transition-all" style={{
                        width: mounted ? `${cat.width}%` : "0%"
                      }}></div>
                        </div>
                        <span className="font-mono text-xs text-foreground/80 w-16 text-right">{cat.amount}</span>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content (List) */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex flex-col w-full border-2 border-foreground rounded-xl overflow-hidden">
              {features.map((feature, index) => <div key={feature.id} className="flex flex-col py-6 px-6 border-b-2 border-foreground last:border-b-0 bg-white hover:bg-muted/30 transition-colors">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-sans font-medium text-xl md:text-2xl tracking-tight">
                      {feature.title}
                    </h3>
                    <span className="font-mono text-sm text-foreground/60">
                      {feature.id}
                    </span>
                  </div>
                  <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>)}
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-foreground text-background hover:bg-foreground/90 h-14 text-base font-mono rounded-none border-2 border-foreground flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]">
                <div className="w-1 h-1 bg-background rounded-full"></div>
                Explorar funciones
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>;
}