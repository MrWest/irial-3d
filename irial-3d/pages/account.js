import React, { Component } from 'react';
import AccountHome from '../src/components/account/accountHome';
import { getStripeToken, getStripeAccount, updateBillingInfoServer, updateStripeAccountInfo } from '../src/actions';

class Account extends Component {
  render() {
    // const { categories, attraction, category } = this.props;  
    
    return <AccountHome  />;
  }
}



Account.getInitialProps = async function({ reduxStore, query: { code, state } }) {
  console.log(code, state);
  if(code && state )
  {
    const token = await getStripeToken({ code });
    const stripe_user_id = token.stripe_user_id;
    console.log(stripe_user_id);
    const account = await getStripeAccount({ stripe_user_id });
    console.log(account);
    // if(account.requirements && !account.requirements.disabled_reason) {
    //   const { individual } = account;
    //   const { address } = individual;
    //   const data = {
    //     first_name: individual.first_name,
    //     last_name: individual.last_name,
    //     email: individual.email,
    //     phone_number: individual.phone,
    //     billing_birth_day: `${individual.dob.year}/${individual.dob.month}/${individual.dob.day}`,
    //     country: address.country,
    //     state: address.state,
    //     city: address.city,
    //     address1: address.line1,
    //     address2: address.line2,
    //     zip: address.postal_code,
    //     status: individual.status
    //   };
  
    //   const updatedUser = await updateBillingInfoServer({...data, id: state });
    //   const finallyAccount = await updateStripeAccountInfo({ id: state, stripe_account_id: account.id, stripe_account_type: account.type });
    //   console.log(updatedUser, finallyAccount);
    // }
    if(account.id) {
      
      const data = {
        first_name: "",
        last_name: "",
        email: account.email,
        phone_number: account.business_profile.support_phone,
        billing_birth_day: '0000-00-00',
        country: account.country,
        state: "",
        city: "",
        address1: "",
        address2: "",
        zip: "",
        status: account.requirements.disabled_reason
      };
  
      const updatedUser = await updateBillingInfoServer({...data, id: state });
      const finallyAccount = await updateStripeAccountInfo({ id: state, stripe_account_id: account.id, stripe_account_type: account.type });
      console.log(updatedUser, finallyAccount);
    }



  
  

  }
  return { code, state };
};


export default Account;
