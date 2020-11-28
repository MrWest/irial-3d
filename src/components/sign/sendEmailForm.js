import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { CoolButton } from "../buttons";
import { connect } from "react-redux";
import { Form, reduxForm, initialize, Field } from "redux-form";
import {
  GetLogingUser,
  prepareRecoveryEmail,
  confirmActivity,
} from "../../actions";
import {
  required,
  email,
  length,
  numericality,
  format,
} from "redux-form-validators";
import { FormHelperText } from "@material-ui/core";

const validations = {
  email: [
    required({ msg: "Required" }),
    email(),
    format({
      width: /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(xxx|zzz)\.com$/i,
      message: { defaultMessage: "Must use corporate email address" },
    }),
  ],
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
    "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(xxx|sss).com$"
  );
  if (regex.test(values.email)) {
    errors.email = "Must use corporate email address";
  }

  return errors;
};

const renderTextField = ({
  input,
  label,
  placeholder,
  classes,
  meta,
  readOnly,
  myerror,
}) => {
  return (
    <FormControl fullWidth className="">
      <InputLabel>{label}</InputLabel>
      <Input
        {...input}
        error={meta.touched && meta.error && true}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {myerror ? renderError(myerror) : renderError(meta)}
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

class SendEmailForm extends Component {
  state = { myerror: undefined, processStatus: undefined };

  handleTextChange = async (event) => {
    //  alert(event.target.value)
    if (
      event.target.value &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)
    ) {
      // alert(event.target.value)
      let response = await GetLogingUser({
        email: event.target.value,
        login_type: "facebook",
        password: "values.password",
      });

      //  console.log("res", response.message)
      if (response.message === "No such user is registered") {
        this.setState({
          myerror: {
            error: "There is no account using this email",
            touched: true,
          },
        });
        // console.log("resIn", response)
      } else this.setState({ myerror: undefined });
    }
  };

  realhandleSubmit = async (data) => {
    if (!this.state.myerror) {
      // data.id = this.props.sign.loginInfo.id;
      let rslt = await this.props.prepareRecoveryEmail(data);
      let link =
        '<a href="https://vinalestraveler.com/rpassword/' +
        rslt.id +
        "-" +
        rslt.email.replace("@", "&").replace(".", "_") +
        '">Reset password</a>';
      //alert(link);

      let message =
        "Hi ,<br/> Someone recently requested a password change for your Vinales Traveler account. If this was you, follow the link below: <br/>" +
        link;

      this.props.confirmActivity({
        email: data.email,
        subject: "Password recovery",
        message,
      });

      this.setState({ processStatus: true });
      //alert(message);
    }
  };

  render() {
    const { classes, language } = this.props;

    if (this.state.processStatus) {
      return (
        <div className={classes.main}>
          <CssBaseline />
          <Form
            onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))}
            className={classes.form}
          >
            <Paper
              className={classes.paper}
              elevation={0}
              style={{ paddingBottom: 60 }}
            >
              <div>
                <p align="left" className={classes.bold32}>
                  {language.OperationSuccessful}
                </p>
                <p align="left" className={classes.bottomText}>
                  {language.EmailSendInstruction}
                </p>
              </div>
            </Paper>
          </Form>
        </div>
      );
    }

    return (
      <div className={classes.main}>
        <CssBaseline />
        <Form
          onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))}
          className={classes.form}
        >
          <Paper
            className={classes.paper}
            elevation={0}
            style={{ paddingBottom: 60 }}
          >
            <div>
              <p align="left" className={classes.bold32}>
                {language.ForgotQuestion}
              </p>
              <p align="left" className={classes.bottomText}>
                {language.ForgotInstructions}
              </p>
            </div>
            <form className={classes.form}>
              <div>
                <Field
                  name="email"
                  margin="small"
                  fullWidth
                  autoComplete="email"
                  type="email"
                  component={renderTextField}
                  label={language.AccountEmailAddress}
                  myerror={this.state.myerror}
                  onChange={this.handleTextChange.bind(this)}
                />
              </div>

              <div style={{ paddingTop: 50 }}>
                <CoolButton
                  height={56}
                  width={245}
                  fill={"#337ab7"}
                  color={"#ffffff"}
                >
                  {language.Submit}
                </CoolButton>
              </div>
            </form>
          </Paper>
        </Form>
      </div>
    );
  }
}

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw",
    },
  },
  bold32: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Futura",
    color: "#434c5f",
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px !important",
      paddingRight: "16px !important",
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    backgroundColor: "#3577D4",
    color: "#ffffff",
    width: "80%",
    marginTop: 20,
    "&: hover": {
      backgroundColor: "#2466C3 !important",
      color: "#ffffff !important",
      fontWeight: "bold",
    },
  },
  forgot: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
  },
  bottomText: {
    fontSize: 22,
    marginTop: 24,
    color: "#434c5f",
  },
});

SendEmailForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

export default connect(mapStateToProps, {
  prepareRecoveryEmail,
  confirmActivity,
})(
  reduxForm({ form: "ForgotForm", enableReinitialize: true, validate })(
    withStyles(styles)(SendEmailForm)
  )
);
