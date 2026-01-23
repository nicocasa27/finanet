import { useState } from "react";
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, subWeeks, startOfWeek, endOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDateRangeContext, DateRange } from "@/contexts/DateRangeContext";
import { cn } from "@/lib/utils";

const presets = [
  {
    label: "Esta semana",
    getValue: () => ({
      startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
      endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
    }),
  },
  {
    label: "Semana pasada",
    getValue: () => ({
      startDate: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      endDate: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    }),
  },
  {
    label: "Este mes",
    getValue: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    }),
  },
  {
    label: "Mes pasado",
    getValue: () => ({
      startDate: startOfMonth(subMonths(new Date(), 1)),
      endDate: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    label: "Últimos 3 meses",
    getValue: () => ({
      startDate: startOfMonth(subMonths(new Date(), 2)),
      endDate: endOfMonth(new Date()),
    }),
  },
  {
    label: "Este año",
    getValue: () => ({
      startDate: startOfYear(new Date()),
      endDate: endOfYear(new Date()),
    }),
  },
];

export function DateRangePicker() {
  const { dateRange, setDateRange, formattedRange } = useDateRangeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: dateRange.startDate,
    to: dateRange.endDate,
  });

  const handlePresetClick = (preset: typeof presets[0]) => {
    const range = preset.getValue();
    setDateRange(range);
    setTempRange({ from: range.startDate, to: range.endDate });
    setIsOpen(false);
  };

  const handleSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    if (range) {
      setTempRange(range);
      if (range.from && range.to) {
        setDateRange({ startDate: range.from, endDate: range.to });
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal gap-2 bg-muted/50 border-border/50 hover:bg-muted",
            "h-10 px-3"
          )}
        >
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm capitalize">{formattedRange}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
        <div className="flex">
          {/* Presets sidebar */}
          <div className="border-r border-border p-3 space-y-1 min-w-[140px]">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Rango rápido</p>
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset)}
                className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
          
          {/* Calendar */}
          <div className="p-3">
            <CalendarComponent
              mode="range"
              defaultMonth={dateRange.startDate}
              selected={tempRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              locale={es}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
