import {
  FETCH_TEXTURES,
  DELETE_TEXTURE,
  UPDATE_TEXTURE,
  ADD_TEXTURE,
} from "../actions/types";
import _ from "lodash";

const TexturesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TEXTURES:
      return action.payload;
    case DELETE_TEXTURE:
      let newState = [];

      _.map(state, (texture, index) => {
        if (parseInt(texture.id) !== parseInt(action.payload))
          newState.push(texture);
      });

      return newState;
    case UPDATE_TEXTURE:
      newState = [];

      _.map(state, (texture, index) => {
        if (parseInt(texture.id) === parseInt(action.payload.id))
          newState.push(action.payload);
        else newState.push(texture);
      });

      return newState;
    case ADD_TEXTURE:
      newState = [];

      _.map(state, (texture, index) => {
        newState.push(texture);
      });

      newState.push(action.payload);

      return newState;
    default:
      return state;
  }
};

export default TexturesReducer;
