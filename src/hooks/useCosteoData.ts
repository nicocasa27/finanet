import { useMemo } from 'react';
import { useProducts, ProductWithCosts } from './useProducts';
import { useIngredients } from './useIngredients';

export function useCosteoData() {
  const { products, loading: productsLoading } = useProducts();
  const { ingredients, loading: ingredientsLoading } = useIngredients();

  const loading = productsLoading || ingredientsLoading;

  const stats = useMemo(() => {
    if (products.length === 0) {
      return {
        totalProducts: 0,
        averageMargin: 0,
        bestProduct: null as ProductWithCosts | null,
        worstProduct: null as ProductWithCosts | null,
        lowMarginProducts: [] as ProductWithCosts[],
        totalIngredients: ingredients.length,
      };
    }

    const productsWithSales = products.filter(p => p.sale_price > 0);
    
    const averageMargin = productsWithSales.length > 0
      ? productsWithSales.reduce((sum, p) => sum + p.marginPercent, 0) / productsWithSales.length
      : 0;

    const sortedByMargin = [...productsWithSales].sort((a, b) => b.marginPercent - a.marginPercent);
    const bestProduct = sortedByMargin[0] || null;
    const worstProduct = sortedByMargin[sortedByMargin.length - 1] || null;

    const lowMarginProducts = products.filter(p => p.marginPercent < 20 && p.sale_price > 0);

    return {
      totalProducts: products.length,
      averageMargin,
      bestProduct,
      worstProduct,
      lowMarginProducts,
      totalIngredients: ingredients.length,
    };
  }, [products, ingredients]);

  return {
    loading,
    products,
    ingredients,
    ...stats,
  };
}
