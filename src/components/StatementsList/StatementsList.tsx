import React, { useCallback, useState } from 'react';

import { useStatementsList } from '../../hooks/useStatementsList';
import {
  MonthAndYearPicker,
  MonthAndYearRange
} from '../MonthAndYearPicker/MonthAndYearPicker';
import { StatementRow } from '../StatementRow/StatementRow';

import s from './StatementsList.module.scss';

export const StatementsList = () => {
  const [monthYearRange, setMonthYearRange] = useState<MonthAndYearRange>(
    () => {
      const date = new Date();

      return {
        start: {
          year: date.getFullYear(),
          month: date.getMonth()
        }
      };
    }
  );

  const { data: statements } = useStatementsList(monthYearRange);

  const sortedStatements = statements
    ?.concat()
    .sort((first, second) => first.time - second.time);

  const [selectedStatements, updateStatements] = useState(
    () => new Set<string>()
  );

  return (
    <div>
      <MonthAndYearPicker
        value={monthYearRange}
        onChange={useCallback((nextVal) => setMonthYearRange(nextVal), [])}
      />

      {!!sortedStatements?.length && (
        <div className={s.list}>
          {sortedStatements.map((statement) => (
            <StatementRow
              key={statement.id}
              statement={statement}
              isSelected={!selectedStatements.has(statement.id)}
              onSelection={(isSelected) => {
                if (!isSelected) {
                  selectedStatements.add(statement.id);
                } else {
                  selectedStatements.delete(statement.id);
                }

                updateStatements(new Set(selectedStatements));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
