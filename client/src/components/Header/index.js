import * as React from "react";

import { useGlobalState } from "../../hooks/globalState";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppsIcon from "@mui/icons-material/Apps";
import { IconButton } from "@mui/material";

import LoginModal from "../LoginModal";
import AvatarComponent from "../Avatar";

import { logout } from "../../helpers/helpers";

import "./style.css";

export default function Header() {
  const { account, setAccount, setOpenLogin } = useGlobalState();

  return (
    <div>
      <LoginModal />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              LABEX
            </Typography>
            {account ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <AppsIcon />
              </IconButton>
            ) : (
              <div
                id="loginText"
                onMouseEnter={() => {
                  document.body.style.cursor = "pointer";
                }}
                onMouseLeave={() => {
                  document.body.style.cursor = "default";
                }}
                onClick={() => {
                  account ? logout(setAccount) : setOpenLogin(true);
                }}
              >
                Fazer Login
              </div>
            )}
            <AvatarComponent />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
