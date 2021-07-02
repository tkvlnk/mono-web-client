import React from 'react';

export interface MonthPickerProps {
  value: number;
  onChange: (value: number) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ value, onChange }) => {
  return (
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
};

export default MonthPicker;
