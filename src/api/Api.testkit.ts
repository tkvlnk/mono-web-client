import fetchMock from 'fetch-mock';
import { Awaited } from 'ts-essentials';

import { Api } from './Api';
import { MccInfo, StatementItem, UserInfo } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...params: any[]) => any;

export interface TestKitMethod<M extends AnyFunction> {
  when(...params: Parameters<M>): {
    reply(result: Awaited<ReturnType<M>>): void;
  };
}

export interface TestKit<Service, OmittedKeys extends keyof Service = never> {
  methods: {
    [K in keyof Omit<Service, OmittedKeys>]: Service[K] extends AnyFunction
      ? TestKitMethod<Service[K]>
      : never;
  };
}

export class ApiTestkit implements TestKit<Api, 'updateAuthToken'> {
  methods = {
    fetchUser: {
      when: () => ({
        reply: (userInfo: UserInfo) => {
          fetchMock.get(`/api/personal/client-info`, {
            body: userInfo
          });
        }
      })
    },

    fetchMccInfo: {
      when: () => ({
        reply: (mccList: MccInfo[]) => {
          fetchMock.get(`/api/mcc-list`, {
            body: mccList
          });
        }
      })
    },

    fetchStatements: {
      when: ({
        accountId,
        fromDate,
        toDate
      }: {
        accountId: string;
        fromDate: Date;
        toDate: Date;
      }) => ({
        reply: (statements: StatementItem[]) => {
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
    }
  };
}
