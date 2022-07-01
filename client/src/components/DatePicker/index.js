import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DatePicker({ value, setValue, date, label }) {
  const handleChange = (newValue) => {
    console.log(newValue);
    const tmp = { ...value };
    tmp[date] = newValue;
    setValue(tmp);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="dd/MM/yyyy"
        value={value[date]}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: "100%" }} />
        )}
      />
    </LocalizationProvider>
  );
}
