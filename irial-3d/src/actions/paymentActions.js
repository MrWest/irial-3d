import { EMPY_CART } from "./types";

// import StripePayments from "../apis/StripePayments";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters, getLanguage, generateAppendParameters, headers } from "../apis/tools";
var fileDownload = require('react-file-download');

//employee-orders_list
export const payCart = info => async dispatch => {

  const paymentInfo = generateAppendParameters(info);
  console.log('payCart: ', paymentInfo);
  const checkout = await DashBoard.post("/payments/purchase.php", paymentInfo, {headers});
  console.log('payCart: ', checkout);
  
  dispatch({
    type: EMPY_CART
  });

  
  };

//employee-orders_list
export const downloadFile = async info => {
  const paymentInfo = generateAppendParameters(info);
  console.log('downloadFile: ', paymentInfo);
  const checkout = await DashBoard.post("/payments/download_purchase.php", 
  paymentInfo, {headers: { ...headers, "Access-Control-Allow-Origin": "*" }});
  console.log('downloadFile: ', checkout);
  
  fileDownload(checkout.data, info.name+'.pdf');
  
  };
  
