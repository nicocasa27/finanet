import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Category = Tables<'categories'>;
type CategoryInsert = TablesInsert<'categories'>;
type CategoryUpdate = TablesUpdate<'categories'>;

export function useCategories() {
  const { activeBusiness } = useBusiness();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    if (!activeBusiness) {
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('business_id', activeBusiness.id)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Omit<CategoryInsert, 'business_id'>) => {
    if (!activeBusiness) return null;

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          ...category,
          business_id: activeBusiness.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setCategories(prev => [...prev, data]);
      toast.success('Categoría creada');
      return data;
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.message || 'Error al crear categoría');
      return null;
    }
  };

  const updateCategory = async (id: string, updates: CategoryUpdate) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setCategories(prev => prev.map(c => c.id === id ? data : c));
      toast.success('Categoría actualizada');
      return data;
    } catch (error: any) {
      console.error('Error updating category:', error);
      toast.error(error.message || 'Error al actualizar categoría');
      return null;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success('Categoría eliminada');
      return true;
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Error al eliminar categoría');
      return false;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [activeBusiness?.id]);

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return {
    categories,
    incomeCategories,
    expenseCategories,
    loading,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
