import { UseQueryResult, useQuery } from 'react-query';

import { StatementItem } from '../api/types';

import { MonthAndYearRange } from '../components/MonthAndYearPicker/MonthAndYearPicker';

import { StatementsService } from '../services/StatementsService';

import { useApi } from './useApi';
import { useBackCardInfo } from './useBackCardInfo';

export function useStatementsList(
  monthYear: MonthAndYearRange
): UseQueryResult<StatementItem[]> {
  const api = useApi();

  const account = useBackCardInfo();

  return useQuery<StatementItem[]>(
    [
      'statements',
      monthYear.start.year,
      monthYear.start.month,
      monthYear.end?.year,
      monthYear.end?.month,
      account?.id
    ],
    () =>
      new StatementsService({
        accountId: account!.id, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        maxFetchRetries: 3,
        api
      }).getStatements(monthYear.start, monthYear.end),
    {
      retry: false,
      enabled: !!account?.id
    }
  );
}
