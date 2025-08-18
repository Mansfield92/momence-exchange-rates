import {useMemo} from "react";
import {useYearlyRates} from "../../hooks/useRates.ts";
import {YearlyPoint} from "../../types/exchange.ts";

export const useRateChart = (code: string) => {
    const {data} = useYearlyRates();

    const chartData = useMemo(() => {
        const list: YearlyPoint[] = data?.[code] ?? [];
        return list.map(point => ({...point, label: point.date}));
    }, [data, code]);

    return {chartData};
};
