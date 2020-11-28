import {
  SELECT_PROJECT,
  CHANGE_PROJECT_PROGRAM,
  ADD_PROJECT_COMMENT,
  DELETE_PROJECT_COMMENT,
  CHANGE_PROJECT_COMMENT,
  UPDATE_PROJECT_TAGS,
} from "../actions/types";
import _ from "lodash";

const SelectedProjectsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PROJECT:
      return action.payload;
    case CHANGE_PROJECT_PROGRAM:
      let project = Object.assign({}, state);

      project.program.map((prog) => {
        if (parseInt(action.payload.id) === parseInt(prog.id))
          prog.content = action.payload.content;
      });
      project.newProgramText = action.payload.content;
      // console.log("here:", lodging.program)
      return project;
    case CHANGE_PROJECT_COMMENT:
      project = Object.assign({}, state);

      let newComments = [];

      project.comments.map((comment) => {
        if (parseInt(action.payload.id) === parseInt(comment.id))
          comment.comment = action.payload.comment;

        newComments.push(comment);
      });
      project.comments = newComments;
      // console.log("here:", lodging.program)
      return project;
    case ADD_PROJECT_COMMENT:
      return { ...state, comments: action.payload };
    case DELETE_PROJECT_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    case UPDATE_PROJECT_TAGS:
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};

export default SelectedProjectsReducer;
