import DashBoard from "./DashBoard";

import { initializeStore } from '../../store'

import { loadState } from "./LocalStorage";
let loadedInitialState = loadState();


export const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState = loadedInitialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export const generatePHPParameters = ramdomObject => {

    var urlParams = ""
    var fisrt = true
    for (var x in ramdomObject) {
      if(fisrt){
        urlParams += "?"   + x + "=" + ramdomObject[x];
        fisrt = false
      }
      else
      urlParams += "&"   + x + "=" + ramdomObject[x];
     
    }
  
    return urlParams
  }

  export const generateAppendParameters = ramdomObject => {

    let uploadInfo = new FormData();
    for (var x in ramdomObject)      
      uploadInfo.append( x ,  ramdomObject[x]);
  
    return uploadInfo
  }


  export const getLanguage = reduxStore => {

    if(reduxStore)
    {
      const state = reduxStore.getState();
      const language = state.language

      return language._language
    }
    const store = getOrCreateStore();
    const state = store.getState();
    const language = state.language

    return language._language;
  }


  export const sendNotificationEmail = async (DashBoard, data) => {

    let sendData  = Object.assign({}, data);

    var headers = {
      "Content-Type": "multipart/form-data"
    };

    const lang = getLanguage();
    
     if(data.subject)
     sendData.subject += " ("+lang+")"
    
    let uploadInfo = generateAppendParameters(sendData);



    const promises = await DashBoard.post("/mail/notificationemail.php", uploadInfo,  {headers})
    
    

      const results = await promises
      


   
    return results
  }


  export const sendConfirmationEmail = async (DashBoard, data) => {

    let sendData  = Object.assign({}, data);

    var headers = {
      "Content-Type": "multipart/form-data"
    };

    // const lang = getLanguage();
    
    //  if(data.subject)
    //  sendData.subject += " ("+lang+")"
    
    let uploadInfo = generateAppendParameters(sendData);



    const promises = await DashBoard.post("/mail/confirmationemail.php", uploadInfo,  {headers})
    
    

      const results = await promises
      


   
    return results
  }

  export function getFacebookFreeUserProfileUrl( bloqued ) {

    const id = bloqued.substring(bloqued.indexOf('=')+1, bloqued.indexOf('&'));
    return `https://graph.facebook.com/${id}/picture?type=small`;
  }

   // First, checks if it isn't implemented yet.

  