import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useProyeccionesData } from "@/hooks/useProyeccionesData";
import { useBusiness } from "@/contexts/BusinessContext";

export default function Proyecciones() {
  const { activeBusiness } = useBusiness();
  const { loading, chartData, scenarios, goal, monthLabel, hasData } = useProyeccionesData();

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

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
        <h1 className="text-2xl font-bold">Proyecciones</h1>
        <p className="text-muted-foreground">
          Estimaciones para {activeBusiness?.name || 'tu negocio'} basadas en tendencias actuales
        </p>
      </div>

      {/* Main projection chart */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold">Proyección de Ingresos</h3>
            <p className="text-sm text-muted-foreground capitalize">{monthLabel}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/40 border-2 border-primary border-dashed" />
              <span className="text-muted-foreground">Proyectado</span>
            </div>
          </div>
        </div>
        <div className="h-72">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                  }}
                  formatter={(value: number | null) => [value !== null ? formatCurrency(value) : '-', '']}
                />
                {goal > 0 && (
                  <ReferenceLine 
                    y={goal} 
                    stroke="hsl(var(--success))" 
                    strokeDasharray="5 5" 
                    label={{ value: 'Meta', fill: 'hsl(var(--success))', fontSize: 12 }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(239, 84%, 67%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(239, 84%, 67%)', strokeWidth: 0, r: 5 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="proyectado"
                  stroke="hsl(239, 84%, 67%)"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={{ fill: 'hsl(var(--card))', stroke: 'hsl(239, 84%, 67%)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Registra movimientos para ver proyecciones</p>
            </div>
          )}
        </div>
      </div>

      {/* Scenarios */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-2xl p-6 border border-success/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <h3 className="font-semibold">Escenario Optimista</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Ingresos proyectados</p>
              <p className="text-2xl font-bold text-success">
                {hasData ? formatCurrency(scenarios.optimista.ingresos) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilidad estimada</p>
              <p className={`text-xl font-semibold ${scenarios.optimista.utilidad >= 0 ? '' : 'text-destructive'}`}>
                {hasData ? formatCurrency(scenarios.optimista.utilidad) : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-primary/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Escenario Base</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Ingresos proyectados</p>
              <p className="text-2xl font-bold text-primary">
                {hasData ? formatCurrency(scenarios.base.ingresos) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilidad estimada</p>
              <p className={`text-xl font-semibold ${scenarios.base.utilidad >= 0 ? '' : 'text-destructive'}`}>
                {hasData ? formatCurrency(scenarios.base.utilidad) : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-warning/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <h3 className="font-semibold">Escenario Conservador</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Ingresos proyectados</p>
              <p className="text-2xl font-bold text-warning">
                {hasData ? formatCurrency(scenarios.conservador.ingresos) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilidad estimada</p>
              <p className={`text-xl font-semibold ${scenarios.conservador.utilidad >= 0 ? '' : 'text-destructive'}`}>
                {hasData ? formatCurrency(scenarios.conservador.utilidad) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology note */}
      <div className="bg-muted/50 rounded-2xl p-4 border border-border/50">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Metodología:</strong> Las proyecciones se calculan usando el promedio de los últimos 30 días. 
          El escenario optimista considera +20% en ingresos y -10% en gastos. 
          El conservador aplica -15% en ingresos y +10% en gastos.
        </p>
      </div>
    </div>
  );
}
