import styled from "styled-components";

export const ToggleLabel = styled.label`
    width: 60px;
    height: 30px;
    position: relative;
    display: block;
    background: ${({theme}) => theme?.colors?.bgAccent};
    border-radius: 30px;
    border: 1px solid ${({theme}) => theme?.colors?.border};
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
        border-color: ${({theme}) => theme?.colors?.primary};
    }

    &:after {
        content: "";
        width: 26px;
        height: 26px;
        position: absolute;
        top: 1px;
        left: 1px;
        background: ${({theme}) => theme?.colors?.bgAccent};
        border-radius: 26px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid ${({theme}) => theme?.colors?.border};
    }

    svg {
        position: absolute;
        width: 14px;
        height: 14px;
        top: 8px;
        z-index: 100;

        &.sun {
            left: 7px;
            fill: #ffa500;
            transition: all 0.3s ease;
        }

        &.moon {
            right: 7px;
            fill: #6b7280;
            transition: all 0.3s ease;
        }
    }
`;

export const ToggleInput = styled.input`
    width: 0;
    height: 0;
    visibility: hidden;

    &:checked + label {
        background: ${({theme}) => theme?.colors?.bgAccent || "#1f2937"};
        border-color: ${({theme}) => theme?.colors?.border || "rgba(255, 255, 255, 0.1)"};

        &:after {
            left: 31px;
            background: ${({theme}) => theme?.colors?.bgAccent || "#374151"};
            border-color: ${({theme}) => theme?.colors?.border || "rgba(255, 255, 255, 0.1)"};
        }

        &:hover {
            border-color: ${({theme}) => theme?.colors?.primary};
        }

        svg {
            &.sun {
                fill: #6b7280
            }

            &.moon {
                fill: #fbbf24
            }
        }
    }

    &:active + label:after {
        width: 30px;
    }

    &:focus + label {
        outline: #3b82f6;
        outline-offset: 2px;
    }
`;
