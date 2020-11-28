import { SELECT_SECTION } from "../actions/types";
import _ from "lodash";

const SelectedSectionReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SECTION:
      return action.payload;

    default:
      return state;
  }
};

export default SelectedSectionReducer;
