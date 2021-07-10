import constante from 'constate';
import { useMemo } from 'react';

import { MonthAndYearRange } from '../components/MonthAndYearPicker/MonthAndYearPicker';

import { useDateRange } from './useDateRange';

export interface Store {
  readonly dateRange: MonthAndYearRange;
  setDateRange(range: MonthAndYearRange): void;
}

export const [StoreProvider, useStore] = constante(() => {
  const { dateRange, setDateRange } = useDateRange();

  return useMemo(
    () => ({
      dateRange,
      setDateRange
    }),
    [dateRange, setDateRange]
  );
});
