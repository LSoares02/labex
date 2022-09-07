import React, { useEffect, useState } from "react";

import { useGlobalState } from "../../hooks/globalState";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import ReactMarkdown from "react-markdown";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import "./style.css";

import facebookImage from "../../images/facebook.jpeg";
import instagramImage from "../../images/instagram.jpeg";
import unifespLogoImage from "../../images/unifespLogo.png";

export default function Social() {
  const {} = useGlobalState();

  const [socialContent, setSocialContent] = useState("");

  useEffect(() => {
    fetch("content/Social/socialContent.md")
      .then((res) => res.text())
      .then((text) => setSocialContent(text));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div id="top">
        <Header />
        <NavigationBar />
      </div>
      <div id="socialContent">
        <div id="socialCards">
          <div id="images">
            <img
              className="socialCardImage"
              src={facebookImage}
              alt={"Facebook"}
              onClick={() => {
                window.open("https://www.facebook.com/", "_blank");
              }}
            />
            <img
              className="socialCardImage"
              src={instagramImage}
              alt={"Instagram"}
              onClick={() => {
                window.open("https://www.instagram.com/", "_blank");
              }}
            />
            <img
              className="socialCardImage"
              src={unifespLogoImage}
              alt={"Unifesp Logo"}
              onClick={() => {
                window.open("http://unifesp.br/", "_blank");
              }}
            />
          </div>
          <div id="socialText">
            <ReactMarkdown children={socialContent} />
          </div>
        </div>

        <div id="footerSocial">
          <div id="primary" />
          <div id="secondary" />
          <div id="tertiary" />
        </div>
      </div>
    </ThemeProvider>
  );
}
