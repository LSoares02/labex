import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const Input = styled("input")({
  display: "none",
});

export default function ActivityRegisterRight({
  insertedData,
  setInsertedData,
}) {
  const [fileUploaded, setFileUploaded] = React.useState(false);
  function handleFileUpload(e) {
    setFileUploaded(true);
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const tmp = { ...insertedData };
      tmp.image = reader.result;
      setInsertedData(tmp);
      setTimeout(() => setFileUploaded(false), 1000);
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
        <Button
          variant="contained"
          component="label"
          size="large"
          disabled={fileUploaded}
          endIcon={fileUploaded ? <HourglassBottomIcon /> : ""}
        >
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
