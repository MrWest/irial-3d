// import { UPDATE_BILLING_INFO } from "./types";
// import DashBoard from "../apis/DashBoard";
// import {generateAppendParameters} from "../apis/tools";

// export const updateBillingInfo = info => async dispatch => {

//   var headers = {
//     "Content-Type": "multipart/form-data"
//   };

//   const userAPI = await DashBoard.post("/users/update_user.php",  generateAppendParameters(info),  {headers});

//   const user = userAPI.data;

//   dispatch({
//     type: UPDATE_BILLING_INFO,
//     payload: user
//   });
// };
