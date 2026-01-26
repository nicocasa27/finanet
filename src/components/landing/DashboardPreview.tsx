import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, PieChart, Bell } from "lucide-react";

const chartData = [
  { name: "Ene", ingresos: 420, gastos: 280 },
  { name: "Feb", ingresos: 380, gastos: 320 },
  { name: "Mar", ingresos: 520, gastos: 290 },
  { name: "Abr", ingresos: 480, gastos: 350 },
  { name: "May", ingresos: 550, gastos: 380 },
  { name: "Jun", ingresos: 620, gastos: 420 },
  { name: "Jul", ingresos: 580, gastos: 390 },
  { name: "Ago", ingresos: 650, gastos: 410 },
  { name: "Sep", ingresos: 720, gastos: 450 },
  { name: "Oct", ingresos: 780, gastos: 480 },
  { name: "Nov", ingresos: 850, gastos: 520 },
  { name: "Dic", ingresos: 920, gastos: 540 },
];

export function DashboardPreview() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto mt-8 md:mt-12">
      {/* Main card */}
      <div className="rounded-3xl overflow-hidden border border-border/50 relative bg-white/90 backdrop-blur-sm shadow-friendly-lg">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Buenos días 👋
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-1">
                Tu resumen financiero
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-accent flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { 
                label: "Ingresos", 
                value: "$45.2K", 
                change: "+12%", 
                icon: TrendingUp,
                color: "text-success",
                bgColor: "bg-success/10"
              },
              { 
                label: "Gastos", 
                value: "$28.5K", 
                change: "-8%", 
                icon: DollarSign,
                color: "text-secondary",
                bgColor: "bg-secondary/10"
              },
              { 
                label: "Utilidad", 
                value: "$16.7K", 
                change: "+24%", 
                icon: TrendingUp,
                color: "text-primary",
                bgColor: "bg-primary/10"
              },
              { 
                label: "Margen", 
                value: "37%", 
                change: "+5%", 
                icon: PieChart,
                color: "text-warning",
                bgColor: "bg-warning/10"
              },
            ].map((kpi, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-4 border border-border/30 hover:shadow-friendly transition-all duration-300"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`h-8 w-8 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${kpi.change.startsWith('+') ? 'text-success' : 'text-muted-foreground'}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div 
            className="bg-card rounded-2xl p-4 border border-border/30"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-out 0.5s",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-foreground">Ingresos vs Gastos</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Ingresos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">Gastos</span>
                </div>
              </div>
            </div>
            <div className="h-32 md:h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorIngresosNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGastosNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(330, 81%, 60%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(330, 81%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                    interval={1} 
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="ingresos" 
                    stroke="hsl(262, 83%, 58%)" 
                    strokeWidth={2.5} 
                    fill="url(#colorIngresosNew)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gastos" 
                    stroke="hsl(330, 81%, 60%)" 
                    strokeWidth={2} 
                    fill="url(#colorGastosNew)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -top-4 -left-4 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
