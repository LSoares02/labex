import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/globalState";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Header from "../../components/Header";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../helpers/theme";

import "./style.css";

import { register } from "../../helpers/apiCalls";

export default function Register() {
  const { setAccount } = useGlobalState();
  const navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [insertedData, setInsertedData] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  function checkName() {
    if (insertedData.name?.length > 50 || !insertedData.name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }
  function checkEmail() {
    if (
      !insertedData.email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ||
      !insertedData.email
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }
  function checkPassword() {
    if (
      !insertedData.password?.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g) ||
      !insertedData.password
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }
  function checkValidData() {
    if (nameError || emailError || passwordError) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }

  async function handleClick() {
    const response = await register(insertedData);
    if (response) {
      setAccount(insertedData);
      navigate("/");
    } else {
      setRegisterFail(true);
    }
  }

  React.useEffect(() => {
    if (registerFail) {
      setTimeout(() => setRegisterFail(false), 3000);
    }
  }, [registerFail]);

  useEffect(() => {
    checkName();
    checkEmail();
    checkPassword();
  }, [insertedData]);

  useEffect(() => {
    checkValidData();
  }, [nameError, emailError, passwordError]);

  return (
    <ThemeProvider theme={theme}>
      <div id="top">
        <Header />
      </div>
      <Container maxWidth="sm" sx={{ height: "100%", marginTop: 10 }}>
        <Paper elevation={12} sx={{ padding: 2 }}>
          <Typography variant="h3" gutterBottom component="div">
            Cadastro
          </Typography>
          <Stack spacing={4}>
            <TextField
              id="nameInput"
              label="Nome"
              variant="outlined"
              error={nameError && insertedData.name}
              onBlur={(e) => {
                console.log(e.target.value);
                let tmp = { ...insertedData };
                tmp.name = e.target.value.trim();
                setInsertedData(tmp);
              }}
            />
            <TextField
              id="emailInput"
              label="E-mail"
              variant="outlined"
              error={emailError && insertedData.email}
              onBlur={(e) => {
                let tmp = { ...insertedData };
                tmp.email = e.target.value;
                setInsertedData(tmp);
              }}
            />
            <Tooltip
              title={
                <h3>
                  A senha deve ter no mínimo 8 caracteres, sendo pelo menos uma
                  letra maiúscula, uma minúscula e um número.
                </h3>
              }
              placement="right"
              arrow
            >
              <TextField
                id="passwordInput"
                label="Senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                color="secondary"
                error={passwordError && insertedData.password}
                value={insertedData.password}
                onChange={(e) => {
                  let tmp = { ...insertedData };
                  tmp.password = e.target.value.replace(/ /g, "");
                  setInsertedData(tmp);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>
            <LoadingButton
              variant="contained"
              size="large"
              disabled={invalid}
              color={registerFail ? "error" : "primary"}
              loading={buttonLoading}
              onClick={handleClick}
            >
              Cadastrar
            </LoadingButton>
          </Stack>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
