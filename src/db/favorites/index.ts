import { Prisma } from "@prisma/client";
import { prisma } from "..";

const AMOUNT_PER_PAGE = 20;

export async function registerFavoriteDish(data: Prisma.FavoriteUncheckedCreateInput) {
    await prisma.favorite.create({
        data
    })
}

export async function findManyFavoritesByCustomerId(customer_id: string, page: number) {
    const favoritesCount = await prisma.favorite.count({
        where: {
            customer_id
        }
    });

    const favorites = await prisma.favorite.findMany({
        where: {
            customer_id
        },
        select: {
            customer_id: false,
            favorite_id: false,
            dish: true
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE

    })

    return {
        favorites,
        favoritesCount
    };
}