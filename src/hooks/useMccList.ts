import { UseQueryResult, useQuery } from 'react-query';

import { MccInfo } from '../api/types';

import { useApi } from './useApi';

export function useMccList(): UseQueryResult<MccInfo[]> {
  const api = useApi();

  return useQuery('/mcc-list', () => api.fetchMccInfo(), {
    cacheTime: Infinity,
    staleTime: Infinity
  });
}
