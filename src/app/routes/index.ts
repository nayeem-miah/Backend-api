import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { sslRoutes } from "../modules/ssl/sss.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OtpRoutes } from "../modules/otp/otp.route";
import { AmarpayRoutes } from "../modules/amarpay/amarpay.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/ssl", sslRoutes);
router.use("/auth", AuthRoutes);
router.use("/otp", OtpRoutes);
router.use("/amarpay", AmarpayRoutes)



export default router;