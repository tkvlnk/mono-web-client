import axios from 'axios';
import constante from 'constate';
import { useState } from 'react';

import { API_TOKE_KEY } from './useStore/useApiToken';

export const [HttpProvider, useHttp] = constante(() => {
  const [http] = useState(() =>
    axios.create({
      baseURL: '/api',
      headers: {
        'Content-Types': 'application/json'
      },
      transformRequest(data: unknown, headers: Record<string, unknown>) {
        headers['X-Token'] = window.sessionStorage.getItem(API_TOKE_KEY);
        return data;
      }
    })
  );

  return http;
});
