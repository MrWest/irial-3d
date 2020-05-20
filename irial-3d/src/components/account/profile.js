import React from "react";
import {
  Grid,
  Select,
  RadioGroup,
  Input,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Form, reduxForm, initialize, Field } from "redux-form";
import { CustomWidthButton } from "../buttons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {FuckIngshit, saveProfile} from "../../actions";
import {
  required,
  email,
  length,
  numericality,
  format
} from "redux-form-validators";

const validations = {
  email: [
    required({ msg: "Required" }),
    email(),
    format({
      width: /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(xxx|zzz)\.com$/i,
      message: { defaultMessage: "Must use corporate email address" }
    })
  ],
  first_name: [
    required({ msg: "Required" }),
    length({ min: 3 }),
    format({
      with: /^[a-zA-Z\s]*$/i,
      message: { defaultMessage: "Letters only" }
    })
  ],
  last_name: [
    required({ msg: "Required" }),
    length({ min: 3 }),
    format({
      with: /^[a-zA-Z\s]*$/i,
      message: { defaultMessage: "Letters only" }
    })
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
  let regex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(xxx|sss).com$"
  );
  if (regex.test(values.email)) {
    errors.email = "Must use corporate email address";
  }
  
if(values['password'] !== '' &&  values['password'] !==  values['cpassword']){
 
  errors.cpassword = "Password values must coincide";

}
  return errors;
};


const renderTextField = ({ input, label, placeholder, classes, meta, readOnly, myerror  }) => {
  return (
    <FormControl fullWidth className="">
      <InputLabel>{label}</InputLabel>
      <Input
        {...input}
        error={meta.touched && meta.error && true}
        placeholder={placeholder}
        readOnly={readOnly }
      />
      {myerror? renderError(myerror):  renderError(meta)}
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

class Profile extends React.Component {
  state = {myerror: undefined};
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

  handleTextChange = async event => {

    //  alert(event.target.value)
      if(event.target.value &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value))
      {
        // alert(event.target.value)
         let response = await FuckIngshit({email: event.target.value, login_type: "facebook", password: "values.password"})
    
        //  console.log("res", response.message)
        if(response.message !== "No such user is registered"){
           this.setState({myerror: {error: 'There is an account using this email already', touched: true}})
            // console.log("resIn", response)
         }
         else
         this.setState({myerror: undefined})
      }
     
  }

  realhandleSubmit(data) {
   
      if(!this.state.myerror)
      {
        data.id = this.props.sign.loginInfo.id;
        this.props.saveProfile(data);
      }
        
       
   
  }

  render() {
    const {classes} = this.props;
    return (
    
      <Form onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))} className={classes.form}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <p style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Profile
          </p>
          <hr style={{ height: 1, backgroundColor: "#999999" }} />
        </Grid>
        <Grid item xs={12}>
          <p
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase"
            }}
          >
            Basic information
          </p>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
          <Field
            name="first_name"
            margin="small"
            type="text"
            fullWidth
            autoComplete="first_name"
            component={renderTextField}
            label="First name"
          />
        </Grid>

        <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
          <Field
            name="last_name"
            margin="small"
            type="text"
            fullWidth
            autoComplete="last_name"
            component={renderTextField}
            label="First name"
          />
        </Grid>

          <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
            <Field
              name="email"
              margin="small"
              fullWidth
              autoComplete="email"
              type="email"
              component={renderTextField}
              label="Account email address"
              myerror={this.state.myerror}
              onChange={this.handleTextChange.bind(this)}
            />
          </Grid>
        <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
          <Field
            name="phone_number"
            margin="small"
            fullWidth
            autoComplete="phone_number"
            type="text"
            component={renderTextField}
            label="Phone number"
            normalize={this.normalizePhone}
          />
        </Grid>
        <Grid item xs={12}>
          <p
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase",
              marginTop: 24
            }}
          >
            Change password
          </p>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
          <Field
            name="password"
            type="password"
            margin="small"
            fullWidth
            autoComplete="current-password"
            component={renderTextFieldPsswrd}
            label="New password"
            htmlFor="password"
          />
        </Grid>

        <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
          <Field
            name="cpassword"
            type="password"
            margin="small"
            fullWidth
            autoComplete="current-password"
            component={renderTextFieldPsswrd}
            label="Confirm password"
            htmlFor="password"
          />
        </Grid>
        <Grid item xs={12}>
                <Grid container style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 40 }}>
                  <Grid item xs={12} md={3} />

                  <Grid item xs={12} md={9}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={3} />
                      <Grid item xs={6} md={3}>
                        <Link
                          to="/"
                          style={{
                            textDecorationLine: "none !important",
                            fontSize: 16,
                            padding: 56,
                            paddingTop: 18,
                             paddingBottom: 14,
                            fontWeight: "bold",
                            width: "100%",
                            display: "block",
                            cursor: "pointer",
                            color: "#3577d4 !important",
                            textAlign: "right"
                          }}
                         
                        >
                          Cancel
                        </Link>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomWidthButton
                          disabled={false}
                          width="100%"
                          onClick={() => {
                            this.setState({ modalAprove: true });
                          }}
                        >
                          Save 
                        </CustomWidthButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          
      </Grid>
      </Form>
    );
  }
}


const styles = theme => ({
  alignRight: {
    textAlign: "right"
  },
  container: {
   
    paddingTop: 107,
     paddingBottom: 130,     
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    verticalAlign: "top",
    minHeight: "70vh",
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../images/account/home.svg)",
      backgroundRepeat: "no-repeat",
      
      // backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: 0.5
    }
  },
  center: {
    verticalAlign: "top",
    height: "100%",
    margin: "auto",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      minWidth: "1280px"
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      minWidth: "1180px"
    }
  },
 
  inner: {
    paddingTop: 40
  },
  aproveButton: {
    backgroundColor: "#3577d4",
    color: "#ffffff",
    textDecorationLine: "none !important",
    paddingTop: 14,
     paddingBottom: 14,
    width: "100%"
  },
  cancelButton: {
    textDecorationLine: "none !important",
    fontSize: 16,
    paddingTop: 18,
     paddingBottom: 14,
    fontWeight: "bold",
    width: "100%",
    display: "block",
    cursor: "pointer",
    color: "#3577d4 !important",
    textAlign: "right"
  }
});

const mapStateToProps = state => {
  
  return {
    sign: state.sign,
    initialValues: state.profile
    // {
    //   first_name: state.sign.loginInfo.first_name,
    //   last_name: state.sign.loginInfo.last_name,
    //   email: state.sign.loginInfo.email,
    //   id: state.sign.loginInfo.id,
    //   phone_number: state.sign.loginInfo.phone_number
     
    // }
  };
};

export default connect(
  mapStateToProps,
  { initialize, saveProfile}
)(
  reduxForm({ form: "ProfileForm", enableReinitialize: true, validate })(
    withStyles(styles)(Profile)
  )
);
