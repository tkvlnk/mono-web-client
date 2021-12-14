import { Api } from './Api';
import { ApiTestkit } from './Api.testkit';
import { UserBuilder } from './builders';

const apiTestkit = new ApiTestkit();
const api = new Api('aaa');

describe('Api.fetchUser', () => {
  it('fetches user info', async () => {
    const givenUser = new UserBuilder().build();
    apiTestkit.methods.fetchUser.when().reply(givenUser);

    const fetchedUser = await api.fetchUser();

    expect(fetchedUser).toEqual(givenUser);
  });
});
