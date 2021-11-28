import fetchMock from 'fetch-mock';
import { Awaited } from 'ts-essentials';

import { Api } from './Api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...params: any[]) => any;

export interface TestKitMethod<M extends AnyFunction> {
  when(...params: Parameters<M>): {
    reply(result: Awaited<ReturnType<M>>): void;
  };
}

export type TestKit<A> = {
  [K in keyof A]: A[K] extends AnyFunction ? TestKitMethod<A[K]> : never;
};

export class ApiTestkit implements TestKit<Api> {
  constructor(private baseUrl: string) {}

  fetchUser: TestKitMethod<Api['fetchUser']> = {
    when: () => ({
      reply: (userInfo) => {
        fetchMock.get(`${this.baseUrl}/api/personal/client-info`, {
          body: userInfo
        });
      }
    })
  };

  fetchMccInfo: TestKitMethod<Api['fetchMccInfo']> = {
    when: () => ({
      reply: (mccList) => {
        fetchMock.get(`${this.baseUrl}/api/mcc-list`, {
          body: mccList
        });
      }
    })
  };

  fetchStatements: TestKitMethod<Api['fetchStatements']> = {
    when: ({ accountId, fromDate, toDate }) => ({
      reply: (statements) => {
        const getSeconds = (date: Date) => Math.trunc(date.getTime() / 1000);

        fetchMock.get(
          `${this.baseUrl}/api/personal/statement/${accountId}/${getSeconds(
            fromDate
          )}/${getSeconds(toDate)}`,
          {
            body: statements
          }
        );
      }
    })
  };
}
