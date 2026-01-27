import { Package, TrendingUp, TrendingDown, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { ProductWithCosts } from "@/hooks/useProducts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: ProductWithCosts;
  onEdit: (product: ProductWithCosts) => void;
  onDelete: (product: ProductWithCosts) => void;
  onClick: (product: ProductWithCosts) => void;
}

export function ProductCard({ product, onEdit, onDelete, onClick }: ProductCardProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const isLowMargin = product.marginPercent < 20 && product.sale_price > 0;
  const isNegativeMargin = product.margin < 0;

  return (
    <div 
      className="bg-card rounded-2xl p-5 border border-border/50 card-elevated hover:shadow-card-hover transition-all cursor-pointer group"
      onClick={() => onClick(product)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(product); }}>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(product); }}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
      {product.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Costo total</span>
          <span className="font-medium">{formatCurrency(product.totalCost)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Precio de venta</span>
          <span className="font-medium">{formatCurrency(product.sale_price)}</span>
        </div>
        <div className="h-px bg-border my-2" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Margen</span>
          <div className="flex items-center gap-2">
            {isNegativeMargin ? (
              <TrendingDown className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingUp className={`h-4 w-4 ${isLowMargin ? 'text-warning' : 'text-success'}`} />
            )}
            <span className={`font-bold ${
              isNegativeMargin ? 'text-destructive' : isLowMargin ? 'text-warning' : 'text-success'
            }`}>
              {product.marginPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {isLowMargin && !isNegativeMargin && (
        <div className="mt-3 px-3 py-2 bg-warning/10 rounded-lg border border-warning/20">
          <p className="text-xs text-warning font-medium">⚠️ Margen bajo</p>
        </div>
      )}
      {isNegativeMargin && (
        <div className="mt-3 px-3 py-2 bg-destructive/10 rounded-lg border border-destructive/20">
          <p className="text-xs text-destructive font-medium">❌ Estás perdiendo dinero</p>
        </div>
      )}
    </div>
  );
}
