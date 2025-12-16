import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "user create successfully",
        data: user
    })
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "users retrieved successfully", data: users
    })
});

export const UserController = {
    createUser,
    getUsers,
};
