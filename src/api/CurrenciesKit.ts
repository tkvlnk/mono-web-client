import { CurrencyCode } from './enums';

export const CurrenciesKit: Record<
  CurrencyCode,
  { symbol: string; bankCode: string; isoCode: CurrencyCode }
> = {
  [CurrencyCode.UAH]: {
    symbol: '₴',
    bankCode: 'UAH',
    isoCode: CurrencyCode.EUR
  },
  [CurrencyCode.USD]: {
    symbol: '$',
    bankCode: 'USD',
    isoCode: CurrencyCode.USD
  },
  [CurrencyCode.EUR]: {
    symbol: '€',
    bankCode: 'EUR',
    isoCode: CurrencyCode.EUR
  }
};
