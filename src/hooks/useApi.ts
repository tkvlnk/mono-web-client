import constate from 'constate';

import { useEffect, useRef } from 'react';

import { Api } from '../api/Api';

import { useApiToken } from './useStore/useApiToken';

export const [ApiProvider, useApi] = constate(() => {
  const { apiToken } = useApiToken();

  const api = useRef(new Api(apiToken));

  useEffect(() => {
    api.current.updateAuthToken(apiToken);
  }, [apiToken]);

  return api.current;
});
