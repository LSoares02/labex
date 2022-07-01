import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/globalState";

import { getActivities } from "../../helpers/apiCalls";

import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import ActivityCard from "../../components/ActivityCard";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";
import "./style.css";

import Loading from "../../components/Loading";
import DetailsModal from "../../components/DetailsModal";
import PaginationComponent from "../../components/Pagination";

export default function Dashboard() {
  const {
    extensionPosts,
    filteredBySearch,
    filteredByPage,
    setFilteredByPage,
    setExtensionPosts,
    currentPage,
    loading,
    setLoading,
  } = useGlobalState();

  const apiCall = async () => {
    setLoading(true);
    const response = await getActivities();
    setExtensionPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!extensionPosts) apiCall();
  }, []);

  useEffect(() => {
    if (filteredBySearch) {
      setFilteredByPage(
        filteredBySearch.slice(currentPage * 12 - 12, currentPage * 12)
      );
    }
  }, [filteredBySearch, currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <div id="activitiesContent">
        <div id="top">
          <Header />
          <NavigationBar />
        </div>
        <div id="cards">
          <DetailsModal />
          <Grid container spacing={2}>
            {loading ? (
              <Loading />
            ) : (
              filteredByPage?.map((activity) => {
                return (
                  <Grid key={activity.id} item xs={3}>
                    <ActivityCard
                      id={activity.id}
                      type={activity.type}
                      title={activity.title}
                      description={activity.description}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
          <PaginationComponent />
        </div>
      </div>
    </ThemeProvider>
  );
}
