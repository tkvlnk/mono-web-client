import React, { useEffect, useState } from 'react';

import { MonthAndYear } from '../../services/StatementsDataLayer';

import MonthAndYearRangePicker from './MonthAndYearRangePicker';
import OneMonthAndYearPicker from './OneMonthAndYearPicker';

export interface MonthAndYearRange {
  start: MonthAndYear;
  end?: MonthAndYear;
}

export interface MonthAndYearPickerProps {
  value: MonthAndYearRange;
  onChange: (value: MonthAndYearRange) => void;
}

const MonthAndYearPicker: React.FC<MonthAndYearPickerProps> = ({
  value,
  onChange
}) => {
  const [isRange, setIsRange] = useState(true);

  useEffect(() => {
    if (!isRange) {
      onChange({
        ...value,
        end: undefined
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRange]);

  return (
    <div>
      <label>
        Один месяц
        <input
          type="checkbox"
          checked={isRange}
          onChange={(event) => {
            setIsRange(event.target.checked);
          }}
        />
      </label>

      {isRange ? (
        <OneMonthAndYearPicker
          value={value.start}
          onChange={(start) => onChange({ ...value, start })}
        />
      ) : (
        <MonthAndYearRangePicker value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default MonthAndYearPicker;
