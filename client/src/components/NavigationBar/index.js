import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavigationBar() {
  const { extensionPosts, setFilteredBySearch } = useGlobalState();

  const [search, setSearch] = React.useState("");

  function handleChange(e) {
    if (e.target.value) {
      setSearch(e.target.value);
    } else setSearch("");
  }

  React.useEffect(() => {
    setFilteredBySearch(
      extensionPosts?.values.filter((post) => {
        return post.title
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(search.toLowerCase().replace(/\s/g, ""));
      })
    );
  }, [search]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static" color="secondary">
          <Toolbar
            variant="dense"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Atividades</Button>
              <Button color="inherit">Doscentes e Parceiros</Button>
              <Button color="inherit">Fale Conosco</Button>
            </div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
