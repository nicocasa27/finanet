import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { useReportsData } from "@/hooks/useReportsData";
import { useDateRangeContext } from "@/contexts/DateRangeContext";
import { useBusiness } from "@/contexts/BusinessContext";

export default function Reportes() {
  const { monthLabel } = useDateRangeContext();
  const { activeBusiness } = useBusiness();
  const { loading, plData, totals, hasData } = useReportsData();

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reportes</h1>
          <p className="text-muted-foreground">
            Estado de Resultados de {activeBusiness?.name || 'tu negocio'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="default" disabled>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {!hasData ? (
        <div className="bg-card rounded-2xl p-12 border border-border/50 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Sin movimientos en este período</h3>
          <p className="text-muted-foreground mb-4">
            Registra ingresos y gastos para generar tu Estado de Resultados.
          </p>
        </div>
      ) : (
        <>
          {/* P&L Statement */}
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Estado de Resultados</h2>
                <p className="text-sm text-muted-foreground capitalize">{monthLabel}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Ingresos */}
              <div>
                <div className="flex items-center justify-between py-3 border-b-2 border-success/30">
                  <h3 className="font-semibold text-success">Ingresos</h3>
                  <span className="font-bold text-success">{formatCurrency(totals.totalIngresos)}</span>
                </div>
                <div className="pl-4 py-2 space-y-2">
                  {plData.ingresos.length > 0 ? (
                    plData.ingresos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-2.5 w-2.5 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-1">Sin ingresos registrados</p>
                  )}
                </div>
              </div>

              {/* Costos */}
              <div>
                <div className="flex items-center justify-between py-3 border-b-2 border-warning/30">
                  <h3 className="font-semibold text-warning">(-) Costo de Ventas</h3>
                  <span className="font-bold text-warning">{formatCurrency(totals.totalCostos)}</span>
                </div>
                <div className="pl-4 py-2 space-y-2">
                  {plData.costos.length > 0 ? (
                    plData.costos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-2.5 w-2.5 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-1">Sin costos registrados</p>
                  )}
                </div>
              </div>

              {/* Utilidad Bruta */}
              <div className="flex items-center justify-between py-3 bg-muted/50 rounded-xl px-4">
                <h3 className="font-semibold">= Utilidad Bruta</h3>
                <div className="text-right">
                  <span className="font-bold text-lg">{formatCurrency(totals.utilidadBruta)}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({totals.margenBruto.toFixed(1)}%)
                  </span>
                </div>
              </div>

              {/* Gastos Operativos */}
              <div>
                <div className="flex items-center justify-between py-3 border-b-2 border-destructive/30">
                  <h3 className="font-semibold text-destructive">(-) Gastos Operativos</h3>
                  <span className="font-bold text-destructive">{formatCurrency(totals.totalGastos)}</span>
                </div>
                <div className="pl-4 py-2 space-y-2">
                  {plData.gastos.length > 0 ? (
                    plData.gastos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-2.5 w-2.5 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-1">Sin gastos registrados</p>
                  )}
                </div>
              </div>

              {/* Utilidad Neta */}
              <div className={`flex items-center justify-between py-4 rounded-xl px-4 ${
                totals.utilidadNeta >= 0 
                  ? "bg-success/10 border border-success/20" 
                  : "bg-destructive/10 border border-destructive/20"
              }`}>
                <h3 className="font-bold text-lg">= Utilidad Neta</h3>
                <div className="text-right">
                  <span className={`font-bold text-2xl ${
                    totals.utilidadNeta >= 0 ? "text-success" : "text-destructive"
                  }`}>
                    {formatCurrency(totals.utilidadNeta)}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({totals.margenNeto.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Total Ingresos</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(totals.totalIngresos)}</p>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Total Egresos</p>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(totals.totalCostos + totals.totalGastos)}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Margen Bruto</p>
              <p className="text-2xl font-bold">{totals.margenBruto.toFixed(1)}%</p>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Margen Neto</p>
              <p className={`text-2xl font-bold ${totals.margenNeto >= 0 ? '' : 'text-destructive'}`}>
                {totals.margenNeto.toFixed(1)}%
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
