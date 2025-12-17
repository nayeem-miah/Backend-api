import { Request, Response } from "express";
import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import catchAsync from "../../utils/catchAsync";
import { sslService } from "./ssl.service";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";

const initPayment = catchAsync(async (req: Request, res: Response) => {
    const transactionId = uuidv4();

    const payload = {
        transactionId,
        amount: req.body.amount,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    };

    const result = await sslService.sslPaymentInit(payload);

    if (!result?.GatewayPageURL) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Failed to initiate SSL payment",
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "SSL payment initiated successfully",
        data: result.GatewayPageURL,
    });


})

// ================= CALLBACK HANDLERS =================

const paymentSuccess = async (req: Request, res: Response) => {
    const { transactionId, amount, } = req.query;

    res.redirect(
        `${config.ssl.SSL_SUCCESS_FRONTEND_URL}?transactionId=${transactionId}&amount=${amount}`
    );
};

const paymentFail = async (req: Request, res: Response) => {
    const { transactionId } = req.query;

    // 👉 DB update (status = FAILED)
    res.redirect(
        `${config.ssl.SSL_FAIL_FRONTEND_URL}?transactionId=${transactionId}`
    );
};

const paymentCancel = async (req: Request, res: Response) => {
    const { transactionId } = req.query;

    // 👉 DB update (status = CANCELLED)
    res.redirect(
        `${config.ssl.SSL_CANCEL_FRONTEND_URL}?transactionId=${transactionId}`
    );
};

const paymentIPN = async (req: Request, res: Response) => {
    // SSLCommerz server-to-server confirmation
    console.log("IPN Data:", req.body);

    res.status(200).json({ received: true });
};

export const sslController = {
    initPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    paymentIPN,
};
