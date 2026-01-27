import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { toast } from 'sonner';

export interface Ingredient {
  id: string;
  business_id: string;
  name: string;
  unit: string;
  cost_per_unit: number;
  created_at: string;
  updated_at: string;
}

export function useIngredients() {
  const { activeBusiness } = useBusiness();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIngredients = async () => {
    if (!activeBusiness) {
      setIngredients([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('business_id', activeBusiness.id)
        .order('name');

      if (error) throw error;
      setIngredients(data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      toast.error('Error al cargar insumos');
    } finally {
      setLoading(false);
    }
  };

  const createIngredient = async (ingredient: {
    name: string;
    unit: string;
    cost_per_unit: number;
  }) => {
    if (!activeBusiness) return null;

    try {
      const { data, error } = await supabase
        .from('ingredients')
        .insert({
          ...ingredient,
          business_id: activeBusiness.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setIngredients(prev => [...prev, data]);
      toast.success('Insumo creado');
      return data;
    } catch (error: any) {
      console.error('Error creating ingredient:', error);
      toast.error(error.message || 'Error al crear insumo');
      return null;
    }
  };

  const updateIngredient = async (id: string, updates: {
    name?: string;
    unit?: string;
    cost_per_unit?: number;
  }) => {
    try {
      const { data, error } = await supabase
        .from('ingredients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setIngredients(prev => prev.map(i => i.id === id ? data : i));
      toast.success('Insumo actualizado');
      return data;
    } catch (error: any) {
      console.error('Error updating ingredient:', error);
      toast.error(error.message || 'Error al actualizar insumo');
      return null;
    }
  };

  const deleteIngredient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ingredients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setIngredients(prev => prev.filter(i => i.id !== id));
      toast.success('Insumo eliminado');
      return true;
    } catch (error: any) {
      console.error('Error deleting ingredient:', error);
      toast.error(error.message || 'Error al eliminar insumo');
      return false;
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [activeBusiness?.id]);

  return {
    ingredients,
    loading,
    refetch: fetchIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
  };
}
