import constante from 'constate';

import { ApiToken, useApiToken } from './useApiToken';
import { DateRange, useDateRange } from './useDateRange';
import {
  StatementsIdBlacklist,
  useStatementsBlacklist
} from './useStatementsBlacklist';

export type Store = DateRange & ApiToken & StatementsIdBlacklist;

export const [StoreProvider, useStore] = constante(
  (): Store => ({
    ...useDateRange(),
    ...useApiToken(),
    ...useStatementsBlacklist()
  })
);
