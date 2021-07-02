import { Card, Icon, InputGroup } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { AccountType, CurrencyCode, UserInfo } from '../../apiTypes';
import { useHttp } from '../../hooks/useHttp';
import { StatementsDataLayerProvider } from '../../hooks/useStatementsDataLayer';

import StatementsList from '../StatementsList/StatementsList';

import s from './s.module.scss';

function App() {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem('token') ?? ''
  );

  useEffect(() => {
    window.sessionStorage.setItem('token', token);
  }, [token]);

  const http = useHttp();

  const { data } = useQuery<UserInfo>(
    'account-info',
    () =>
      http
        .get('/personal/client-info', {
          headers: {
            'X-Token': token
          }
        })
        .then((res) => res.data),
    {
      enabled: !!token,
      retry: true,
      retryDelay: 2000,
      cacheTime: Infinity
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
      <Card>
        <h2>API токен</h2>

        <div>
          <InputGroup
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
        </div>

        <div>
          <Icon icon="help" /> Это апи токен, который необходим для чтобы
          получить информацию о счете. Его можно получить на{' '}
          <a href="https://api.monobank.ua" target="_blank" rel="noreferrer">
            здесь
          </a>
          .
        </div>
      </Card>

      <h2>{data?.name}</h2>

      {blackCard && (
        <StatementsDataLayerProvider
          accountId={blackCard.id}
          axios={http}
          apiToken={token}
          maxFetchRetries={10}
        >
          <StatementsList />
        </StatementsDataLayerProvider>
      )}
    </div>
  );
}

export default App;
