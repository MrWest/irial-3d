import _ from "lodash";

const SignFacebookReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_FACEBOOK":
      // if(action.payload)
      //   window.location.href = "/";
      console.log("xxx2", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default SignFacebookReducer;
