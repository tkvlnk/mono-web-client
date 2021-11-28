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

export type TestKit<Service, OmittedKeys extends keyof Service = never> = {
  [K in keyof Omit<Service, OmittedKeys>]: Service[K] extends AnyFunction ? TestKitMethod<Service[K]> : never;
};

export class ApiTestkit implements TestKit<Api, 'updateAuthToken'> {
  fetchUser: TestKitMethod<Api['fetchUser']> = {
    when: () => ({
      reply: (userInfo) => {
        fetchMock.get(`/api/personal/client-info`, {
          body: userInfo
        });
      }
    })
  };

  fetchMccInfo: TestKitMethod<Api['fetchMccInfo']> = {
    when: () => ({
      reply: (mccList) => {
        fetchMock.get(`/api/mcc-list`, {
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
          `/api/personal/statement/${accountId}/${getSeconds(
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
