import { Prisma } from "@prisma/client";
import { prisma } from "..";

const AMOUNT_PER_PAGE = 20;

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

export async function updateDishRatings(rate: number, dish_id: string) {
    await prisma.dish.update({
        where: {
            dish_id
        },
        data: {
            ratings: {
                push: rate
            }
        }
    })
}

export async function findManyDishesByRestaurantId(restaurant_id: string, page: number) {
    const dishes = await prisma.dish.findMany({
        where: {
            restaurant_id
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return dishes;
}