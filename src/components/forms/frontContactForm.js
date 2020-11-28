import React from "react";
import {
  Grid,
  Button,
  Select,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  TextField,
  OutlinedInput,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { FixedButton, CoolButton } from "../buttons";
import { sendEmail } from "../../actions";
import { Form, reduxForm, Field, initialize } from "redux-form";

import {
  required,
  email,
  date,
  length,
  numericality,
  format,
} from "redux-form-validators";

const renderTextField = ({ input, label, placeholder, classes, meta }) => {
  return (
    <FormControl fullWidth className="">
      <OutlinedInput
        {...input}
        error={meta.touched && meta.error && true}
        placeholder={label}
        classes={{ input: classes }}
      />
      {renderError(meta)}
    </FormControl>
  );
};

const renderTextArea = ({ input, label, placeholder, classes, meta }) => {
  return (
    <FormControl fullWidth className="">
      <OutlinedInput
        {...input}
        placeholder={label}
        error={meta.touched && meta.error && true}
        multiline={true}
        classes={{ root: classes }}
        rows={5}
      />
      {/* <TextField
          {...input}
          error={meta.touched && meta.error && true}
          placeholder={placeholder}
          multiLine={true}
            rows={4}
            rowsMax={4}
        /> */}

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

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <Select
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(event)}
    children={children}
    {...custom}
  />
);

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 8,
    paddingBottom: 8,
    background: "transparent",
  },
  orderButton: {
    background: "#ffffff",
    color: "#3577D4",
    fontWeight: "bold",
    width: "100%",
  },
  orderBottomButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "100%",
    fontWeight: "bold",
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 4,
    height: 52,
    width: "100%",
    fontSize: 24,
    letterSpacing: 2,
    fontStyle: "normal",
    color: "#e3a304",
    backgroundColor: "#1c5375",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#0c4365",
      color: "#f3b314",
    },
  },
  renderInput: {
    border: "2px solid #1c5375",
  },
  actionIconDisabled: {
    color: "#5f5f5f",
  },
  actionButtonDisabled: {
    borderRadius: 4,
    height: 52,
    width: "100%",
    fontSize: 24,
    letterSpacing: 2,
    fontStyle: "normal",
    color: "#5ca3c5 !important",
    backgroundColor: "#1c5375",
    textTransform: "none",
    "&:hover": {
      cursor: "not-allowed !important",
    },
  },
});

const validations = {
  // amount: [
  //   required({ msg: "Required" }),
  //   numericality({
  //     int: true,
  //     ">=": 50,
  //     msg: { greaterThanOrEqualTo: "You must be at least 50 swag packs" }
  //   })
  // ],
  // budget: [
  //   required({ msg: "Required" }),
  //   numericality({
  //     int: true
  //   })
  // ],

  email: [
    required({ msg: "Required" }),
    email(),
    format({
      width: /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail)\.com$/i,
      message: { defaultMessage: "Must use corporate email address" },
    }),
  ],
  first_name: [
    required({ msg: "Required" }),
    length({ min: 3 }),
    format({
      with: /^[a-zA-Z\s]*$/i,
      message: { defaultMessage: "Letters only" },
    }),
  ],
  last_name: [
    required({ msg: "Required" }),
    length({ min: 3 }),
    format({
      with: /^[a-zA-Z\s]*$/i,
      message: { defaultMessage: "Letters only" },
    }),
  ],

  subject: [required({ msg: "Required" })],
  name: [required({ msg: "Required" })],
};

// Reusable with any other form
const validate = (values) => {
  const errors = {};
  for (let field in validations) {
    let value = values[field];
    errors[field] = validations[field]
      .map((validateField) => {
        return validateField(value, values);
      })
      .find((x) => x);
  }
  let regex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(xxx|zzz).com$"
  );
  if (regex.test(values.email)) {
    errors.email = "Must use corporate email address";
  }
  return errors;
};

class FrontContactForm extends React.Component {
  state = { emailStatus: undefined, isSending: false };

  realhandleSubmit = async (data) => {
    if (data) {
      this.setState({ isSending: true });
      // data.service = this.props.tour.name + " Booking"

      const { change } = this.props;

      this.props
        .sendEmail(data)
        .then((rslt) => {
          this.setState({ emailStatus: rslt.data, isSending: false });

          change("first_name", undefined);
          change("email", undefined);
          change("subject", undefined);
          change("message", undefined);
        })
        .catch((e) => {
          this.setState({ emailStatus: e.message, isSending: false });

          change("first_name", undefined);
          change("email", undefined);
          change("subject", undefined);
          change("message", undefined);
        });
    }
  };

  render() {
    const { pristine, reset, submitting, classes } = this.props;
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
            <Field
              name="first_name"
              margin="small"
              type="text"
              fullWidth
              autoComplete="first_name"
              component={renderTextField}
              label={this.props.language.Name}
              classes={classes.renderInput}
            />
          </Grid>

          <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
            <Field
              name="email"
              margin="small"
              type="email"
              fullWidth
              autoComplete="email"
              component={renderTextField}
              classes={classes.renderInput}
              label={this.props.language.ContactEmail}
            />
          </Grid>

          <Grid item xs={12} style={{ paddingTop: 0 }}>
            <Field
              name="subject"
              margin="small"
              fullWidth
              autoComplete="subject"
              type="text"
              component={renderTextField}
              classes={classes.renderInput}
              label={this.props.language.Subject}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingTop: 0 }}>
            <Field
              name="message"
              component={renderTextArea}
              margin="small"
              fullWidth
              type="text"
              classes={classes.renderInput}
              label={this.props.language.Message}
            />
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 10, textAlign: "right" }}>
            <Button
              className={
                pristine ? classes.actionButtonDisabled : classes.actionButton
              }
              disabled={pristine}
            >
              {this.state.isSending
                ? this.props.language.Sending
                : this.props.language.Send}
            </Button>
          </Grid>
          <Grid item xs={8} style={{ paddingBottom: 0, minHeight: 36 }}>
            {this.state.emailStatus && (
              <p
                style={{
                  textAlign: "right",
                  color:
                    this.state.emailStatus ===
                    "Your message was sent successfully!"
                      ? "#3aa53a"
                      : "#f44336",
                }}
              >
                {this.state.emailStatus}
              </p>
            )}
          </Grid>
        </Grid>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountView: state.accountView,
    profile: state.profile,
    company: state.company,
    userInfo: state.sign.userInfo,
    language: state.language,
    initialValues: state.signFacebook,
    //     first_name: state.sign.userInfo.given_name,
    //     last_name: state.sign.userInfo.family_name,
    //     phone_number: state.profile.phone_number,
    //     email: state.sign.userInfo.email,
    //     name: state.company.name,
    //     phone: state.company.phone,
    //     shipping_address1: state.company.shipping_address1,
    //     shipping_address2: state.company.shipping_address2,
    //     shipping_city: state.company.shipping_city,
    //     shipping_zip: state.company.shipping_zip,
    //     shipping_state: state.company.shipping_state,
    //     billing_address1: state.company.billing_address1,
    //     billing_address2: state.company.billing_address2? state.company.billing_address2:"",
    //     billing_city: state.company.billing_city,
    //     billing_zip: state.company.billing_zip,
    //     billing_state: state.company.billing_state,
    //     cardNumber: state.company.payment_profile?state.company.payment_profile.credit_card?state.company.payment_profile.credit_card.cardNumber:"": "",
    //     cardType: state.company.payment_profile?state.company.payment_profile.credit_card?state.company.payment_profile.credit_card.cardType:"": "",
    //     expirationDate: state.company.payment_profile?state.company.payment_profile.credit_card?state.company.payment_profile.credit_card.expirationDate:"": "",
    //   }
  };
};
export default connect(mapStateToProps, { initialize, sendEmail })(
  reduxForm({ form: "frontContactForm", enableReinitialize: true, validate })(
    withStyles(styles)(FrontContactForm)
  )
);
