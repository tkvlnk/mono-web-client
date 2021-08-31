import React from 'react';

import { CurrenciesKit } from '../../api/CurrenciesKit';
import { UserInfo } from '../../api/types';
import s from '../App/App.module.scss';

export interface UserInfoProps {
  userInfo: UserInfo;
  selectedAccountId?: string;
}

export const UserAccounts = (props: UserInfoProps) => {
  const { userInfo, selectedAccountId } = props;

  return (
    <div>
      <h3>{userInfo.name}</h3>

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
