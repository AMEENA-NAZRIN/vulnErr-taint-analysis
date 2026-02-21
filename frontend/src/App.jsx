import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadAnalyse from "./pages/UploadAnalyse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: { main: "#6C63FF" },
    secondary: { main: "#FF6584" },
    background: { default: "#f4f6f8" },
  },
  shape: { borderRadius: 12 },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/uploadanalyse" element={<UploadAnalyse />} />
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;