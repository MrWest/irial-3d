import React, { useEffect, useState } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Form, reduxForm, Field, initialize } from "redux-form";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { required, email, length, format } from "redux-form-validators";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thousandsSeparatedAndFixed } from "../../helpers/utils";
import { Helmet } from "react-helmet";
import PaymentForm from "./paymentForm";
import { isServer, getLanguage } from "../../apis/tools";
import { downloadFile, doTransfers } from "../../actions";
import CartItem from "./CartItem";
import HorizontalCalendar from "./horizontalCalendar";

const PaymentHome = ({ classes, language, cart: { items } }) => {
  const totalCart = items.reduce((sum, i) => sum + parseFloat(i.price), 0);

  const getTransfers = () => {
    let group = items.reduce((r, a) => {
      console.log("a", a);
      console.log("r", r);
      r[a.destination] = [...(r[a.destination] || []), a];
      return r;
    }, {});
    console.log("group", group);

    const transfers = [];
    for (var property in group) {
      transfers.push({
        destination: property,
        amount: group[property].reduce(
          (sum, i) => sum + parseFloat(i.price),
          0
        ),
        description: `Selling ${group[property].length} items: ${group[
          property
        ].reduce(
          (sum, i) => (sum === "" ? sum + i.name : sum + ", " + i.name),
          ""
        )} `,
      });
    }

    console.log("transfers", transfers);

    return JSON.stringify(transfers);
  };

  getTransfers();

  const onPay = async (charge) => {
    const transfers = getTransfers();

    doTransfers({ transfers, transfer_group: charge.transfer_group });

    items.forEach(async (item) => {
      await downloadFile({ name: item.name, file: item.file });
    });
  };

  return (
    <main className={classes.container}>
      <Helmet>
        <meta name="language" content={getLanguage()} />
        <title>
          {language.PageTittle} | {language.ModelsPageTittle}{" "}
        </title>
        <meta name="description" content={language.ModelsPageDescription} />
        <meta name="keywords" content={language.ModelsPageTags} />
      </Helmet>
      <Grid container justify="center" spacing={0}>
        <Grid item className={classes.center}>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <h1 className={classes.categoryTittle}>Payment Info</h1>

              <PaymentForm
                language={language}
                buttonClass={classes.submitButton}
                amount={totalCart * 100}
                destination={
                  items.length > 0 ? items[0].destination : undefined
                }
                onPay={onPay}
              />
            </Grid>
            <Grid item xs={4}>
              <p className={classes.cartTittle}>Your cart</p>
              <div style={{ padding: "24px 0px 124px 0px" }}>
                {items.map((item) => (
                  <CartItem key={item.id} classes={classes} item={item} />
                ))}
              </div>
              <p className={classes.cartItemPrice}>
                <span className={classes.cartSmaltext} style={{ fontSize: 18 }}>
                  Total cost:
                </span>{" "}
                ${thousandsSeparatedAndFixed(totalCart)}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*busy && <Loader />*/}
    </main>
  );
};

const styles = (theme) => ({
  container: {
    paddingTop: 56,
    paddingBottom: 130,
    [theme.breakpoints.down("sm")]: {
paddingTop: 92
}
  },
  mobilePadding: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "24px !important",
      paddingRight: "16px !important",
    },
  },
  center: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1280px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1180px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw",
    },
  },
  seletcTool: {
    width: 220,
    marginTop: 20,
    "& div": {
      maxHeight: "52px !important",
    },
    "& em, p": {
      paddingRight: "8px !important",
    },
    "& label": {
      transform: "translate(14px, -14px) scale(0.75) !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
      marginLeft: 24,
      marginRight: 8,
    },
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
      marginBottom: 0,
    },
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
      marginBottom: 0,
    },
  },
  orderList: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  gray: {
    backgroundColor: "#dddddd",
  },
  yellow: {
    color: "#a0a010",
    backgroundColor: "#f9f9c9",
  },
  green: {
    color: "#10a000",
    backgroundColor: "#c9f999",
  },
  submitButton: {
    marginTop: 24,
    width: "100%",
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "Roboto",
    color: "#ffffff",
    backgroundColor: "#337ab7",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#559cd9 !important",
    },
  },
});

PaymentHome.propTypes = {
  classes: PropTypes.object.isRequired,
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
      message: { defaultMessage: "Must use corporate email address" },
    }),
  ],
  name: [required({ msg: "Required" }), length({ min: 3 })],
  promotion: [required({ msg: "Required" }), length({ min: 10 })],
  description: [required({ msg: "Required" }), length({ min: 100 })],
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
    "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail).com$"
  );
  if (regex.test(values.email)) {
    errors.email = "Must use corporate email address";
  }
  return errors;
};

const mapStateTopProps = (state) => {
  return {
    cart: state.cart,
    language: state.language,
  };
};

export default connect(mapStateTopProps, {})(withStyles(styles)(PaymentHome));
