
export const selectAccountView = (status) => async (dispatch) => {
  dispatch({
    type: "SELECT_ACCOUNT_VIEW",
    accountView: status,
  });
};
