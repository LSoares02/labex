import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";
import { useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppsIcon from "@mui/icons-material/Apps";
import { IconButton } from "@mui/material";

import LoginModal from "../LoginModal";
import ActivityRegister from "../ActivityRegister";
import AvatarComponent from "../Avatar";

import { logout } from "../../helpers/helpers";

import "./style.css";

export default function Header() {
  const { account, setAccount, setOpenLogin, setOpenActivityRegister } =
    useGlobalState();
  const location = useLocation();

  function handleMenuClick() {
    setOpenActivityRegister(true);
  }

  return (
    <div>
      <LoginModal />
      <ActivityRegister />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              LABEX
            </Typography>
            {account && location.pathname !== "/register" ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuClick}
              >
                <AppsIcon />
              </IconButton>
            ) : location.pathname === "/register" ? (
              ""
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
            {location.pathname === "/register" ? "" : <AvatarComponent />}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
