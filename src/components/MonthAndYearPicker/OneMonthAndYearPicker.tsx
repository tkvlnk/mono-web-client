import React, { useEffect } from 'react';

import { MonthAndYear } from '../../services/StatementsDataLayer';

import { MonthPicker } from './MonthPicker';

import s from './OneMonthAndYearPicker.module.scss';
import { YearPicker } from './YearPicker';

export interface OneMonthPickerProps {
  value: MonthAndYear;
  onChange: (value: MonthAndYear) => void;
}

export const OneMonthAndYearPicker: React.FC<OneMonthPickerProps> = ({
  value,
  onChange
}) => {
  useEffect(() => {
    onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.root}>
      <YearPicker
        value={value.year}
        onChange={(year) =>
          onChange({
            ...value,
            year
          })
        }
      />

      <MonthPicker
        value={value.month}
        onChange={(month) =>
          onChange({
            ...value,
            month
          })
        }
      />
    </div>
  );
};
