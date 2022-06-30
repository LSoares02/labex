import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import DatePicker from "../DatePicker";
import SelectChip from "../SelectChip";

export default function ActivityRegisterLeft({
  insertedData,
  setInsertedData,
}) {
  function handleSelectChange(event) {
    const tmp = { ...insertedData };
    tmp.type = event.target.value;
    setInsertedData(tmp);
  }

  return (
    <Grid item xs={6}>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Título"
            onChange={(e) => {
              let tmp = { ...insertedData };
              tmp.title = e.target.value;
              tmp.id = e.target.value.toLowerCase().replace(/ /g, "");
              setInsertedData(tmp);
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            margin={"1"}
            style={{ width: "100%" }}
          >
            <InputLabel id="type-select-label">Tipo</InputLabel>
            <Select
              label="Tipo"
              labelId="type-select-label"
              id="simple-select"
              value={insertedData.type}
              onChange={handleSelectChange}
              sx={{ width: "100%" }}
            >
              <MenuItem value={"Programa"}>Programa</MenuItem>
              <MenuItem value={"Projeto"}>Projeto</MenuItem>
              <MenuItem value={"Curso/Oficina"}>Curso/Oficina</MenuItem>
              <MenuItem value={"Evento"}>Evento</MenuItem>
              <MenuItem value={"Prestação de Serviços"}>
                Prestação de Serviços
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <SelectChip
            insertedData={insertedData}
            setInsertedData={setInsertedData}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Links"
            onBlur={(e) => {
              let tmp = { ...insertedData };
              tmp.links.length > 0 &&
              !tmp.links.includes((link) => link === e.target.value)
                ? tmp.links.push(e.target.value)
                : (tmp.links = [e.target.value]);
              setInsertedData(tmp);
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={"Data inicial"}
            value={insertedData}
            setValue={setInsertedData}
            date={"initialDate"}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={"Data final"}
            value={insertedData}
            setValue={setInsertedData}
            date={"finalDate"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
