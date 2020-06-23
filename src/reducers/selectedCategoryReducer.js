import { SELECT_CATEGORY } from "../actions/types";
import _ from "lodash";

const SelectedCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case SELECT_CATEGORY:
        return action.payload
     
      default:
        return state;
    }
  };
  
  export default SelectedCategoryReducer;