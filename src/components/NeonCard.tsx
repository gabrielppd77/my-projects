import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

interface NeonCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function NeonCard(props: NeonCardProps) {
  const { children, sx } = props;

  return (
    <Box
      sx={[
        {
          position: "relative",
          height: "100%",
          p: "2px",
          borderRadius: 1,
          background:
            "conic-gradient(from var(--neon-angle), #ff2bd6, #00f0ff, #faff00, #7c3aed, #ff2bd6)",
          animation: "border-spin 4s linear infinite",
          transition: "box-shadow 0.2s ease",
          "&:hover": {
            animation: "border-spin 1s linear infinite, wobble 0.5s ease-in-out infinite",
            boxShadow: "0 0 30px #ff2bd6, 0 0 60px #00f0ff",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: 1,
          background: "rgba(14, 0, 30, 0.92)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
