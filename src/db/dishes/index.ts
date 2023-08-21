import { Prisma } from "@prisma/client";
import { prisma } from "..";

import { ALL_PREFERENCES, Allergens, Preferences } from "../../static";

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

export async function findManyDishesByAllergens(allergens: Allergens[], page: number) {
    const allergensQuery = allergens.includes('Não contém') ? [] : allergens;

    const dishes = await prisma.dish.findMany({
        where: {
            NOT: {
                allergens: {
                    hasSome: allergensQuery
                }
            }
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return dishes;
}

export async function findManyDishesByPreferences(preferences: Preferences[], page: number) {
    const queryPreferences = preferences.length > 0 ? preferences : ALL_PREFERENCES;

    const dishes = await prisma.dish.findMany({
        where: {
            categories: {
                hasSome: queryPreferences
            }
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return dishes;
}

interface FindManyDishesByFilterParams {
    preferences: Preferences[],
    allergens: Allergens[],
    page: number
}

export async function findManyDishesByAllergensAndPreferences({ allergens, preferences, page }: FindManyDishesByFilterParams) {
    const queryPreferences = preferences.length > 0 ? preferences : ALL_PREFERENCES;
    const queryAllergens = allergens.includes('Não contém') ? [] : allergens;

    const other = await prisma.dish.findMany({
        where: {
            categories: {
                hasSome: queryPreferences,
            },
            NOT: {
                allergens: {
                    hasSome: queryAllergens
                }
            }
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return other;
}