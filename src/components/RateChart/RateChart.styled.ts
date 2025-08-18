import styled from "styled-components";

export const RateChartWrapper = styled.div`
    height: 300px;
    width: 100%;
    overflow: hidden;

    .recharts-legend-wrapper {
        top: -5px !important;
    }

    .recharts-default-tooltip {
        padding: 7px 10px 2px !important;
        background-color: ${({theme}) => theme.colors.bg} !important;
        color: ${({theme}) => theme.colors.text} !important;
    }
`;

export const ChartTitle = styled.h3`
    margin: 0 0 24px 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: ${({theme}) => theme?.colors?.text || '#333'};
`;


