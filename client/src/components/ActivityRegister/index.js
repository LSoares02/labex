import * as React from "react";

import { useGlobalState } from "../../hooks/globalState";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { activityRegister } from "../../helpers/apiCalls";

import DatePicker from "../DatePicker";

import { styled } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxHeight: 420,
};

const Input = styled("input")({
  display: "none",
});

export default function ActivityRegister() {
  const {
    openActivityRegister,
    setOpenActivityRegister,
    extensionPosts,
    setExtensionPosts,
  } = useGlobalState();

  const tomorrow = new Date().setDate(new Date().getDate() + 1);

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [insertedData, setInsertedData] = React.useState({
    id: "",
    title: "",
    type: "Programa",
    initialDate: new Date(),
    finalDate: new Date(tomorrow),
    authors: [],
    description: "",
    image: "",
    links: [],
  });
  const [registerFail, setRegisterFail] = React.useState(false);

  React.useEffect(() => {
    if (registerFail) {
      setTimeout(() => setRegisterFail(false), 3000);
    }
  }, [registerFail]);

  React.useEffect(() => {
    console.log(insertedData);
  }, [insertedData]);

  function handleSelectChange(event) {
    const tmp = { ...insertedData };
    tmp.type = event.target.value;
    setInsertedData(tmp);
  }
  function handleClose() {
    cleanInsertedData();
    setOpenActivityRegister(false);
  }
  async function handleRegisterClick() {
    setButtonLoading(true);
    const response = await activityRegister(insertedData);
    if (response) {
      const tmp = { ...extensionPosts };
      tmp.values.push(insertedData);
      setExtensionPosts(tmp);
      setOpenActivityRegister(false);
      cleanInsertedData();
    } else {
      setRegisterFail(true);
    }
    setButtonLoading(false);
  }
  function cleanInsertedData() {
    setInsertedData({
      id: "",
      title: "",
      type: "Programa",
      initialDate: new Date(),
      finalDate: new Date(tomorrow),
      authors: [],
      description: "",
      image: "",
      links: [],
    });
  }
  function handleFileUpload(e) {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const tmp = { ...insertedData };
      tmp.image = reader.result;
      setInsertedData(tmp);
    };
    reader.readAsDataURL(img);
  }

  return (
    <div>
      <Modal
        open={openActivityRegister}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ paddingBottom: 2 }}
          >
            Registro de nova Atividade:
          </Typography>
          <Stack spacing={2}>
            <Grid container spacing={2}>
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
                    <Select
                      id="demo-simple-select"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Autores"
                      onBlur={(e) => {
                        let tmp = { ...insertedData };
                        tmp.authors.length > 0 &&
                        !tmp.authors.includes(
                          (author) => author.name === e.target.value
                        )
                          ? tmp.authors.push({ name: e.target.value })
                          : (tmp.authors = [{ name: e.target.value }]);
                        setInsertedData(tmp);
                      }}
                      sx={{ width: "100%" }}
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
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    multiline
                    maxRows={9.9}
                    minRows={9.9}
                    label="Descrição"
                    onChange={(e) => {
                      let tmp = { ...insertedData };
                      tmp.description = e.target.value;
                      setInsertedData(tmp);
                    }}
                    sx={{ width: "100%" }}
                  />
                  <Button variant="contained" component="label" size="large">
                    Upload de Imagem
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <LoadingButton
              variant="contained"
              size="large"
              color={registerFail ? "error" : "primary"}
              loading={buttonLoading}
              onClick={handleRegisterClick}
              sx={{ width: "100%" }}
            >
              Cadastrar
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
