import React from 'react';

import { CurrenciesKit } from '../../api/CurrenciesKit';
import { UserInfo } from '../../api/types';
import s from '../MainView/Main.module.scss';

export interface UserInfoProps {
  userInfo: UserInfo;
  selectedAccountId?: string;
}

export const TestId = {
  Name: () => 'user-accounts-name'
};

export const UserAccounts = (props: UserInfoProps) => {
  const { userInfo, selectedAccountId } = props;

  return (
    <div>
      <h3 data-testid={TestId.Name()}>{userInfo.name}</h3>

      <label className={s.accountsMenu}>
        <span>Cчета:</span>
        <select value={selectedAccountId} onChange={() => {}}>
          {userInfo.accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>{`${
              CurrenciesKit[acc.currencyCode].bankCode
            } ${acc.type.toUpperCase()} ${acc.maskedPan}`}</option>
          ))}
        </select>
      </label>
    </div>
  );
};
