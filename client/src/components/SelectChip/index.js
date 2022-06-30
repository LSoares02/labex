import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectChip({ insertedData, setInsertedData }) {
  const { accounts } = useGlobalState();

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    const tmp = { ...insertedData };
    tmp.authors = personName.map((person) => {
      return { name: person.name, email: person.email };
    });
    setInsertedData(tmp);
  }, [personName]);

  return (
    <div>
      <FormControl variant="outlined" margin={"1"} style={{ width: "100%" }}>
        <InputLabel id="chip-select-label">Autores</InputLabel>
        <Select
          labelId="chip-select-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Autores"
              sx={{ width: "100%" }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.name} label={value.name} sx={{ height: 1 }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {accounts.map((account) => (
            <MenuItem
              key={account.name}
              value={account}
              style={getStyles(account.name, personName, theme)}
            >
              {account.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
