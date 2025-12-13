import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);
    sendResponse(res, {
        statusCode: 200,
        message: "user create success",
        data: user
    })
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getUsers();
    sendResponse(res, {
        statusCode: 200,
        message: "user create success",
        data: users
    })
});

export const UserController = {
    createUser,
    getUsers,
};
