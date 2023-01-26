import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function InputTemperature({ data, setData }) {
  const [text, setText] = useState(null);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setData({ ...data, temperature: value });
    setText(value);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ width: 120 }}>
      <TextField
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
