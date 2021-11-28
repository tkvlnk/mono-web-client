import { MccInfo, StatementItem, UserInfo } from './types';

export class Api {
  constructor(private authToken: string) {}

  updateAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  private get requestInit(): RequestInit {
    return {
      headers: {
        'Content-Types': 'application/json',
        'X-Token': this.authToken
      }
    };
  }

  fetchStatements({
    accountId,
    fromDate,
    toDate
  }: {
    accountId: string;
    fromDate: Date;
    toDate: Date;
  }): Promise<StatementItem[]> {
    const getSeconds = (date: Date) => Math.trunc(date.getTime() / 1000);

    return fetch(
      `/api/personal/statement/${accountId}/${getSeconds(
        fromDate
      )}/${getSeconds(toDate)}`,
      this.requestInit
    ).then((res) => res.json()) as Promise<StatementItem[]>;
  }

  fetchUser(): Promise<UserInfo> {
    return fetch('/api/personal/client-info', this.requestInit).then((res) =>
      res.json()
    ) as Promise<UserInfo>;
  }

  fetchMccInfo(): Promise<MccInfo[]> {
    return fetch('/api/mcc-list', this.requestInit).then((res) =>
      res.json()
    ) as Promise<MccInfo[]>;
  }
}
