import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { sslRoutes } from "../modules/ssl/sss.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OtpRoutes } from "../modules/otp/otp.route";
import { AmarpayRoutes } from "../modules/amarpay/amarpay.route";
import { invoiceRoutes } from "../modules/invoice/invoice.route";
import { WeatherRoutes } from "../modules/weather/weather.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/ssl", sslRoutes);
router.use("/auth", AuthRoutes);
router.use("/otp", OtpRoutes);
router.use("/amarpay", AmarpayRoutes)
router.use('/invoice', invoiceRoutes);

router.use('/weather', WeatherRoutes)





export default router;