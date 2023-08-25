import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function saveRestaurantProfileImagePath(data: Prisma.ImageUncheckedCreateInput) {
    await prisma.image.create({
        data
    });
}