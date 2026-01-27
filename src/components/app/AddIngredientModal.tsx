import { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import { useIngredients, Ingredient } from "@/hooks/useIngredients";

const UNITS = [
  { value: "kg", label: "Kilogramos (kg)" },
  { value: "g", label: "Gramos (g)" },
  { value: "L", label: "Litros (L)" },
  { value: "ml", label: "Mililitros (ml)" },
  { value: "pza", label: "Piezas (pza)" },
  { value: "paq", label: "Paquetes (paq)" },
  { value: "caja", label: "Cajas" },
  { value: "docena", label: "Docenas" },
];

interface AddIngredientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editIngredient?: Ingredient | null;
}

export function AddIngredientModal({ open, onOpenChange, editIngredient }: AddIngredientModalProps) {
  const { createIngredient, updateIngredient } = useIngredients();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    unit: "pza",
    cost_per_unit: "",
  });

  useEffect(() => {
    if (editIngredient) {
      setFormData({
        name: editIngredient.name,
        unit: editIngredient.unit,
        cost_per_unit: editIngredient.cost_per_unit.toString(),
      });
    } else {
      setFormData({ name: "", unit: "pza", cost_per_unit: "" });
    }
  }, [editIngredient, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: formData.name,
      unit: formData.unit,
      cost_per_unit: parseFloat(formData.cost_per_unit) || 0,
    };

    if (editIngredient) {
      await updateIngredient(editIngredient.id, data);
    } else {
      await createIngredient(data);
    }

    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editIngredient ? "Editar insumo" : "Nuevo insumo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del insumo *</Label>
            <Input
              id="name"
              placeholder="Ej: Harina de trigo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unidad de medida *</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData({ ...formData, unit: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Costo por {formData.unit} ($) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.cost_per_unit}
                onChange={(e) => setFormData({ ...formData, cost_per_unit: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading || !formData.name}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editIngredient ? "Guardar" : "Crear insumo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
