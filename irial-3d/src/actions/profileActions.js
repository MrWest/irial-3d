import {LOAD_PROFILE, SAVE_PROFILE, UPDATE_BILLING_INFO} from "./types";
import DashBoard from "../apis/DashBoard";
import {generateAppendParameters, generatePHPParameters} from "../apis/tools";


export const loadProfile = id => async dispatch => {
 
  
 const profileAPI = await DashBoard.get("/users/load_profile.php"+ generatePHPParameters({id}))
  
    const profile = profileAPI.data;
    dispatch({
      type: LOAD_PROFILE,
      payload: profile
    });
  };

 
  export const saveProfile = profile => async dispatch => {
  
    var headers = {
      "Content-Type": "multipart/form-data"
    };

    const profileAPI = await DashBoard.post("/users/update_user.php",  generateAppendParameters(profile),  {headers});

    profileAPI.data.password = undefined;
    dispatch({
      type: SAVE_PROFILE,
      payload: profileAPI.data
    });
  };

  
export const updateBillingInfo = info => async dispatch => {
 
  var headers = {
    "Content-Type": "multipart/form-data"
  };

  const userAPI = await DashBoard.post("/users/update_user_stripe_account_info.php",  generateAppendParameters(info),  {headers});

  const user = userAPI.data;

  dispatch({
    type: UPDATE_BILLING_INFO,
    payload: user
  });
};
  