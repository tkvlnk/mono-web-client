import { UseQueryResult, useQuery } from 'react-query';

import { Api } from '../api/Api';
import { UserInfo } from '../api/types';

import { useHttp } from './useHttp';
import { useApiToken } from './useStore/useApiToken';

export function useUserInfo(): UseQueryResult<UserInfo> {
  const http = useHttp();
  const apiToken = useApiToken();

  return useQuery<UserInfo>('account-info', () => new Api(http).fetchUser(), {
    enabled: !!apiToken,
    retry: true,
    retryDelay: 2000,
    cacheTime: Infinity,
    staleTime: Infinity
  });
}
