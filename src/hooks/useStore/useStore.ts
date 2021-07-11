import constante from 'constate';
import { useMemo } from 'react';

import { MonthAndYearRange } from '../../components/MonthAndYearPicker/MonthAndYearPicker';

import { useApiToken } from './useApiToken';
import { useDateRange } from './useDateRange';

export interface Store {
  readonly dateRange: MonthAndYearRange;
  setDateRange(range: MonthAndYearRange): void;
  readonly apiToken: string;
  setApiToken(apiToken: string): void;
}

export const [StoreProvider, useStore] = constante(() => {
  const { dateRange, setDateRange } = useDateRange();
  const { apiToken, setApiToken } = useApiToken();

  return useMemo(
    () => ({
      dateRange,
      setDateRange,
      apiToken,
      setApiToken
    }),
    [dateRange, setDateRange, apiToken, setApiToken]
  );
});
