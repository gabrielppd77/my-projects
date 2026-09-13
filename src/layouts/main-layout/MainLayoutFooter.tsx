import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MainLayoutFooter() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {year} Gabriel Domingos. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
