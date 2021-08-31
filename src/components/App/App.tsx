import React from 'react';

import { useBackCardInfo } from '../../hooks/useBackCardInfo';
import { useMccList } from '../../hooks/useMccList';

import { useStore } from '../../hooks/useStore/useStore';
import { useUserInfo } from '../../hooks/useUserInfo';
import { ApiToken } from '../ApiToken/ApiToken';
import { Card } from '../Card/Card';
import { MonthAndYearPicker } from '../MonthAndYearPicker/MonthAndYearPicker';
import { SpendsChart } from '../SpendsChart/SpendsChart';
import { StatementsList } from '../StatementsList/StatementsList';

import { UserAccounts } from '../UserAccounts/UserAccounts';

import s from './App.module.scss';

export function App() {
  const { dateRange, setDateRange } = useStore();

  useMccList();
  const useInfo = useUserInfo();

  const blackCard = useBackCardInfo();

  return (
    <div className={s.root}>
      <header className={s.header} style={{ gridArea: 'head' }}>
        <ApiToken />
        {useInfo.data && (
          <UserAccounts
            userInfo={useInfo.data}
            selectedAccountId={blackCard?.id}
          />
        )}
      </header>

      {blackCard && (
        <>
          <Card style={{ gridArea: 'userinfo' }}>
            <SpendsChart />
          </Card>

          <div style={{ gridArea: 'period' }}>
            <MonthAndYearPicker value={dateRange} onChange={setDateRange} />
          </div>

          <div style={{ gridArea: 'list' }}>
            <StatementsList />
          </div>
        </>
      )}
    </div>
  );
}
