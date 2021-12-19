import { Chance } from 'chance';
import { createBuilderClass } from 'nested-builder';

import { AccountType, CashbackType, CurrencyCode } from './enums';
import { MccInfo, StatementItem, UserInfo } from './types';

const chance = new Chance();

export const UserAccountBuilder = createBuilderClass<
  UserInfo['accounts'][number]
>()({
  id: {
    generator: () => chance.guid()
  },
  iban: {
    generator: () => chance.state()
  },
  balance: {
    generator: () =>
      chance.integer({
        min: 0
      })
  },
  type: {
    generator: () => chance.pickone(Object.values(AccountType))
  },
  creditLimit: {
    generator: () =>
      chance.integer({
        min: 0
      })
  },
  currencyCode: {
    generator: () => chance.pickone(Object.values(CurrencyCode)) as CurrencyCode
  },
  cashbackType: {
    generator: () => chance.pickone(Object.values(CashbackType))
  },
  maskedPan: {
    generator: () => chance.pickone([[chance.string()], []])
  }
});

export const UserBuilder = createBuilderClass<UserInfo>()({
  id: {
    generator: () => chance.guid()
  },
  name: {
    generator: () => chance.name()
  },
  webHookUrl: {
    generator: () => chance.url()
  },
  accounts: {
    plural: true,
    nested: UserAccountBuilder
  }
});

export const StatementItemBuilder = createBuilderClass<StatementItem>()({
  id: {
    generator: () => chance.guid()
  },
  time: {
    generator: () => chance.timestamp()
  },
  description: {
    generator: () => chance.sentence()
  },
  mcc: {
    generator: () =>
      chance.integer({
        min: 1,
        max: 9999
      })
  },
  hold: {
    generator: () => chance.bool()
  },
  amount: {
    generator: () => chance.integer({ min: 0 })
  },
  operationalAmount: {
    generator: () => chance.integer({ min: 0 })
  },
  currencyCode: {
    generator: () => chance.pickone(Object.values(CurrencyCode)) as CurrencyCode
  },
  commissionRate: {
    generator: () => chance.floating({ min: 0, max: 1 })
  },
  cashbackAmount: {
    generator: () => chance.integer({ min: 0 })
  },
  balance: {
    generator: () => chance.integer({ min: 0 })
  },
  comment: {
    generator: () => chance.sentence()
  },
  receiptId: {
    generator: () => chance.integer()
  },
  counterEdrpou: {
    generator: () => chance.string()
  },
  counterIban: {
    generator: () => chance.string()
  }
});

export const MccInfoDescriptionBuilder = createBuilderClass<
  MccInfo['fullDescription']
>()({
  en: {
    generator: () => chance.sentence()
  },
  uk: {
    generator: () => chance.sentence()
  },
  ru: {
    generator: () => chance.sentence()
  }
});

export const MccInfoGroupBuilder = createBuilderClass<MccInfo['group']>()({
  type: {
    generator: () => chance.word()
  },
  description: {
    nested: MccInfoDescriptionBuilder
  }
});

export const MccInfoBuilder = createBuilderClass<MccInfo>()({
  mcc: {
    generator: () =>
      chance
        .integer({
          min: 1,
          max: 9999
        })
        .toString()
  },
  group: {
    nested: MccInfoGroupBuilder
  },
  shortDescription: {
    nested: MccInfoDescriptionBuilder
  },
  fullDescription: {
    nested: MccInfoDescriptionBuilder
  }
});
