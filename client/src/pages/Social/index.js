import React, { useEffect } from "react";

import { useGlobalState } from "../../hooks/globalState";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import "./style.css";

export default function Social() {
  const {} = useGlobalState();

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <div id="socialContent">
        <div id="top">
          <Header />
          <NavigationBar />
        </div>
        <p>Hello, World!</p>
      </div>
    </ThemeProvider>
  );
}
