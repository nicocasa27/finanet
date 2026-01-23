import { useState, useMemo } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export function useDateRange() {
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

  return {
    dateRange,
    setDateRange,
    formattedRange,
    monthLabel,
    startDateStr,
    endDateStr,
  };
}
