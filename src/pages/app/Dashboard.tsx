import { Link } from "react-router-dom";
import { 
  Package, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Calculator,
  Loader2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCosteoData } from "@/hooks/useCosteoData";
import { useBusiness } from "@/contexts/BusinessContext";
import { ProductCard } from "@/components/app/ProductCard";
import { useState } from "react";
import { AddProductModal } from "@/components/app/AddProductModal";
import { ProductDetailModal } from "@/components/app/ProductDetailModal";
import { ProductWithCosts } from "@/hooks/useProducts";

export default function Dashboard() {
  const { activeBusiness } = useBusiness();
  const { 
    loading, 
    products, 
    totalProducts, 
    averageMargin, 
    bestProduct, 
    lowMarginProducts,
    totalIngredients 
  } = useCosteoData();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCosts | null>(null);

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

  const kpiCards = [
    {
      title: "Productos",
      value: totalProducts.toString(),
      icon: Package,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      title: "Margen promedio",
      value: `${averageMargin.toFixed(1)}%`,
      icon: TrendingUp,
      colorClass: averageMargin >= 30 ? "text-success" : averageMargin >= 20 ? "text-warning" : "text-destructive",
      bgClass: averageMargin >= 30 ? "bg-success/10" : averageMargin >= 20 ? "bg-warning/10" : "bg-destructive/10",
    },
    {
      title: "Producto estrella",
      value: bestProduct?.name || "—",
      subtitle: bestProduct ? `${bestProduct.marginPercent.toFixed(1)}% margen` : undefined,
      icon: TrendingUp,
      colorClass: "text-secondary",
      bgClass: "bg-secondary/10",
    },
    {
      title: "Alertas",
      value: lowMarginProducts.length.toString(),
      subtitle: lowMarginProducts.length > 0 ? "productos con margen bajo" : "todo bien",
      icon: AlertTriangle,
      colorClass: lowMarginProducts.length > 0 ? "text-warning" : "text-success",
      bgClass: lowMarginProducts.length > 0 ? "bg-warning/10" : "bg-success/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard de Costeo</h1>
        <p className="text-muted-foreground">
          Tu emprendimiento: {activeBusiness?.name || 'Selecciona un negocio'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-5 border border-border/50 card-elevated"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl ${kpi.bgClass} flex items-center justify-center`}>
                <kpi.icon className={`h-5 w-5 ${kpi.colorClass}`} />
              </div>
            </div>
            <p className="text-2xl font-bold truncate">{kpi.value}</p>
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
            {kpi.subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{kpi.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* Products Section */}
      {products.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mis Productos</h2>
            <Link to="/app/productos">
              <Button variant="ghost" size="sm">
                Ver todos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => {}}
                onDelete={() => {}}
                onClick={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">¡Comienza a costear!</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Crea tu primer producto para calcular su costo real y saber cuánto deberías cobrar
          </p>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Crear mi primer producto
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Low margin alerts */}
        {lowMarginProducts.length > 0 && (
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">Productos con margen bajo</h3>
            </div>
            <div className="space-y-3">
              {lowMarginProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-warning/10 border border-warning/20 cursor-pointer hover:bg-warning/20 transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Costo: {formatCurrency(product.totalCost)} → Precio: {formatCurrency(product.sale_price)}
                    </p>
                  </div>
                  <span className="text-warning font-bold">
                    {product.marginPercent.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <h3 className="font-semibold mb-4">Acciones rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">Nuevo producto</span>
            </Button>
            <Link to="/app/calculadora">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 w-full">
                <Calculator className="h-5 w-5" />
                <span className="text-xs">Calcular precio</span>
              </Button>
            </Link>
            <Link to="/app/insumos">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 w-full">
                <Package className="h-5 w-5" />
                <span className="text-xs">Ver insumos ({totalIngredients})</span>
              </Button>
            </Link>
            <Link to="/app/simulador">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 w-full">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Simular</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
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
