import { useState } from "react";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function Calculadora() {
  const [cost, setCost] = useState("");
  const [margin, setMargin] = useState([40]);
  
  const costValue = parseFloat(cost) || 0;
  const marginValue = margin[0];
  const suggestedPrice = costValue > 0 ? costValue / (1 - marginValue / 100) : 0;
  const profit = suggestedPrice - costValue;

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const presetMargins = [20, 30, 40, 50, 60];

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Calculadora de Precio</h1>
        <p className="text-muted-foreground">
          Calcula el precio de venta ideal para tu margen deseado
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-6">
        {/* Cost Input */}
        <div className="space-y-2">
          <Label htmlFor="cost" className="text-base font-medium">
            ¿Cuánto te cuesta producir?
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="cost"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-8 text-2xl h-14 font-mono"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>

        {/* Margin Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              ¿Cuánto margen quieres ganar?
            </Label>
            <span className="text-2xl font-bold text-primary">{marginValue}%</span>
          </div>
          
          <Slider
            value={margin}
            onValueChange={setMargin}
            max={80}
            min={5}
            step={1}
            className="py-4"
          />
          
          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2">
            {presetMargins.map((m) => (
              <Button
                key={m}
                variant={margin[0] === m ? "default" : "outline"}
                size="sm"
                onClick={() => setMargin([m])}
                className="rounded-full"
              >
                {m}%
              </Button>
            ))}
          </div>
        </div>

        {/* Result */}
        {costValue > 0 && (
          <>
            <div className="h-px bg-border" />
            
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground mb-1">Tu costo</p>
                <p className="text-xl font-bold">{formatCurrency(costValue)}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground mb-1">Precio sugerido</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(suggestedPrice)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 rounded-xl border border-success/20 text-center">
                <TrendingUp className="h-5 w-5 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Ganancia por unidad</p>
                <p className="text-xl font-bold text-success">{formatCurrency(profit)}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
                <Calculator className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Tu margen</p>
                <p className="text-xl font-bold text-primary">{marginValue}%</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tips */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <h3 className="font-semibold mb-4">💡 Tips para fijar precios</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-success">•</span>
            <span>Un margen del <strong>30-40%</strong> es común para productos de consumo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">•</span>
            <span>Margenes menores a <strong>20%</strong> pueden no cubrir imprevistos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Investiga los precios de tu competencia antes de decidir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary">•</span>
            <span>Recuerda incluir <strong>todos</strong> tus costos: ingredientes, empaque, tiempo</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
