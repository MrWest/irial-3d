import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { payCart } from "../../actions";
import { ReduxTextField, ReduxSelectField } from "../global/reduxFormFields";
import { Form, reduxForm, Field, initialize } from "redux-form";
import CardSection from "../global/cardSection";
import { required, email, length, format } from "redux-form-validators";
import { withRouter } from "react-router-dom";

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
    //   format({
    //     width: /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail)\.com$/i,
    //     message: { defaultMessage: "Must use corporate email address" }
    //   })
  ],
  name: [required({ msg: "Required" }), length({ min: 3 })],
  // promotion: [
  //   required({ msg: "Required" }),
  //   length({ min: 10 })

  // ],
  // description: [
  //   required({ msg: "Required" }),
  //   length({ min: 100 })]
  //   ,
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

  return errors;
};

export default connect(null, { payCart })(
  reduxForm({ form: "paymentForm", enableReinitialize: true, validate })(
    withRouter(function PaymentForm({
      destination,
      amount,
      buttonClass,
      handleSubmit,
      history,
      payCart,
      onPay,
    }) {
      const [stripeToken, setStripeToken] = useState(undefined);
      // const stripe = useStripe();
      // const elements = useElements();

      const rhandleSubmit = async (data) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        // event.preventDefault();
        console.log("xxx0: ", data);

        // if (!stripe || !elements) {
        //   // Stripe.js has not yet loaded.
        //   // Make  sure to disable form submission until Stripe.js has loaded.
        //   return;
        // }

        // const card = elements.getElement(CardElement);
        // const result = await stripe.createToken(card);

        // if (result.error) {
        //   // Show error to your customer.
        //   console.log(result.error.message);
        // } else {
        // Send the token to your server.
        // This function does not exist yet; we will define it in the next step.
        console.log("xxx0stripeToken: ", stripeToken);
        if (stripeToken) {
          const description = `${data.name} purchase of: ${amount} usd of Lumion items`;
          const charge = await payCart({
            ...stripeToken,
            email: data.email,
            amount,
            destination,
            description,
          });
          await onPay(charge);
          history.push("/thanks");
        }
      };

      return (
        <Form onSubmit={handleSubmit(rhandleSubmit)}>
          <Grid container justify="center" spacing={4}>
            <Grid item xs={6}>
              <Field
                name="name"
                margin="small"
                type="text"
                fullWidth
                autoComplete="name"
                component={ReduxTextField}
                label="Name"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="email"
                margin="small"
                type="text"
                fullWidth
                autoComplete="name"
                component={ReduxTextField}
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <CardSection onReady={setStripeToken} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                className={buttonClass}
                disabled={!stripeToken}
              >
                Confirm order
              </Button>
            </Grid>
          </Grid>
        </Form>
      );
    })
  )
);

// reduxForm({ form: "paymentForm", enableReinitialize: true, validate })(
