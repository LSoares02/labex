import React, { useEffect, useState } from "react";

import { useGlobalState } from "../../hooks/globalState";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import ReactMarkdown from "react-markdown";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import "./style.css";

import claudiaImage from "../../images/claudiaKniess.jpeg";
import emersonImage from "../../images/emersonSantos.jpeg";
import defaultImage from "../../images/defaultAvatar.png";

export default function Faculty() {
  const {} = useGlobalState();
  const [teacher1Content, setTeacher1Content] = useState("");
  const [teacher2Content, setTeacher2Content] = useState("");
  const [teacher3Content, setTeacher3Content] = useState("");

  useEffect(() => {
    fetch("content/Faculty/claudia.md")
      .then((res) => res.text())
      .then((text) => setTeacher1Content(text));
    fetch("content/Faculty/emerson.md")
      .then((res) => res.text())
      .then((text) => setTeacher2Content(text));
    fetch("content/Faculty/default.md")
      .then((res) => res.text())
      .then((text) => setTeacher3Content(text));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div id="top">
        <Header />
        <NavigationBar />
      </div>
      <div id="facultyContent">
        <div id="teacherCard">
          <div id="home-md">
            <ReactMarkdown children={teacher1Content} />
          </div>
          <img
            className="teacherImage"
            src={claudiaImage}
            alt={"Claudia Kniess"}
          />
        </div>
        <div id="teacherCard">
          <img
            className="teacherImage"
            src={emersonImage}
            alt={"Emerson Gomes dos Santos"}
          />
          <div id="home-md">
            <ReactMarkdown children={teacher2Content} />
          </div>
        </div>
        <div id="teacherCard">
          <div id="home-md">
            <ReactMarkdown children={teacher3Content} />
          </div>
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
        </div>
      </div>
    </ThemeProvider>
  );
}
