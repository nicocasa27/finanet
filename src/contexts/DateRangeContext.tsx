import { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangeContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  formattedRange: string;
  monthLabel: string;
  startDateStr: string;
  endDateStr: string;
  previousPeriod: {
    startDateStr: string;
    endDateStr: string;
  };
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: startOfMonth(today),
    endDate: endOfMonth(today),
  });

  const formattedRange = useMemo(() => {
    const start = format(dateRange.startDate, 'd MMM', { locale: es });
    const end = format(dateRange.endDate, 'd MMM yyyy', { locale: es });
    return `${start} - ${end}`;
  }, [dateRange]);

  const monthLabel = useMemo(() => {
    return format(dateRange.startDate, 'MMMM yyyy', { locale: es });
  }, [dateRange]);

  const startDateStr = useMemo(() => {
    return format(dateRange.startDate, 'yyyy-MM-dd');
  }, [dateRange]);

  const endDateStr = useMemo(() => {
    return format(dateRange.endDate, 'yyyy-MM-dd');
  }, [dateRange]);

  // Calculate previous period for comparison
  const previousPeriod = useMemo(() => {
    const prevStart = startOfMonth(subMonths(dateRange.startDate, 1));
    const prevEnd = endOfMonth(subMonths(dateRange.startDate, 1));
    return {
      startDateStr: format(prevStart, 'yyyy-MM-dd'),
      endDateStr: format(prevEnd, 'yyyy-MM-dd'),
    };
  }, [dateRange]);

  return (
    <DateRangeContext.Provider 
      value={{ 
        dateRange, 
        setDateRange, 
        formattedRange, 
        monthLabel, 
        startDateStr, 
        endDateStr,
        previousPeriod,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRangeContext() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRangeContext must be used within a DateRangeProvider');
  }
  return context;
}
