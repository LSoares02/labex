import * as React from "react";

import { useGlobalState } from "../../hooks/globalState";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export default function SearchComponent() {
  const {
    extensionPosts,
    setFilteredBySearch,
    search,
    setSearch,
    setCurrentPage,
  } = useGlobalState();

  const [filterBy, setFilterBy] = React.useState("title");

  function handleSearch(e) {
    if (e.key === "Enter") {
      setSearch(e.target.value);
      setCurrentPage(1);
    }
  }
  function handleChange(e) {
    if (e.target.value.length === 0) {
      setSearch(null);
      setCurrentPage(1);
    }
  }
  function handleFilterBy() {
    if (filterBy === "title") {
      setFilteredBySearch(
        extensionPosts?.values?.filter((post) => {
          return post.title
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(search.toLowerCase().replace(/\s/g, ""));
        })
      );
    } else if (filterBy === "authors") {
      setFilteredBySearch(
        extensionPosts?.values?.filter((post) => {
          return post.authors.some(
            (author) =>
              author.name
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(search.toLowerCase().replace(/\s/g, "")) ||
              author.email
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(search.toLowerCase().replace(/\s/g, ""))
          );
        })
      );
    } else if (filterBy === "type") {
      setFilteredBySearch(
        extensionPosts?.values?.filter((post) => {
          return post.type
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(search.toLowerCase().replace(/\s/g, ""));
        })
      );
    }
  }

  React.useEffect(() => {
    if (search) handleFilterBy();
    else setFilteredBySearch(extensionPosts?.values);
  }, [search]);

  React.useEffect(() => {
    setSearch("");
  }, [filterBy]);

  return (
    <Stack direction={"row"}>
      <Button
        variant={filterBy === "title" ? "outlined" : "text"}
        size="small"
        onClick={() => {
          setFilterBy("title");
        }}
      >
        Título
      </Button>
      <Button
        variant={filterBy === "authors" ? "outlined" : "text"}
        size="small"
        onClick={() => {
          setFilterBy("authors");
        }}
      >
        Autor
      </Button>
      <Button
        variant={filterBy === "type" ? "outlined" : "text"}
        size="small"
        onClick={() => {
          setFilterBy("type");
        }}
      >
        Tipo
      </Button>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Busca..."
          inputProps={{ "aria-label": "search" }}
          onKeyPress={handleSearch}
          onChange={handleChange}
        />
      </Search>
    </Stack>
  );
}
