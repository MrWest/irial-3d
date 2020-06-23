import {LOAD_PROFILE, SAVE_PROFILE, UPDATE_BILLING_INFO} from "./types";
import DashBoard from "../apis/DashBoard";
import {generateAppendParameters, generatePHPParameters, headers} from "../apis/tools";


export const loadProfile = id => async dispatch => {
 
  
 const profileAPI = await DashBoard.get("/users/load_profile.php"+ generatePHPParameters({id}))
  
    const profile = profileAPI.data;
    dispatch({
      type: LOAD_PROFILE,
      payload: profile
    });
  };

 
  export const saveProfile = profile => async dispatch => {

    const profileAPI = await DashBoard.post("/users/update_user.php",  generateAppendParameters(profile),  {headers});

    profileAPI.data.password = undefined;
    dispatch({
      type: SAVE_PROFILE,
      payload: profileAPI.data
    });
  };

  
export const updateBillingInfo = info => async dispatch => {

  const userAPI = await DashBoard.post("/users/update_user_stripe_account_info.php",  generateAppendParameters(info),  {headers});

  const user = userAPI.data;

  dispatch({
    type: UPDATE_BILLING_INFO,
    payload: user
  });

  return user;
};
  

export const updateStripeAccountInfo = async info => {

  const userAPI = await DashBoard.post("/users/update_user_bank_account.php",  generateAppendParameters(info),  {headers});

  const user = userAPI.data;

  // dispatch({
  //   type: UPDATE_BILLING_INFO,
  //   payload: user
  // });

  return user;
};



export const updateStripeAccountInfoServer = async info => {
  console.log('xxx', info);
  const userAPI = await DashBoard.get("/users/update_user_bank_account.php"+generatePHPParameters(info));

  const user = userAPI.data;

  // dispatch({
  //   type: UPDATE_BILLING_INFO,
  //   payload: user
  // });

  return user;
};




  
export const updateBillingInfoServer = async (reduxStore, info) => {

  const userAPI = await DashBoard.post("/users/update_user_stripe_account_info.php"+generatePHPParameters(info),  {headers});

  const user = userAPI.data;

  if(reduxStore)
    reduxStore.dispatch({
      type: UPDATE_BILLING_INFO,
      payload: user
    });

  return user;
};
  
  