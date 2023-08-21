import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function registerFavoriteDish(data: Prisma.FavoriteUncheckedCreateInput) {
    await prisma.favorite.create({
        data
    })
}

export async function findManyFavoritesByCustomerId(customer_id: string) {
    const favorites = await prisma.favorite.findMany({
        where: {
            customer_id
        },
        select: {
            customer_id: false,
            favorite_id: false,
            dish: true
        }
    })

    return favorites;
}