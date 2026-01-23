import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { useDateRangeContext } from '@/contexts/DateRangeContext';
import { differenceInDays, parseISO } from 'date-fns';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category_id: string | null;
  categories?: {
    name: string;
  } | null;
}

export function useIndicadoresData() {
  const { activeBusiness } = useBusiness();
  const { startDateStr, endDateStr, dateRange, previousPeriod } = useDateRangeContext();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [previousTransactions, setPreviousTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
          .select('*, categories(name)')
          .eq('business_id', activeBusiness.id)
          .gte('date', startDateStr)
          .lte('date', endDateStr);

        if (currentError) throw currentError;
        setTransactions(currentData || []);

        // Fetch previous period
        const { data: prevData, error: prevError } = await supabase
          .from('transactions')
          .select('*, categories(name)')
          .eq('business_id', activeBusiness.id)
          .gte('date', previousPeriod.startDateStr)
          .lte('date', previousPeriod.endDateStr);

        if (prevError) throw prevError;
        setPreviousTransactions(prevData || []);
      } catch (error) {
        console.error('Error fetching indicadores data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeBusiness?.id, startDateStr, endDateStr, previousPeriod]);

  const indicadores = useMemo(() => {
    const daysInPeriod = differenceInDays(dateRange.endDate, dateRange.startDate) + 1;
    const today = new Date();
    const daysElapsed = Math.min(
      differenceInDays(today, dateRange.startDate) + 1,
      daysInPeriod
    );

    // Current period calculations
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    // Separate costs (Materia Prima) from operating expenses
    const costs = transactions
      .filter(t => t.type === 'expense' && 
        (t.categories?.name?.toLowerCase().includes('materia') || 
         t.categories?.name?.toLowerCase().includes('costo')))
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const operatingExpenses = expense - costs;

    // Margins
    const grossProfit = income - costs;
    const netProfit = grossProfit - operatingExpenses;
    const grossMargin = income > 0 ? (grossProfit / income) * 100 : 0;
    const netMargin = income > 0 ? (netProfit / income) * 100 : 0;

    // Daily averages
    const dailyIncome = daysElapsed > 0 ? income / daysElapsed : 0;
    const dailyExpense = daysElapsed > 0 ? expense / daysElapsed : 0;
    const burnRate = dailyExpense;

    // Break-even calculation
    // Days needed to cover fixed expenses (assuming all expense is "fixed" for simplicity)
    const breakEvenDays = dailyIncome > 0 ? Math.ceil(expense / dailyIncome) : 0;
    const breakEvenAmount = expense;

    // Previous period for comparison
    const prevDaysInPeriod = differenceInDays(
      parseISO(previousPeriod.endDateStr), 
      parseISO(previousPeriod.startDateStr)
    ) + 1;

    const prevIncome = previousTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const prevExpense = previousTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const prevCosts = previousTransactions
      .filter(t => t.type === 'expense' && 
        (t.categories?.name?.toLowerCase().includes('materia') || 
         t.categories?.name?.toLowerCase().includes('costo')))
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const prevGrossProfit = prevIncome - prevCosts;
    const prevNetProfit = prevGrossProfit - (prevExpense - prevCosts);
    const prevGrossMargin = prevIncome > 0 ? (prevGrossProfit / prevIncome) * 100 : 0;
    const prevNetMargin = prevIncome > 0 ? (prevNetProfit / prevIncome) * 100 : 0;
    const prevDailyIncome = prevDaysInPeriod > 0 ? prevIncome / prevDaysInPeriod : 0;
    const prevBurnRate = prevDaysInPeriod > 0 ? prevExpense / prevDaysInPeriod : 0;

    // Category insights
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const cat = t.categories?.name || 'Sin categoría';
        acc[cat] = (acc[cat] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const topExpenseCategory = Object.entries(expenseByCategory)
      .sort((a, b) => b[1] - a[1])[0];

    const topCategoryPercent = topExpenseCategory && income > 0 
      ? (topExpenseCategory[1] / income) * 100 
      : 0;

    return {
      grossMargin,
      netMargin,
      dailyIncome,
      dailyExpense,
      burnRate,
      breakEvenDays,
      breakEvenAmount,
      // Changes vs previous period
      grossMarginChange: grossMargin - prevGrossMargin,
      netMarginChange: netMargin - prevNetMargin,
      dailyIncomeChange: prevDailyIncome > 0 ? dailyIncome - prevDailyIncome : 0,
      burnRateChange: prevBurnRate > 0 ? burnRate - prevBurnRate : 0,
      // Insights
      topExpenseCategory: topExpenseCategory?.[0] || null,
      topCategoryPercent,
      hasHealthyMargin: netMargin > 20,
      isInRed: netProfit < 0,
    };
  }, [transactions, previousTransactions, dateRange, previousPeriod]);

  return {
    loading,
    indicadores,
    hasData: transactions.length > 0,
  };
}
