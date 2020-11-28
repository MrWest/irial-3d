import { SELECT_POST } from "../actions/types";
import _ from "lodash";

const SelectedPostReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_POST:
      return action.payload;
    default:
      return state;
  }
};

export default SelectedPostReducer;
