import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { authRateLimiter } from "../../middlewares/authRateLimiter";
import { fileUpload } from "../../../utils/fileUpload";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post("/",
    fileUpload.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createUserValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createUser(req, res, next)
    });
router.get("/", authRateLimiter, UserController.getUsers);

export const UserRoutes = router;
