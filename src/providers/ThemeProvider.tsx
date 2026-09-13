import {
  ThemeProvider as ThemeProviderLib,
  createTheme,
} from "@mui/material/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#5eead4",
      },
      secondary: {
        main: "#818cf8",
      },
      background: {
        default: "#0b1120",
        paper: "#111827",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        defaultProps: {
          style: { textTransform: "none" },
        },
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });

  return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
}
