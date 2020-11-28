import {
  SELECT_SCENE,
  CHANGE_SCENE_PROGRAM,
  ADD_SCENE_COMMENT,
  DELETE_SCENE_COMMENT,
  CHANGE_SCENE_COMMENT,
  UPDATE_SCENE_TAGS,
} from "../actions/types";
import _ from "lodash";

const SelectedScenesReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SCENE:
      return action.payload;
    case CHANGE_SCENE_PROGRAM:
      let scene = Object.assign({}, state);

      scene.program.map((prog) => {
        if (parseInt(action.payload.id) === parseInt(prog.id))
          prog.content = action.payload.content;
      });
      scene.newProgramText = action.payload.content;
      // console.log("here:", lodging.program)
      return scene;
    case CHANGE_SCENE_COMMENT:
      scene = Object.assign({}, state);

      let newComments = [];

      scene.comments.map((comment) => {
        if (parseInt(action.payload.id) === parseInt(comment.id))
          comment.comment = action.payload.comment;

        newComments.push(comment);
      });
      scene.comments = newComments;
      // console.log("here:", lodging.program)
      return scene;
    case ADD_SCENE_COMMENT:
      return { ...state, comments: action.payload };
    case DELETE_SCENE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    case UPDATE_SCENE_TAGS:
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};

export default SelectedScenesReducer;
