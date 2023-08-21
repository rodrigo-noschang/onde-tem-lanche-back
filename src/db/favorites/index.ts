import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function registerFavoriteDish(data: Prisma.FavoriteUncheckedCreateInput) {
    await prisma.favorite.create({
        data
    })
}