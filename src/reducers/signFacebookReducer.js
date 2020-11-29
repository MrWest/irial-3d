const SignFacebookReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_FACEBOOK":
      return action.payload;

    default:
      return state;
  }
};

export default SignFacebookReducer;
