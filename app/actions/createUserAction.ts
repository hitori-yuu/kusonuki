"use server";

import prisma from "../../lib/prismaClient";

export const createUser = async (id: string, name: string, image: string) => {
    await prisma.user.create({
        data: {
            id,
            name,
            image
        }
    });
    console.log("Create user: " + name);
}