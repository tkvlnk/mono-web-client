import React from 'react';

export interface MonthPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onChange
}) => (
  <select
    value={value.toString()}
    onChange={(event) => onChange(Number(event.target.value))}
  >
    {[
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ].map((monthName, index) => (
      <option key={monthName} value={index.toString()}>
        {monthName}
      </option>
    ))}
  </select>
);
