import { Router } from "express";
import { sslController } from "./ssl.controller";

const router = Router();

router.post("/init", sslController.initPayment);

router.post("/success", sslController.paymentSuccess);
router.post("/fail", sslController.paymentFail);
router.post("/cancel", sslController.paymentCancel);
router.post("/ipn", sslController.paymentIPN);

export const sslRoutes = router;
