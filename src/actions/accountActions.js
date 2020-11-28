import { LOG_IN, LOG_OUT, IS_LOGGED } from "./types";
import { style } from "react-toastify";
export const selectAccountView = (status) => async (dispatch) => {
  dispatch({
    type: "SELECT_ACCOUNT_VIEW",
    accountView: status,
  });
};
