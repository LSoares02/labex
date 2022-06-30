import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import { activityRegister } from "../../helpers/apiCalls";

import ActivityRegisterLeft from "../ActivityRegisterLeft";
import ActivityRegisterRight from "../ActivityRegisterRight";

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

export default function ActivityRegister() {
  const {
    openActivityRegister,
    setOpenActivityRegister,
    extensionPosts,
    setExtensionPosts,
  } = useGlobalState();

  const tomorrow = new Date().setDate(new Date().getDate() + 1);

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [registerFail, setRegisterFail] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);

  const [titleError, setTitleError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [authorsError, setAuthorsError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);

  const [insertedData, setInsertedData] = React.useState({
    id: null,
    title: null,
    type: "Programa",
    initialDate: new Date(),
    finalDate: new Date(tomorrow),
    authors: [],
    description: null,
    image: null,
    links: [],
  });

  React.useEffect(() => {
    if (registerFail) {
      setTimeout(() => setRegisterFail(false), 3000);
    }
  }, [registerFail]);

  React.useEffect(() => {
    checkTitle();
    checkDates();
    checkAuthors();
    checkDescription();
  }, [insertedData]);

  React.useEffect(() => {
    checkValidData();
  }, [titleError, dateError, authorsError, descriptionError]);

  function checkTitle() {
    if (insertedData.title?.length > 30 || !insertedData.title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  }
  function checkDates() {
    if (insertedData.initialDate > insertedData.finalDate) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }
  function checkAuthors() {
    if (insertedData.authors.length === 0) {
      setAuthorsError(true);
    } else {
      setAuthorsError(false);
    }
  }
  function checkDescription() {
    if (insertedData.description?.length > 500 || !insertedData.description) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  }
  function checkValidData() {
    if (titleError || dateError || authorsError || descriptionError) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }
  function cleanInsertedData() {
    setInsertedData({
      id: null,
      title: null,
      type: "Programa",
      initialDate: new Date(),
      finalDate: new Date(tomorrow),
      authors: [],
      description: null,
      image: null,
      links: [],
    });
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
      alert("Este nome já foi utilizado");
      setRegisterFail(true);
    }
    setButtonLoading(false);
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
              <ActivityRegisterLeft
                insertedData={insertedData}
                setInsertedData={setInsertedData}
              />
              <ActivityRegisterRight
                insertedData={insertedData}
                setInsertedData={setInsertedData}
              />
            </Grid>
            <LoadingButton
              variant="contained"
              size="large"
              color={registerFail ? "error" : "primary"}
              loading={buttonLoading}
              onClick={handleRegisterClick}
              disabled={invalid}
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
