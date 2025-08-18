import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useDailyRates} from "../../hooks/useRates.ts";
import {debounce} from "../../utils/debounce.ts";
import {ConversionUtil} from "../../utils/ConversionUtil.ts";
import {ExchangeRate} from "../../types/exchange.ts";
import {ConversionDirection} from "../../types/CoversionDirection.ts";

export const useConverter = () => {
    const {data, isLoading, error} = useDailyRates();

    const [direction, setDirection] = useState<ConversionDirection>(ConversionDirection.CZK_TO_FOREIGN);
    const [rawAmount, setRawAmount] = useState<string>("0");
    const [amount, setAmount] = useState<number>(0);
    const [code, setCode] = useState<string>("EUR");

    const debouncedSetAmount = useMemo(() => debounce((n: number) => setAmount(n), 120), []);

    const allCodes = useMemo(() => (data?.rates.map(r => r.code) ?? []), [data]);
    const sortedCodes = useMemo(() => ConversionUtil.byPinnedOrder([...new Set(allCodes)]), [allCodes]);

    const selectedRate: ExchangeRate | undefined = useMemo(() => data?.rates.find(r => r.code === code), [data, code]);

    const result = useMemo(() => ConversionUtil.computeConversion(
        amount,
        direction === ConversionDirection.CZK_TO_FOREIGN,
        selectedRate
    ), [amount, direction, selectedRate]);

    const onAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        
        if (/^(?:0\.|[1-9]\d{0,9})(?:\.\d{0,2})?$|^$/.test(v)) {
            setRawAmount(v);
            const n = v === "" ? 0 : Number(v);
            debouncedSetAmount(n);
        }
    }, [debouncedSetAmount]);

    const onCodeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setCode(e.target.value);
    }, []);

    const toggleDirection = useCallback(() => {
        setDirection((d) => d === ConversionDirection.CZK_TO_FOREIGN ? ConversionDirection.FOREIGN_TO_CZK : ConversionDirection.CZK_TO_FOREIGN);
    }, []);

    const unitInfo = useMemo(() => selectedRate ? `${selectedRate.amount} ${selectedRate.code} = ${ConversionUtil.formatNumber(selectedRate.rate)} CZK` : "", [selectedRate]);

    return {
        isLoading,
        error,

        direction,
        rawAmount,
        amount,
        code,

        sortedCodes,
        result,
        unitInfo,

        onAmountChange,
        onCodeChange,
        toggleDirection,
    } as const;
};
