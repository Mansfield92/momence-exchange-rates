import styled, {keyframes} from "styled-components";

const animateBackground = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

export const Page = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background: linear-gradient(-45deg,
    ${({theme}) => theme.colors.gradientStart},
    ${({theme}) => theme.colors.gradientMid1},
    ${({theme}) => theme.colors.gradientMid2},
    ${({theme}) => theme.colors.gradientEnd}
    );
    background-size: 400% 400%;
    animation: ${animateBackground} 15s ease infinite;
    height: 100vh;
    overflow: auto;
`;

export const TopBar = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    max-width: 768px;
    margin-bottom: 16px;
`;

export const ContentWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 16px;
`;
