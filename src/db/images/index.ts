import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function saveImagePath(data: Prisma.ImageUncheckedCreateInput) {
    await prisma.image.create({
        data
    });
}

export async function saveMultipleImagePaths(data: Prisma.ImageUncheckedCreateInput[]) {
    await prisma.image.createMany({
        data
    })
}

export async function findUniqueImageByPath(path: string) {
    const image = await prisma.image.findFirst({
        where: {
            path
        }
    })

    return image;
}

export async function findImagesByMultiplePaths(paths: string[]) {
    const images = await prisma.image.findMany({
        where: {
            path: {
                in: paths
            }
        }
    })

    return images;
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

export async function findManyRestaurantImagesPathById(restaurantId: string) {
    const paths = await prisma.image.findMany({
        where: {
            restaurant_id: restaurantId
        }
    })

    return paths;
}

export async function findManyDishImagesPathById(dishId: string) {
    const paths = await prisma.image.findMany({
        where: {
            dish_id: dishId
        }
    })

    return paths;
}