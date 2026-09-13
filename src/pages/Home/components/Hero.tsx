import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Hero() {
  return (
    <Box
      id="topo"
      sx={{
        py: { xs: 10, md: 16 },
        background:
          "radial-gradient(circle at 20% 20%, rgba(94,234,212,0.12), transparent 60%), radial-gradient(circle at 80% 0%, rgba(129,140,248,0.12), transparent 55%)",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ maxWidth: 720 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Gabriel Domingos
          </Typography>
          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600 }}>
            Desenvolvedor Full Stack
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Construo sistemas web, APIs e aplicativos mobile de ponta a ponta —
            e também cuido da infraestrutura self-hosted que mantém tudo isso
            rodando: containers, proxy reverso, banco de dados, automações e
            observabilidade.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button href="#projetos" size="large" variant="contained">
              Ver projetos
            </Button>
            <Button
              href="https://github.com/gabrielppd77"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              variant="outlined"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
