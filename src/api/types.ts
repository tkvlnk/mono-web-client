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

export interface MccInfoDescription {
  uk: string;
  en: string;
  ru: string;
}

export interface MccInfo {
  mcc: string;
  group: {
    type: string;
    description: MccInfoDescription;
  };
  fullDescription: MccInfoDescription;
  shortDescription: MccInfoDescription;
}
