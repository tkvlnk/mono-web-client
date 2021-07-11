import React from 'react';
import { useQuery } from 'react-query';

import { AccountType, CashbackType, CurrencyCode } from '../../api/enums';
import type { UserInfo } from '../../api/types';
import { useHttp } from '../../hooks/useHttp';
import { StatementsDataLayerProvider } from '../../hooks/useStatementsDataLayer';

import { useStore } from '../../hooks/useStore/useStore';
import { ApiToken } from '../ApiToken/ApiToken';
import { Card } from '../Card/Card';
import { MonthAndYearPicker } from '../MonthAndYearPicker/MonthAndYearPicker';
import { SpendsChart } from '../SpendsChart/SpendsChart';
import { StatementsList } from '../StatementsList/StatementsList';

import { UserAccounts } from '../UserAccounts/UserAccounts';

import s from './App.module.scss';

export function App() {
  const { dateRange, setDateRange, apiToken } = useStore();

  const http = useHttp();

  const { data } = useQuery<UserInfo>(
    'account-info',
    () => http.get('/personal/client-info').then((res) => res.data),
    {
      enabled: !!apiToken,
      retry: true,
      retryDelay: 2000,
      cacheTime: Infinity,
      staleTime: Infinity
    }
  );

  const blackCard = data?.accounts.find((acc) => {
    return (
      acc.cashbackType === CashbackType.UAH &&
      acc.currencyCode === CurrencyCode.UAH &&
      acc.type === AccountType.Black
    );
  });

  return (
    <div className={s.root}>
      <header className={s.header} style={{ gridArea: 'head' }}>
        <ApiToken />
        {data && (
          <UserAccounts userInfo={data} selectedAccountId={blackCard?.id} />
        )}
      </header>

      {blackCard && (
        <StatementsDataLayerProvider
          accountId={blackCard.id}
          axios={http}
          apiToken={apiToken}
          maxFetchRetries={10}
        >
          <Card style={{ gridArea: 'userinfo' }}>
            <SpendsChart />
          </Card>

          <div style={{ gridArea: 'period' }}>
            <MonthAndYearPicker value={dateRange} onChange={setDateRange} />
          </div>

          <div style={{ gridArea: 'list' }}>
            <StatementsList />
          </div>
        </StatementsDataLayerProvider>
      )}
    </div>
  );
}
