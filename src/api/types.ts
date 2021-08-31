import { AccountType, CashbackType, CurrencyCode } from './enums';

export interface UserInfo {
  id: string;
  name: string;
  webHookUrl: string;
  accounts: {
    id: string;
    balance: number;
    creditLimit: number;
    type: AccountType;
    currencyCode: CurrencyCode;
    cashbackType: CashbackType;
    maskedPan: string[];
    iban: string;
  }[];
}

export interface StatementItem {
  id: string;
  time: number;
  description: string;
  mcc: number;
  hold: boolean;
  amount: number;
  operationalAmount: number;
  currencyCode: CurrencyCode;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  comment: string;
  receiptId: number;
  counterEdrpou: string;
  counterIban: string;
}

export interface MccInfo {
  mcc: string;
  group: {
    type: 'AS';
    description: {
      uk: string;
      en: string;
      ru: string;
    };
  };
  fullDescription: {
    uk: string;
    en: string;
    ru: string;
  };
  shortDescription: {
    uk: string;
    en: string;
    ru: string;
  };
}
