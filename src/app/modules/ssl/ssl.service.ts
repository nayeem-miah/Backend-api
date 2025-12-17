/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const sslPaymentInit = async (payload: any) => {
    try {

        // iInitiate Payment
        const data = {
            store_id: config.ssl.SSL_STORE_ID,
            store_passwd: config.ssl.SSL_STORE_PASS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            success_url: `${config.ssl.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
            fail_url: `${config.ssl.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
            cancel_url: `${config.ssl.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
            ipn_url: config.ssl.SSL_IPN_URL,
            shipping_method: "N/A",
            product_name: "Product name",
            product_category: "Service",
            product_profile: "general",
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: "N/A",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: payload.phoneNumber,
            cus_fax: "01711111111",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: 1000,
            ship_country: "N/A",
        }

        const response = await axios({
            method: "POST",
            url: config.ssl.SSL_PAYMENT_API,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        console.log(response);
        return response.data

    } catch (error: any) {
        console.log("payment error occurred", error);
        throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
};



export const sslService = { sslPaymentInit }