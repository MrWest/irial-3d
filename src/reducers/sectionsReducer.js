import { FETCH_SECTIONS, UPDATE_SECTION } from "../actions/types";
import _ from "lodash";

const sectionsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SECTIONS:
      return action.payload;
    case UPDATE_SECTION:
      let newState = [];

      _.map(state, (section, index) => {
        if (parseInt(section.id) === parseInt(action.payload.id))
          newState.push(action.payload);
        else newState.push(section);
      });

      return newState;
    default:
      return state;
  }
};

export default sectionsReducer;
