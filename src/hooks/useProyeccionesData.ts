import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBusiness } from '@/contexts/BusinessContext';
import { useDateRangeContext } from '@/contexts/DateRangeContext';
import { 
  differenceInDays, 
  subDays, 
  format, 
  eachWeekOfInterval, 
  startOfWeek, 
  endOfWeek, 
  parseISO 
} from 'date-fns';
import { es } from 'date-fns/locale';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
}

interface ChartDataPoint {
  name: string;
  actual: number | null;
  proyectado: number;
}

interface Scenario {
  ingresos: number;
  gastos: number;
  utilidad: number;
}

export function useProyeccionesData() {
  const { activeBusiness } = useBusiness();
  const { startDateStr, endDateStr, dateRange, monthLabel } = useDateRangeContext();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [historicalTransactions, setHistoricalTransactions] = useState<Transaction[]>([]);
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
        
        // Fetch current period transactions
        const { data: currentData, error: currentError } = await supabase
          .from('transactions')
          .select('id, type, amount, date')
          .eq('business_id', activeBusiness.id)
          .gte('date', startDateStr)
          .lte('date', endDateStr)
          .order('date', { ascending: true });

        if (currentError) throw currentError;
        setTransactions(currentData || []);

        // Fetch last 30 days for historical average
        const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');
        const { data: historicalData, error: historicalError } = await supabase
          .from('transactions')
          .select('id, type, amount, date')
          .eq('business_id', activeBusiness.id)
          .gte('date', thirtyDaysAgo)
          .lte('date', format(new Date(), 'yyyy-MM-dd'));

        if (historicalError) throw historicalError;
        setHistoricalTransactions(historicalData || []);
      } catch (error) {
        console.error('Error fetching proyecciones data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeBusiness?.id, startDateStr, endDateStr]);

  // Calculate daily averages from historical data
  const dailyAverages = useMemo(() => {
    if (historicalTransactions.length === 0) {
      return { income: 0, expense: 0 };
    }

    const totalIncome = historicalTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const totalExpense = historicalTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Count unique days with transactions
    const uniqueDays = new Set(historicalTransactions.map(t => t.date)).size;
    const daysToUse = Math.max(uniqueDays, 7); // At least 7 days for average

    return {
      income: totalIncome / daysToUse,
      expense: totalExpense / daysToUse,
    };
  }, [historicalTransactions]);

  // Chart data by week
  const chartData = useMemo((): ChartDataPoint[] => {
    const weeks = eachWeekOfInterval(
      { start: dateRange.startDate, end: dateRange.endDate },
      { weekStartsOn: 1 }
    );

    const today = new Date();
    let cumulativeActual = 0;
    let cumulativeProjected = 0;

    return weeks.map((weekStart, index) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const weekLabel = `Sem ${index + 1}`;
      const isPast = weekEnd < today;
      const isCurrent = weekStart <= today && today <= weekEnd;

      // Get actual transactions for this week
      const weekTransactions = transactions.filter(t => {
        const date = parseISO(t.date);
        return date >= weekStart && date <= weekEnd;
      });

      const weekIncome = weekTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      // Cumulative
      if (isPast || isCurrent) {
        cumulativeActual += weekIncome;
      }

      // Projected (7 days of average)
      cumulativeProjected += dailyAverages.income * 7;

      return {
        name: weekLabel,
        actual: isPast || isCurrent ? cumulativeActual : null,
        proyectado: cumulativeProjected,
      };
    });
  }, [transactions, dateRange, dailyAverages]);

  // Calculate scenarios
  const scenarios = useMemo((): { optimista: Scenario; base: Scenario; conservador: Scenario } => {
    const daysInPeriod = differenceInDays(dateRange.endDate, dateRange.startDate) + 1;
    const today = new Date();
    const daysElapsed = Math.max(1, differenceInDays(today, dateRange.startDate) + 1);
    const daysRemaining = Math.max(0, daysInPeriod - daysElapsed);

    // Current actual totals
    const actualIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const actualExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Base scenario: project based on current daily averages
    const currentDailyIncome = daysElapsed > 0 ? actualIncome / daysElapsed : dailyAverages.income;
    const currentDailyExpense = daysElapsed > 0 ? actualExpense / daysElapsed : dailyAverages.expense;

    const baseIncome = actualIncome + (currentDailyIncome * daysRemaining);
    const baseExpense = actualExpense + (currentDailyExpense * daysRemaining);

    // Optimistic: +20% income, -10% expenses
    const optimisticIncome = actualIncome + (currentDailyIncome * 1.2 * daysRemaining);
    const optimisticExpense = actualExpense + (currentDailyExpense * 0.9 * daysRemaining);

    // Conservative: -15% income, +10% expenses
    const conservativeIncome = actualIncome + (currentDailyIncome * 0.85 * daysRemaining);
    const conservativeExpense = actualExpense + (currentDailyExpense * 1.1 * daysRemaining);

    return {
      optimista: {
        ingresos: optimisticIncome,
        gastos: optimisticExpense,
        utilidad: optimisticIncome - optimisticExpense,
      },
      base: {
        ingresos: baseIncome,
        gastos: baseExpense,
        utilidad: baseIncome - baseExpense,
      },
      conservador: {
        ingresos: conservativeIncome,
        gastos: conservativeExpense,
        utilidad: conservativeIncome - conservativeExpense,
      },
    };
  }, [transactions, dateRange, dailyAverages]);

  // Goal (based on previous month or a reasonable target)
  const goal = useMemo(() => {
    // Use 20% more than base projection as goal
    return scenarios.base.ingresos * 1.1;
  }, [scenarios]);

  return {
    loading,
    chartData,
    scenarios,
    goal,
    monthLabel,
    dailyAverages,
    hasData: transactions.length > 0 || historicalTransactions.length > 0,
  };
}
