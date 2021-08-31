import { UseQueryResult, useQuery } from 'react-query';

import { Api } from '../api/Api';
import { MccInfo } from '../api/types';

import { useHttp } from './useHttp';

export function useMccList(): UseQueryResult<MccInfo[]> {
  const axios = useHttp();

  return useQuery('/mcc-list', () => new Api(axios).fetchMccInfo(), {
    cacheTime: Infinity,
    staleTime: Infinity
  });
}
