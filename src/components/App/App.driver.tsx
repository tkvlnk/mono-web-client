import { RenderResult, render } from '@testing-library/react';

import React from 'react';

import { ApiTestkit } from '../../api/Api.testkit';
import { MccInfo, StatementItem, UserInfo } from '../../api/types';
import { ApiTokenDriver } from '../ApiToken/ApiToken.driver';
import { MainView } from '../MainView/MainView';
import { Providers } from '../Providers/Providers';
import { UserAccountsDriver } from '../UserAccounts/UserAccounts.driver';

export class AppDriver {
  private renderResult!: RenderResult;

  private readonly apiTestkit = new ApiTestkit();

  given = {
    userInfo: (userInfo: UserInfo) => {
      this.apiTestkit.methods.fetchUser.when().reply(userInfo);
    },
    mccInfo: (mccList = [] as MccInfo[]) => {
      this.apiTestkit.methods.fetchMccInfo.when().reply(mccList);
    },
    statementsList: ({
      accountId,
      fromDate,
      toDate,
      statements
    }: {
      accountId: string;
      fromDate: Date;
      toDate: Date;
      statements: StatementItem[];
    }) => {
      this.apiTestkit.methods.fetchStatements
        .when({
          accountId,
          fromDate,
          toDate
        })
        .reply(statements);
    }
  };

  when = {
    created: () => {
      this.renderResult = render(
        <Providers>
          <MainView />
        </Providers>
      );
    },
    loadingFinished: () => {}
  };

  get = {
    textContent: (): string => this.renderResult.baseElement.textContent ?? '',
    apiTokenPanelDriver: () => new ApiTokenDriver(this.renderResult.container),
    userAccountsDriver: () =>
      new UserAccountsDriver(this.renderResult.container)
  };
}
