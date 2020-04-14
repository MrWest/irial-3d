import { LOG_IN, LOG_OUT, IS_LOGGED } from "./types";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, sendNotificationEmail,sendConfirmationEmail, generateAppendParameters} from "../apis/tools";
import { okAndLog, errorAndLog, contentAppJSON } from '../helpers/utils';
import wordpress from '../apis/wordpressRestAPI';


export const FuckIngshit = async logIn => {
  const logInDb = await DashBoard.get("/users/login.php"+ generatePHPParameters(logIn))
  var logInRslt = logInDb.data
  // console.log("success",logInRslt)
  return logInRslt
}
export const logIn = logIn=> async dispatch => {
 
  
  const logInDb = await DashBoard.get("/users/login.php"+ generatePHPParameters(logIn))
  var logInRslt = logInDb.data
  console.log("before",logInRslt)
  if(logIn.picture)
  {
    if(logInRslt.type)
    logIn.type = logInRslt.type
    logIn.id = logInRslt.id

     logInRslt = Object.assign({}, logIn);
     logInRslt.login = "success"
     console.log("success",logInRslt)
  }
  // console.log("hash:", logInRslt)
  //  alert("fuck")
  dispatch({
    type: "LOG_IN",
    payload: logInRslt
  });

  return logInRslt

};


export const signUp = signUp  => async dispatch => {


  var headers = {
    "Content-Type": "multipart/form-data"
  };


  let uploadInfo = new FormData();
  
  //uploadInfo.append("id_business", signUp.id_business);
 
  uploadInfo.append("first_name", signUp.first_name);
  uploadInfo.append("last_name", signUp.last_name);
  uploadInfo.append("email", signUp.email);
  uploadInfo.append("password", signUp.password);
  uploadInfo.append("type", "business");
  uploadInfo.append("status", "pending");
  uploadInfo.append("login_type", signUp.login_type);
  uploadInfo.append("id_login", signUp.id_login || 0);
  if(signUp.picture)
  uploadInfo.append("picture", signUp.picture);

  const userDb = await DashBoard.post("/users/add_user.php", uploadInfo,  {headers})
  
    var userRslt = userDb.data
    userRslt.login = "success"
    dispatch({
      type: "LOG_IN",
      payload: userRslt
    });


  

    return userRslt
};

export const logOut = () => async dispatch => {
  dispatch({
    type: "LOG_OUT",
    payload: false
  });
};

export const isLogged = status => async dispatch => {
  console.log("isLoggedAction: ", status);

  dispatch({
    type: "IS_LOGGED",
    payload: status
  });
};

export const notifyActivity = async data =>  {
  
  await sendNotificationEmail(DashBoard, data);

};

export const confirmActivity = data => async dispatch =>  {
 
  await sendConfirmationEmail(DashBoard, data);

};

export const signFacebook = logIn => async dispatch => {
  // console.log("isLoggedAction: ", status);

  dispatch({
    type: "LOAD_FACEBOOK",
    payload: logIn
  });
};

export const setRedirectUrl = redirectUrl => async dispatch => {

  dispatch({
    type: "SET_REDIRECT_URL",
    payload: redirectUrl
  });
};

export const saveProfile = profile => async dispatch => {
 
  var headers = {
    "Content-Type": "multipart/form-data"
  };

  const profileAPI = await DashBoard.post("/users/update_user.php",  generateAppendParameters(profile),  {headers});

  profileAPI.data.password = undefined;
  dispatch({
    type: "SAVE_PROFILE",
    payload: profileAPI.data
  });
};

export const prepareRecoveryEmail = data => async dispatch => {

  let sendData  = Object.assign({}, data);

  var headers = {
    "Content-Type": "multipart/form-data"
  };

  
  
  let uploadInfo = generateAppendParameters(sendData);

  const promises = await DashBoard.post("/users/add_password_access.php", uploadInfo,  {headers});
 
  
   

  const results = await promises;
    


 
  return results.data;
}

export const resetPassword = data => async dispatch => {

  let sendData  = Object.assign({}, data);

  var headers = {
    "Content-Type": "multipart/form-data"
  };

  
  
  let uploadInfo = generateAppendParameters(sendData);

  const promises = await DashBoard.post("/users/reset_password.php", uploadInfo,  {headers});
 
  
   

  const results = await promises;
    


 
  return results.data;
}


export const getPasswordAccess = idreset => async dispatch => {

  let sendData  = Object.assign({}, {idreset});

 
  
  let uploadInfo = generatePHPParameters(sendData);

  const promises = await DashBoard.get("/users/get_password_access.php"+ uploadInfo);
 
  
   

  const results = await promises;
    


 
  return results.data;
}

export const addComment = async data => {
  console.log('addComment Action - Entering');
  try {
    const apiCall = await wordpress.post('/comments/', data, contentAppJSON);
    if (apiCall.status === 200) {
      return okAndLog('addComment', apiCall.status, apiCall.data);
    }
    return errorAndLog('addComment', apiCall.status, apiCall.data);
  } catch (e) {
    return errorAndLog('addComment', e.status, e.data);
  }
};