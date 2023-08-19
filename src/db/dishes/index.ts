import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function saveDish(data: Prisma.DishUncheckedCreateInput) {
    await prisma.dish.create({
        data
    });
}

export async function findUniqueDishById(dish_id: string) {
    const dish = await prisma.dish.findUnique({
        where: {
            dish_id
        }
    })

    return dish;
}

export async function updateDishData(data: Prisma.DishUpdateInput, dish_id: string) {
    await prisma.dish.update({
        where: {
            dish_id
        },
        data
    })
}