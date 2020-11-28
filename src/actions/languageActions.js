import { SET_LANG_EN, SET_LANG_ES } from "./types";

export const setLanguageEn = () => async (dispatch) => {
  dispatch({
    type: SET_LANG_EN,
  });
};

export const setLanguageEs = () => async (dispatch) => {
  dispatch({
    type: SET_LANG_ES,
  });
};
