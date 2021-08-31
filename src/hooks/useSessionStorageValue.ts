import { useEffect, useState } from 'react';

export function useSessionStorageValue(
  key: string,
  initialValue = ''
): { value: string; setValue(nextValue: string): void } {
  const [value, setValue] = useState(
    () => window.sessionStorage.getItem(key) ?? initialValue
  );

  useEffect(() => {
    window.sessionStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
}
