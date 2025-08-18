export type YearlyResponse = {
    // Key is a country code
    [key: string]: Array<{
        date: string;
        rate: number
    }>
}
