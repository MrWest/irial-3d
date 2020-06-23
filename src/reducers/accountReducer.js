import _ from "lodash";

const AccountReducer = (state = 0, action) => {
  switch (action.type) {
    case "SELECT_ACCOUNT_VIEW": 
    // alert(action.accountView)
      return  action.accountView ;   
    default:
      return state;
  }
};

export default AccountReducer;
