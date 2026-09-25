import {
  ThemeProvider as ThemeProviderLib,
  createTheme,
} from "@mui/material/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const DISPLAY_FONT = '"Orbitron", "Roboto", sans-serif';

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00f0ff",
      },
      secondary: {
        main: "#ff2bd6",
      },
      warning: {
        main: "#faff00",
      },
      background: {
        default: "#07000f",
        paper: "rgba(20, 0, 40, 0.75)",
      },
      text: {
        secondary: "#c9b6ff",
      },
      divider: "rgba(255, 43, 214, 0.35)",
    },
    typography: {
      h1: { fontFamily: DISPLAY_FONT },
      h2: { fontFamily: DISPLAY_FONT },
      h3: { fontFamily: DISPLAY_FONT },
      h4: { fontFamily: DISPLAY_FONT },
      h5: { fontFamily: DISPLAY_FONT },
      h6: { fontFamily: DISPLAY_FONT },
      button: { fontFamily: DISPLAY_FONT, letterSpacing: "0.08em" },
    },
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiButton: {
        defaultProps: {
          style: { textTransform: "uppercase" },
        },
        styleOverrides: {
          root: {
            fontWeight: 700,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            "&:hover": {
              transform: "translateY(-2px) skewX(-6deg)",
            },
          },
          contained: {
            color: "#07000f",
            animation: "glow-pulse 1.6s ease-in-out infinite",
          },
          outlined: {
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
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
            fontWeight: 700,
            fontFamily: DISPLAY_FONT,
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(6px)",
          },
        },
      },
    },
  });

  return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
}
