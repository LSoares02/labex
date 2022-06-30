import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
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

export default function ActivityRegisterRight({
  insertedData,
  setInsertedData,
}) {
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
  );
}
