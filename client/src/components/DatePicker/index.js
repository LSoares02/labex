import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";

export default function DatePicker({ value, setValue, date, label }) {
  const handleChange = (newValue) => {
    console.log(newValue);
    const tmp = { ...value };
    tmp[date] = newValue;
    setValue(tmp);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        inputFormat="DD/MM/YYYY"
        value={value[date]}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: "100%" }} />
        )}
      />
    </LocalizationProvider>
  );
}
