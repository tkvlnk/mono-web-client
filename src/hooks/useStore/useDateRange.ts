import { useEffect, useState } from 'react';

import { MonthAndYearRange } from '../../components/MonthAndYearPicker/MonthAndYearPicker';

const DATE_RANGE_STORE_ITEM = 'date-range' as const;

export interface DateRange {
  readonly dateRange: MonthAndYearRange;
  setDateRange(range: MonthAndYearRange): void;
}

export function useDateRange(): DateRange {
  const [dateRange, setDateRange] = useState<MonthAndYearRange>(() => {
    const dateRangeStrs = JSON.parse(
      window.sessionStorage.getItem(DATE_RANGE_STORE_ITEM) ?? 'null'
    ) as MonthAndYearRange | null;

    if (!dateRangeStrs?.start || !dateRangeStrs.end) {
      const date = new Date();

      return {
        start: {
          year: date.getFullYear(),
          month: date.getMonth()
        }
      };
    }

    return dateRangeStrs;
  });

  useEffect(() => {
    window.sessionStorage.setItem(
      DATE_RANGE_STORE_ITEM,
      JSON.stringify(dateRange)
    );
  }, [dateRange]);

  return {
    dateRange,
    setDateRange
  };
}
