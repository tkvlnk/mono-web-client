import { fireEvent } from '@testing-library/react';

import { BaseDriver } from '../../test/BaseDriver';

import { TestId } from './ApiToken';

export class ApiTokenDriver extends BaseDriver {
  private get input() {
    return this.queries.getByTestId(TestId.Input());
  }

  when = {
    inputApiToken: (token: string) => {
      fireEvent.change(this.input, {
        target: {
          value: token
        }
      });
    }
  };
}
