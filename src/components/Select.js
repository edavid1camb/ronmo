import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@material-ui/core";
import React from "react";

export const Select = ({ label, value, setValue, options }) => {
  return (
    <FormControl>
      <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
      <MUISelect
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
