import {createGlobalStyle} from "styled-components";

export const lightTheme = {
    name: "light",
    colors: {
        bg: "#f7f8fb",
        bgAccent: "#ffffff",
        text: "#111827",
        textReverse: "#ffffff",
        subtext: "#4b5563",
        cardShadow: "rgba(17, 24, 39, 0.08)",
        primary: "#6366f1",
        primaryHover: "#4f46e5",
        border: "#e5e7eb",
        muted: "#9ca3af",
        success: "#10b981",
        danger: "#ef4444",
        gradientStart: "#bfdbfe",
        gradientMid1: "#a7f3d0",
        gradientMid2: "#7dd3fc",
        gradientEnd: "#67e8f9",
    },
};

export const darkTheme = {
    name: "dark",
    colors: {
        bg: "#0f172a",
        bgAccent: "#111827",
        text: "#e5e7eb",
        textReverse: "#111827",
        subtext: "#9ca3af",
        cardShadow: "rgba(0, 0, 0, 0.35)",
        primary: "#8b5cf6",
        primaryHover: "#7c3aed",
        border: "#1f2937",
        muted: "#6b7280",
        success: "#34d399",
        danger: "#f87171",
        gradientStart: "#1a0b3d",
        gradientMid1: "#0a4d4a",
        gradientMid2: "#1a5f2a",
        gradientEnd: "#2d1b69",

    },
};

export interface AppTheme {
    name: string;
    colors: typeof lightTheme.colors;
}

export const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: light dark;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        background: ${({theme}) => theme.colors.bg};
        color: ${({theme}) => theme.colors.text};
        transition: background 200ms ease, color 200ms ease;
    }
`;

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends AppTheme {
    }
}
