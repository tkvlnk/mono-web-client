import React, { useMemo } from 'react';

import { Pie, PieChart } from 'recharts';

import { StatementItem } from '../../api/types';
import { useStatementsList } from '../../hooks/useStatementsList';
import { useStore } from '../../hooks/useStore/useStore';
import { MccVisuals } from '../../mccData/findVisualsByMcc';
import { findVisualsByMccV2 } from '../../mccData/findVisualsByMccV2';
import { IgnoreCurrencyOperationsToggle } from '../IgnoreCurrencyOperationsToggle/IgnoreCurrencyOperationsToggle';

export const SpendsChart = () => {
  const {
    dateRange,
    isStatementBlacklisted,
    blackListedStatementsCount,
    ignoreCurrencyOperations
  } = useStore();

  const { data: statements } = useStatementsList(dateRange);

  const data: {
    distribution: { name: string; value: number }[];
    totalSpent: number;
  } = useMemo(() => {
    if (!statements?.length) {
      return {
        distribution: [],
        totalSpent: 0
      };
    }

    const statementsByCategories = statements?.reduce((result, statement) => {
      if (isStatementBlacklisted(statement)) {
        return result;
      }

      const categoryData = findVisualsByMccV2(statement.mcc);

      if (!result[categoryData.label]) {
        result[categoryData.label] = {
          statements: [],
          category: categoryData
        };
      }

      result[categoryData.label].statements.push(statement);

      return result;
    }, {} as Record<string, { statements: StatementItem[]; category: MccVisuals }>);

    const distribution = Object.values(statementsByCategories).map(
      ({ category, statements: statementsInCategory }) => {
        const amountsSum = statementsInCategory.reduce((sum, statement) => {
          if (statement.amount > 0) {
            return sum;
          }

          return sum + statement.amount * -1;
        }, 0);

        return {
          name: category.emoji,
          value: amountsSum / 100
        };
      }
    );

    return {
      distribution,
      totalSpent: distribution.reduce((result, { value }) => result + value, 0)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statements, blackListedStatementsCount, ignoreCurrencyOperations]);

  return (
    <div>
      <div>?????????? ??????????: {data.totalSpent.toFixed(2)}</div>

      <IgnoreCurrencyOperationsToggle />

      <PieChart width={400} height={400}>
        <Pie
          data={data.distribution}
          dataKey="value"
          label={({ index }) => data.distribution[index].name}
        />
      </PieChart>
    </div>
  );
};
