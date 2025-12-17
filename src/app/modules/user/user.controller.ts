/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "user created successfully",
        data: user
    })
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: users
    })
});

// New: Get current authenticated user
const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Not authenticated",
            data: null
        });
    }

    const user = await UserService.getCurrentUser((req.user as any).id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Current user retrieved successfully",
        data: user
    });
});



export const UserController = {
    createUser,
    getUsers,
    getCurrentUser,
   
};