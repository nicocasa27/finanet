import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, ArrowUpDown, Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export default function Simulador() {
  const { products, loading } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [unitsToSell, setUnitsToSell] = useState("10");
  const [ingredientChange, setIngredientChange] = useState([0]);
  
  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId),
    [products, selectedProductId]
  );

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculations
  const simulation = useMemo(() => {
    if (!selectedProduct) return null;

    const units = parseInt(unitsToSell) || 0;
    const ingredientPriceChange = ingredientChange[0] / 100;
    
    // Adjusted costs with ingredient price change
    const adjustedIngredientCost = selectedProduct.totalIngredientCost * (1 + ingredientPriceChange);
    const adjustedTotalCost = adjustedIngredientCost + selectedProduct.totalIndirectCost;
    const adjustedMargin = selectedProduct.sale_price - adjustedTotalCost;
    const adjustedMarginPercent = selectedProduct.sale_price > 0 
      ? (adjustedMargin / selectedProduct.sale_price) * 100 
      : 0;

    // Revenue and profit
    const totalRevenue = selectedProduct.sale_price * units;
    const totalCost = adjustedTotalCost * units;
    const totalProfit = adjustedMargin * units;

    // Break-even calculation (units needed to cover costs)
    // Assuming there's an initial investment or fixed cost to recover
    const fixedCostExample = selectedProduct.totalCost * 10; // Example: 10x the product cost
    const breakEvenUnits = adjustedMargin > 0 
      ? Math.ceil(fixedCostExample / adjustedMargin) 
      : 0;

    return {
      units,
      adjustedTotalCost,
      adjustedMargin,
      adjustedMarginPercent,
      totalRevenue,
      totalCost,
      totalProfit,
      breakEvenUnits,
      originalMarginPercent: selectedProduct.marginPercent,
      marginDifference: adjustedMarginPercent - selectedProduct.marginPercent,
    };
  }, [selectedProduct, unitsToSell, ingredientChange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Simulador de Escenarios</h1>
        <p className="text-muted-foreground">
          Proyecta ganancias y analiza el impacto de cambios en costos
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-card rounded-2xl border border-border/50">
          <Calculator className="h-12 w-12 text-primary/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Crea productos primero</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Para usar el simulador necesitas tener al menos un producto con costeo
          </p>
        </div>
      ) : (
        <>
          {/* Product Selection */}
          <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-4">
            <Label className="text-base font-medium">Selecciona un producto</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Elige un producto para simular" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - {formatCurrency(product.sale_price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProduct && (
            <>
              {/* Simulation Controls */}
              <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-6">
                {/* Units to sell */}
                <div className="space-y-2">
                  <Label htmlFor="units" className="text-base font-medium">
                    ¿Cuántas unidades planeas vender?
                  </Label>
                  <Input
                    id="units"
                    type="number"
                    min="1"
                    placeholder="10"
                    className="text-xl h-12 max-w-[200px]"
                    value={unitsToSell}
                    onChange={(e) => setUnitsToSell(e.target.value)}
                  />
                </div>

                {/* Ingredient price change */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      ¿Qué pasa si cambian los precios de ingredientes?
                    </Label>
                    <span className={`text-lg font-bold ${
                      ingredientChange[0] > 0 ? 'text-destructive' : ingredientChange[0] < 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {ingredientChange[0] > 0 ? '+' : ''}{ingredientChange[0]}%
                    </span>
                  </div>
                  
                  <Slider
                    value={ingredientChange}
                    onValueChange={setIngredientChange}
                    max={50}
                    min={-30}
                    step={5}
                    className="py-4"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>-30% (bajan)</span>
                    <span>Sin cambio</span>
                    <span>+50% (suben)</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              {simulation && (
                <div className="space-y-4">
                  {/* Main metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-2xl p-5 border border-border/50 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Ingresos totales</p>
                      <p className="text-2xl font-bold">{formatCurrency(simulation.totalRevenue)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {simulation.units} unidades × {formatCurrency(selectedProduct.sale_price)}
                      </p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 border border-border/50 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Costo total</p>
                      <p className="text-2xl font-bold text-destructive">{formatCurrency(simulation.totalCost)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {simulation.units} unidades × {formatCurrency(simulation.adjustedTotalCost)}
                      </p>
                    </div>
                    
                    <div className={`bg-card rounded-2xl p-5 border text-center ${
                      simulation.totalProfit >= 0 ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'
                    }`}>
                      <p className="text-sm text-muted-foreground mb-2">Ganancia total</p>
                      <p className={`text-2xl font-bold ${simulation.totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatCurrency(simulation.totalProfit)}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {simulation.marginDifference !== 0 && (
                          <>
                            {simulation.marginDifference > 0 ? (
                              <TrendingUp className="h-3 w-3 text-success" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-destructive" />
                            )}
                            <span className={`text-xs ${simulation.marginDifference > 0 ? 'text-success' : 'text-destructive'}`}>
                              {simulation.marginDifference > 0 ? '+' : ''}{simulation.marginDifference.toFixed(1)}% margen
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Margin comparison */}
                  <div className="bg-card rounded-2xl p-5 border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <ArrowUpDown className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Comparación de margen</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground mb-1">Margen original</p>
                        <p className="text-xl font-bold">{simulation.originalMarginPercent.toFixed(1)}%</p>
                      </div>
                      <div className={`p-4 rounded-xl text-center ${
                        simulation.adjustedMarginPercent >= 20 ? 'bg-success/10' : 'bg-warning/10'
                      }`}>
                        <p className="text-sm text-muted-foreground mb-1">Margen ajustado</p>
                        <p className={`text-xl font-bold ${
                          simulation.adjustedMarginPercent >= 20 ? 'text-success' : 'text-warning'
                        }`}>
                          {simulation.adjustedMarginPercent.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning if margin is low */}
                  {simulation.adjustedMarginPercent < 20 && simulation.adjustedMarginPercent > 0 && (
                    <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
                      <p className="text-sm text-warning font-medium">
                        ⚠️ Con este escenario tu margen baja a menos del 20%. Considera ajustar tu precio de venta.
                      </p>
                    </div>
                  )}
                  
                  {simulation.adjustedMarginPercent <= 0 && (
                    <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                      <p className="text-sm text-destructive font-medium">
                        ❌ Con este escenario estarías perdiendo dinero. Necesitas subir tu precio o reducir costos.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
