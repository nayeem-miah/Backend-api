import { Request } from "express";
import { ApiError } from "../../errors/apiError";
import prisma from "../../prisma/prisma";
import { fileUpload } from "../../../utils/fileUpload";

const createUser = async (req: Request) => {

    if (!req.file) {
        throw new ApiError("file is required!", 404);
    }

    const uploadedResult = await fileUpload.uploadToCloudinary(req.file);
    const image_url = uploadedResult?.secure_url;


    const result = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            profilePicture: image_url
        }
    })

    return result;
};

const getUsers = async () => {
    return await prisma.user.findMany({
        include: { posts: true },
    });

};

export const UserService = {
    createUser,
    getUsers,
};
