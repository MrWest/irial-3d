import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { logIn, setRedirectUrl } from "../../actions";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { CoolButtonSign } from "../buttons";
import { FormHelperText } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Field, reduxForm, Form } from "redux-form";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["password", "email"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderTextField = ({ input, label, placeholder, error, meta }) => {
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

const renderTextFieldPsswrd = ({ input, label, placeholder, error, meta }) => {
  return (
    <FormControl fullWidth className="">
      <InputLabel>{label}</InputLabel>
      <Input
        type="password"
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

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      remember: "remember",
      generalError: undefined,
    };

    this.realhandleSubmit = this.realhandleSubmit.bind(this);
  }

  realhandleSubmit = async (data) => {
    var result = await this.props.logIn({
      email: data.email,
      password: data.password,
      login_type: "site",
    });

    this.redirect(result, "site");
  };

  responseFacebook = async (response) => {
    // console.log(response);
    if (response.first_name) {
      var result = await this.props.logIn({
        id_login: response.id,
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
        picture: response.picture.data.url,
        type: "visitor",
        password: response.id,
        login_type: "facebook",
      });

      this.redirect(result, "facebook");
    } else {
      this.setState({ generalError: this.props.language.FacebookLoginFailed });
    }
  };

  redirect(result, type) {
    if (this.props.redirectUrl === "") {
      if (result["login"] === "success") {
        if (result["type"] === "visitor") this.props.history.push("/");
        else this.props.history.push("/account");
      } else
        this.setState({
          generalError:
            type === "site"
              ? this.props.language.WrongCredentials
              : this.props.language.FacebookLoginFailed,
        });
    } else {
      if (result["login"] === "success") {
        this.props.history.push(this.props.redirectUrl);
        this.props.setRedirectUrl("");
      } else
        this.setState({
          generalError:
            type === "site"
              ? this.props.language.WrongCredentials
              : this.props.language.FacebookLoginFailed,
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />

        <Paper
          className={classes.paper}
          elevation={0}
          style={{ paddingBottom: 60 }}
        >
          <div className="full-width">
            <p align="left" className={classes.ptittle}>
              {this.props.language.SignAccount}
            </p>
          </div>

          <Form
            onSubmit={this.props.handleSubmit(this.realhandleSubmit)}
            className={classes.form}
          >
            <p align="right" style={{ fontSize: 14, color: "#f44336" }}>
              {this.state.generalError}
            </p>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  htmlFor="email"
                  component={renderTextField}
                  label={this.props.language.AccountEmailAddress}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: 5 }}>
                <Field
                  name="password"
                  type="password"
                  required
                  fullWidth
                  autoComplete="current-password"
                  component={renderTextFieldPsswrd}
                  label={this.props.language.Password}
                  htmlFor="password"
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item sm={12} md={6}>
                <Field
                  value="remember"
                  label={this.props.language.RememberMe}
                  component={renderCheckbox}
                  className={classes.color}
                  checked={this.state.remember === "remember"}
                  onClick={() =>
                    this.state.remember === "remember"
                      ? this.setState({ remember: "" })
                      : this.setState({ remember: "remember" })
                  }
                />
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
                alignItems="flex-end"
                style={{ textAlign: "right" }}
              >
                <div style={{ textAlign: "right", paddingTop: 16 }}>
                  <Link className={classes.forgot} to="/forgot">
                    {this.props.language.ForgotPassword}
                  </Link>
                </div>
              </Grid>
            </Grid>

            <div style={{ paddingTop: 40 }}>
              <CoolButtonSign
                size="large"
                variant="contained"
                width={335}
                height={56}
                fill={"#337ab7"}
                // onClick={() => this.logIn()}
              >
                {this.props.language.SignIn}
              </CoolButtonSign>

              <div style={{ paddingTop: 20 }}>
                <FacebookLogin
                  appId="269776263974713"
                  autoLoad={false}
                  fields="first_name, last_name ,email,picture"
                  disableMobileRedirect={isMobile}
                  callback={this.responseFacebook}
                  render={(renderProps) => (
                    <CoolButtonSign
                      width={335}
                      type="button"
                      height={56}
                      fill={"#4c69ba"}
                      onClick={renderProps.onClick}
                    >
                      {this.props.language.SignInFacebook}
                    </CoolButtonSign>
                  )}
                />
                {/* <FacebookLogin
                    appId="269776263974713"
                    autoLoad={true}
                    fields="name,email,picture"
                    // onClick={componentClicked}
                    callback={this.responseFacebook} /> */}
              </div>
            </div>

            <div style={{ width: 335 }}>
              <p
                variant="p"
                component="p"
                align="center"
                className={classes.bottomText}
              >
                {this.props.language.DontAccount}
                <Link className={classes.link} to="/signup">
                  {this.props.language.SignUp}
                </Link>
              </p>
            </div>
          </Form>
        </Paper>
      </main>
    );
  }

  logIn() {
    this.props.logIn();
  }
}

const styles = (theme) => ({
  link: {
    color: "#3aa53a",
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingLeft: "5px !important",
  },
  main: {
    paddingLeft: "0 !important",
  },
  color: {
    color: "#3aa53a !important",
  },
  submitButton: {
    marginTop: 40,
    "&: hover": {
      backgroundColor: "#ffffff",
      color: "#3aa53a",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px !important",
      paddingRight: "16px !important",
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  ptittle: {
    fontSize: 36,
    color: "#337ab7",
    fontWeight: "bold",
    fontFamily: "Futura",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    backgroundColor: "#3aa53a",
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
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    color: "#3aa53a",
  },
  bottomText: {
    marginTop: 40,
    color: "#434c5f",
  },
});

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    redirectUrl: state.redirectUrl,
  };
};
export default reduxForm({
  form: "SignInForm", // a unique identifier for this form
  validate,
  onSubmit: logIn,
})(
  connect(mapStateToProps, { logIn, setRedirectUrl })(
    withStyles(styles)(withRouter(SignInForm))
  )
);
