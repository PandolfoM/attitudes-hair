import React from "react";
import Nav from "./components/Nav";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#24a2d0",
      contrastText: '#33312e',
    },
    secondary: {
      main: "#33312e",
      contrastText: '#fef9ff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Nav />
      </div>
    </ThemeProvider>
  );
}

export default App;
