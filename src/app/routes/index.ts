import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { sslRoutes } from "../modules/ssl/sss.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/ssl", sslRoutes);


export default router;