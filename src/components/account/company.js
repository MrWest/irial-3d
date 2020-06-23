import React from "react";
import { IconUpload, IconSULogo } from "../icons";
import FileimageInput from "../fileImageInput";
import {
  Grid,
  Button,
  Select,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

import { Field } from "redux-form";
import wholestates from "../../apis/usStates";

const renderTextField = ({ input, label, placeholder, classes, meta }) => {
  return (
    <FormControl fullWidth className="">
      <InputLabel>{label}</InputLabel>
      <Input
        {...input}
        error={meta.touched && meta.error && true}
        placeholder={placeholder}
      />
      {renderError(meta)}
    </FormControl>
  );
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <FormHelperText id="component-error-text" style={{ color: "#f44336" }}>
        {error}
      </FormHelperText>
    );
  }
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, value },
  children,
  error,
  ...custom
}) => (
  <FormControl fullWidth className="">
    <InputLabel htmlFor="outlined-age-simple">{label}</InputLabel>
    <Select
      // floatingLabelText={label}
      error={error}
      {...input}
      onChange={(event, index, value) => input.onChange(event.target.value)}
      children={children}
      {...custom}
    />
    <FormHelperText id="component-error-text" style={{ color: "#f44336" }}>
      {error}
    </FormHelperText>
  </FormControl>
);

class Company extends React.Component {
  state = {
    state: this.props.company.shipping_state,
    logo: this.props.company.logo,
    secondary_logo: this.props.company.secondary_logo
  };

  handleChange = event => {
    this.setState({ state: event.target.value });
  };
  QuickUpdateCompany = file => {
    this.setState({ logo: URL.createObjectURL(file) });
  };
  QuickUpdateCompany2 = file => {
    this.setState({ secondary_logo: URL.createObjectURL(file) });
  };

  normalizePhone = value => {
    if (!value) {
      return value;
    }

    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 3) {
      return onlyNums;
    }
    if (onlyNums.length <= 7) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
      6,
      10
    )}`;
  };

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <p style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Company
          </p>
          <hr style={{ height: 1, backgroundColor: "#999999" }} />
        </Grid>
        <Grid item xs={6}>
          <p style={{ marginBottom: 16 }}>
            <strong>LOGO</strong>{" "}
            <span style={{ fontSize: 12 }}>
              File formats: .pdf, .png, .ai, .eps, .jpeg
            </span>
          </p>
          <Grid container spacing={4}>
            <Grid item>
              {(this.props.company.logo === undefined ||
                this.props.company.logo === "") &&
              this.state.logo === undefined ? (
                <div
                  style={{
                    backgroundColor: "#3577d4",
                    width: 78,
                    height: 78,
                    borderRadius: 39,
                    paddingLeft: 18,
                    paddingTop: 18
                  }}
                >
                  <IconSULogo width={50} height={60} />
                </div>
              ) : (
                <div
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: 39
                  }}
                >
                  <img
                    style={{ width: 78, height: 78, borderRadius: 39 }}
                    src={this.state.logo}
                    alt=""
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: 78, height: 78, display: "table" }}>
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    style={{
                      paddingTop: 10,
                       paddingBottom: 10,
                      paddingLeft: 64,
                      paddingRight: 64,
                      color: "#3577d4",
                      border: "2px solid #3577d4"
                    }}
                  >
                    <strong>Upload</strong>
                    <Field
                      type="file"
                      name="logo"
                      component={FileimageInput}
                      onChange={this.QuickUpdateCompany}
                    />
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <p style={{ marginBottom: 16 }}>
            <strong>SECOND LOGO</strong>{" "}
            <span style={{ fontSize: 12 }}>
              File formats: .pdf, .png, .ai, .eps, .jpeg
            </span>
          </p>
          <Grid container spacing={4}>
            <Grid item>
              {(this.props.company.secondary_logo === undefined ||
                this.props.company.secondary_logo === "") &&
              this.state.secondary_logo === undefined ? (
                <div
                  style={{
                    border: "1px solid #dddddd",
                    width: 78,
                    height: 78,
                    borderRadius: 39,
                    paddingLeft: 18,
                    paddingTop: 16
                  }}
                >
                  <IconUpload fill="#d4d9e2" width={40} height={40} />
                </div>
              ) : (
                <div
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: 39
                  }}
                >
                  <img
                    style={{ width: 78, height: 78, borderRadius: 39 }}
                    src={this.state.secondary_logo}
                    alt=""
                  />
                </div>
              )}
            </Grid>
            <Grid item>
              <div style={{ width: 78, height: 78, display: "table" }}>
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    style={{
                      paddingTop: 10,
                       paddingBottom: 10,
                      paddingLeft: 64,
                      paddingRight: 64,
                      color: "#3577d4",
                      border: "2px solid #3577d4"
                    }}
                  >
                    <strong>Upload</strong>
                    <Field
                      type="file"
                      name="secondary_logo"
                      component={FileimageInput}
                      onChange={this.QuickUpdateCompany2}
                    />
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <p
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase"
            }}
          >
            Company information
          </p>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Field
            name="name"
            margin="small"
            fullWidth
            autoComplete="name"
            htmlFor="text"
            component={renderTextField}
            label="Company name"
          />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Field
            name="shipping_address1"
            margin="small"
            fullWidth
            autoComplete="phone"
            htmlFor="phone"
            component={renderTextField}
            label="Company address"
            normalize={this.normalizePhone}
          />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Field
            name="shipping_address2"
            margin="small"
            fullWidth
            autoComplete="phone"
            htmlFor="text"
            component={renderTextField}
            label="Floor, suite, unit (optional)"
          />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Field
            name="shipping_city"
            margin="small"
            fullWidth
            autoComplete="text"
            htmlFor="text"
            component={renderTextField}
            label="City"
          />
        </Grid>
        <Grid item xs={6} style={{ paddingTop: 0 }}>
          <Field
            name="shipping_zip"
            margin="small"
            fullWidth
            autoComplete="zip"
            htmlFor="text"
            component={renderTextField}
            label="Zip code"
          />
        </Grid>
        <Grid item xs={6} style={{ paddingTop: 0 }}>
          <Field
            fullWidth
            name="shipping_state"
            component={renderSelectField}
            label="State"
            value={this.state.state}
            // onSelectionChange={this.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {wholestates.map((state, index) => (
              <MenuItem key={index} value={state.abbreviation}>
                <p style={{ fontSize: 14, marginBottom: 0 }}>{state.name}</p>
              </MenuItem>
            ))}
          </Field>
        </Grid>
      </Grid>
    );
  }
}

export default Company;
