import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function InputTemperature({ temperature, setTemperature }) {
  const onChange = (event) => {
    setTemperature(event.target.value);
  };
  return (
    <Box noValidate autoComplete="off" sx={{ width: 120 }}>
      <TextField
        id="outlined-basic"
        label="기온"
        variant="outlined"
        type="number"
        onChange={onChange}
        value={temperature}
        InputProps={{
          endAdornment: <InputAdornment position="end">°C</InputAdornment>,
        }}
      />
    </Box>
  );
}

export default InputTemperature;
