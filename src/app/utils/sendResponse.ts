import { Response } from "express";

type TResponse = {
    statusCode: number;
    message: string;
    data?: any;

};

const sendResponse = (res: Response, payload: TResponse) => {
    res.status(payload.statusCode).json({
        success: true,
        message: payload.message,
        data: payload.data,
    });
};

export default sendResponse;
