import styled from "styled-components";

export const FooterContainer = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;
`;

export const Signature = styled.a`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    background: ${({theme}) => theme.colors.primary};
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
        background: ${({theme}) => theme.colors.primaryHover};
    }
`;
