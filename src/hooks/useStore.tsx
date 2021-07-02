import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo
} from 'react';

import useDateRange, { DateRange } from './useDateRange';

export interface Store {
  dateRange: DateRange;
  setDateRange(range: DateRange): void;
}

const StoreContext = createContext<Store>({} as Store);

export default function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }: PropsWithChildren<{}>) {
  const { dateRange, setDateRange } = useDateRange();

  const store: Store = useMemo(
    () => ({
      dateRange,
      setDateRange
    }),
    [dateRange, setDateRange]
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
