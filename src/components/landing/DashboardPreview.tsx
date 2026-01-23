import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Datos simulados para el gráfico (12 meses)
const chartData = [{
  name: "Ene",
  ingresos: 420,
  gastos: 280
}, {
  name: "Feb",
  ingresos: 380,
  gastos: 320
}, {
  name: "Mar",
  ingresos: 520,
  gastos: 290
}, {
  name: "Abr",
  ingresos: 480,
  gastos: 350
}, {
  name: "May",
  ingresos: 550,
  gastos: 380
}, {
  name: "Jun",
  ingresos: 620,
  gastos: 420
}, {
  name: "Jul",
  ingresos: 580,
  gastos: 390
}, {
  name: "Ago",
  ingresos: 650,
  gastos: 410
}, {
  name: "Sep",
  ingresos: 720,
  gastos: 450
}, {
  name: "Oct",
  ingresos: 780,
  gastos: 480
}, {
  name: "Nov",
  ingresos: 850,
  gastos: 520
}, {
  name: "Dic",
  ingresos: 920,
  gastos: 540
}];
export function DashboardPreview() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }
  }, []);
  return <div ref={containerRef} className="relative w-full max-w-3xl mx-auto mt-8 md:mt-12">
      <div className="rounded-2xl overflow-hidden border-2 border-foreground relative bg-white shadow-lg">
        <div className="p-5 md:p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <p className="text-muted-foreground text-sm font-mono">
              Buenos días, Tu Negocio
            </p>
            <h3 className="font-serif text-lg md:text-xl text-foreground mt-1">
              Tus métricas financieras están listas para revisar.
            </h3>
          </div>

          {/* KPI Cards - Solo 2 */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Margen Bruto */}
            <div className="bg-card p-4 rounded-xl border border-border/50" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out 0.1s"
          }}>
              <p className="font-mono text-xs text-muted-foreground mb-2">
                Margen Bruto
              </p>
              <p className="font-sans text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                56%
              </p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full transition-all duration-1000" style={{
                width: mounted ? "56%" : "0%"
              }} />
              </div>
            </div>

            {/* Utilidad Mensual */}
            <div className="bg-card p-4 rounded-xl border border-border/50" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out 0.2s"
          }}>
              <p className="font-mono text-xs text-muted-foreground mb-2">
                Utilidad Mensual
              </p>
              <p className="font-sans text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                $583.7K
              </p>
              <p className="text-success text-xs font-medium mt-2">
                ↑ 16% vs meta mensual
              </p>
            </div>
          </div>

          {/* Area Chart */}
          <div className="bg-card p-4 rounded-xl border border-border/50" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease-out 0.3s"
        }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-xs text-muted-foreground">Ingresos vs Gastos (2026)</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    Ingresos
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="font-mono text-xs text-muted-foreground">
                    Gastos
                  </span>
                </div>
              </div>
            </div>
            <div className="h-28 md:h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
                  fontSize: 9,
                  fill: "hsl(var(--muted-foreground))"
                }} interval={1} />
                  <YAxis hide />
                  <Area type="monotone" dataKey="ingresos" stroke="hsl(217, 91%, 60%)" strokeWidth={2} fill="url(#colorIngresos)" />
                  <Area type="monotone" dataKey="gastos" stroke="hsl(0, 84%, 60%)" strokeWidth={1.5} fill="url(#colorGastos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -top-3 -left-3 w-24 h-24 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </div>;
}