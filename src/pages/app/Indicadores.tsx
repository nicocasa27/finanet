import { TrendingUp, DollarSign, Percent, Clock, Target, Activity, Loader2 } from "lucide-react";
import { useIndicadoresData } from "@/hooks/useIndicadoresData";
import { useBusiness } from "@/contexts/BusinessContext";

export default function Indicadores() {
  const { activeBusiness } = useBusiness();
  const { loading, indicadores, hasData } = useIndicadoresData();

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatPercent = (value: number, showSign = false) => {
    const sign = showSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const kpiData = [
    {
      title: "Margen Bruto",
      value: formatPercent(indicadores.grossMargin),
      description: "Ingresos menos costo de ventas",
      icon: Percent,
      trend: formatPercent(indicadores.grossMarginChange, true),
      trendUp: indicadores.grossMarginChange >= 0,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      title: "Margen Neto",
      value: formatPercent(indicadores.netMargin),
      description: "Utilidad neta sobre ingresos",
      icon: TrendingUp,
      trend: formatPercent(indicadores.netMarginChange, true),
      trendUp: indicadores.netMarginChange >= 0,
      colorClass: "text-success",
      bgClass: "bg-success/10",
    },
    {
      title: "Promedio Diario",
      value: formatCurrency(indicadores.dailyIncome),
      description: "Ingreso promedio por día",
      icon: DollarSign,
      trend: indicadores.dailyIncomeChange >= 0 
        ? `+${formatCurrency(indicadores.dailyIncomeChange)}` 
        : formatCurrency(indicadores.dailyIncomeChange),
      trendUp: indicadores.dailyIncomeChange >= 0,
      colorClass: "text-secondary",
      bgClass: "bg-secondary/10",
    },
    {
      title: "Burn Rate",
      value: `${formatCurrency(indicadores.burnRate)}/día`,
      description: "Gasto promedio diario",
      icon: Activity,
      trend: indicadores.burnRateChange <= 0 
        ? formatCurrency(indicadores.burnRateChange) 
        : `+${formatCurrency(indicadores.burnRateChange)}`,
      trendUp: indicadores.burnRateChange <= 0,
      colorClass: "text-warning",
      bgClass: "bg-warning/10",
    },
    {
      title: "Días para Break-even",
      value: `${indicadores.breakEvenDays} días`,
      description: "Hasta cubrir gastos del período",
      icon: Clock,
      trend: hasData ? "Calculado" : "-",
      trendUp: true,
      colorClass: "text-success",
      bgClass: "bg-success/10",
    },
    {
      title: "Punto de Equilibrio",
      value: formatCurrency(indicadores.breakEvenAmount),
      description: "Ventas mínimas para cubrir costos",
      icon: Target,
      trend: hasData ? "Este período" : "-",
      trendUp: true,
      colorClass: "text-muted-foreground",
      bgClass: "bg-muted",
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
        <h1 className="text-2xl font-bold">Indicadores</h1>
        <p className="text-muted-foreground">
          Métricas clave de {activeBusiness?.name || 'tu negocio'}
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-6 border border-border/50 card-elevated"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl ${kpi.bgClass} flex items-center justify-center`}>
                <kpi.icon className={`h-6 w-6 ${kpi.colorClass}`} />
              </div>
              {hasData && (
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  kpi.trendUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}>
                  {kpi.trend}
                </div>
              )}
            </div>
            <p className="text-3xl font-bold mb-1">{hasData ? kpi.value : "-"}</p>
            <p className="font-medium mb-1">{kpi.title}</p>
            <p className="text-sm text-muted-foreground">{kpi.description}</p>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <h3 className="font-semibold mb-4">💡 Insights</h3>
        {hasData ? (
          <div className="grid gap-4 md:grid-cols-2">
            {indicadores.hasHealthyMargin && (
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <p className="text-sm font-medium text-success mb-1">Punto fuerte</p>
                <p className="text-sm text-muted-foreground">
                  Tu margen neto del {indicadores.netMargin.toFixed(1)}% es saludable. 
                  Mantén este nivel optimizando costos continuamente.
                </p>
              </div>
            )}
            {indicadores.isInRed && (
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <p className="text-sm font-medium text-destructive mb-1">Atención</p>
                <p className="text-sm text-muted-foreground">
                  Estás operando en números rojos. Revisa tus gastos y busca formas de aumentar ingresos.
                </p>
              </div>
            )}
            {indicadores.topExpenseCategory && indicadores.topCategoryPercent > 15 && (
              <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                <p className="text-sm font-medium text-warning mb-1">Oportunidad de mejora</p>
                <p className="text-sm text-muted-foreground">
                  "{indicadores.topExpenseCategory}" representa el {indicadores.topCategoryPercent.toFixed(0)}% de tus ingresos. 
                  Considera optimizar este gasto.
                </p>
              </div>
            )}
            {!indicadores.hasHealthyMargin && !indicadores.isInRed && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Recomendación</p>
                <p className="text-sm text-muted-foreground">
                  Un margen neto ideal está entre 20-30%. Actualmente estás en {indicadores.netMargin.toFixed(1)}%.
                  Busca reducir gastos operativos o aumentar precios.
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Registra movimientos para ver insights personalizados sobre tu negocio.
          </p>
        )}
      </div>
    </div>
  );
}
