import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NeonMarquee from "@components/NeonMarquee";

export default function MainLayoutFooter() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ pb: 3, textAlign: "center" }}>
      <NeonMarquee
        color="#00f0ff"
        reverse
        items={[
          "OBRIGADO POR VISITAR",
          "INSERT COIN TO CONTINUE",
          "FEITO COM REACT + MUITO NEON",
          "SELF-HOSTED COM AMOR",
        ]}
      />
      <Typography
        variant="body2"
        sx={{
          mt: 3,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "0.6rem",
          color: "#ff2bd6",
          animation: "neon-flicker 5s linear infinite",
        }}
      >
        © {year} Gabriel Domingos. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
