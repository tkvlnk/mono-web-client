import { AccountType, CashbackType, CurrencyCode } from '../api/enums';

import { UserInfo } from '../api/types';

import { useUserInfo } from './useUserInfo';

export function useBackCardInfo(): UserInfo['accounts'][number] | undefined {
  const useInfo = useUserInfo();

  return useInfo.data?.accounts.find((acc) => {
    return (
      acc.cashbackType === CashbackType.UAH &&
      acc.currencyCode === CurrencyCode.UAH &&
      acc.type === AccountType.Black
    );
  });
}
