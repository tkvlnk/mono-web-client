import React from 'react';

import { useStore } from '../../hooks/useStore/useStore';

import s from './ApiToken.module.scss';

export const TestId = {
  Input: () => 'api-token-input'
} as const;

export const ApiToken = () => {
  const { apiToken, setApiToken } = useStore();

  return (
    <div className={s.root}>
      <label className={s.field}>
        <span>API токен:</span>
        <input
          data-testid={TestId.Input()}
          type="text"
          value={apiToken}
          onChange={(event) => setApiToken(event.target.value)}
        />
      </label>
      <i>
        Это апи токен, который необходим для чтобы получить информацию о счете.
        Его можно получить{' '}
        <a href="https://api.monobank.ua" target="_blank" rel="noreferrer">
          здесь
        </a>
        .
      </i>{' '}
    </div>
  );
};
