import React, { useEffect, useState } from "react";

import { useGlobalState } from "../../hooks/globalState";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import Editor from "../../components/MarkdownEditor";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import { defaultText } from "../../helpers/defaultRegisterText";

import "./style.css";

export default function ActivityRegister() {
  const {} = useGlobalState();

  const [value, setValue] = useState(defaultText);

  return (
    <ThemeProvider theme={theme}>
      <div id="top">
        <Header />
        <NavigationBar />
      </div>
      <div id="editor">
        <Editor value={value} setValue={setValue} />
      </div>
    </ThemeProvider>
  );
}
