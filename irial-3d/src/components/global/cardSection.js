/**
* Use the CSS tab above to style your Element's container.
*/
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

let CardSection = ({ onReady, language }) => {
  const [checking, setChecking] = useState(false);
  
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleOnReady = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();
    
    setError('');
    if(event.complete) {

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make  sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
  
      const card = elements.getElement(CardElement);
      setChecking(true);
      const result = await stripe.createToken(card, { currency: 'usd' });
      setChecking(false);
      if (result.error) {
        // Show error to your customer.
        setError(result.error.message);
      } else {
        // Send the token to your server.
        // This function does not exist yet; we will define it in the next step.
        console.log('xxx02: ', result.token);
        onReady(result.token)
      }
    }
    else onReady();

  }

  return (
      <>
        <p style={{ marginLeft: 4, marginTop: 8, marginBottom: 4, color: '#6d6d6d' }}> {language.CardDetails}:</p>
        <CardElement  onChange={handleOnReady} />
            {error ? (<p style={{ marginLeft: 4, marginTop: 8, marginBottom: 4, color: '#ad6d6d', fontSize: 10 }}> {error}:</p>) :
            (<p style={{ marginLeft: 4, marginTop: 8, marginBottom: 4, color: '#6d6dad', fontSize: 10 }}> {`${checking? language.Checking : ''}`}:</p>)}
      </>
  );
};



const mapStateTopProps = (state) => ({
  language: state.language
});

CardSection = connect(mapStateTopProps, {})(CardSection);

const CardWrapper = ({ onReady }) => {
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

  return (
    <>
    {stripe && (
      <Elements stripe={stripe}>
          <CardSection  onReady={onReady} />
      </Elements>
       )}
      </>
    )
} 



export default CardWrapper;