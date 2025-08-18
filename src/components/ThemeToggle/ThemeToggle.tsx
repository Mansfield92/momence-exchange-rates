import {useTheme} from "../../theme/ThemeProvider.tsx";
import Sun from "./Sun";
import Moon from "./Moon";
import {ToggleInput, ToggleLabel} from "./ThemeToggle.styled.ts";

const ThemeToggle = () => {
    const {mode, toggle} = useTheme();

    return [
        <ToggleInput key="input" type="checkbox" id="color-mode-toggle" aria-label="Toggle color mode"
                     checked={mode === "dark"} onChange={toggle}/>,
        <ToggleLabel key="label" htmlFor="color-mode-toggle">
            <Sun/>
            <Moon/>
        </ToggleLabel>
    ]
};

export default ThemeToggle;
