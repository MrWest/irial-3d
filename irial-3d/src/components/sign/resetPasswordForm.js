import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {CoolButton, CoolLink} from "../buttons";
import { connect } from "react-redux";
import { Form, reduxForm, Field } from "redux-form";
import {resetPassword} from "../../actions";
import {
  required
} from "redux-form-validators";
import { FormHelperText } from "@material-ui/core";

const validations = {
  password: [
    required({ msg: "Required" })
  ],
  cpassword: [
    required({ msg: "Required" })
    
  ]
  
};

// Reusable with any other form
const validate = values => {
  const errors = {};
  for (let field in validations) {
    let value = values[field];
    errors[field] = validations[field]
      .map(validateField => {
        return validateField(value, values);
      })
      .find(x => x);
  }
 
  
if(values['password'] !== '' &&  values['password'] !==  values['cpassword']){
 
  errors.cpassword = "Password values must coincide";

}
  return errors;
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

class ResetPasswordForm extends Component {
  state = {formStatus: undefined};

  realhandleSubmit =  async data => {
   
     data.email = this.props.email;
      this.props.resetPassword(data).then(res =>{        
        this.setState({formStatus: true})
      })
      
   
 
};

  render() {
    const { classes,email, language } = this.props;
    const { formStatus } = this.state;

    if(formStatus){
      return (
        <Paper className={classes.paper} elevation={0}>
        <div >
          <p
            align="left"
            className={classes.pTittle}
          >
            {language.SuccessfulPasswordReset}
          </p>
          <p
            align="left"
            className={classes.pExplain}
          >
            {language.SuccessfulPasswordResetInstructions}
          </p>
          
        </div>
        <form className={classes.form}>
       

          <div className="text-center" style={{paddingTop: 40}} align="left">
            <CoolLink to="/signin" height={56} width={280} fill={"#188218"} color={"#ffffff"} >
              {language.SignIn}
            </CoolLink>
          </div>
        </form>
      </Paper>
   
      )
    }
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Form onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))} className={classes.form}>
        <Paper className={classes.paper} elevation={0}>
          <div >
            <p
              align="left"
              className={classes.pTittle}
            >
              {language.ResetPassword}
            </p>
            <p
              align="left"
              className={classes.pExplain}
            >
             {language.ResetPasswordInstructions.format(email)}
            </p>
            
          </div>
          <form className={classes.form}>
         
            <FormControl margin="normal" required fullWidth>
                  <Field
                  name="password"
                  type="password"
                  margin="small"
                  fullWidth
                  autoComplete="current-password"
                  component={renderTextFieldPsswrd}
                  label={language.NewPassword}
                  htmlFor="password"
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                    <Field
                    name="cpassword"
                    type="password"
                    margin="small"
                    fullWidth
                    autoComplete="current-password"
                    component={renderTextFieldPsswrd}
                    label={language.ConfirmPassword}
                    htmlFor="password"
                  />
            </FormControl>

            <div className="text-center" style={{paddingTop: 40}} align="left">
              <CoolButton height={56} width={230} fill={"#188218"} color={"#ffffff"} >
                 {language.Reset}
              </CoolButton>
            </div>
          </form>
        </Paper>
        </Form>
      </main>
    );
  }

 
}

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
   
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    maxWidth: 496,
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    backgroundColor: "transparent",
    paddingBottom: 60,
    [theme.breakpoints.down("sm")]: {
     
      paddingLeft: "16px !important",
      paddingRight: "16px !important"
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    backgroundColor: "#3577D4",
    color: "#ffffff",
    width: "80%",
    marginTop: 20,
    "&: hover": {
      backgroundColor: "#2466C3 !important",
      color: "#ffffff !important",
      fontWeight: "bold"
    }
  },
  forgot: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right"
  },
  bottomText: {
    marginTop: 15
  },
  pTittle: {
    fontSize: 36,
    color: "#434c5f",
    fontWeight: "bold",
    fontFamily: "Futura"
  },
  pExplain: {
    fontSize: 18,
    color: "#434c5f",
    fontFamily: "Roboto",
    marginTop: 24
  },
});

ResetPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {resetPassword}
)( reduxForm({ form: "ResetPaswordForm", enableReinitialize: true, validate })(withStyles(styles)(ResetPasswordForm)));
