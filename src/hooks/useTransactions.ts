import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Transaction = Tables<'transactions'>;
type TransactionInsert = TablesInsert<'transactions'>;
type TransactionUpdate = TablesUpdate<'transactions'>;

interface TransactionWithCategory extends Transaction {
  categories?: Tables<'categories'> | null;
}

interface UseTransactionsOptions {
  startDate?: string;
  endDate?: string;
  type?: 'income' | 'expense' | null;
  searchQuery?: string;
  limit?: number;
}

export function useTransactions(options: UseTransactionsOptions = {}) {
  const { activeBusiness } = useBusiness();
  const [transactions, setTransactions] = useState<TransactionWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTransactions = async () => {
    if (!activeBusiness) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase
        .from('transactions')
        .select('*, categories(*)', { count: 'exact' })
        .eq('business_id', activeBusiness.id)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (options.startDate) {
        query = query.gte('date', options.startDate);
      }
      if (options.endDate) {
        query = query.lte('date', options.endDate);
      }
      if (options.type) {
        query = query.eq('type', options.type);
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      
      let filteredData = data || [];
      
      // Client-side search filter
      if (options.searchQuery) {
        const search = options.searchQuery.toLowerCase();
        filteredData = filteredData.filter(t => 
          t.note?.toLowerCase().includes(search) ||
          t.categories?.name?.toLowerCase().includes(search)
        );
      }
      
      setTransactions(filteredData);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Error al cargar transacciones');
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transaction: Omit<TransactionInsert, 'business_id'>) => {
    if (!activeBusiness) return null;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          ...transaction,
          business_id: activeBusiness.id,
        })
        .select('*, categories(*)')
        .single();

      if (error) throw error;
      
      setTransactions(prev => [data, ...prev]);
      toast.success(transaction.type === 'income' ? 'Ingreso registrado' : 'Gasto registrado');
      return data;
    } catch (error: any) {
      console.error('Error creating transaction:', error);
      toast.error(error.message || 'Error al registrar movimiento');
      return null;
    }
  };

  const updateTransaction = async (id: string, updates: TransactionUpdate) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select('*, categories(*)')
        .single();

      if (error) throw error;
      
      setTransactions(prev => prev.map(t => t.id === id ? data : t));
      toast.success('Movimiento actualizado');
      return data;
    } catch (error: any) {
      console.error('Error updating transaction:', error);
      toast.error(error.message || 'Error al actualizar movimiento');
      return null;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast.success('Movimiento eliminado');
      return true;
    } catch (error: any) {
      console.error('Error deleting transaction:', error);
      toast.error(error.message || 'Error al eliminar movimiento');
      return false;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [activeBusiness?.id, options.startDate, options.endDate, options.type]);

  // Calculate totals
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') {
        acc.income += Number(t.amount);
      } else {
        acc.expense += Number(t.amount);
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return {
    transactions,
    loading,
    totalCount,
    totals,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
