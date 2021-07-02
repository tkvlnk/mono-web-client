import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const DATE_RANGE_STORE_ITEM = 'date-range' as const;

export interface DateRange {
  start: Date;
  end: Date;
}

export default function useDateRange(): {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
} {
  const [dateRange, setDateRange] = useState<{
    start: Date;
    end: Date;
  }>(() => {
    const dateRangeStrs = JSON.parse(
      window.sessionStorage.getItem(DATE_RANGE_STORE_ITEM) ?? 'null'
    ) as { start?: string; end?: string } | null;

    if (!dateRangeStrs?.start || !dateRangeStrs.end) {
      return {
        start: dayjs().startOf('month').toDate(),
        end: dayjs().startOf('month').add(1, 'month').toDate()
      };
    }

    return {
      start: new Date(dateRangeStrs.start),
      end: new Date(dateRangeStrs.end)
    };
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
