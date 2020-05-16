import React, { useEffect, useState } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Form, reduxForm,Field, initialize } from "redux-form";
import {loadStripe} from '@stripe/stripe-js';
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
import { thousandsSeparatedAndFixed } from '../../helpers/utils';
import {Helmet} from 'react-helmet';
import Loader from '../global/loader';
import PaymentForm from './PaymentForm';
import { isServer, getLanguage } from '../../apis/tools';
import CartItem from './CartItem';
import {Elements} from '@stripe/react-stripe-js';


const PaymentHome = ({ classes, language, cart }) => {
    const [stripe, setStripe] = useState(undefined);

    const init = async () => {
        // Make sure to call `loadStripe` outside of a component’s render to avoid
     // recreating the `Stripe` object on every render.
         const stripeRslt = await loadStripe("pk_test_FHrxVh3boAE3JjQQlj1wTzWT003RxSGuMc");
         setStripe(stripeRslt);
    };
    
  useEffect(() => {
      init();
    return () => {};
  }, []);

const totalCart = cart.items.reduce((sum, i) => sum + parseFloat(i.price), 0);

return (
      <main className={classes.container}>
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
               {stripe && (
                    <Elements stripe={stripe}>
                        <PaymentForm language={language} buttonClass={classes.submitButton} amount={totalCart * 100} />
                    </Elements>
               )}
                   
           </Grid>
           <Grid item xs={4}>
                 <p className={classes.cartTittle}>Your cart</p>
                 <div style={{ padding: '24px 0px 124px 0px' }}>
                              {cart.items.map(item => <CartItem key={item.id} classes={classes} item={item}  />)}
                </div>
                <p className={classes.cartItemPrice}><span className={classes.cartSmaltext} style={{ fontSize: 18 }}>Total cost:</span> ${thousandsSeparatedAndFixed(totalCart)}</p>
                                
           </Grid>
          </Grid>
        </Grid>
          
        </Grid>
        {/*busy && <Loader />*/}
      </main>
    );
};

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
    marginBottom: 24,
    fontFamily: "Futura",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    color: "#337ab7",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0
    }
  },
  cartTittle: {
    marginTop: 38,
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    color: "#337ab7",
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
    marginTop: 24,
    width: '100%',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    color: '#ffffff',
    backgroundColor: '#337ab7',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#559cd9 !important'
    }
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

export default connect(mapStateTopProps, { })(withStyles(styles)(PaymentHome));
