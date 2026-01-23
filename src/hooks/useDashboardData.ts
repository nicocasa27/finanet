import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { useDateRangeContext } from '@/contexts/DateRangeContext';
import { format, eachWeekOfInterval, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

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

interface ChartDataPoint {
  name: string;
  ingresos: number;
  gastos: number;
}

interface CategoryBreakdown {
  name: string;
  value: number;
  color: string;
}

interface Alert {
  type: 'warning' | 'success' | 'danger';
  message: string;
}

export function useDashboardData() {
  const { activeBusiness } = useBusiness();
  const { startDateStr, endDateStr, dateRange, previousPeriod } = useDateRangeContext();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [previousTransactions, setPreviousTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch current period transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!activeBusiness) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch current period
        const { data: currentData, error: currentError } = await supabase
          .from('transactions')
          .select('*, categories(*)')
          .eq('business_id', activeBusiness.id)
          .gte('date', startDateStr)
          .lte('date', endDateStr)
          .order('date', { ascending: true });

        if (currentError) throw currentError;
        setTransactions(currentData || []);

        // Fetch previous period for comparisons
        const { data: prevData, error: prevError } = await supabase
          .from('transactions')
          .select('*, categories(*)')
          .eq('business_id', activeBusiness.id)
          .gte('date', previousPeriod.startDateStr)
          .lte('date', previousPeriod.endDateStr);

        if (prevError) throw prevError;
        setPreviousTransactions(prevData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [activeBusiness?.id, startDateStr, endDateStr, previousPeriod]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const profit = income - expense;
    const margin = income > 0 ? (profit / income) * 100 : 0;

    // Previous period for comparison
    const prevIncome = previousTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const prevExpense = previousTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const prevProfit = prevIncome - prevExpense;
    const prevMargin = prevIncome > 0 ? (prevProfit / prevIncome) * 100 : 0;

    // Calculate changes
    const incomeChange = prevIncome > 0 
      ? ((income - prevIncome) / prevIncome) * 100 
      : income > 0 ? 100 : 0;
    
    const expenseChange = prevExpense > 0 
      ? ((expense - prevExpense) / prevExpense) * 100 
      : expense > 0 ? 100 : 0;
    
    const profitChange = prevProfit !== 0 
      ? ((profit - prevProfit) / Math.abs(prevProfit)) * 100 
      : profit > 0 ? 100 : 0;
    
    const marginChange = margin - prevMargin;

    return {
      income,
      expense,
      profit,
      margin,
      incomeChange,
      expenseChange,
      profitChange,
      marginChange,
    };
  }, [transactions, previousTransactions]);

  // Chart data (aggregated by week)
  const chartData = useMemo((): ChartDataPoint[] => {
    if (transactions.length === 0) return [];

    const weeks = eachWeekOfInterval(
      { start: dateRange.startDate, end: dateRange.endDate },
      { weekStartsOn: 1 }
    );

    return weeks.map(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const weekLabel = format(weekStart, 'd MMM', { locale: es });

      const weekTransactions = transactions.filter(t => {
        const date = parseISO(t.date);
        return date >= weekStart && date <= weekEnd;
      });

      const ingresos = weekTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const gastos = weekTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return { name: weekLabel, ingresos, gastos };
    });
  }, [transactions, dateRange]);

  // Category breakdown (expenses)
  const categoryBreakdown = useMemo((): CategoryBreakdown[] => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense' && t.categories)
      .reduce((acc, t) => {
        const categoryName = t.categories?.name || 'Sin categoría';
        const categoryColor = t.categories?.color || '#94A3B8';
        
        if (!acc[categoryName]) {
          acc[categoryName] = { value: 0, color: categoryColor };
        }
        acc[categoryName].value += Number(t.amount);
        return acc;
      }, {} as Record<string, { value: number; color: string }>);

    return Object.entries(expensesByCategory)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  // Generate alerts
  const alerts = useMemo((): Alert[] => {
    const alertsList: Alert[] = [];

    // Check if expenses > income
    if (kpis.expense > kpis.income && kpis.income > 0) {
      alertsList.push({
        type: 'danger',
        message: `Estás en números rojos. Gastos superan ingresos por $${(kpis.expense - kpis.income).toLocaleString()}`,
      });
    }

    // Check expense increase
    if (kpis.expenseChange > 20) {
      alertsList.push({
        type: 'warning',
        message: `Gastos aumentaron ${kpis.expenseChange.toFixed(0)}% vs mes anterior`,
      });
    }

    // Good news - profit increase
    if (kpis.profitChange > 10 && kpis.profit > 0) {
      alertsList.push({
        type: 'success',
        message: `Utilidad aumentó ${kpis.profitChange.toFixed(0)}% vs mes anterior`,
      });
    }

    // Good margin
    if (kpis.margin > 30) {
      alertsList.push({
        type: 'success',
        message: `Margen saludable de ${kpis.margin.toFixed(1)}%`,
      });
    }

    // No transactions warning
    if (transactions.length === 0) {
      alertsList.push({
        type: 'warning',
        message: 'No hay movimientos en este período. ¡Registra tu primer ingreso o gasto!',
      });
    }

    return alertsList;
  }, [kpis, transactions]);

  // Projections (simple average-based)
  const projections = useMemo(() => {
    const daysInPeriod = Math.ceil(
      (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    const today = new Date();
    const daysPassed = Math.ceil(
      (today.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const daysRemaining = Math.max(0, daysInPeriod - daysPassed);
    
    const dailyIncome = daysPassed > 0 ? kpis.income / daysPassed : 0;
    const dailyExpense = daysPassed > 0 ? kpis.expense / daysPassed : 0;

    const projectedIncome = kpis.income + (dailyIncome * daysRemaining);
    const projectedExpense = kpis.expense + (dailyExpense * daysRemaining);
    const projectedProfit = projectedIncome - projectedExpense;

    return {
      income: projectedIncome,
      expense: projectedExpense,
      profit: projectedProfit,
      daysRemaining,
    };
  }, [kpis, dateRange]);

  return {
    loading,
    kpis,
    chartData,
    categoryBreakdown,
    alerts,
    projections,
    hasData: transactions.length > 0,
  };
}
