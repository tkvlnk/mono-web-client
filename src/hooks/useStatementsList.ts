import { UseQueryResult, useQuery } from 'react-query';

import { Api } from '../api/Api';
import { StatementItem } from '../api/types';

import { MonthAndYearRange } from '../components/MonthAndYearPicker/MonthAndYearPicker';

import { StatementsService } from '../services/StatementsService';

import { useBackCardInfo } from './useBackCardInfo';
import { useHttp } from './useHttp';

export function useStatementsList(
  monthYear: MonthAndYearRange
): UseQueryResult<StatementItem[]> {
  const http = useHttp();

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
        api: new Api(http)
      }).getStatements(monthYear.start, monthYear.end),
    {
      retry: false,
      enabled: !!account?.id
    }
  );
}
