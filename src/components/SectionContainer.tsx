import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface SectionContainerProps {
  id: string;
  title?: string;
  subtitle?: string;
  color?: string;
  children: React.ReactNode;
}

export default function SectionContainer(props: SectionContainerProps) {
  const { id, title, subtitle, color = "#ff2bd6", children } = props;

  return (
    <Box id={id} component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {title ? (
            <Stack spacing={1}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color,
                  animation: "neon-flicker 4s linear infinite",
                }}
              >
                {title}
              </Typography>
              {subtitle ? (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: "0.7rem", lineHeight: 2 }}
                >
                  &gt; {subtitle}
                  <Box
                    component="span"
                    sx={{ animation: "on-air-blink 1s steps(1) infinite", ml: 0.5 }}
                  >
                    _
                  </Box>
                </Typography>
              ) : null}
            </Stack>
          ) : null}
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
