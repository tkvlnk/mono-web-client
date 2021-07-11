import { useState } from 'react';

export interface StatementsIdBlacklist {
  isStatementBlacklisted(statementId: string): boolean;
  addStatementToBlacklist(statementId: string): void;
  removeStatementToBlacklist(statementId: string): void;
  blackListedStatementsCount: number;
}

export function useStatementsBlacklist(): StatementsIdBlacklist {
  const [selectedStatements, updateStatements] = useState(
    () => new Set<string>()
  );

  return {
    isStatementBlacklisted(statementId: string) {
      return selectedStatements.has(statementId);
    },
    addStatementToBlacklist(statementId: string) {
      selectedStatements.add(statementId);
      updateStatements(new Set(selectedStatements));
    },
    removeStatementToBlacklist(statementId: string) {
      selectedStatements.delete(statementId);
      updateStatements(new Set(selectedStatements));
    },
    blackListedStatementsCount: selectedStatements.size
  };
}
