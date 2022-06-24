import * as React from "react";

import { useGlobalState } from "../../hooks/globalState";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import { logout } from "../../helpers/helpers";
import { blue } from "@mui/material/colors";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function AvatarComponent() {
  const { account, setAccount, setOpenLogin } = useGlobalState();

  return (
    <div
      onMouseEnter={() => {
        document.body.style.cursor = "pointer";
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "default";
      }}
      id="avatar"
      onClick={() => {
        account ? logout(setAccount) : setOpenLogin(true);
      }}
    >
      <Tooltip title={account ? "Logout" : "Login"}>
        <Avatar
          sx={{
            width: 35,
            height: 35,
            bgcolor: account ? stringToColor(account?.email[0]) : "",
          }}
        >
          {account?.email[0].toUpperCase()}
        </Avatar>
      </Tooltip>
    </div>
  );
}
