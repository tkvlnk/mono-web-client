import axios from 'axios';
import constante from 'constate';
import { useMemo } from 'react';

import { useApiToken } from './useStore/useApiToken';

export const [HttpProvider, useHttp] = constante(() => {
  const { apiToken } = useApiToken();

  return useMemo(
    () =>
      axios.create({
        baseURL: '/api',
        headers: {
          'Content-Types': 'application/json'
        },
        transformRequest(data: unknown, headers: Record<string, unknown>) {
          headers['X-Token'] = apiToken;
          return data;
        }
      }),
    [apiToken]
  );
});
