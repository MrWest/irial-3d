import { EMPY_CART } from "./types";

// import StripePayments from "../apis/StripePayments";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters, headers } from "../apis/tools";

//employee-orders_list
export const payCart = info => async dispatch => {

  dispatch({
    type: EMPY_CART
  });

  var headers = {
    "Content-Type": "multipart/form-data"
  };

  const paymentInfo = generateAppendParameters(info);
  console.log('xxx1: ', paymentInfo);
  const checkout = await DashBoard.post("/payments/purchase.php", paymentInfo, {headers});
  console.log('xxx2: ', checkout);
  
  dispatch({
    type: EMPY_CART
  });

  
  };
