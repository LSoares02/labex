import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/globalState";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function SearchResultBar() {
  const { search, setSearch, filterBy, types, type } = useGlobalState();

  return (
    <>
      {filterBy === "title" ? (
        <Typography id="search-result-announcer" variant="h6">
          Resultados da busca pelo título <b>{search}</b> na categoria{" "}
          <b>{types[type]}</b>:
        </Typography>
      ) : filterBy === "author" ? (
        <Typography id="search-result-announcer" variant="h6">
          Resultados da busca pelo autor <b>{search}</b> na categoria{" "}
          <b>{types[type]}</b>:
        </Typography>
      ) : (
        ""
      )}

      <Button
        variant="outlined"
        onClick={() => {
          setSearch(null);
        }}
      >
        Limpar
      </Button>
    </>
  );
}
