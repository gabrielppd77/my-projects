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
  { label: "Fichas", href: "#fichas" },
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
          backgroundColor: "rgba(7, 0, 15, 0.8)",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background:
              "linear-gradient(90deg, #ff2bd6, #00f0ff, #faff00, #7c3aed, #ff2bd6)",
            boxShadow: "0 0 12px #ff2bd6, 0 0 24px #00f0ff",
            animation: "hue-spin 3s linear infinite",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component="a"
            href="#topo"
            variant="h6"
            sx={{
              color: "#00f0ff",
              textDecoration: "none",
              fontWeight: 900,
              letterSpacing: "0.15em",
              animation: "neon-flicker 3s linear infinite",
            }}
          >
            GD://
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
                <Button
                  key={item.href}
                  href={item.href}
                  color="inherit"
                  sx={{
                    "&:hover": {
                      color: "#faff00",
                      textShadow: "0 0 8px #faff00, 0 0 18px #faff00",
                    },
                  }}
                >
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
