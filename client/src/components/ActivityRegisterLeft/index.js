import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";

import CachedIcon from "@mui/icons-material/Cached";

import DatePicker from "../DatePicker";
import SelectChip from "../SelectChip";

import { getAccounts } from "../../helpers/apiCalls";
import { Stack } from "@mui/material";

export default function ActivityRegisterLeft({
  insertedData,
  setInsertedData,
}) {
  const { setAccounts } = useGlobalState();

  const [buttonLoading, setButtonLoading] = React.useState(false);

  function handleSelectChange(event) {
    const tmp = { ...insertedData };
    tmp.type = event.target.value;
    setInsertedData(tmp);
  }
  function adjustLinks(string) {
    const links = string.split(";");
    return links.map((link) => {
      if (link.length > 3) {
        if (link.substring(0, 8).includes("http")) {
          return link.trim();
        } else {
          return "http://" + link.trim();
        }
      }
    });
  }
  async function handleUpdateAccounts() {
    setButtonLoading(true);
    const accounts = await getAccounts();
    setAccounts(accounts.data);
    setButtonLoading(false);
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
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <SelectChip
                insertedData={insertedData}
                setInsertedData={setInsertedData}
              />
            </Grid>
            <Grid item xs={4}>
              <LoadingButton
                variant="contained"
                sx={{ height: "100%", width: "100%" }}
                loading={buttonLoading}
                onClick={handleUpdateAccounts}
                startIcon={<CachedIcon />}
              >
                Atualizar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Tooltip
            title={<h3>Por gentileza, separe os links com ;</h3>}
            placement="right"
            arrow
          >
            <TextField
              variant="outlined"
              label="Links"
              onBlur={(e) => {
                let tmp = { ...insertedData };
                tmp.links = adjustLinks(e.target.value);
                setInsertedData(tmp);
              }}
              sx={{ width: "100%" }}
            />
          </Tooltip>
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
