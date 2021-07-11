import React from 'react';
import { useQuery } from 'react-query';

import { CurrenciesKit } from '../../api/CurrenciesKit';
import { AccountType, CurrencyCode } from '../../api/enums';
import type { UserInfo } from '../../api/types';
import { useHttp } from '../../hooks/useHttp';
import { StatementsDataLayerProvider } from '../../hooks/useStatementsDataLayer';

import { useStore } from '../../hooks/useStore/useStore';
import { ApiToken } from '../ApiToken/ApiToken';
import { Card } from '../Card/Card';
import { MonthAndYearPicker } from '../MonthAndYearPicker/MonthAndYearPicker';
import { StatementsList } from '../StatementsList/StatementsList';

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
      acc.creditLimit > 0 &&
      acc.currencyCode === CurrencyCode.UAH &&
      acc.type === AccountType.Black
    );
  });

  return (
    <div className={s.root}>
      <header className={s.header} style={{ gridArea: 'head' }}>
        <ApiToken />
      </header>

      {data && (
        <Card style={{ gridArea: 'userinfo' }}>
          <h3>{data.name}</h3>

          <label className={s.accountsMenu}>
            <span>Cчета:</span>
            <select value={blackCard?.id}>
              {data.accounts.map((acc) => (
                <option value={acc.id}>{`${
                  CurrenciesKit[acc.currencyCode].bankCode
                } ${acc.type.toUpperCase()} ${acc.maskedPan}`}</option>
              ))}
            </select>
          </label>
        </Card>
      )}

      <div style={{ gridArea: 'period' }}>
        <MonthAndYearPicker value={dateRange} onChange={setDateRange} />
      </div>

      {blackCard && (
        <div style={{ gridArea: 'list' }}>
          <StatementsDataLayerProvider
            accountId={blackCard.id}
            axios={http}
            apiToken={apiToken}
            maxFetchRetries={10}
          >
            <StatementsList />
          </StatementsDataLayerProvider>
        </div>
      )}
    </div>
  );
}
