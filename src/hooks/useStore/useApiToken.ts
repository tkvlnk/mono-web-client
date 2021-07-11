import { useEffect, useState } from 'react';

export const API_TOKE_KEY = 'token';

export function useApiToken(): {
  readonly apiToken: string;
  setApiToken(apiToken: string): void;
} {
  const [apiToken, setApiToken] = useState(
    () => window.sessionStorage.getItem(API_TOKE_KEY) ?? ''
  );

  useEffect(() => {
    window.sessionStorage.setItem(API_TOKE_KEY, apiToken);
  }, [apiToken]);

  return {
    apiToken,
    setApiToken
  };
}
