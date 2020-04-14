import { SET_USER_SERVICE_RATE } from "../actions/types";

const ServiceRateReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_USER_SERVICE_RATE: 
    // alert(action.accountView)
      return  action.payload ;   
    default:
      return state;
  }
};

export default ServiceRateReducer;
