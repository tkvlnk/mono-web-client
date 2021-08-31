import { useState } from 'react';

import { StatementItem } from '../../api/types';

export interface StatementsIdBlacklist {
  isStatementBlacklisted(
    statement: Pick<StatementItem, 'id' | 'description'>
  ): boolean;
  addStatementToBlacklist(statementId: string): void;
  removeStatementToBlacklist(statementId: string): void;
  blackListedStatementsCount: number;
  ignoreCurrencyOperations: boolean;
  setIgnoreCurrencyOperations(value: boolean): void;
}

export function useStatementsBlacklist(): StatementsIdBlacklist {
  const [ignoreCurrencyOperations, setIgnoreCurrencyOperations] =
    useState(true);

  const [selectedStatements, updateStatements] = useState(
    () => new Set<string>()
  );

  return {
    isStatementBlacklisted(statement: StatementItem) {
      if (
        ignoreCurrencyOperations &&
        [
          'З гривневого рахунка ФОП для купiвлi валюти',
          'Покупка валюти за переказом з рахунку ФОП'
        ].includes(statement.description)
      ) {
        return true;
      }

      return selectedStatements.has(statement.id);
    },
    addStatementToBlacklist(statementId: string) {
      selectedStatements.add(statementId);
      updateStatements(new Set(selectedStatements));
    },
    removeStatementToBlacklist(statementId: string) {
      selectedStatements.delete(statementId);
      updateStatements(new Set(selectedStatements));
    },
    blackListedStatementsCount: selectedStatements.size,
    ignoreCurrencyOperations,
    setIgnoreCurrencyOperations
  };
}
