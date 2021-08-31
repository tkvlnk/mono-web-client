import React from 'react';

import { useStore } from '../../hooks/useStore/useStore';

export function IgnoreCurrencyOperationsToggle() {
  const { ignoreCurrencyOperations, setIgnoreCurrencyOperations } = useStore();

  return (
    <label>
      <input
        type="checkbox"
        checked={ignoreCurrencyOperations}
        onChange={({ target: { checked } }) =>
          setIgnoreCurrencyOperations(checked)
        }
      />

      <span> Игнорировать ФОП операции с валютой</span>
    </label>
  );
}
