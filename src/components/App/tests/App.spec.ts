import {
  StatementItemBuilder,
  UserAccountBuilder,
  UserBuilder
} from '../../../api/builders';
import { AccountType, CashbackType, CurrencyCode } from '../../../api/enums';
import { UserInfo } from '../../../api/types';
import { AppDriver } from '../App.driver';

let driver: AppDriver;
let userInfo: UserInfo;
let blackCardAccount: UserInfo['accounts'][number];

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(1623718999210);

  driver = new AppDriver();
});

it('should render app', () => {
  driver.when.created();

  expect(driver.get.textContent()).toContain('API токен:');
});

describe('when auth token entered', () => {
  beforeEach(() => {
    blackCardAccount = new UserAccountBuilder()
      .type(AccountType.Black)
      .cashbackType(CashbackType.UAH)
      .currencyCode(CurrencyCode.UAH)
      .build();
    userInfo = new UserBuilder().accounts([blackCardAccount]).build();
    driver.given.userInfo(userInfo);
    driver.given.mccInfo();
    driver.given.statementsList({
      accountId: blackCardAccount.id,
      statements: [new StatementItemBuilder().build()],
      fromDate: new Date(1622494800000),
      toDate: new Date(1625086799999)
    });
    driver.when.created();
    driver.get.apiTokenPanelDriver().when.inputApiToken('some-token');
  });

  it('should render user name', () => {
    expect(driver.get.userAccountsDriver().get.nameText()).toEqual(
      userInfo.name
    );
  });

  it.todo('should render one statement item');
});
