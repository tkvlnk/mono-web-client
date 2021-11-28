import axios from 'axios';
import { Chance } from 'chance';

import { Api } from './Api';
import { ApiTestkit } from './Api.testkit';

const chance = new Chance();

const TEST_BASE_URL = 'http://example.com';

const apiTestkit = new ApiTestkit(TEST_BASE_URL);
const api = new Api(axios.create({ baseURL: TEST_BASE_URL }));

const buildUser = () => ({
  id: chance.guid(),
  name: chance.name(),
  webHookUrl: chance.url(),
  accounts: []
});

describe('Api.fetchUser', () => {
  it('fetches user info', async () => {
    console.log('>__:::', window.fetch);
    

    const givenUser = buildUser();
    apiTestkit.fetchUser.when().reply(givenUser);

    const fetchedUser = await api.fetchUser();

    expect(fetchedUser).toEqual(givenUser);
  });
});
