import {useQuery} from "@tanstack/react-query";
import {Api} from "../api/client";
import {DailyResponse, YearlyResponse} from "../types/exchange";

export const useDailyRates = () => useQuery<DailyResponse>({
    queryKey: ["daily"],
    queryFn: Api.getDaily,
    staleTime: 30 * 60 * 1000,
});

export const useYearlyRates = (year?: number) => useQuery<YearlyResponse>({
    queryKey: ["yearly", year ?? new Date().getFullYear()],
    queryFn: () => Api.getYearly(year),
    staleTime: 30 * 60 * 1000,
});
