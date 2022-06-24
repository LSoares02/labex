import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";

import SearchComponent from "../../components/Search";

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static" color="secondary">
          <Toolbar
            variant="dense"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div id="buttons">
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/activities");
                }}
              >
                Atividades
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/faculty");
                }}
              >
                Docentes e Parceiros
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/social");
                }}
              >
                Fale Conosco
              </Button>
            </div>
            {location.pathname === "/activities" ? <SearchComponent /> : ""}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
