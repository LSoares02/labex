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
  const [teacher4Content, setTeacher4Content] = useState("");
  const [teacher5Content, setTeacher5Content] = useState("");
  const [teacher6Content, setTeacher6Content] = useState("");
  const [teacher7Content, setTeacher7Content] = useState("");
  const [teacher8Content, setTeacher8Content] = useState("");
  const [teacher9Content, setTeacher9Content] = useState("");
  const [teacher10Content, setTeacher10Content] = useState("");
  const [teacher11Content, setTeacher11Content] = useState("");

  useEffect(() => {
    fetch("content/Faculty/CláudiaKniess.md")
      .then((res) => res.text())
      .then((text) => setTeacher1Content(text));
    fetch("content/Faculty/EmersonGomesDosSantos.md")
      .then((res) => res.text())
      .then((text) => setTeacher2Content(text));
    fetch("content/Faculty/AhmedSameerElKhatib.md")
      .then((res) => res.text())
      .then((text) => setTeacher3Content(text));
    fetch("content/Faculty/BolivarGodinhoDeOliveiraFilho.md")
      .then((res) => res.text())
      .then((text) => setTeacher4Content(text));
    fetch("content/Faculty/DurvalLucasDosSantosJúnior.md")
      .then((res) => res.text())
      .then((text) => setTeacher5Content(text));
    fetch("content/Faculty/KumikoOshioKissimoto.md")
      .then((res) => res.text())
      .then((text) => setTeacher6Content(text));
    fetch("content/Faculty/MiriamChristiMidoriOishiNemoto.md")
      .then((res) => res.text())
      .then((text) => setTeacher7Content(text));
    fetch("content/Faculty/NildesRaimundaPitomboLeite.md")
      .then((res) => res.text())
      .then((text) => setTeacher8Content(text));
    fetch("content/Faculty/ReginaDaSilvaDeCamargoBarros.md")
      .then((res) => res.text())
      .then((text) => setTeacher9Content(text));
    fetch("content/Faculty/RicardoLuizPereiraBueno.md")
      .then((res) => res.text())
      .then((text) => setTeacher10Content(text));
    fetch("content/Faculty/TaísPasquottoAndreolli.md")
      .then((res) => res.text())
      .then((text) => setTeacher11Content(text));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div id="top">
        <Header />
        <NavigationBar />
      </div>
      <div id="facultyContent">
        <div id="teacherCard">
          <div className="teacher-md">
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
          <div className="teacher-md">
            <ReactMarkdown children={teacher2Content} />
          </div>
        </div>
        <div id="teacherCard">
          <div className="teacher-md">
            <ReactMarkdown children={teacher3Content} />
          </div>
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
        </div>
        <div id="teacherCard">
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
          <div className="teacher-md">
            <ReactMarkdown children={teacher4Content} />
          </div>
        </div>
        <div id="teacherCard">
          <div className="teacher-md">
            <ReactMarkdown children={teacher5Content} />
          </div>
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
        </div>
        <div id="teacherCard">
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
          <div className="teacher-md">
            <ReactMarkdown children={teacher6Content} />
          </div>
        </div>
        <div id="teacherCard">
          <div className="teacher-md">
            <ReactMarkdown children={teacher7Content} />
          </div>
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
        </div>
        <div id="teacherCard">
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
          <div className="teacher-md">
            <ReactMarkdown children={teacher8Content} />
          </div>
        </div>
        <div id="teacherCard">
          <div className="teacher-md">
            <ReactMarkdown children={teacher9Content} />
          </div>
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
        </div>
        <div id="teacherCard">
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
          <div className="teacher-md">
            <ReactMarkdown children={teacher10Content} />
          </div>
        </div>
        <div id="teacherCard">
          <div className="teacher-md">
            <ReactMarkdown children={teacher11Content} />
          </div>
          <img className="teacherImage" src={defaultImage} alt={"Default"} />
        </div>
      </div>
    </ThemeProvider>
  );
}
