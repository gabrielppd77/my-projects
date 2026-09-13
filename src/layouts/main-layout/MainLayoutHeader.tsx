import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

export default function MainLayoutHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(11, 17, 32, 0.8)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component="a"
            href="#topo"
            variant="h6"
            sx={{ color: "text.primary", textDecoration: "none", fontWeight: 700 }}
          >
            Gabriel Domingos
          </Typography>

          {isMobile ? (
            <IconButton
              aria-label="Abrir menu"
              onClick={() => setMobileOpen(true)}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={1}>
              {NAV_ITEMS.map((item) => (
                <Button key={item.href} href={item.href} color="inherit">
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List sx={{ width: 220 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.href}
              component="a"
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
