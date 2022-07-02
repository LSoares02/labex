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
    filteredType,
    setFilteredType,
    filterBy,
    setFilterBy,
    type,
    setType,
    types,
  } = useGlobalState();

  function handleSearch(e) {
    if (e.key === "Enter") {
      setSearch(e.target.value);
      setCurrentPage(1);
      e.target.value = "";
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
        filteredType.filter((post) => {
          return post.title
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(search.toLowerCase().replace(/\s/g, ""));
        })
      );
    } else if (filterBy === "author") {
      setFilteredBySearch(
        filteredType.filter((post) => {
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
    }
  }
  function toggleType() {
    if (type < types.length - 1) setType(type + 1);
    else setType(0);
  }

  React.useEffect(() => {
    if (search) handleFilterBy();
    else setFilteredBySearch(filteredType);
  }, [search, filteredType]);

  React.useEffect(() => {
    if (extensionPosts) {
      const tmp = [...extensionPosts.values];
      if (types[type] === "Todos") setFilteredType(tmp);
      else setFilteredType(tmp.filter((post) => post.type === types[type]));
      setCurrentPage(1);
    }
  }, [type]);

  React.useEffect(() => {
    if (extensionPosts) {
      const tmp = [...extensionPosts.values];
      if (types[type] === "Todos") setFilteredType(tmp);
      else setFilteredType(tmp.filter((post) => post.type === types[type]));
    }
  }, [extensionPosts]);

  return (
    <Stack direction={"row"} spacing={1}>
      <Button size="small" onClick={toggleType}>
        {types[type]}
      </Button>
      <Button
        variant={filterBy === "title" ? "outlined" : "text"}
        size="small"
        onClick={() => {
          setSearch(null);
          setFilterBy("title");
        }}
      >
        Título
      </Button>
      <Button
        variant={filterBy === "author" ? "outlined" : "text"}
        size="small"
        onClick={() => {
          setSearch(null);
          setFilterBy("author");
        }}
      >
        Autor
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
