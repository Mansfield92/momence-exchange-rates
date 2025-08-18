import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {ThemeProvider} from "styled-components";
import {AppTheme, darkTheme, GlobalStyle, lightTheme} from "./themes";

const THEME_STORAGE_KEY = "theme";

type Mode = "light" | "dark";

interface ThemeContextValue {
    mode: Mode;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemMode(): Mode {
    if (typeof window === "undefined") return "light";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function AppThemeProvider({children}: PropsWithChildren) {
    const [mode, setMode] = useState<Mode>(() => {
        const saved = sessionStorage.getItem(THEME_STORAGE_KEY) as Mode | null;
        return saved ?? getSystemMode();
    });

    useEffect(() => {
        sessionStorage.setItem(THEME_STORAGE_KEY, mode);
    }, [mode]);

    const theme: AppTheme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

    const contextValue = useMemo(() => ({
        mode,
        toggle: () => setMode(current => current === "dark" ? "light" : "dark")
    }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within an AppThemeProvider');
    }
    return context;
}
