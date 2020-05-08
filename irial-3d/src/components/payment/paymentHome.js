import React, { Component } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Form, reduxForm,Field, initialize } from "redux-form";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  required,
  email,
  length,
  format
} from "redux-form-validators";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchModels, sortModels } from "../../actions";
import { ReduxTextField, ReduxSelectField } from '../global/reduxFormFields';
import { normalizeExDate } from '../../helpers/utils';
import {Helmet} from 'react-helmet';
import Loader from '../global/loader';
import { isServer, getLanguage } from '../../apis/tools';

class PaymentHome extends Component {
  

  render() {
    const { classes, language, cart } = this.props;
    return (
      <main  ref={this.myRef} className={classes.container}>
          <Helmet>
              <meta name="language" content={getLanguage()}/>
              <title>{language.PageTittle} | {language.ModelsPageTittle} </title>
              <meta name="description" content={language.ModelsPageDescription} />
              <meta name="keywords" content={language.ModelsPageTags}  /> 
            </Helmet>
      <Grid container justify="center" spacing={0}>
        <Grid item className={classes.center}>
          <Grid container spacing={4} > 
           <Grid item xs={8}>
               <h1 className={classes.categoryTittle}>Payment Info</h1>
               <Form >
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="ccnumber"
                      component={ReduxTextField}
                      classes={classes}
                      className="card"
                      label="Credit card number"
                     // validate={[this.validateCCNumber]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="exdate"
                      component={ReduxTextField}
                      classes={classes}
                      className="card"
                      label="Expiration date"
                      normalize={normalizeExDate}
                      //validate={[this.validateExpDate]}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      name="cvc"
                      component={ReduxTextField}
                      className="card"
                      classes={classes}
                      label="CVC"
                      //validate={[this.validateCVC]}
                    />
                  </Grid>
                </Grid>
               </Form>
           </Grid>
           <Grid item xs={4}>
                 <p className={classes.cartTitle}>Your cart</p>
           </Grid>
          </Grid>
        </Grid>
          
        </Grid>
        {/*busy && <Loader />*/}
      </main>
    );
  }
}

const styles = theme => ({
  container: {
    paddingTop: 120,
    paddingBottom: 130
  },
  mobilePadding: {   
    [theme.breakpoints.down("sm")]: {
      
      paddingLeft: "24px !important",
      paddingRight: "16px !important"
    }
  },
  center: {
   
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1280px"
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1180px"
    }
    ,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw"
    }
  },
  seletcTool: {
    width: 220,
    marginTop: 20,
    '& div': {
      maxHeight: '52px !important'
    },
    '& em, p': {
      paddingRight: '8px !important'
    },
    '& label': {
      transform: 'translate(14px, -14px) scale(0.75) !important'
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
      marginLeft: 24,
      marginRight: 8
    }
  },
  categoryTittle: {
    marginBottom: 0,
    fontFamily: "Futura",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    color: "#337ab7",
    display: 'inline',
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0
    }
  },
  orderList: {
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  gray: {
    backgroundColor: "#dddddd"
  },
  yellow: {
    color: "#a0a010",
    backgroundColor: "#f9f9c9"
  },
  green: {
    color: "#10a000",
    backgroundColor: "#c9f999"
  },
  submitButton: {
    width: "282px",
    height: "56px",
    "& span": {
      fontFamily: "Futura",
      fontSize: "16px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal"
    },
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "4px",
    backgroundColor: "#188218"
  }
});

PaymentHome.propTypes = {
  classes: PropTypes.object.isRequired
};


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
        message: { defaultMessage: "Must use corporate email address" }
      })
    ],
    name: [
      required({ msg: "Required" }),
      length({ min: 3 })
    ],
    promotion: [
      required({ msg: "Required" }),
      length({ min: 10 })
     
    ],
    description: [
      required({ msg: "Required" }),
      length({ min: 100 })]
      ,
  
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
      "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail).com$"
    );
    if (regex.test(values.email)) {
      errors.email = "Must use corporate email address";
    }
    return errors;
  };

const mapStateTopProps = state => {
  return {
    cart: state.cart,
    language: state.language
  };
};

export default connect(mapStateTopProps, { })(reduxForm({ form: "paymentForm", enableReinitialize: true, validate })(withStyles(styles)(PaymentHome)));
