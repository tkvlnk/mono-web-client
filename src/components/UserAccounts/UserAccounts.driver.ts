import { BaseDriver } from '../../test/BaseDriver';

import { TestId } from './UserAccounts';

export class UserAccountsDriver extends BaseDriver {
  get = {
    nameText: () => this.queries.getByTestId(TestId.Name()).textContent
  };
}
