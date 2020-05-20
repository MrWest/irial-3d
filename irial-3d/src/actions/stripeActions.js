import { EMPY_CART } from "./types";

// import StripePayments from "../apis/StripePayments";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters, headers } from "../apis/tools";

//employee-orders_list
export const createConnectedAccount = async info => {
  const paymentInfo = generateAppendParameters(info);
  console.log('xxx1: ', paymentInfo);
  const checkout = await DashBoard.post("/stripe/create_connected_account.php", paymentInfo, {headers});
  console.log('xxx2: ', checkout);
  
  
  };
