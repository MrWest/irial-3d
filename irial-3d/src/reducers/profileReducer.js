
import { LOAD_PROFILE, SAVE_PROFILE, UPDATE_BILLING_INFO } from "../actions/types";


const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
    case SAVE_PROFILE:
    case UPDATE_BILLING_INFO:
      return {...state, ...action.payload};
    
    default:
      return state;
  }
};

export default profileReducer;
