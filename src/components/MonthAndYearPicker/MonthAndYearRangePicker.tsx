import React, { useEffect } from 'react';

import { Month } from '../../services/StatementsService';

import type { MonthAndYearRange } from './MonthAndYearPicker';
import s from './MonthAndYearRangePicker.module.scss';
import { OneMonthAndYearPicker } from './OneMonthAndYearPicker';

export interface MonthRangePickerProps {
  value: MonthAndYearRange;
  onChange: (value: Required<MonthAndYearRange>) => void;
}

export const MonthAndYearRangePicker: React.FC<MonthRangePickerProps> = ({
  value,
  onChange
}) => {
  const valueStart = value.end
    ? value.start
    : {
        month:
          value.start.month === Month.January
            ? Month.January
            : value.start.month - 1,
        year:
          value.start.month === Month.January
            ? value.start.year - 1
            : value.start.year
      };
  const valueEnd = value.end ?? value.start;

  useEffect(() => {
    onChange({
      start: valueStart,
      end: valueEnd
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.root}>
      <div className={s.from}>
        <div>От:</div>
        <OneMonthAndYearPicker
          value={valueStart}
          onChange={(start) =>
            onChange({
              end: valueEnd,
              start
            })
          }
        />
      </div>
      <div className={s.to}>
        <div>До:</div>
        <OneMonthAndYearPicker
          value={valueEnd}
          onChange={(end) =>
            onChange({
              ...value,
              end
            })
          }
        />
      </div>
    </div>
  );
};
