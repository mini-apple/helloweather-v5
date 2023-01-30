import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function InputTemperature({ data, setData, text, setText }) {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setData({ ...data, temperature: value });
    setText(value);
  };

  return (
    <Box
      className="form-element"
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="기온"
        variant="outlined"
        type="number"
        onChange={onChange}
        value={text}
        InputProps={{
          endAdornment: <InputAdornment position="end">°C</InputAdornment>,
        }}
        size="small"
      />
    </Box>
  );
}

export default InputTemperature;
