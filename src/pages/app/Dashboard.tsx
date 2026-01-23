import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useBusiness } from "@/contexts/BusinessContext";

export default function Dashboard() {
  const { activeBusiness } = useBusiness();
  const { loading, kpis, chartData, categoryBreakdown, alerts, projections, hasData } = useDashboardData();

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatPercent = (value: number, showSign = true) => {
    const sign = showSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const kpiCards = [
    {
      title: "Ingresos del mes",
      value: formatCurrency(kpis.income),
      change: formatPercent(kpis.incomeChange),
      trend: kpis.incomeChange >= 0 ? "up" : "down",
      icon: TrendingUp,
      colorClass: "text-success",
      bgClass: "bg-success/10",
    },
    {
      title: "Gastos del mes",
      value: formatCurrency(kpis.expense),
      change: formatPercent(kpis.expenseChange),
      trend: kpis.expenseChange <= 0 ? "up" : "down",
      icon: TrendingDown,
      colorClass: "text-destructive",
      bgClass: "bg-destructive/10",
    },
    {
      title: "Utilidad neta",
      value: formatCurrency(kpis.profit),
      change: formatPercent(kpis.profitChange),
      trend: kpis.profitChange >= 0 ? "up" : "down",
      icon: DollarSign,
      colorClass: kpis.profit >= 0 ? "text-primary" : "text-destructive",
      bgClass: kpis.profit >= 0 ? "bg-primary/10" : "bg-destructive/10",
    },
    {
      title: "Margen neto",
      value: formatPercent(kpis.margin, false),
      change: formatPercent(kpis.marginChange),
      trend: kpis.marginChange >= 0 ? "up" : "down",
      icon: Percent,
      colorClass: "text-secondary",
      bgClass: "bg-secondary/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen financiero de {activeBusiness?.name || 'tu negocio'}
        </p>
      </div>

      {/* KPI Cards - Bento grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-5 border border-border/50 card-elevated"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl ${kpi.bgClass} flex items-center justify-center`}>
                <kpi.icon className={`h-5 w-5 ${kpi.colorClass}`} />
              </div>
              {hasData && (
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === "up" ? "text-success" : "text-destructive"
                }`}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {kpi.change}
                </div>
              )}
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Main charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Ingresos vs Gastos</h3>
              <p className="text-sm text-muted-foreground">Por semana</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Ingresos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Gastos</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="ingresos"
                    stroke="hsl(239, 84%, 67%)"
                    strokeWidth={2}
                    fill="url(#incomeGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="gastos"
                    stroke="hsl(0, 84%, 60%)"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Registra movimientos para ver la gráfica</p>
              </div>
            )}
          </div>
        </div>

        {/* Categories breakdown */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="mb-6">
            <h3 className="font-semibold">Top categorías de gasto</h3>
            <p className="text-sm text-muted-foreground">Distribución del período</p>
          </div>
          {categoryBreakdown.length > 0 ? (
            <>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {categoryBreakdown.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-muted-foreground">{category.name}</span>
                    </div>
                    <span className="font-medium">${category.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              <p className="text-center text-sm">Registra gastos para ver la distribución</p>
            </div>
          )}
        </div>
      </div>

      {/* Alerts and projections row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Alerts */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="font-semibold">Señales importantes</h3>
          </div>
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    alert.type === "warning" 
                      ? "bg-warning/10 border border-warning/20" 
                      : alert.type === "danger"
                      ? "bg-destructive/10 border border-destructive/20"
                      : "bg-success/10 border border-success/20"
                  }`}
                >
                  <div className={`h-2 w-2 rounded-full mt-1.5 ${
                    alert.type === "warning" 
                      ? "bg-warning" 
                      : alert.type === "danger"
                      ? "bg-destructive"
                      : "bg-success"
                  }`} />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No hay alertas en este período</p>
            )}
          </div>
        </div>

        {/* Month-end projection */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="mb-4">
            <h3 className="font-semibold">Proyección fin de período</h3>
            <p className="text-sm text-muted-foreground">
              Basado en tendencias actuales ({projections.daysRemaining} días restantes)
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-success">
                {formatCurrency(projections.income)}
              </p>
              <p className="text-xs text-muted-foreground">Ingresos proyectados</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(projections.expense)}
              </p>
              <p className="text-xs text-muted-foreground">Gastos proyectados</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className={`text-2xl font-bold ${projections.profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {formatCurrency(projections.profit)}
              </p>
              <p className="text-xs text-muted-foreground">Utilidad proyectada</p>
            </div>
          </div>
          {projections.profit > 0 && hasData && (
            <div className="mt-4 p-3 rounded-xl bg-success/10 border border-success/20">
              <p className="text-sm text-success font-medium">
                ✨ Vas en buen camino para cerrar en positivo
              </p>
            </div>
          )}
          {projections.profit < 0 && hasData && (
            <div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Proyección indica cierre en negativo. Revisa tus gastos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
