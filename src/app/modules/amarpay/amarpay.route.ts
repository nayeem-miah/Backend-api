import { Router } from "express";
import { AmarpayController } from "./amarpay.controller";

const router = Router();

router.post("/init", AmarpayController.createAmarpay);

router.post("/success", AmarpayController.successPayment);

router.post("/fail", AmarpayController.failPayment);

router.post("/cancel", AmarpayController.cancelPayment);

router.post("/verify", AmarpayController.verifyPayment);



export const AmarpayRoutes = router;