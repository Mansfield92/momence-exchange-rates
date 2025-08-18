import styled from "styled-components";
import {Row, SubtleText} from "../ConverterCard/ConverterCard.styled.ts";

export const StyledTitle = styled.h1`
    font-size: 20px;
    line-height: 1;
    margin: 0;
`;

export const TitleContainer = styled.div`
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
`;

export const HeaderRow = styled(Row)`
    align-items: center;

    ${SubtleText} {
        margin-left: auto;
        line-height: 20px;
    }
`;
