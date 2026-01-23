import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Testimonial() {
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

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 w-full bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          
          {/* Left - Image with Report Preview */}
          <div className="w-full md:w-1/2" ref={imageRef}>
            <div className="aspect-[4/3] relative w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl overflow-hidden border-2 border-foreground/20 p-6">
              {/* Simulated Report Preview */}
              <div className="h-full flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
                  <div>
                    <h3 className="font-sans font-medium text-lg text-foreground">Reporte Mensual</h3>
                    <p className="font-mono text-xs text-foreground/60 mt-1">Enero 2025</p>
                  </div>
                  <div className="px-3 py-1 bg-foreground text-background rounded font-mono text-xs">
                    PDF
                  </div>
                </div>

                {/* Report Content */}
                <div className="flex-1 bg-white rounded-lg p-4 border border-foreground/10 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-foreground/60">Ingresos Totales</span>
                      <span className="font-sans font-medium tabular-nums">${mounted ? "45,200" : "0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-foreground/60">Gastos Totales</span>
                      <span className="font-sans font-medium tabular-nums text-destructive">${mounted ? "28,500" : "0"}</span>
                    </div>
                    <div className="h-px bg-foreground/10 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-medium">Utilidad Neta</span>
                      <span className="font-sans text-lg font-bold text-success tabular-nums">${mounted ? "16,700" : "0"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-foreground/10">
                    <p className="font-mono text-xs text-foreground/60 mb-3">Distribución de Gastos</p>
                    <div className="space-y-2">
                      {[
                        { name: "Operativos", percent: 45, color: "bg-blue-500" },
                        { name: "Marketing", percent: 30, color: "bg-purple-500" },
                        { name: "Administración", percent: 25, color: "bg-orange-500" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color.replace('bg-', '') }}></div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-mono text-xs text-foreground/80">{item.name}</span>
                              <span className="font-mono text-xs text-foreground/60">{item.percent}%</span>
                            </div>
                            <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${item.color} rounded-full transition-all`}
                                style={{ width: mounted ? `${item.percent}%` : "0%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-foreground/10">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-foreground/60">Margen Neto</span>
                      <span className="font-sans text-xl font-bold text-success">37%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full md:w-1/2">
            <h3 className="font-sans font-medium text-2xl md:text-3xl mb-6 tracking-tight">
              Por qué Tu Negocio eligió Prisma
            </h3>
            <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
              Prisma simplificó nuestros flujos financieros, resultando en decisiones más rápidas, menos hojas de cálculo y 34% más cobertura de datos.
            </p>
            <button className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-12 text-base font-mono border-2 border-foreground flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]">
              <div className="w-1 h-1 bg-background rounded-full"></div>
              Leer caso de estudio
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
