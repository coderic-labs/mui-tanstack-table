import { CssBaseline, ThemeProvider } from "@mui/material";
import { DocsContainer } from "@storybook/blocks";
import { themes } from "storybook/internal/theming";
import { themeDark } from "./themes/dark";
import { themeLight } from "./themes/light";

export const ThemedDocsContainer = ({ context, children }: any) => {
    const themeToggle = context.store.userGlobals.globals.themeToggle;
    const docsTheme = themeToggle === 'light' ? themes.light : themes.dark;
    const muiTheme = themeToggle === 'light' ? themeLight : themeDark;
    return (
        <DocsContainer
            context={context}
            theme={docsTheme}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </DocsContainer>
    );
};
