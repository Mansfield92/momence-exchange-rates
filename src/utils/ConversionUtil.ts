import {ExchangeRate} from "../types/exchange.ts";

export class ConversionUtil {
    // EUR and USD are pinned to the top of the list
    private static PINNED_CURRENCIES = new Map([["EUR", -2], ["USD", -1]])

    public static byPinnedOrder = (codes: string[]) => {
        return codes.sort((a, b) => (this.PINNED_CURRENCIES.get(a) ?? 0) - (this.PINNED_CURRENCIES.get(b) ?? 0) || a.localeCompare(b));
    }

    public static formatNumber = (value: number) => {
        return new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value);
    }

    public static computeConversion = (
        amount: number,
        fromCZK: boolean,
        rate?: ExchangeRate
    ) => {
        if (!rate) return 0;

        const pricePerUnitCZK = rate.rate / rate.amount;

        return fromCZK ? amount / pricePerUnitCZK : amount * pricePerUnitCZK;
    }
}
