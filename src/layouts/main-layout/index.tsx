import Box from "@mui/material/Box";

import MainLayoutHeader from "./MainLayoutHeader";
import MainLayoutFooter from "./MainLayoutFooter";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MainLayoutHeader />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <MainLayoutFooter />
    </Box>
  );
}
