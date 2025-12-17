import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { fileUpload } from "../../utils/fileUpload";
import { userValidation } from "./user.validation";
import passport from "../../config/passport.config";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Existing routes
router.post("/",
    fileUpload.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createUserValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createUser(req, res, next)
    }
);

router.get("/",auth(UserRole.ADMIN), UserController.getUsers);

// New Google OAuth routes
router.get(
    "/auth/google",
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    "/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/login',
        failureMessage: true
    }),
    (req: Request, res: Response) => {
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard`);
    }
);

// Get current user (protected)
router.get("/me", auth(UserRole.USER, UserRole.ADMIN), UserController.getCurrentUser);



export const UserRoutes = router;