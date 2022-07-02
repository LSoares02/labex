import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import Pagination from "@mui/material/Pagination";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

export default function PaginationComponent() {
  const { filteredBySearch, currentPage, setCurrentPage } = useGlobalState();

  const [numberOfPages, setNumberOfPages] = React.useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  React.useEffect(() => {
    if (filteredBySearch) {
      const tmp = filteredBySearch.length / 12;
      if (filteredBySearch.length % 12 !== 0) {
        setNumberOfPages(Math.trunc(tmp) + 1);
      } else setNumberOfPages(Math.trunc(tmp));
    }
  }, [filteredBySearch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            size="large"
            count={numberOfPages}
            page={currentPage}
            color="primary"
            onChange={handleChange}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
