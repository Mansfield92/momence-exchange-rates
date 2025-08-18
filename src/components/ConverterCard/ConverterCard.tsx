import {memo, useMemo} from "react";
import {
    Card,
    CurrentRate,
    Input,
    InputLabel,
    ResultText,
    RowWithOverlay,
    Select,
    SwapButton
} from "./ConverterCard.styled.ts";
import {ConversionUtil} from "../../utils/ConversionUtil.ts";
import {useConverter} from "./useConverter.ts";
import RateChart from "../RateChart/RateChart.tsx";
import {ConversionDirection} from "../../types/CoversionDirection.ts";

export const ConverterCard = memo(function ConverterCard() {
    const {
        isLoading, error,
        direction, rawAmount, amount, code,
        sortedCodes, result, unitInfo,
        onAmountChange, onCodeChange, toggleDirection
    } = useConverter();

    const isFromCZK = useMemo(() => direction === ConversionDirection.CZK_TO_FOREIGN, [direction])

    return (
        <>
            <Card>
                {isLoading && <div>Loading rates…</div>}
                {error && <div>Failed to load rates.</div>}

                {!isLoading && !error && (
                    <>
                        <RowWithOverlay>
                            <div>
                                <InputLabel htmlFor="amount">Amount</InputLabel>
                                <Input id="amount" inputMode="decimal" value={rawAmount}
                                       onChange={onAmountChange} placeholder="0.00" aria-label="Amount"/>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="currency">{isFromCZK ? "To" : "From"}
                                </InputLabel>
                                <Select id="currency" value={code} onChange={onCodeChange} aria-label="Currency">
                                    {sortedCodes.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </Select>
                            </div>
                            <SwapButton type="button" onClick={toggleDirection} title="Switch direction"
                                        aria-label="Switch direction">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M7 7h11l-3-3 1.4-1.4L22.8 7l-6.4 4.4L15 10l3-3H7V7zm10 10H6l3 3-1.4 1.4L1.2 17l6.4-4.4L9 14l-3 3h11v0z"/>
                                </svg>
                            </SwapButton>
                        </RowWithOverlay>

                        <CurrentRate title="Unit definition">{unitInfo}</CurrentRate>

                        <ResultText aria-live="polite">
                            {isFromCZK
                                ? `${ConversionUtil.formatNumber(amount)} CZK = ${ConversionUtil.formatNumber(result)} ${code}`
                                : `${ConversionUtil.formatNumber(amount)} ${code} = ${ConversionUtil.formatNumber(result)} CZK`}
                        </ResultText>
                    </>
                )}
            </Card>
            <RateChart code={code}/>
        </>
    );
});
