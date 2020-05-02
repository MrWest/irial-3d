import { FETCH_TAGS } from "../actions/types";

const TagsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return action.payload;
    default:
      return state;
  }
};

export default TagsReducer;
