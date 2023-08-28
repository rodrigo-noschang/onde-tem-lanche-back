import { Prisma, Restaurant } from "@prisma/client";

import { prisma } from "..";

import { ALL_PREFERENCES, Preferences } from "../../static";

const AMOUNT_PER_PAGE = 20;

export async function findUniqueRestaurantById(restaurant_id: string) {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            restaurant_id
        },
        include: {
            operation_hour: {
                select: {
                    restaurant_id: false,
                    day: true,
                    opens_at: true,
                    closes_at: true,
                }
            },
            menu: true,
            images: true
        }
    })

    return restaurant;
}

export async function findUniqueRestaurantByEmail(email: string) {
    const existingRestaurant = await prisma.restaurant.findUnique({
        where: {
            email
        }
    })

    return existingRestaurant;
}

export async function findManyRestaurantsByEmail(email: string) {
    const existingRestaurant = await prisma.restaurant.count({
        where: {
            email
        },
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

export async function findManyRestaurantsByPhone(phone: string) {
    const existingRestaurant = await prisma.restaurant.count({
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

export async function findManyRestaurantsByLocation({ lat, lng, page }: FindManyByLocationProps) {
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


interface FindManyByFilterProps {
    preferences: Preferences[],
    page: number
}

export async function findManyRestaurantsByFilter({ preferences, page }: FindManyByFilterProps) {
    const preferencesQuery = preferences.length > 0 ? preferences : ALL_PREFERENCES;

    const restaurants = await prisma.restaurant.findMany({
        where: {
            serves: {
                hasSome: preferencesQuery
            },
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return restaurants;
}

export async function findManyRestaurantsByQuery(query: string, page: number) {
    const restaurants = await prisma.restaurant.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    },

                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive"
                    }
                }
            ]
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return restaurants;
}

export async function updateRestaurantRatings(rate: number, restaurant_id: string) {
    await prisma.restaurant.update({
        where: {
            restaurant_id
        },
        data: {
            ratings: {
                push: rate,
            }
        }
    })
}

export async function removeRestaurantById(restaurantId: string) {
    await prisma.restaurant.delete({
        where: {
            restaurant_id: restaurantId
        }
    });
}