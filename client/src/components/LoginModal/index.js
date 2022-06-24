import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

import { useGlobalState } from "../../hooks/globalState";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { login } from "../../helpers/apiCalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const navigate = useNavigate();
  const { openLogin, setOpenLogin, setAccount } = useGlobalState();

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [insertedData, setInsertedData] = React.useState({
    email: "",
    password: "",
  });
  const [loginFail, setLoginFail] = React.useState(false);

  React.useEffect(() => {
    if (loginFail) {
      setTimeout(() => setLoginFail(false), 3000);
    }
  }, [loginFail]);

  function handleClose() {
    cleanInsertedData();
    setOpenLogin(false);
  }
  async function handleLoginClick() {
    setButtonLoading(true);
    const response = await login(insertedData);
    if (response) {
      setAccount(response);
      setOpenLogin(false);
    } else {
      setLoginFail(true);
    }
    cleanInsertedData();
    setButtonLoading(false);
  }
  async function handleSignupClick() {
    navigate("/");
    cleanInsertedData();
    setOpenLogin(false);
  }
  function cleanInsertedData() {
    setInsertedData({
      email: "",
      password: "",
    });
  }
  return (
    <div>
      <Modal
        open={openLogin}
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
            Bem-vindo(a)! Faça login abaixo:
          </Typography>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              label="E-mail"
              onChange={(e) => {
                let tmp = { ...insertedData };
                tmp.email = e.target.value;
                setInsertedData(tmp);
              }}
            />
            <TextField
              variant="outlined"
              label="Senha"
              type="password"
              onChange={(e) => {
                let tmp = { ...insertedData };
                tmp.password = e.target.value;
                setInsertedData(tmp);
              }}
            />

            <LoadingButton
              variant="contained"
              size="medium"
              color={loginFail ? "error" : "primary"}
              loading={buttonLoading}
              onClick={handleLoginClick}
            >
              Login
            </LoadingButton>
            <Button
              variant="outlined"
              size="medium"
              onClick={handleSignupClick}
            >
              Primeiro acesso? Cadastre-se aqui
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
