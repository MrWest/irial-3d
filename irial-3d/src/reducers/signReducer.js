import _ from "lodash";

const SignReducer = (state = {isLogged: false, loginInfo: {}}, action) => {
  switch (action.type) {
    case "LOG_IN":
    // if(action.payload)
    //   window.location.href = "/";
      return {...state, isLogged: action.payload['login'] === "success",  loginInfo: action.payload };
    case "LOG_OUT":
      window.location.href = "/";
      return { ...state, isLogged: action.payload['login'] === "success", loginInfo:  {}  };
    case "IS_LOGGED":
      console.log("SignReducer: ", action.payload);
      return { ...state, isLogged: action.payload, loginInfo: {} };
    case "SAVE_PROFILE":
      console.log("SignReducer: ", action.payload);
      return { ...state,  loginInfo: action.payload };
    default:
      return state;
  }
};

export default SignReducer;
