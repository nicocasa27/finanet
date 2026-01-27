import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { toast } from 'sonner';

interface Ingredient {
  id: string;
  name: string;
  unit: string;
  cost_per_unit: number;
}

interface ProductIngredient {
  id: string;
  ingredient_id: string;
  quantity: number;
  ingredients: Ingredient;
}

interface IndirectCost {
  id: string;
  name: string;
  amount: number;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  sale_price: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  product_ingredients: ProductIngredient[];
  indirect_costs: IndirectCost[];
}

export interface ProductWithCosts extends Product {
  totalIngredientCost: number;
  totalIndirectCost: number;
  totalCost: number;
  margin: number;
  marginPercent: number;
}

export function useProducts() {
  const { activeBusiness } = useBusiness();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    if (!activeBusiness) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_ingredients(
            id,
            ingredient_id,
            quantity,
            ingredients(id, name, unit, cost_per_unit)
          ),
          indirect_costs(id, name, amount)
        `)
        .eq('business_id', activeBusiness.id)
        .order('name');

      if (error) throw error;
      setProducts((data as unknown as Product[]) || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: {
    name: string;
    description?: string;
    sale_price: number;
    image_url?: string;
  }) => {
    if (!activeBusiness) return null;

    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...product,
          business_id: activeBusiness.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchProducts();
      toast.success('Producto creado');
      return data;
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error(error.message || 'Error al crear producto');
      return null;
    }
  };

  const updateProduct = async (id: string, updates: {
    name?: string;
    description?: string;
    sale_price?: number;
    image_url?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchProducts();
      toast.success('Producto actualizado');
      return data;
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error(error.message || 'Error al actualizar producto');
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Producto eliminado');
      return true;
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Error al eliminar producto');
      return false;
    }
  };

  // Add ingredient to product
  const addProductIngredient = async (productId: string, ingredientId: string, quantity: number) => {
    try {
      const { error } = await supabase
        .from('product_ingredients')
        .insert({
          product_id: productId,
          ingredient_id: ingredientId,
          quantity,
        });

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (error: any) {
      console.error('Error adding ingredient:', error);
      toast.error(error.message || 'Error al agregar ingrediente');
      return false;
    }
  };

  // Remove ingredient from product
  const removeProductIngredient = async (productIngredientId: string) => {
    try {
      const { error } = await supabase
        .from('product_ingredients')
        .delete()
        .eq('id', productIngredientId);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (error: any) {
      console.error('Error removing ingredient:', error);
      toast.error(error.message || 'Error al eliminar ingrediente');
      return false;
    }
  };

  // Add indirect cost to product
  const addIndirectCost = async (productId: string, name: string, amount: number) => {
    try {
      const { error } = await supabase
        .from('indirect_costs')
        .insert({
          product_id: productId,
          name,
          amount,
        });

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (error: any) {
      console.error('Error adding indirect cost:', error);
      toast.error(error.message || 'Error al agregar costo indirecto');
      return false;
    }
  };

  // Remove indirect cost
  const removeIndirectCost = async (indirectCostId: string) => {
    try {
      const { error } = await supabase
        .from('indirect_costs')
        .delete()
        .eq('id', indirectCostId);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (error: any) {
      console.error('Error removing indirect cost:', error);
      toast.error(error.message || 'Error al eliminar costo indirecto');
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeBusiness?.id]);

  // Calculate costs for each product
  const productsWithCosts: ProductWithCosts[] = useMemo(() => {
    return products.map(product => {
      const totalIngredientCost = product.product_ingredients?.reduce((sum, pi) => {
        const costPerUnit = pi.ingredients?.cost_per_unit || 0;
        return sum + (costPerUnit * pi.quantity);
      }, 0) || 0;

      const totalIndirectCost = product.indirect_costs?.reduce((sum, ic) => {
        return sum + ic.amount;
      }, 0) || 0;

      const totalCost = totalIngredientCost + totalIndirectCost;
      const margin = product.sale_price - totalCost;
      const marginPercent = product.sale_price > 0 ? (margin / product.sale_price) * 100 : 0;

      return {
        ...product,
        totalIngredientCost,
        totalIndirectCost,
        totalCost,
        margin,
        marginPercent,
      };
    });
  }, [products]);

  return {
    products: productsWithCosts,
    loading,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductIngredient,
    removeProductIngredient,
    addIndirectCost,
    removeIndirectCost,
  };
}
