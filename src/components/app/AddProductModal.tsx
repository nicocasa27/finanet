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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useProducts, ProductWithCosts } from "@/hooks/useProducts";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editProduct?: ProductWithCosts | null;
}

export function AddProductModal({ open, onOpenChange, editProduct }: AddProductModalProps) {
  const { createProduct, updateProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    sale_price: editProduct?.sale_price?.toString() || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: formData.name,
      description: formData.description || undefined,
      sale_price: parseFloat(formData.sale_price) || 0,
    };

    if (editProduct) {
      await updateProduct(editProduct.id, data);
    } else {
      await createProduct(data);
    }

    setLoading(false);
    onOpenChange(false);
    setFormData({ name: "", description: "", sale_price: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editProduct ? "Editar producto" : "Nuevo producto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del producto *</Label>
            <Input
              id="name"
              placeholder="Ej: Brownies x6"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Ej: Brownies de chocolate con nuez"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sale_price">Precio de venta ($)</Label>
            <Input
              id="sale_price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.sale_price}
              onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Puedes dejarlo en 0 y ajustarlo después de agregar ingredientes
            </p>
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
              {editProduct ? "Guardar" : "Crear producto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
