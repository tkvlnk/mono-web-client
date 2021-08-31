import { AxiosInstance } from 'axios';

import { MccInfo, StatementItem, UserInfo } from './types';

export class Api {
  constructor(private readonly axios: AxiosInstance) {}

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

    return this.axios
      .get<StatementItem[]>(
        `/personal/statement/${accountId}/${getSeconds(fromDate)}/${getSeconds(
          toDate
        )}`
      )
      .then((res) => res.data);
  }

  fetchUser(): Promise<UserInfo> {
    return this.axios
      .get<UserInfo>('/personal/client-info')
      .then((res) => res.data);
  }

  fetchMccInfo(): Promise<MccInfo[]> {
    return this.axios.get<MccInfo[]>('/mcc-list').then((res) => res.data);
  }
}
