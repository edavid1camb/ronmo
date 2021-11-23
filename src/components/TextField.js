import { Grid, TextField as MUITextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

export const TextField = ({ name, placeholder, type= "text"}) => {
  const [field, meta] = useField({ name });
  const errorMsg = meta.error && meta.touched ? meta.error : undefined;
  const isError = errorMsg !== undefined;

  return (
    <Grid item xs={12}>
      <MUITextField
        {...field}
        error={isError}
        placeholder={placeholder}
        margin="dense"
        type={type}
        fullWidth
        helperText={errorMsg}
      />
    </Grid>
  );
};
