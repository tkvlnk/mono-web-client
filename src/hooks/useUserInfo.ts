import { UseQueryResult, useQuery } from 'react-query';

import { UserInfo } from '../api/types';

import { useApi } from './useApi';
import { useApiToken } from './useStore/useApiToken';

export function useUserInfo(): UseQueryResult<UserInfo> {
  const apiToken = useApiToken();
  const api = useApi();

  return useQuery<UserInfo>('account-info', () => api.fetchUser(), {
    enabled: !!apiToken,
    retry: true,
    retryDelay: 2000,
    cacheTime: Infinity,
    staleTime: Infinity
  });
}
