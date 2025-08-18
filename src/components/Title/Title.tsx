import {HeaderRow, StyledTitle, TitleContainer} from "./Title.styled.ts";
import {SubtleText} from "../ConverterCard/ConverterCard.styled.ts";
import {useDailyRates} from "../../hooks/useRates.ts";

const Title = () => {
    const {data} = useDailyRates();

    return (
        <TitleContainer>
            <HeaderRow>
                <StyledTitle>Currency Converter for CZK</StyledTitle>
                <SubtleText>Rates as of {data?.date}</SubtleText>
            </HeaderRow>
        </TitleContainer>
    )
}

export default Title;
