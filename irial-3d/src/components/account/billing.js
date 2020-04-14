import React from "react";
import {
  Grid,
  Radio,
  Select,
  FormControlLabel,
  Checkbox,
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

const renderCheckbox = ({
  input,
  label,
  value,
  className,
  checked,
  onClick,
  margin
}) => (
  <FormControlLabel
    margin={margin == undefined ? "normal" : margin}
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

const renderRadio = ({ className, myvalue, checked, onClick, label }) => (
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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error, value },
  children,
  ...custom
}) => (
  <FormControl fullWidth className="">
    <InputLabel htmlFor="outlined-age-simple">{label}</InputLabel>
    <Select
      // floatingLabelText={label}
      // errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(event.target.value)}
      children={children}
      {...custom}
    />
  </FormControl>
);

function InfoImported({ company }) {
  return (
    <div>
      <p>{company.name}</p>
      <p>{company.shipping_address1}</p>
      <p>
        {company.shipping_city}, {company.shipping_state} {company.shipping_zip}
      </p>
    </div>
  );
}

function normalizePhone(value) {
  // alert(value)
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
}

function Company({ owner }) {
  const classes = theme => ({
    firstGrid: {
      paddingTop: 0
    },
    spaceTop: {
      paddingTop: 20
    }
  });
  return (
    <Grid container spacing={4}>
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
          name="billing_address1"
          margin="small"
          fullWidth
          autoComplete="phone"
          htmlFor="phone"
          component={renderTextField}
          label="Company address"
        />
      </Grid>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Field
          name="billing_address2"
          margin="small"
          fullWidth
          autoComplete="billing_address2"
          htmlFor="text"
          component={renderTextField}
          label="Floor, suite, unit (optional)"
        />
      </Grid>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Field
          name="billing_city"
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
          name="billing_zip"
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
          name="billing_state"
          component={renderSelectField}
          label="State"
          myvalue={owner.state.state}
          // onSelectionChange={owner.handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {wholestates.map(state => (
            <MenuItem value={state.abbreviation}>
              <p style={{ fontSize: 14, marginBottom: 0 }}>{state.name}</p>
            </MenuItem>
          ))}
        </Field>
      </Grid>
    </Grid>
  );
}
class Billing extends React.Component {
  state = {
    checkedB: true,
    method: this.props.company.payment_profile
      ? this.props.company.payment_profile.payment_method
      : "credit card",
    accType: "",
    modalOpen: false
  };

  handleChangeMethod = event => {
    this.setState({ method: event.target.value });
  };
  handleChangeAccount = event => {
    this.setState({ accType: event.target.value });
  };
  handleCloseModalPrivacy = () => {
    this.setState({ modalOpen: false });
  };
  handleOpenModalPrivacy = () => {
    this.setState({ modalOpen: true });
  };
  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const classes = theme => ({
      color: {
        color: "#3577D4 !important"
      }
    });
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <p style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Billing
          </p>
          <hr style={{ height: 1, backgroundColor: "#999999" }} />
        </Grid>

        <Grid item xs={12} style={{  paddingBottom: 0 }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase"
            }}
          >
            Payment method
          </p>
        </Grid>
        <Grid item xs={12} className={classes.firstGrid}>
          <Field
            name="sameInfo"
            label="Billing address same as company   address"
            component={renderCheckbox}
            className={classes.color}
            checked={this.state.checkedB}
            onClick={this.handleChangeCheck("checkedB")}
            value="checkedB"
            margin="small"
          />
        </Grid>
        <Grid item xs={12} className={classes.firstGrid}>
          {this.state.checkedB ? (
            <InfoImported company={this.props.company} />
          ) : (
            <Company owner={this} />
          )}
        </Grid>
        <Grid item xs={12}>
          <div>
            <Field
              name="creditcard"
              label="Credit card"
              component={renderRadio}
              className={classes.color}
              checked={this.state.method == "credit card"}
              onClick={this.handleChangeMethod}
              myvalue="credit card"
              margin="small"
            />

            <Field
              name="creditcard"
              label="ACH"
              component={renderRadio}
              className={classes.color}
              checked={this.state.method == "ACH"}
              onClick={this.handleChangeMethod}
              myvalue="b"
              margin="small"
            />
          </div>
        </Grid>

        {this.state.method === "credit card" ? (
          <React.Fragment>
            <Grid item xs={12} className={classes.firstGrid}>
              <Field
                name="cardNumber"
                margin="small"
                fullWidth
                autoComplete="ccnumber"
                htmlFor="text"
                component={renderTextField}
                label="Credit card number"
              />
            </Grid>
            <Grid item xs={6} className={classes.firstGrid}>
              <Field
                name="expirationDate"
                margin="small"
                fullWidth
                autoComplete="ccnumber"
                htmlFor="date"
                component={renderTextField}
                label="Expiration date"
              />
            </Grid>

            <Grid item xs={6} className={classes.firstGrid}>
              <Field
                name="cvc"
                margin="small"
                fullWidth
                autoComplete="ccnumber"
                htmlFor="text"
                component={renderTextField}
                label="CVC"
              />
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item xs={12} className={classes.firstGrid}>
              <Field
                fullWidth
                name="account_type"
                component={renderSelectField}
                label=" Account type"
                myvalue={this.state.accType}
                // onSelectionChange={this.handleChangeAccount}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="checking">
                  <p style={{ fontSize: 14, marginBottom: 0 }}>Checking</p>
                </MenuItem>
                <MenuItem value="saving">
                  <p style={{ fontSize: 14, marginBottom: 0 }}>Saving</p>
                </MenuItem>
              </Field>
            </Grid>
            <Grid item xs={12} className={classes.firstGrid}>
              <Field
                name="naccount"
                margin="small"
                fullWidth
                autoComplete="ccnumber"
                htmlFor="text"
                component={renderTextField}
                label="Name on account"
              />
            </Grid>
            <Grid item xs={6} className={classes.firstGrid}>
              <Field
                name="rnumber"
                margin="small"
                fullWidth
                autoComplete="ccnumber"
                htmlFor="text"
                component={renderTextField}
                label="Routing number"
              />
            </Grid>

            <Grid item xs={6} className={classes.firstGrid}>
              <Field
                name="anumber"
                margin="small"
                fullWidth
                autoComplete="ccnumber"
                htmlFor="text"
                component={renderTextField}
                label="Account number"
              />
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    );
  }
}

export default Billing;
