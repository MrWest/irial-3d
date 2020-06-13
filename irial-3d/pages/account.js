import React, { Component } from 'react';
import AccountHome from '../src/components/account/accountHome';
import { getStripeToken, getStripeAccount, updateStripeAccountInfoServer, getStripeAccountLoginLink } from '../src/actions';
import { reverseString } from '../src/helpers/utils';

class Account extends Component {
  render() {
    const { profileStipeInfo } = this.props;  
    
    return <AccountHome profileStipeInfo={profileStipeInfo} stripe_account_status={profileStipeInfo ? profileStipeInfo.stripe_account_status : 'error'} />;
  }
}

const handleAccount = async ( stripe_user_id, state, reduxStore ) => {

    let requirements = {};
    const account = await getStripeAccount({ stripe_user_id });
    console.log(account);
    requirements = account.requirements;
    if(account.id) {
      const profileStipeInfo = await updateStripeAccountInfoServer({ id: state, stripe_account_id: account.id, stripe_account_type: account.type, stripe_account_status: requirements && requirements.disabled_reason ? 'error' : 'verified' });
      console.log('profileStipeInfo', profileStipeInfo);

      if(profileStipeInfo.stripe_account_id) {
        var stripeAccountIdsummary = profileStipeInfo.stripe_account_id.replace('acct_', '');
        console.log('stripeAccountIdsummary', reverseString(stripeAccountIdsummary));
        const linkInfo = await getStripeAccountLoginLink({id: profileStipeInfo.stripe_account_id, pid: profileStipeInfo.id, scaid: reverseString(stripeAccountIdsummary) });
        console.log(linkInfo);
        return { profileStipeInfo: {...profileStipeInfo, linkUrl: linkInfo.url} }
      }

     

      return { profileStipeInfo }
    }
    return {  }
   
}

Account.getInitialProps = async function({ reduxStore, query: { code, state, scaid, pid } }) {
  console.log(code, state);
 
  if(code && state )
  {
    const token = await getStripeToken({ code });
    const stripe_user_id = token.stripe_user_id;
    console.log(stripe_user_id);
    return stripe_user_id ? handleAccount(stripe_user_id, state, reduxStore) : {};
  }
    
  if(pid && scaid){
    
    // console.log('decryptedss', scaid);
    // var decrypted = encryptor.decrypt(scaid);
    var decrypted = `acct_${reverseString(scaid)}`;
    console.log('decrypted', decrypted);
    return decrypted ? handleAccount(decrypted, pid, reduxStore) : {};
  }
  
  return { code, state, scaid };
};


export default Account;
