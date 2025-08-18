import {ExchangeRate} from "./ExchangeRate";

export type DailyResponse = {
    date: string,
    rates: ExchangeRate[]
}
