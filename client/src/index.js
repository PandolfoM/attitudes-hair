import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#24a2d0",
    },
    secondary: {
      main: "#173753",
    },
    nav: {
      main: "#212121",
      contrastText: '#fff',
    },
    navclear: {
      main: "transparent",
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
