import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { useDateRangeContext } from '@/contexts/DateRangeContext';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category_id: string | null;
  categories?: {
    id: string;
    name: string;
    color: string | null;
    type: 'income' | 'expense';
  } | null;
}

interface CategoryTotal {
  name: string;
  amount: number;
  color: string;
}

interface PLData {
  ingresos: CategoryTotal[];
  costos: CategoryTotal[];
  gastos: CategoryTotal[];
}

export function useReportsData() {
  const { activeBusiness } = useBusiness();
  const { startDateStr, endDateStr } = useDateRangeContext();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!activeBusiness) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('transactions')
          .select('*, categories(*)')
          .eq('business_id', activeBusiness.id)
          .gte('date', startDateStr)
          .lte('date', endDateStr)
          .order('date', { ascending: false });

        if (error) throw error;
        setTransactions(data || []);
      } catch (error) {
        console.error('Error fetching reports data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [activeBusiness?.id, startDateStr, endDateStr]);

  // Group transactions by category and type
  const plData = useMemo((): PLData => {
    const grouped: PLData = {
      ingresos: [],
      costos: [],
      gastos: [],
    };

    // Group by category
    const categoryTotals: Record<string, { amount: number; color: string; type: 'income' | 'expense'; name: string }> = {};

    transactions.forEach(t => {
      const categoryName = t.categories?.name || 'Sin categoría';
      const categoryColor = t.categories?.color || '#94A3B8';
      const key = `${t.type}-${categoryName}`;

      if (!categoryTotals[key]) {
        categoryTotals[key] = {
          amount: 0,
          color: categoryColor,
          type: t.type,
          name: categoryName,
        };
      }
      categoryTotals[key].amount += Number(t.amount);
    });

    // Separate into income and expense categories
    Object.values(categoryTotals).forEach(cat => {
      const item = { name: cat.name, amount: cat.amount, color: cat.color };
      
      if (cat.type === 'income') {
        grouped.ingresos.push(item);
      } else {
        // For simplicity, we put "Materia Prima" as costs and others as expenses
        // In a real app, you'd have a category field to distinguish
        if (cat.name.toLowerCase().includes('materia') || cat.name.toLowerCase().includes('costo')) {
          grouped.costos.push(item);
        } else {
          grouped.gastos.push(item);
        }
      }
    });

    // Sort by amount
    grouped.ingresos.sort((a, b) => b.amount - a.amount);
    grouped.costos.sort((a, b) => b.amount - a.amount);
    grouped.gastos.sort((a, b) => b.amount - a.amount);

    return grouped;
  }, [transactions]);

  // Calculate totals
  const totals = useMemo(() => {
    const totalIngresos = plData.ingresos.reduce((sum, item) => sum + item.amount, 0);
    const totalCostos = plData.costos.reduce((sum, item) => sum + item.amount, 0);
    const totalGastos = plData.gastos.reduce((sum, item) => sum + item.amount, 0);
    const utilidadBruta = totalIngresos - totalCostos;
    const utilidadNeta = utilidadBruta - totalGastos;
    const margenBruto = totalIngresos > 0 ? (utilidadBruta / totalIngresos) * 100 : 0;
    const margenNeto = totalIngresos > 0 ? (utilidadNeta / totalIngresos) * 100 : 0;

    return {
      totalIngresos,
      totalCostos,
      totalGastos,
      utilidadBruta,
      utilidadNeta,
      margenBruto,
      margenNeto,
    };
  }, [plData]);

  return {
    loading,
    plData,
    totals,
    hasData: transactions.length > 0,
  };
}
