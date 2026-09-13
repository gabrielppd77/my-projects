import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@providers/ThemeProvider";
import MainLayout from "@layouts/main-layout";
import Home from "@pages/Home";

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <MainLayout>
        <Home />
      </MainLayout>
    </ThemeProvider>
  );
}
