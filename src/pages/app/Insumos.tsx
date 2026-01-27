import { useState } from "react";
import { Plus, Package2, Loader2, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIngredients, Ingredient } from "@/hooks/useIngredients";
import { AddIngredientModal } from "@/components/app/AddIngredientModal";
import { DeleteConfirmDialog } from "@/components/app/DeleteConfirmDialog";

export default function Insumos() {
  const { ingredients, loading, deleteIngredient } = useIngredients();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editIngredient, setEditIngredient] = useState<Ingredient | null>(null);
  const [deleteIngredientData, setDeleteIngredientData] = useState<Ingredient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIngredients = ingredients.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteIngredientData) {
      await deleteIngredient(deleteIngredientData.id);
      setDeleteIngredientData(null);
    }
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Insumos</h1>
          <p className="text-muted-foreground">
            Registra tus materias primas y sus costos
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo insumo
        </Button>
      </div>

      {/* Search */}
      {ingredients.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar insumos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Ingredients Table */}
      {filteredIngredients.length > 0 ? (
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Insumo</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Costo por unidad</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(ingredient.cost_per_unit)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditIngredient(ingredient)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteIngredientData(ingredient)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-card rounded-2xl border border-border/50">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Package2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? "No hay resultados" : "Sin insumos aún"}
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {searchQuery
              ? "Intenta con otro término de búsqueda"
              : "Registra tus materias primas para usarlas en el costeo de productos"
            }
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar mi primer insumo
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      <AddIngredientModal
        open={isAddOpen || !!editIngredient}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddOpen(false);
            setEditIngredient(null);
          }
        }}
        editIngredient={editIngredient}
      />

      <DeleteConfirmDialog
        open={!!deleteIngredientData}
        onOpenChange={(open) => !open && setDeleteIngredientData(null)}
        onConfirm={handleDelete}
        title="Eliminar insumo"
        description={`¿Estás seguro de eliminar "${deleteIngredientData?.name}"? Si está siendo usado en productos, se eliminará de ellos.`}
      />
    </div>
  );
}
