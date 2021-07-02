import React, { useState } from 'react';

export interface YearPickerProps {
  value?: number;
  onChange: (value: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ value, onChange }) => {
  const [years] = useState(() => {
    const result: number[] = [];

    for (let year = new Date().getFullYear(); year >= 2017; year -= 1) {
      result.push(year);
    }

    return result;
  });

  return (
    <select
      value={value?.toString()}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearPicker;
