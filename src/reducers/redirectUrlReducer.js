import _ from "lodash";

const RedirectUrlReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_REDIRECT_URL":
      return  action.payload
    default:
      return state;
  }
};

export default RedirectUrlReducer;
