import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGlobalState } from "../../hooks/globalState";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import ReactMarkdown from "react-markdown";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import "./style.css";
import { getActivities, getActivityText } from "../../helpers/apiCalls";
import Loading from "../../components/Loading";

export default function ActivityDetails() {
  const { extensionPosts, setExtensionPosts, loading, setLoading } =
    useGlobalState();
  const { activityID } = useParams();

  return (
    <ThemeProvider theme={theme}>
      <div id="detailsContent">
        <div id="top">
          <Header />
          <NavigationBar />
        </div>
        <div id="activityText">
          <ReactMarkdown children={""} />
        </div>
      </div>
    </ThemeProvider>
  );
}
