import { Prisma } from "@prisma/client";
import { prisma } from "..";

export async function findUniqueRestaurantByEmail(email: string) {
    const existingRestaurant = await prisma.restaurant.findUnique({
        where: {
            email
        }
    })

    return existingRestaurant;
}

export async function findUniqueRestaurantByPhone(phone: string) {
    const existingRestaurant = await prisma.restaurant.findUnique({
        where: {
            phone
        }
    })

    return existingRestaurant;
}

export async function saveRestaurant(data: Prisma.RestaurantUncheckedCreateInput) {

    await prisma.restaurant.create({
        data
    });
}

export async function updateRestaurantData(restaurant_id: string, data: Prisma.RestaurantUpdateInput,) {
    await prisma.restaurant.update({
        where: {
            restaurant_id
        },
        data
    })
}