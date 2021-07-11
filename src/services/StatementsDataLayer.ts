import { AxiosInstance } from 'axios';

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

export interface StatementsDataLayerDeps {
  axios: AxiosInstance;
  storeNamespace?: string;
  accountId: string;
  apiToken: string;
  maxFetchRetries: number;
}

export class StatementsDataLayer {
  constructor(private readonly deps: StatementsDataLayerDeps) {}

  private getCacheKey(monthAndYear: MonthAndYear): string {
    return `statements-${this.deps.storeNamespace}-${monthAndYear.year}-${monthAndYear.month}`;
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
      this.deps.maxFetchRetries
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
        1.4 ** (this.deps.maxFetchRetries - retries) * 1000 - 1000;

      await new Promise((resolve) => setTimeout(resolve, retryDelay));

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

    const getSeconds = (date: Date) => Math.trunc(date.getTime() / 1000);

    return this.deps.axios
      .get<StatementItem[]>(
        `/personal/statement/${this.deps.accountId}/${getSeconds(
          fromDate
        )}/${getSeconds(toDate)}`,
        {
          headers: {
            'X-Token': this.deps.apiToken
          }
        }
      )
      .then((res) => res.data);
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
