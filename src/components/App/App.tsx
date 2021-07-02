import { Card, Icon, InputGroup } from '@blueprintjs/core';
import { DateRangeInput } from '@blueprintjs/datetime';
import { Cell, Column, Table } from '@blueprintjs/table';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import useStore from '../../hooks/useStore';
import mccRanges from '../../mcc-ranges.json';

import s from './s.module.scss';

const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Types': 'application/json'
  }
});

enum AccountType {
  Black = 'black',
  White = 'white',
  Platinum = 'platinum',
  Iron = 'iron',
  Fop = 'fop',
  Yellow = 'yellow'
}

enum CashbackType {
  None = 'None',
  UAH = 'UAH',
  Miles = 'Miles'
}

enum CurrencyCode {
  UAH = 980
}

interface UserInfo {
  id: string;
  name: string;
  webHookUrl: string;
  accounts: {
    id: string;
    balance: number;
    creditLimit: number;
    type: AccountType;
    currencyCode: number;
    cashbackType: CashbackType;
    maskedPan: string[];
    iban: string;
  }[];
}

interface StatementItem {
  id: string;
  time: number;
  description: string;
  mcc: number;
  hold: boolean;
  amount: number;
  operationalAmount: number;
  currencyCode: CurrencyCode;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  comment: number;
  receiptId: number;
  counterEdrpou: string;
  counterIban: string;
}

function App() {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem('token') ?? ''
  );

  useEffect(() => {
    window.sessionStorage.setItem('token', token);
  }, [token]);

  const { dateRange, setDateRange } = useStore();

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
      retry: false,
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

  const { data: statements } = useQuery<StatementItem[]>(
    ['statements', dateRange.start.getTime(), dateRange.end.getTime()],
    () => {
      if (!dateRange.start || !dateRange.end) {
        throw new Error('Not enough data in date range');
      }

      const from = Math.trunc(dateRange.start.getTime() / 1000);
      const to = Math.trunc(dateRange.end.getTime() / 1000);

      return http
        .get(`/personal/statement/${blackCard?.id}/${from}/${to}`, {
          headers: {
            'X-Token': token
          }
        })
        .then((res) => res.data);
    },
    {
      enabled: !!blackCard && !!dateRange.start && !!dateRange.end,
      retry: false
    }
  );

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
        <div>
          <DateRangeInput
            formatDate={(date) => dayjs(date).format('DD.MM.YYYY')}
            parseDate={(dateStr) => dayjs(dateStr).toDate()}
            onChange={([start, end]) => {
              if (!start || !end) {
                return;
              }
              setDateRange({ start, end });
            }}
            value={[dateRange.start, dateRange.end]}
          />
        </div>
      )}

      {!!statements?.length && (
        <Table numRows={statements?.length} enableRowHeader={false}>
          <Column
            name="Дата и время"
            cellRenderer={(rowIndex) => (
              <Cell>
                {dayjs(statements[rowIndex].time * 1000).format(
                  'HH:mm, D MMM YYYY'
                )}
              </Cell>
            )}
          />
          <Column
            name="Тип"
            cellRenderer={(rowIndex) => (
              <Cell>
                <span style={{ fontSize: '1.5em' }}>
                  {mccRanges.find(({ max }) => max >= statements[rowIndex].mcc)
                    ?.emoji ?? '❓'}
                </span>
              </Cell>
            )}
          />
          <Column
            name="Сумма"
            cellRenderer={(rowIndex) => (
              <Cell>{(statements[rowIndex].amount / 100).toFixed(2)}</Cell>
            )}
          />
          <Column
            name="Описание"
            cellRenderer={(rowIndex) => (
              <Cell>{statements[rowIndex].description}</Cell>
            )}
          />
        </Table>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
