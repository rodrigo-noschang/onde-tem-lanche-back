import { Prisma, Restaurant } from "@prisma/client";
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

interface FindManyByLocationProps {
    lat: number,
    lng: number,
    page: number
}

export async function findManyByLocation({ lat, lng, page }: FindManyByLocationProps) {
    const limit = 20;
    const offset = (page - 1) * 20;

    const restaurants = await prisma.$queryRaw<Restaurant[]>`
        SELECT * from restaurants
        WHERE ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( lat ) ) ) ) <= 10
        LIMIT ${limit} 
        OFFSET ${offset}
    `;

    return restaurants;
}