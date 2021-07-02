import dayjs from 'dayjs';
import React, { useState } from 'react';

import useStatementsList from '../../hooks/useStatementsList';
import findVisualsByMcc from '../../mccData/findVisualsByMcc';
import MonthAndYearPicker, {
  MonthAndYearRange
} from '../MonthAndYearPicker/MonthAndYearPicker';

const StatementsList = () => {
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

  return (
    <div>
      <div>
        <MonthAndYearPicker
          value={monthYearRange}
          onChange={(nextVal) => {
            console.log('>__n:::', nextVal);
            setMonthYearRange(nextVal);
          }}
        />
      </div>

      {!!statements?.length &&
        statements.map((statement) => (
          <div key={statement.id}>
            <span>
              {dayjs(statement.time * 1000).format('HH:mm, D MMM YYYY')}
            </span>
            <span>{statement.mcc}</span>
            <span>{findVisualsByMcc(statement.mcc).emoji}</span>
            <span>{(statement.amount / 100).toFixed(2)}</span>
            <div>{statement.description}</div>
          </div>
        ))}
    </div>
  );
};

export default StatementsList;
