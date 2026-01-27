import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Package, DollarSign, TrendingUp } from "lucide-react";
import { ProductWithCosts, useProducts } from "@/hooks/useProducts";
import { useIngredients } from "@/hooks/useIngredients";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductWithCosts;
}

export function ProductDetailModal({ open, onOpenChange, product }: ProductDetailModalProps) {
  const { ingredients } = useIngredients();
  const { addProductIngredient, removeProductIngredient, addIndirectCost, removeIndirectCost } = useProducts();
  
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [showAddCost, setShowAddCost] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [costName, setCostName] = useState("");
  const [costAmount, setCostAmount] = useState("");

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const availableIngredients = ingredients.filter(
    ing => !product.product_ingredients?.some(pi => pi.ingredient_id === ing.id)
  );

  const handleAddIngredient = async () => {
    if (selectedIngredient && ingredientQuantity) {
      await addProductIngredient(product.id, selectedIngredient, parseFloat(ingredientQuantity));
      setShowAddIngredient(false);
      setSelectedIngredient("");
      setIngredientQuantity("");
    }
  };

  const handleAddCost = async () => {
    if (costName && costAmount) {
      await addIndirectCost(product.id, costName, parseFloat(costAmount));
      setShowAddCost(false);
      setCostName("");
      setCostAmount("");
    }
  };

  const isLowMargin = product.marginPercent < 20 && product.sale_price > 0;
  const isNegativeMargin = product.margin < 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            {product.name}
          </DialogTitle>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-muted/50 rounded-xl text-center">
            <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Costo</p>
            <p className="font-bold">{formatCurrency(product.totalCost)}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-xl text-center">
            <Package className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Precio</p>
            <p className="font-bold">{formatCurrency(product.sale_price)}</p>
          </div>
          <div className={`p-3 rounded-xl text-center ${
            isNegativeMargin ? 'bg-destructive/10' : isLowMargin ? 'bg-warning/10' : 'bg-success/10'
          }`}>
            <TrendingUp className={`h-4 w-4 mx-auto mb-1 ${
              isNegativeMargin ? 'text-destructive' : isLowMargin ? 'text-warning' : 'text-success'
            }`} />
            <p className="text-xs text-muted-foreground">Margen</p>
            <p className={`font-bold ${
              isNegativeMargin ? 'text-destructive' : isLowMargin ? 'text-warning' : 'text-success'
            }`}>
              {product.marginPercent.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Ingredientes</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddIngredient(!showAddIngredient)}
              disabled={availableIngredients.length === 0}
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </div>

          {showAddIngredient && (
            <div className="p-3 bg-muted/50 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Ingrediente</Label>
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIngredients.map((ing) => (
                        <SelectItem key={ing.id} value={ing.id}>
                          {ing.name} ({formatCurrency(ing.cost_per_unit)}/{ing.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Cantidad</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    className="h-9"
                    value={ingredientQuantity}
                    onChange={(e) => setIngredientQuantity(e.target.value)}
                  />
                </div>
              </div>
              <Button size="sm" onClick={handleAddIngredient} disabled={!selectedIngredient || !ingredientQuantity}>
                Agregar ingrediente
              </Button>
            </div>
          )}

          {product.product_ingredients?.length > 0 ? (
            <div className="space-y-2">
              {product.product_ingredients.map((pi) => (
                <div key={pi.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{pi.ingredients?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pi.quantity} {pi.ingredients?.unit} × {formatCurrency(pi.ingredients?.cost_per_unit || 0)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {formatCurrency((pi.ingredients?.cost_per_unit || 0) * pi.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeProductIngredient(pi.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between px-3 pt-2 text-sm font-medium">
                <span>Subtotal ingredientes</span>
                <span>{formatCurrency(product.totalIngredientCost)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Sin ingredientes agregados
            </p>
          )}
        </div>

        {/* Indirect Costs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Costos indirectos</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddCost(!showAddCost)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </div>

          {showAddCost && (
            <div className="p-3 bg-muted/50 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Concepto</Label>
                  <Input
                    placeholder="Ej: Empaque"
                    className="h-9"
                    value={costName}
                    onChange={(e) => setCostName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Monto ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="h-9"
                    value={costAmount}
                    onChange={(e) => setCostAmount(e.target.value)}
                  />
                </div>
              </div>
              <Button size="sm" onClick={handleAddCost} disabled={!costName || !costAmount}>
                Agregar costo
              </Button>
            </div>
          )}

          {product.indirect_costs?.length > 0 ? (
            <div className="space-y-2">
              {product.indirect_costs.map((ic) => (
                <div key={ic.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <p className="font-medium text-sm">{ic.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{formatCurrency(ic.amount)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeIndirectCost(ic.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between px-3 pt-2 text-sm font-medium">
                <span>Subtotal costos indirectos</span>
                <span>{formatCurrency(product.totalIndirectCost)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Sin costos indirectos (empaque, gas, etc.)
            </p>
          )}
        </div>

        {/* Total */}
        <div className="p-4 bg-muted rounded-xl">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Costo total</span>
            <span>{formatCurrency(product.totalCost)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
