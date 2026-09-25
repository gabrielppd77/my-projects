import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

interface GlitchTextProps {
  text: string;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

export default function GlitchText(props: GlitchTextProps) {
  const { text, component = "span", sx } = props;

  return (
    <Box
      component={component}
      data-text={text}
      sx={[
        {
          position: "relative",
          display: "inline-block",
          "&::before, &::after": {
            content: "attr(data-text)",
            position: "absolute",
            inset: 0,
          },
          "&::before": {
            color: "#00f0ff",
            textShadow: "-3px 0 #ff2bd6",
            animation: "glitch-top 3s steps(1) infinite",
          },
          "&::after": {
            color: "#ff2bd6",
            textShadow: "3px 0 #00f0ff",
            animation: "glitch-bottom 2.6s steps(1) infinite",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {text}
    </Box>
  );
}
