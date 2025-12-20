import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AmarpayService } from "./amarpay.service";
import config from "../../config";

const createAmarpay = catchAsync(async (req: Request, res: Response) => {
  const result = await AmarpayService.createAmarpay(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "amarpay created successfully",
    data: result,
  });
});

const successPayment = catchAsync(async (req: Request, res: Response) => {
  console.log("🔁 AmarPay redirect success:", req.body);

  //! update status in DB

  res.redirect(
    config.frontendSuccessUrl || "https://nayeem-miah.vercel.app"
  );
});


const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  console.log("❌ Payment Cancel:", req.body);

  res.redirect(
    config.frontendCancelUrl || ""
  )
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
  console.log("❌ Payment Fail:", req.body);

  res.redirect(
    config.frontendFailUrl || ""
  )
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { tran_id } = req.body;

  if (!tran_id) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Transaction ID required",
    });
  }

  const result = await AmarpayService.verifyAmarpayPayment(tran_id);

  // 🔐 VERY IMPORTANT CHECK
  if (result?.pay_status !== "Successful") {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Payment not successful",
      data: result,
    });
  }

  // ! DB update 
  // * order.status = "PAID"

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment verified successfully",
    data: result,
  });
});

export const AmarpayController = {
  createAmarpay,
  successPayment,
  cancelPayment,
  failPayment,
  verifyPayment
};