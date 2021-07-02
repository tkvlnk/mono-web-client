export enum AccountType {
  Black = 'black',
  White = 'white',
  Platinum = 'platinum',
  Iron = 'iron',
  Fop = 'fop',
  Yellow = 'yellow'
}

export enum CashbackType {
  None = 'None',
  UAH = 'UAH',
  Miles = 'Miles'
}

export enum CurrencyCode {
  UAH = 980
}

export interface UserInfo {
  id: string;
  name: string;
  webHookUrl: string;
  accounts: {
    id: string;
    balance: number;
    creditLimit: number;
    type: AccountType;
    currencyCode: number;
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
