import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

import GlitchText from "@components/GlitchText";

export default function Hero() {
  return (
    <Box id="topo" sx={{ py: { xs: 10, md: 16 }, minHeight: { md: "80vh" } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ maxWidth: 820 }}>
          <Box
            sx={{
              alignSelf: "flex-start",
              px: 1.5,
              py: 0.5,
              border: "2px solid #ff003c",
              color: "#ff003c",
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "0.7rem",
              borderRadius: 1,
              boxShadow: "0 0 12px #ff003c, inset 0 0 8px #ff003c",
              animation: "on-air-blink 1.2s steps(1) infinite",
            }}
          >
            ● ON AIR
          </Box>
          <GlitchText
            text="GABRIEL DOMINGOS"
            component="h1"
            sx={{
              m: 0,
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 900,
              fontSize: { xs: "2.4rem", sm: "3.5rem", md: "5rem" },
              lineHeight: 1.05,
              color: "#fff",
              textShadow: "0 0 10px #ff2bd6, 0 0 30px #ff2bd6, 0 0 60px #7c3aed",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              background:
                "linear-gradient(90deg, #00f0ff, #ff2bd6, #faff00, #00f0ff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "rainbow-text 2.5s linear infinite",
            }}
          >
            Desenvolvedor Full Stack
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              p: 2,
              borderLeft: "4px solid #00f0ff",
              background: "rgba(0, 240, 255, 0.06)",
              boxShadow: "-6px 0 18px -6px #00f0ff",
            }}
          >
            Construo sistemas web, APIs e aplicativos mobile de ponta a ponta —
            e também cuido da infraestrutura self-hosted que mantém tudo isso
            rodando: containers, proxy reverso, banco de dados, automações e
            observabilidade.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button href="#projetos" size="large" variant="contained" color="secondary">
              Ver projetos
            </Button>
            <Button
              href="https://github.com/gabrielppd77"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ boxShadow: "0 0 14px #00f0ff, inset 0 0 10px #00f0ff" }}
            >
              GitHub
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
