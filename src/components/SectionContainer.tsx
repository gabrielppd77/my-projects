import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface SectionContainerProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SectionContainer(props: SectionContainerProps) {
  const { id, title, subtitle, children } = props;

  return (
    <Box id={id} component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {title ? (
            <Stack spacing={1}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
              {subtitle ? (
                <Typography variant="body1" color="text.secondary">
                  {subtitle}
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
