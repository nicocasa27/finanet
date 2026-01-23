import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryModal } from "@/components/app/CategoryModal";
import { DeleteConfirmDialog } from "@/components/app/DeleteConfirmDialog";
import { Tables } from "@/integrations/supabase/types";

export default function Categorias() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Tables<'categories'> | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Tables<'categories'> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { 
    categories, 
    loading, 
    createCategory, 
    updateCategory, 
    deleteCategory 
  } = useCategories();

  const filteredCategories = categories.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || c.type === filterType;
    return matchesSearch && matchesType;
  });

  const incomeCategories = filteredCategories.filter(c => c.type === "income");
  const expenseCategories = filteredCategories.filter(c => c.type === "expense");

  const handleSaveCategory = async (data: { type: "income" | "expense"; name: string; color: string }) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, {
        name: data.name,
        color: data.color,
      });
    } else {
      await createCategory({
        type: data.type,
        name: data.name,
        color: data.color,
      });
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      await deleteCategory(deletingCategory.id);
      setDeletingCategory(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (category: Tables<'categories'>) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleNewClick = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías</h1>
          <p className="text-muted-foreground">Organiza tus movimientos con categorías personalizadas</p>
        </div>
        <Button variant="hero" size="default" onClick={handleNewClick}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva categoría
        </Button>
      </div>

      {/* Filters bar */}
      <div className="bg-card rounded-2xl p-4 border border-border/50 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar categorías..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <div className="inline-flex items-center gap-1 rounded-xl bg-muted p-1">
          {["all", "income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as typeof filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterType === type
                  ? "bg-background shadow-premium-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type === "all" ? "Todas" : type === "income" ? "Ingresos" : "Gastos"}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        /* Categories grid */
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Income categories */}
          {(filterType === "all" || filterType === "income") && (
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-success" />
                <h3 className="font-semibold">Categorías de Ingreso</h3>
                <span className="text-sm text-muted-foreground">({incomeCategories.length})</span>
              </div>
              <div className="space-y-2">
                {incomeCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: category.color || '#10B981' }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditClick(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => setDeletingCategory(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {incomeCategories.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay categorías de ingreso
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Expense categories */}
          {(filterType === "all" || filterType === "expense") && (
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <h3 className="font-semibold">Categorías de Gasto</h3>
                <span className="text-sm text-muted-foreground">({expenseCategories.length})</span>
              </div>
              <div className="space-y-2">
                {expenseCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: category.color || '#EF4444' }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditClick(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => setDeletingCategory(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {expenseCategories.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay categorías de gasto
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      <CategoryModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        title="Eliminar categoría"
        description={`¿Estás seguro de eliminar la categoría "${deletingCategory?.name}"? Las transacciones asociadas no se eliminarán pero quedarán sin categoría.`}
        onConfirm={handleDeleteCategory}
        loading={isDeleting}
      />
    </div>
  );
}
