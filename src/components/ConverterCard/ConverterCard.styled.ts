import styled from "styled-components";

export const Card = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 768px;
    background: ${({theme}) => theme.colors.bgAccent};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 16px;
    box-shadow: 0 8px 30px ${({theme}) => theme.colors.cardShadow};
    padding: 20px;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const RowWithOverlay = styled(Row)`
    position: relative;
`;

export const SubtleTextWrapper = styled.div`
    text-align: right;
`;

export const SubtleText = styled.div`
    color: ${({theme}) => theme.colors.subtext};
    font-size: 12px;
`;

export const CurrentRate = styled(SubtleText)`
    text-align: center;
    margin-top: 16px;
`;

export const SwapButton = styled.button`
    position: absolute;
    left: 50%;
    bottom: 24px;
    transform: translate(-50%, 50%);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.border};
    background: ${({theme}) => theme.colors.bgAccent};
    color: ${({theme}) => theme.colors.text};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 14px ${({theme}) => theme.colors.cardShadow};
    transition: transform 0.15s ease, border-color 0.15s ease;

    &:hover {
        border-color: ${({theme}) => theme.colors.primary};
        transform: translate(-50%, 50%) scale(1.04);
    }

    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }
`;

export const Input = styled.input`
    height: 48px;
    padding: 0 12px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.border};
    background: ${({theme}) => theme.colors.bgAccent};
    color: ${({theme}) => theme.colors.text};
    outline: none;
    font-size: 16px;

    &:focus {
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

export const Select = styled.select`
    height: 48px;
    padding: 0 12px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.border};
    background: ${({theme}) => theme.colors.bgAccent};
    color: ${({theme}) => theme.colors.text};
    outline: none;
    font-size: 16px;

    &:focus {
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

export const InputLabel = styled.label`
    display: block;
    padding-bottom: 3px;
    color: ${({theme}) => theme.colors.muted};
`

export const RowSpaced = styled(Row)`
    align-items: center;
    margin-top: 12px;
`;

export const ResultText = styled.div`
    margin-top: 16px;
    font-size: 20px;
    font-weight: 600;
    background: ${({theme}) => theme.colors.bg};
    border: 1px solid ${({theme}) => theme.colors.border};
    color: ${({theme}) => theme.colors.text};
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

