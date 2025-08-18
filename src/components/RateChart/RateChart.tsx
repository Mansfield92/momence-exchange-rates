import {memo, useMemo} from "react";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ConversionUtil} from "../../utils/ConversionUtil.ts";
import {useRateChart} from "./useRateChart.ts";
import {ChartTitle, RateChartWrapper} from "./RateChart.styled.ts";
import {Card} from "../ConverterCard/ConverterCard.styled.ts";

type Props = { code: string };

const RateChart = memo(({code}: Props) => {
    const {chartData} = useRateChart(code);
    const tooltipValueFormatter = useMemo(() => (v: unknown) => ConversionUtil.formatNumber(Number(v)), []);

    if (!chartData.length) return null;

    return (
        <Card>
            <ChartTitle>Exchange Rate History ({code})</ChartTitle>
            <RateChartWrapper>
                <ResponsiveContainer width="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="date"
                        />
                        <YAxis/>
                        <Tooltip formatter={tooltipValueFormatter}/>
                        <Line type="monotone" dataKey="rate" stroke="#8884d8" dot={false} strokeWidth={2}/>
                    </LineChart>
                </ResponsiveContainer>
            </RateChartWrapper>
        </Card>
    );
});

export default RateChart;
