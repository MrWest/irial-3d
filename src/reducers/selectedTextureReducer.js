import {
  SELECT_TEXTURE,
  CHANGE_TEXTURE_PROGRAM,
  ADD_TEXTURE_COMMENT,
  DELETE_TEXTURE_COMMENT,
  CHANGE_TEXTURE_COMMENT,
  UPDATE_TEXTURE_TAGS,
} from "../actions/types";

const SelectedTexturesReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_TEXTURE:
      return action.payload;
    case CHANGE_TEXTURE_PROGRAM:
      let texture = Object.assign({}, state);

      texture.program.map((prog) => {
        if (parseInt(action.payload.id) === parseInt(prog.id))
          prog.content = action.payload.content;
      });
      texture.newProgramText = action.payload.content;
      // console.log("here:", lodging.program)
      return texture;
    case CHANGE_TEXTURE_COMMENT:
      texture = Object.assign({}, state);

      let newComments = [];

      texture.comments.map((comment) => {
        if (parseInt(action.payload.id) === parseInt(comment.id))
          comment.comment = action.payload.comment;

        newComments.push(comment);
      });
      texture.comments = newComments;
      // console.log("here:", lodging.program)
      return texture;
    case ADD_TEXTURE_COMMENT:
      return { ...state, comments: action.payload };
    case DELETE_TEXTURE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    case UPDATE_TEXTURE_TAGS:
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};

export default SelectedTexturesReducer;
