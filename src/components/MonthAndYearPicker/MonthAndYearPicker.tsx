import React, { useEffect, useState } from 'react';

import { MonthAndYear } from '../../services/StatementsDataLayer';

import { Card } from '../Card/Card';

import s from './MonthAndYearPicker.module.scss';
import { MonthAndYearRangePicker } from './MonthAndYearRangePicker';
import { OneMonthAndYearPicker } from './OneMonthAndYearPicker';

export interface MonthAndYearRange {
  start: MonthAndYear;
  end?: MonthAndYear;
}

export interface MonthAndYearPickerProps {
  value: MonthAndYearRange;
  onChange: (value: MonthAndYearRange) => void;
}

export const MonthAndYearPicker: React.FC<MonthAndYearPickerProps> = ({
  value,
  onChange
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const isOneMonth = !isChecked;

  useEffect(() => {
    if (isOneMonth) {
      onChange({
        start: value.end ?? value.start
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOneMonth, onChange]);

  return (
    <Card className={s.root}>
      <h3>Период</h3>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(event) => {
              setIsChecked(event.target.checked);
            }}
          />{' '}
          Несколько месяцев
        </label>
      </div>

      {isOneMonth ? (
        <OneMonthAndYearPicker
          value={value.start}
          onChange={(start) => onChange({ start })}
        />
      ) : (
        <MonthAndYearRangePicker value={value} onChange={onChange} />
      )}
    </Card>
  );
};
