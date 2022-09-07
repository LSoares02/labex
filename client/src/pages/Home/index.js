import React, { useEffect, useRef, useState } from "react";

import { useGlobalState } from "../../hooks/globalState";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import ReactMarkdown from "react-markdown";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import "./style.css";

import unifespImage1 from "../../images/unifesp.jpeg";
import unifespImage2 from "../../images/unifesp2.jpeg";
import Footer from "../../components/Footer";

export default function Home() {
  const {} = useGlobalState();
  const [introContent, setIntroContent] = useState("");
  const [quoteContent, setQuoteContent] = useState("");
  const [homeContent, setHomeContent] = useState("");

  useEffect(() => {
    fetch("content/Home/homeIntro.md")
      .then((res) => res.text())
      .then((text) => setIntroContent(text));
    fetch("content/Home/quote.md")
      .then((res) => res.text())
      .then((text) => setQuoteContent(text));
    fetch("content/Home/homeContent.md")
      .then((res) => res.text())
      .then((text) => setHomeContent(text));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div id="top">
        <Header />
        <NavigationBar />
      </div>
      <div id="homeContent">
        <div id="intro">
          <img id="unifespImage" src={unifespImage1} alt={"Unifesp"} />
          <div id="home-md">
            <ReactMarkdown children={introContent} />
          </div>
        </div>
        <div id="quote">
          <ReactMarkdown children={quoteContent} />
        </div>
        <div id="details">
          <div id="home-md">
            <ReactMarkdown children={homeContent} />
          </div>
          <img
            id="unifespImage"
            src={unifespImage2}
            alt={"Unifesp"}
            style={{
              maxWidth: "700px",
              maxHeight: "auto",
            }}
          />
        </div>
        <Footer color={"primary"} />
      </div>
    </ThemeProvider>
  );
}
