import { Api } from '../api/Api';
import { StatementItem } from '../api/types';

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export interface MonthAndYear {
  month: Month;
  year: number;
}

export interface StatementsServiceProps {
  api: Api;
  storeNamespace?: string;
  accountId: string;
  maxFetchRetries: number;
}

export class StatementsService {
  constructor(private readonly props: StatementsServiceProps) {}

  private getCacheKey(monthAndYear: MonthAndYear): string {
    return `statements-${this.props.storeNamespace}-${monthAndYear.year}-${monthAndYear.month}`;
  }

  private setToCache(monthAndYear: MonthAndYear, data: StatementItem[]): void {
    window.localStorage.setItem(
      this.getCacheKey(monthAndYear),
      JSON.stringify(data)
    );
  }

  private getFromCache(monthAndYear: MonthAndYear): StatementItem[] | null {
    try {
      return JSON.parse(
        localStorage.getItem(this.getCacheKey(monthAndYear)) as string
      ) as StatementItem[];
    } catch (e) {
      return null;
    }
  }

  private async getStatementsByOneMonth(
    monthAndYear: MonthAndYear
  ): Promise<StatementItem[]> {
    const cachedData = this.getFromCache(monthAndYear);

    if (cachedData?.length) {
      return cachedData;
    }

    const fetchedData = await this.fetchStatementsWithRetries(
      monthAndYear,
      this.props.maxFetchRetries
    );

    this.setToCache(monthAndYear, fetchedData);

    return fetchedData;
  }

  private async fetchStatementsWithRetries(
    monthAndYear: MonthAndYear,
    retries: number
  ): Promise<StatementItem[]> {
    const promise = this.fetchStatements(monthAndYear);

    if (retries <= 0) {
      return promise;
    }

    try {
      return await promise;
    } catch {
      const retryDelay =
        1.4 ** (this.props.maxFetchRetries - retries) * 1000 - 1000;

      await new Promise((resolve) => {
        setTimeout(resolve, retryDelay);
      });

      return this.fetchStatementsWithRetries(monthAndYear, retries - 1);
    }
  }

  private fetchStatements(
    monthAndYear: MonthAndYear
  ): Promise<StatementItem[]> {
    const fromDate = new Date(monthAndYear.year, monthAndYear.month, 1);
    const toDate = new Date(
      monthAndYear.year,
      monthAndYear.month + 1,
      0,
      23,
      59,
      59
    );

    return this.props.api.fetchStatements({
      fromDate,
      toDate,
      accountId: this.props.accountId
    });
  }

  async getStatements(
    start: MonthAndYear,
    end?: MonthAndYear
  ): Promise<StatementItem[]> {
    if (!end) {
      return this.getStatementsByOneMonth(start);
    }

    const statementsInRange: StatementItem[] = [];

    const curr = { ...start };

    const getAndAddStatements = () =>
      this.getStatementsByOneMonth(curr).then((statements) => {
        statementsInRange.push(...statements);
      });

    const promises = [getAndAddStatements()];

    do {
      if (curr.month !== Month.December) {
        curr.month += 1;
      } else {
        curr.month = Month.January;
        curr.year += 1;
      }

      promises.push(getAndAddStatements());
    } while (!(curr.year === end.year && curr.month === end.month));

    await Promise.all(promises);

    return statementsInRange;
  }
}
