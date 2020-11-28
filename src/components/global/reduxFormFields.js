import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";

const ErrorText = ({ error, touched }) =>
  touched && error ? (
    <FormHelperText id="component-error-text" style={{ color: "#f44336" }}>
      {error}
    </FormHelperText>
  ) : null;

const ReduxTextField = ({ input, label, placeholder, fontSize, meta }) => (
  <FormControl fullWidth>
    <InputLabel style={{ fontSize: fontSize || 16 }}>{label}</InputLabel>
    <Input
      style={{ fontSize: fontSize || 16 }}
      {...input}
      error={meta.touched && meta.error}
      placeholder={placeholder}
    />
    <ErrorText error={meta.error} touched={meta.touched} />
  </FormControl>
);

const ReduxSelectField = ({
  input,
  label,
  children,
  classes,
  meta,
  onSelectChange,
  ...custom
}) => (
  <FormControl fullWidth>
    <InputLabel htmlFor="outlined-age-simple">{label}</InputLabel>
    <Select
      {...input}
      onChange={(event) => {
        input.onChange(event.target.value);
        if (onSelectChange) onSelectChange(event);
      }}
      children={children}
      {...custom}
    />
    <ErrorText error={meta.error} touched={meta.touched} />
  </FormControl>
);

const ReduxCheckBox = ({
  label,
  value,
  className,
  checked,
  onClick,
  margin,
}) => (
  <FormControlLabel
    margin={margin === undefined ? "normal" : margin}
    control={
      <Checkbox
        value={value}
        color="primary"
        className={className}
        checked={checked}
        onClick={onClick}
      />
    }
    label={label}
  />
);

const ReduxRadio = ({ className, myvalue, checked, onClick, label }) => (
  <FormControlLabel
    margin="small"
    className={className}
    style={{ color: "#3577d4 !important" }}
    control={
      <Radio
        value={myvalue}
        checked={checked}
        onChange={onClick}
        aria-label="A"
        color="primary"
        className={className}
      />
    }
    label={label}
  />
);

export { ReduxTextField, ReduxSelectField, ReduxCheckBox, ReduxRadio };
