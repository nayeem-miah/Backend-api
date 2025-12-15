import { Request } from "express";
import { ApiError } from "../../errors/apiError";
import prisma from "../../prisma/prisma";
import { fileUpload } from "../../utils/fileUpload";
import { sendEmail } from "../../utils/emailSender";

const createUser = async (req: Request) => {

    const isExistingUser = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (isExistingUser) {
        throw new ApiError("User already exits!", 403)
    }

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

    await sendEmail({
        to: req.body.email,
        subject: "Welcome to SMT Project 🎉",
        html: `
      <h2>Hello ${req.body.name}</h2>
      <p>Welcome to our platform.</p>
      <p>Happy coding 🚀</p>
    `,
    });

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
