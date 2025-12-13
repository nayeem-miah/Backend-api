import express from "express";
import { UserController } from "./user.controller";
import { authRateLimiter } from "../../middlewares/authRateLimiter";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", authRateLimiter, UserController.getUsers);

export const UserRoutes = router;
