import React, { useEffect } from 'react';

import { Month } from '../../services/StatementsDataLayer';

import type { MonthAndYearRange } from './MonthAndYearPicker';
import OneMonthAndYearPicker from './OneMonthAndYearPicker';

export interface MonthRangePickerProps {
  value: MonthAndYearRange;
  onChange: (value: Required<MonthAndYearRange>) => void;
}

const MonthAndYearRangePicker: React.FC<MonthRangePickerProps> = ({
  value,
  onChange
}) => {
  const valueEnd = value.end ?? {
    month:
      value.start.month === Month.December
        ? Month.January
        : value.start.month + 1,
    year:
      value.start.month === Month.December
        ? value.start.year + 1
        : value.start.year
  };

  useEffect(() => {
    onChange({
      ...value,
      end: valueEnd
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        От
        <OneMonthAndYearPicker
          value={value.start}
          onChange={(start) =>
            onChange({
              end: valueEnd,
              start
            })
          }
        />
      </div>
      <div>
        До
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

export default MonthAndYearRangePicker;
