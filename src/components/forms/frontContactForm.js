import React from "react";
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { sendEmail } from "../../actions";
import { Form, reduxForm, Field, initialize } from "redux-form";

import { required, email, length, format } from "redux-form-validators";

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
  formInner: {
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 124,
    },
  },
});

const validations = {
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
    const { pristine, classes } = this.props;
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))}
      >
        <Grid container spacing={4} classes={classes.formInner}>
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
              type="submit"
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
  };
};
export default connect(mapStateToProps, { initialize, sendEmail })(
  reduxForm({ form: "frontContactForm", enableReinitialize: true, validate })(
    withStyles(styles)(FrontContactForm)
  )
);
