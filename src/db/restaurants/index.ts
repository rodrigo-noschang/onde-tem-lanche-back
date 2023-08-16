import { Prisma } from "@prisma/client";
import { EmailAlreadyRegistered } from "../../errors/emailAlreadyRegistered";
import { prisma } from "..";

export async function findUniqueRestaurantByEmail(email: string) {
    const existingRestaurant = await prisma.restaurant.findUnique({
        where: {
            email
        }
    })

    return existingRestaurant;
}

export async function saveRestaurant(data: Prisma.RestaurantUncheckedCreateInput) {
    console.log(data);

    await prisma.restaurant.create({
        data
    });
}