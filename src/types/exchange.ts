// Types mirrored from proxy service responses
export type ExchangeRate = {
  country: string;
  currency: string;
  amount: number; // how many units the rate applies to (e.g., 1, 100)
  code: string; // currency code (e.g., EUR)
  rate: number; // price in CZK for `amount` units
};

export type DailyResponse = {
  date: string;
  rates: ExchangeRate[];
};

export type YearlyPoint = { date: string; rate: number };
export type YearlyResponse = {
  // key is currency code (e.g., EUR)
  [code: string]: YearlyPoint[];
};
