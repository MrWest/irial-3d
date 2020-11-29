import { EMPY_CART } from "./types";

// import StripePayments from "../apis/StripePayments";
import DashBoard from "../apis/DashBoard";
import { generateAppendParameters, headers } from "../apis/tools";
var fileDownload = require("js-file-download");

//employee-orders_list
export const payCart = (info) => async (dispatch) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("payCart: ", paymentInfo);
  const checkout = await DashBoard.post("/payments/purchase.php", paymentInfo, {
    headers,
  });
  console.log("payCart: ", checkout);

  dispatch({
    type: EMPY_CART,
  });

  return checkout.data;
};

//employee-orders_list
export const downloadFile = async (info) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("downloadFile: ", paymentInfo);
  const checkout = await DashBoard.post(
    "/payments/download_purchase.php",
    paymentInfo,
    { headers }
  );
  console.log("downloadFile: ", checkout);

  //fileDownload(checkout.data, `${info.name}.pdf`);
};

//employee-orders_list
export const doTransfers = async (info) => {
  const paymentInfo = generateAppendParameters(info);
  console.log("doTransfers: ", paymentInfo);
  const checkout = await DashBoard.post(
    "/payments/auto_purchases.php",
    paymentInfo,
    { headers }
  );
  console.log("doTransfers: ", checkout);

  //fileDownload(checkout.data, `${info.name}.pdf`);
};
