import { useState } from "react";
import { Plus, Package, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts, ProductWithCosts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/app/ProductCard";
import { AddProductModal } from "@/components/app/AddProductModal";
import { DeleteConfirmDialog } from "@/components/app/DeleteConfirmDialog";
import { ProductDetailModal } from "@/components/app/ProductDetailModal";

export default function Productos() {
  const { products, loading, deleteProduct } = useProducts();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductWithCosts | null>(null);
  const [deleteProductData, setDeleteProductData] = useState<ProductWithCosts | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCosts | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteProductData) {
      await deleteProduct(deleteProductData.id);
      setDeleteProductData(null);
    }
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
          <h1 className="text-2xl font-bold">Mis Productos</h1>
          <p className="text-muted-foreground">
            Crea recetas de costeo para tus productos
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo producto
        </Button>
      </div>

      {/* Search */}
      {products.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(p) => setEditProduct(p)}
              onDelete={(p) => setDeleteProductData(p)}
              onClick={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-card rounded-2xl border border-border/50">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? "No hay resultados" : "Sin productos aún"}
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {searchQuery
              ? "Intenta con otro término de búsqueda"
              : "Crea tu primer producto para calcular su costo y margen de ganancia"
            }
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear mi primer producto
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      <AddProductModal
        open={isAddOpen || !!editProduct}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddOpen(false);
            setEditProduct(null);
          }
        }}
        editProduct={editProduct}
      />

      <DeleteConfirmDialog
        open={!!deleteProductData}
        onOpenChange={(open) => !open && setDeleteProductData(null)}
        onConfirm={handleDelete}
        title="Eliminar producto"
        description={`¿Estás seguro de eliminar "${deleteProductData?.name}"? Esta acción no se puede deshacer.`}
      />

      {selectedProduct && (
        <ProductDetailModal
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
