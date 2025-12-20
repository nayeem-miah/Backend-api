import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import axios from "axios";

const createAmarpay = async (req: Request) => {
  const transactionId = uuidv4();

  const payload = new URLSearchParams({
    store_id: config.amarpay.store_id as string,
    signature_key: config.amarpay.signature_key as string,
    tran_id: transactionId,
    amount: req.body.amount.toString(),
    currency: "BDT",
    desc: "Test Payment",

    cus_name: req.body.name,
    cus_email: req.body.email,
    cus_phone: req.body.phone,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",

    success_url: "http://localhost:5000/api/v1/amarpay/success",
    fail_url: "http://localhost:5000/api/v1/amarpay/fail",
    cancel_url: "http://localhost:5000/api/v1/amarpay/cancel",
  });

  const response = await axios.post(
    config.amarpay.payment_url as string,
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );


  return {
    paymentUrl: `https://sandbox.aamarpay.com${response.data}`,
    transactionId,
  };
};

const verifyAmarpayPayment = async (tran_id: string) => {
  const verifyUrl = `${config.amarpay.verify_url}?request_id=${tran_id}&store_id=${config.amarpay.store_id}&signature_key=${config.amarpay.signature_key}`;

  const response = await axios.get(verifyUrl);

  return response.data;
};

export const AmarpayService = {
  createAmarpay,
  verifyAmarpayPayment,
};
