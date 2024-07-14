import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./config/routes/AppRouter";
import { Toaster } from "sonner";

const theme = createTheme();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" richColors />
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
