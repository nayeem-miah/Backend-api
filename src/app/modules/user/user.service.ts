import prisma from "../../prisma/prisma";

const createUser = async (data: { name: string; email: string }) => {
    const result = await prisma.user.create({
        data
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
