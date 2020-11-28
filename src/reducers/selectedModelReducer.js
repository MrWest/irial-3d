import {
  SELECT_MODEL,
  CHANGE_MODEL_PROGRAM,
  ADD_MODEL_COMMENT,
  DELETE_MODEL_COMMENT,
  CHANGE_MODEL_COMMENT,
  UPDATE_MODEL_TAGS,
} from "../actions/types";
import _ from "lodash";

const SelectedModelsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_MODEL:
      return action.payload;
    case CHANGE_MODEL_PROGRAM:
      let model = Object.assign({}, state);

      model.program.map((prog) => {
        if (parseInt(action.payload.id) === parseInt(prog.id))
          prog.content = action.payload.content;
      });
      model.newProgramText = action.payload.content;
      // console.log("here:", lodging.program)
      return model;
    case CHANGE_MODEL_COMMENT:
      model = Object.assign({}, state);

      let newComments = [];

      model.comments.map((comment) => {
        if (parseInt(action.payload.id) === parseInt(comment.id))
          comment.comment = action.payload.comment;

        newComments.push(comment);
      });
      model.comments = newComments;
      // console.log("here:", lodging.program)
      return model;
    case ADD_MODEL_COMMENT:
      return { ...state, comments: action.payload };
    case DELETE_MODEL_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    case UPDATE_MODEL_TAGS:
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};

export default SelectedModelsReducer;
