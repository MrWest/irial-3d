
import { LOAD_PROFILE, SAVE_PROFILE} from "../actions/types";


const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return action.payload;
    case SAVE_PROFILE:
      return action.payload;
    
    default:
      return state;
  }
};

export default profileReducer;
