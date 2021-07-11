import { UseQueryResult, useQuery } from 'react-query';

import { StatementItem } from '../api/types';

import { MonthAndYearRange } from '../components/MonthAndYearPicker/MonthAndYearPicker';

import { useStatementsDataLayer } from './useStatementsDataLayer';

export function useStatementsList(
  monthYear: MonthAndYearRange
): UseQueryResult<StatementItem[]> {
  const statementsDataLayer = useStatementsDataLayer();

  return useQuery<StatementItem[]>(
    [
      'statements',
      monthYear.start.year,
      monthYear.start.month,
      monthYear.end?.year,
      monthYear.end?.month
    ],
    () => {
      return statementsDataLayer.getStatements(monthYear.start, monthYear.end);
    },
    {
      retry: false
    }
  );
}
