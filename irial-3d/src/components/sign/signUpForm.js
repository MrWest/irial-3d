import React, { Component } from "react";
import PropTypes, { element } from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { Field, reduxForm, Form, initialize} from 'redux-form';
import { signUp,  FuckIngshit, addAttraction, signFacebook, notifyActivity } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid, Select, Checkbox, FormControlLabel, MenuItem, FormHelperText } from "@material-ui/core";
import {CoolButtonSign} from "../buttons"
import {isMobile} from 'react-device-detect';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const validate =  values => {
  const errors = {}
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'business_name',
    'business_category',
    'password',
    'retype_password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  if (
    values.password !== values.retype_password
  ) {
    errors.password = 'Password must coincide'
    errors.retype_password = 'Password must coincide'
  }
  // if(values.email)
  // {
   
  //    let response = await FuckIngshit({email: values.email, password: values.password})

  //    console.log("res", response.message)
  //   if(response.message !== "No such user is registered"){
  //      errors.email = 'There is an account using this email already'
  //      console.log("res", response)
  //    }
  // }
  // console.log("errors", errors)
  return errors
}

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



const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <FormHelperText id="component-error-text" style={{ color: "#f44336" }}>
        {error}
      </FormHelperText>
    );
  }
};

const renderCheckbox = ({ input, label, value, className, checked, onClick }) => (
    <FormControlLabel
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

)

const renderSelectField = ({
  input,
  label,
  meta: { touched, value },
  children,
  error,
  meta,
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
   
     {renderError(meta)}
  </FormControl>
);

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

class SignUpForm extends Component {
  state = {myerror: undefined};

handleTextChange = async event => {

  // alert(event.target.value)
    if(event.target.value &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value))
    {
      // alert(event.target.value)
       let response = await FuckIngshit({email: event.target.value, login_type: "facebook", password: "values.password"})
  
       console.log("res", response.message)
      if(response.message !== "No such user is registered"){
         this.setState({myerror: {error: 'There is an account using this email already', touched: true}})
          console.log("resIn", response)
       }
       else
       this.setState({myerror: undefined})
    }
   
}

  realhandleSubmit = async data => {

    //console.log("SinIn-Submit: ", data);
    //  alert(data)

    if(!this.state.myerror){

      let user = undefined

    user = await this.props.signUp({first_name: data.first_name, last_name: data.last_name, email: data.email,
      login_type: this.props.signFacebookInfo.first_name? "facebook" : "site",  password: data.password,
    picture: this.props.signFacebookInfo.first_name? this.props.signFacebookInfo.picture : undefined})

     // console.log("SinIn-user: ", user)
     
     this.props.addAttraction({id_category: data.business_category, name: data.business_name, id_user: user.id})
  

     let message = data.first_name + " " + data.last_name + " has signed up to vinalestraveler for a " +
     data.business_category + "business called: " + data.business_name;

     let subject = "New user registration";

     let email = data.email;

     notifyActivity({ message, subject, email});


     this.props.signFacebook({})
     this.props.history.push( "/account");

    }

    
    
  }

  isIn(array, id){
    let rslt = false

    array.map(element => {
      if(parseInt(element.id) === parseInt(id))
        rslt = true
    })

    return rslt
  }

  handleChange = event => {
    this.setState({ state: event.target.value });
  };
  responseFacebook =  async (response) => {
    // console.log(response);
    if(response.first_name){
      this.props.signFacebook({id_login: response.id, email: response.email, first_name: response.first_name,
         last_name: response.last_name, picture: response.picture.data.url, type: "business",
         password: response.id, retype_password: response.id,})

         this.handleTextChange({target: {value: response.email}})
   
    }
     
    
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper} elevation={0} style={{paddingBottom: 60}}>
          <div className="full-width">
            <p
              variant="p"
              component="p"
              align="left"
              className={classes.ptittle}
            >
              {this.props.language.CreateAccount}
            </p>
          </div>
          

          
          <Form onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))} className={classes.form}>
           
         
          <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                   <Field
                    name="first_name"
                    required fullWidth
                    autoComplete="first_name" autoFocus
                    // value={this.state.signUpFacebook && this.state.signUpFacebook.first_name}
                    component={renderTextField}
                    label={this.props.language.FirstName}
                    readOnly = {this.props.signFacebookInfo.first_name}
                    />
                    
               
              </Grid>
              <Grid item xs={12} md={6}>
              
                  <Field
                    name="last_name"
                    required fullWidth
                   
                    autoComplete="last_name" 
                    component={renderTextField}
                    label={this.props.language.LastName}
                    readOnly = {this.props.signFacebookInfo.last_name}
                    />
                  

              </Grid>
           
           <Grid item xs={12} md={12}  style={{paddingTop: 5}}>

             <Field
                name="email"
                required fullWidth
                autoComplete="email" 
                htmlFor="text"
                component={renderTextField}
                label={this.props.language.EmailAddress}
                readOnly = {this.props.signFacebookInfo.email}
                myerror={this.state.myerror}
                onChange={this.handleTextChange.bind(this)}
                />
              {/* {this.state.myerror} */}
            </Grid>     
            
              <Grid item xs={12} md={6}  style={{paddingTop: 5, paddingBottom: 0}}>
                  <Field
                    name="business_name"
                    required fullWidth
                    autoComplete="business_name" autoFocus
                    htmlFor="text"
                    component={renderTextField}
                    label={this.props.language.BusinessName}
                    
                    />
               
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: 5, paddingBottom: 0}}>
                 
               
                <Field
                    fullWidth
                    name="business_category"
                    component={renderSelectField}
                    label={this.props.language.Category}
                    value={this.state.type}
                    // onSelectionChange={this.handleChange}
                    margin="normal"
                  >
                    {/* {this.props.lodgingsCategories.map(category =>(

                        <MenuItem value={category.id}>
                            <p style={{ fontSize: 14, marginBottom: 0 }}>
                          <strong>{category.name}</strong>
                        </p>
                        </MenuItem>
                        ))}
                    */}
                    {this.props.categories.map(category =>(

                      <MenuItem value={category.id}>
                           <p style={{ fontSize: 14, marginBottom: 0 }}>
                         <strong>{category.name}</strong>
                       </p>
                      </MenuItem>
                    ))}

                   
                                       
                  </Field>
              </Grid>
              <Grid item xs={12} md={6}  style={{paddingTop: 5}}>
              {!this.props.signFacebookInfo.first_name &&
                 <Field
                  name="password"
                  type="password"
                  required fullWidth
                  autoComplete="current-password" 
                  component={renderTextFieldPsswrd}
                  label={this.props.language.Password}
                  htmlFor="password"
                  />
              }
              </Grid>
              <Grid item xs={12} md={6}  style={{paddingTop: 5}}>
              {!this.props.signFacebookInfo.first_name &&
                <Field
                  name="retype_password"
                  type="password"
                  required fullWidth
                  autoComplete="repeat-password" 
                  component={renderTextFieldPsswrd}
                  label={this.props.language.RepeatPassword}
                  htmlFor="password"
                  />
              }
              </Grid>
            </Grid>
                

            
          

            <div align="left"  style={{paddingTop: 40}}>
            <Grid container spacing={0}>
                <Grid item>
                      <CoolButtonSign
                      size="large"
                      type="submit"
                      variant="contained"
                      width={335}
                      height={56}
                      fill={!this.props.signFacebookInfo.first_name?"#188218": "#4c69ba"}
                      
                    >
                  
                    <strong>{this.props.language.SignUp}</strong>
                  
                    
                    </CoolButtonSign>
                </Grid>
            
                {this.props.signFacebookInfo.first_name && 
                    <Grid item>
                    <div  className={classes.cancelDiv}>
                        <Link to="/signup" className={classes.cancelLink} onClick={()=> {
                            this.props.signFacebook({})
                            this.setState({myerror: undefined})
                        }  }>
                      
                      <strong>{this.props.language.Cancel}</strong>
                    
                      </Link>
                      </div>
                </Grid>
                }
            </Grid>
              
              
              

              {!this.props.signFacebookInfo.first_name && 
              <div style={{paddingTop: 20}}>
               
               <FacebookLogin
                    appId="269776263974713"
                    autoLoad = {false}
                    fields="first_name, last_name,email,picture"
                    callback={this.responseFacebook}                   
                    disableMobileRedirect={isMobile}
                    render={renderProps => (
                      <CoolButtonSign width={335} type='submit'
                      height={56}
                      fill={"#4c69ba"} onClick={renderProps.onClick}>{this.props.language.SignUpFacebook}</CoolButtonSign>
                    )}
                  />
                    
            </div>
            }
            </div>
            <div style={{width: 335}}>
              <p
                variant="p"
                component="p"
                align="center"
                className={classes.bottomText}
              >
                {this.props.language.AlreadyMember}
                <Link className={classes.link}  to="/signin">
                {this.props.language.SignIn}
                </Link>
              </p>
            </div>
          </Form>
       

        </Paper>
      </main>
    );
  }

 
  // logIn() {
  //   this.props.logIn();
  // }
}

const styles = theme => ({
  link: {
    color: "#3aa53a",
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingLeft: "5px !important"
  },
  main: {},
  color: {
    color: "#3577D4 !important"
  },
  
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
     
      paddingLeft: "16px !important",
      paddingRight: "16px !important"
    }
  },
  submitButton: {
    marginTop: 40,
    "&: hover": {
      backgroundColor: "#ffffff",
      color: "#3577D4"
    }
  },
  cancelDiv: {
    height: "100%",
    display: "table",
    paddingLeft: 40
  },
  cancelLink: {
    verticalAlign: "middle",
    display: "table-cell"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
    ptittle: {
      fontSize: 36,
      color: "#188218",
      fontWeight: "bold",
      fontFamily: "Futura"
  },
  forgot: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right"
  },
  bottomText: {
    marginTop: 40,
    color: "#434c5f",
  }
});

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = state => {
  return {
    language: state.language  ,
    categories: state.sections[1]? state.sections[1].categories : [],
   // lodgingsCategories: state.sections[2]? state.sections[2].categories: [],
    signFacebookInfo: state.signFacebook,
    initialValues: state.signFacebook,
   
   
  };
};
export default connect(
  mapStateToProps,
  {initialize, signUp, addAttraction, signFacebook}
)(reduxForm({
  form: 'SignUpForm', // a unique identifier for this form 
  enableReinitialize: true,
  validate,
  onSubmit: signUp
})(withStyles(styles)(withRouter(SignUpForm))));
