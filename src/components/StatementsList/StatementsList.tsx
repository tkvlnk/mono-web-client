import React from 'react';

import { useStatementsList } from '../../hooks/useStatementsList';
import { useStore } from '../../hooks/useStore/useStore';
import { StatementRow } from '../StatementRow/StatementRow';

import s from './StatementsList.module.scss';

export const StatementsList = () => {
  const {
    dateRange,
    addStatementToBlacklist,
    removeStatementToBlacklist,
    isStatementBlacklisted
  } = useStore();

  const { data: statements } = useStatementsList(dateRange);

  const sortedStatements = statements
    ?.concat()
    .sort((first, second) => first.time - second.time);

  return (
    <div>
      {!!sortedStatements?.length && (
        <div className={s.list}>
          {sortedStatements.map((statement) => (
            <StatementRow
              key={statement.id}
              statement={statement}
              isSelected={!isStatementBlacklisted(statement.id)}
              onSelection={(isSelected) => {
                if (!isSelected) {
                  addStatementToBlacklist(statement.id);
                } else {
                  removeStatementToBlacklist(statement.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
