import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function saveRestaurantProfileImagePath(data: Prisma.ImageUncheckedCreateInput) {
    await prisma.image.create({
        data
    });
}

export async function findUniqueImageById(id: string) {
    const image = await prisma.image.findUnique({
        where: {
            image_id: id
        }
    })

    return image;
}

export async function removeImageById(imageId: string) {
    await prisma.image.delete({
        where: {
            image_id: imageId
        }
    })
}