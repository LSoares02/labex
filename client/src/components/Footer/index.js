import React, { useEffect, useRef, useState } from "react";

import { useGlobalState } from "../../hooks/globalState";

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SchoolIcon from "@mui/icons-material/School";

export default function Footer({ color }) {
  return (
    <div id="footer">
      <BottomNavigation
        showLabels
        style={{
          marginTop: "20px",
        }}
      >
        <BottomNavigationAction
          label="Facebook"
          value="Facebook"
          icon={<FacebookIcon />}
          onClick={() => {
            window.open("https://www.facebook.com", "_blank");
          }}
        />
        <BottomNavigationAction
          label="Instagram"
          value="Instagram"
          icon={<InstagramIcon />}
          onClick={() => {
            window.open("https://www.instagram.com", "_blank");
          }}
        />
        <BottomNavigationAction
          label="Institucional"
          value="Institucional"
          icon={<SchoolIcon />}
          onClick={() => {
            window.open("http://unifesp.br/", "_blank");
          }}
        />
      </BottomNavigation>
    </div>
  );
}
