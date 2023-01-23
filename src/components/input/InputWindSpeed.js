import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function InputWindSpeed({ windSpeed, setWindSpeed }) {
  const onChange = (event) => {
    setWindSpeed(event.target.value);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">풍속</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={windSpeed}
          label="WindSpeed"
          onChange={onChange}
        >
          <MenuItem value={0}>0 m/s ≤ ~ &lt; 0.5 m/s</MenuItem>
          <MenuItem value={1}>0.5 m/s ≤ ~ &lt; 5 m/s</MenuItem>
          <MenuItem value={2}>5 m/s ≤ ~ &lt; 10 m/s</MenuItem>
          <MenuItem value={3}>10 m/s ≤ ~ &lt; 15 m/s</MenuItem>
          <MenuItem value={4}>15 m/s ≤ ~ &lt; 20 m/s</MenuItem>
          <MenuItem value={5}>20 m/s 이상</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputWindSpeed;
