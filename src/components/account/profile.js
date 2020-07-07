import React from "react";
import {
  Grid,
  Select,
  RadioGroup,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Form, reduxForm, initialize, Field, reset } from "redux-form";
import { reverseString } from "../../helpers/utils";
import { encryptor, isServer } from "../../apis/tools";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {FuckIngshit, saveProfile, getStripeAccountLoginLink} from "../../actions";
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

 


class Profile extends React.Component {
  state = { myerror: undefined, loginLink: undefined };

  generateStripeLink = async (stripe_account_id, id) => {

    var stripeAccountIdsummary = stripe_account_id.replace('acct_', '');
    console.log('stripeAccountIdsummary', reverseString(stripeAccountIdsummary));
    const linkInfo = await getStripeAccountLoginLink({id: stripe_account_id, pid: id, scaid: reverseString(stripeAccountIdsummary) });
    console.log(linkInfo);
    this.setState({ loginLink: linkInfo.url });

  }

 async componentDidMount() {
   const { profile: {  id, stripe_account_id }} = this.props;
    if(!isServer && stripe_account_id) {
     this.generateStripeLink(stripe_account_id, id);
    }
  }

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


  stripeStatusMessage() {
    const { profile } = this.props;
    return profile.stripe_account_id ? 'There are some errors or missing information on your stripe account. Please correct them using the stripe link, in order to set things up for collect payments.' : 
    'In order to receive payments you should enter your billing info using the stripe onboarding link on the right.'

  }

  render() {
    const {classes, reset, profile, invalid, submitting, pristine, profileStipeInfo } = this.props;
    const { loginLink } = this.state;
    // console.log(invalid, submitting, pristine, loginLink);
    return (
    
      <Form onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))} className={classes.form}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid item >
              <p style={{ fontSize: 32, fontWeight: "bold", marginBottom: 0 }}>
                Profile <span  style={{ fontSize: 32, fontWeight: "normal", color: '#9d9d9d' }} >|</span> <span style={{ fontSize: 18, fontWeight: "normal", color: '#9d9d9d' }} >{profile.email}</span>
              </p>
            </Grid>
            <Grid item xs style={{ padding: '0px 32px' }}>
              {profile.stripe_account_status !== 'verified' && 
              (<span style={{ fontSize: 14, fontWeight: "normal", color: '#fd7d7d' }} >
                {this.stripeStatusMessage()}
                </span>)}
            </Grid>
            <Grid item>
              {profile.stripe_account_id ? (
                <a href={profileStipeInfo && profileStipeInfo.linkUrl ? profileStipeInfo.linkUrl : loginLink} >
                  <Grid container spacing={0} alignItems="flex-start"
                    className={classes.stripeloginButon}>
                    <Grid item xs> 
                      <span style={{ color: '#666EE8', fontFamily: 'Futura', fontSize: 14, marginRight: 8 }}>
                        Login into
                      </span>
                    </Grid>
                    <Grid item>
                        <svg width="53" height="22" viewBox="0 0 53 22" xmlns="http://www.w3.org/2000/svg"><title>Stripe</title><path d="M52.95 12.687h-7.157c.164 1.715 1.42 2.264 2.844 2.264 1.452 0 2.622-.325 3.591-.845v2.948c-.993.632-2.305.983-4.052.983-3.56 0-6.056-2.232-6.056-6.644 0-3.726 2.116-6.685 5.594-6.685C51.187 4.708 53 7.622 53 11.37c0 .354-.033 1.12-.05 1.318zm-5.259-4.996c-.914 0-1.93.647-1.93 2.295h3.78c0-1.646-.952-2.295-1.85-2.295zM36.358 18.037c-1.279 0-2.061-.54-2.586-.925l-.008 4.11-3.656.778V4.951h3.332l.077.905c.536-.47 1.43-1.148 2.863-1.148 2.568 0 4.986 2.315 4.986 6.574 0 4.649-2.392 6.755-5.008 6.755zm-.851-10.088c-.84 0-1.365.307-1.746.725l.021 5.436c.355.385.867.695 1.725.695 1.352 0 2.258-1.473 2.258-3.443 0-1.914-.92-3.413-2.258-3.413zm-10.44-2.998h3.67v12.825h-3.67V4.95zm0-4.17L28.737 0v2.983l-3.67.781V.781zm-3.832 8.3v8.695h-3.653V4.95h3.273l.117 1.082c.89-1.574 2.727-1.256 3.214-1.08v3.362c-.465-.15-2.032-.38-2.95.767zm-7.592 4.195c0 2.157 2.307 1.485 2.775 1.298v2.978c-.487.268-1.37.485-2.566.485-2.17 0-3.797-1.6-3.797-3.765l.016-11.706 3.569-.76.003 3.145h2.777v3.12h-2.777v5.205zm-4.357.624c0 2.634-2.05 4.137-5.09 4.137a9.94 9.94 0 0 1-3.955-.83v-3.494c1.227.668 2.747 1.169 3.958 1.169.815 0 1.359-.219 1.359-.895C5.558 12.241 0 12.898 0 8.848c0-2.59 2.02-4.14 4.986-4.14 1.211 0 2.422.186 3.633.67v3.445c-1.112-.6-2.524-.942-3.636-.942-.766 0-1.285.222-1.285.793 0 1.647 5.588.864 5.588 5.226z" fill="#666EE8" fill-rule="evenodd"/></svg>
                     </Grid>
                  </Grid>
                 </a>
              ) : (
                <a
                  type="submit"
                  href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_HFjRgc6vCvDCBR6x5ghJisC6mOLPx4tp&scope=read_write&state=${profile.id}
                  &stripe_user[business_type]=individual&suggested_capabilities[]=card_payments&business_profile[mcc]=5815&stripe_user[business_name]=${profile.first_name}-${profile.last_name}&business_profile[name]=${profile.first_name}-${profile.last_name}
                  &stripe_user[email]=${profile.email}&stripe_user[first_name]=${profile.first_name}
                  &stripe_user[last_name]=${profile.last_name}&business_profile[product_description]: Lumion models and projects
                  &business_profile[industry]: digital_products__other_digital_goods`}
                >
                  <img
                    src="/static/images/public/blue-on-dark.png"
                    srcSet="/static/images/public/blue-on-dark.png 1x, /static/images/public/blue-on-dark@2x.png 2x,
                      /static/images/public/blue-on-dark@3x.png 3x"
                    alt="Connect Stripe"
                    className={classes.imageWASwagUp}
                  />
                </a>
              )}
            </Grid>
          </Grid>
            
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
        <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
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

        <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
          <Field
            name="last_name"
            margin="small"
            type="text"
            fullWidth
            autoComplete="last_name"
            component={renderTextField}
            label="Last name"
          />
        </Grid>

         
        <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
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
              marginTop: 16
            }}
          >
            Change password
          </p>
        </Grid>
        <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
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

        <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
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
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={8} />
        <Grid item xs={6} md={2}>
                <Button
                    disabled={invalid || submitting }
                    onClick={() => reset()}
                    type="button"
                    className={classes.cancelButton}
                  >
                    Cancel 
                </Button>
          </Grid>
          <Grid item xs={6} md={2}>
               <Button
                    disabled={invalid || submitting || pristine }
                    type="submit"
                    className={(invalid || submitting || pristine) ? classes.actionButtonDisabled : classes.actionButton}
                  >
                    Save 
                </Button>
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
  stripeloginButon: {
    padding: '8px 16px',
    backgroundColor: '#eaeaea',
    borderRadius: 4,
    cursor: 'pointer',
    height: 36,
    '&:hover': {
      backgroundColor: '#efefef'
    }
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
  actionButton: {
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontFamily: 'Delvon',
    fontSize: 24,
    letterSpacing: 2,
    fontStyle: 'normal',
    color: '#ffffff',
    backgroundColor: '#1c5375',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#559cd9'
    }
  },
  actionIconDisabled: {
    color: '#5f5f5f'
  },
  actionButtonDisabled: {
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontFamily: 'Delvon',
    fontSize: 24,
    letterSpacing: 2,
    fontStyle: 'normal',
    color: '#5f5f5f !important',
    backgroundColor: '#dedede',
    textTransform: 'none',
    '&:hover': {
      cursor: 'not-allowed !important'
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
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#1c5375',
    backgroundColor: 'transparent',
    textTransform: 'none',
    '&:hover': {
      color: '#559cd9',
      backgroundColor: 'transparent'
    }
  }
});

const mapStateToProps = state => {
  
  return {
    sign: state.sign,
    initialValues: state.profile,
    profile: state.profile
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
  { initialize, reset, saveProfile}
)(
  reduxForm({ form: "ProfileForm", enableReinitialize: true, validate })(
    withStyles(styles)(Profile)
  )
);
