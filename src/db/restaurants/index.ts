import { Prisma, Restaurant } from "@prisma/client";

import { prisma } from "..";

import { ALL_PREFERENCES, Preferences, WEEK_DAYS } from "../../static";
import { findManyHoursByRestaurantId } from "../operation_hours";

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
            menu: {
                include: {
                    images: true
                }
            },
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
    const newRestaurant = await prisma.restaurant.create({
        data
    });

    return newRestaurant;
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

    const nearbyRestaurants = await prisma.$queryRaw<Restaurant[]>`
        SELECT * from restaurants
        WHERE ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( lat ) ) ) ) <= 10
        LIMIT ${limit} 
        OFFSET ${offset}
    `;

    const restaurantsWithHours = [];

    for await (let rest of nearbyRestaurants) {
        const restaurantHours = await findManyHoursByRestaurantId(rest.restaurant_id);

        const withHours = {
            ...rest,
            operation_hour: restaurantHours
        };

        restaurantsWithHours.push(withHours);
    }

    return restaurantsWithHours;
}


interface FindManyByFilterProps {
    preferences: Preferences[],
    page: number
}

export async function findManyRestaurantsByFilter({ preferences, page }: FindManyByFilterProps) {
    const preferencesQuery = preferences.length > 0 ? preferences : ALL_PREFERENCES;

    const restaurantsCount = await prisma.restaurant.count({
        where: {
            serves: {
                hasSome: preferencesQuery
            },
        }
    })

    const restaurants = await prisma.restaurant.findMany({
        where: {
            serves: {
                hasSome: preferencesQuery,
            },
        },
        include: {
            images: true
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return {
        restaurants,
        restaurantsCount
    };
}

export async function findManyRestaurantsByQuery(query: string, page: number) {
    const dayIndex = new Date().getDay();

    const today = WEEK_DAYS[dayIndex];

    const restaurantsCount = await prisma.restaurant.count({
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
            ],
        }
    })

    // const restaurants = await prisma.restaurant.findMany({
    //     where: {
    //         OR: [
    //             {
    //                 name: {
    //                     contains: query,
    //                     mode: "insensitive"
    //                 },

    //             },
    //             {
    //                 description: {
    //                     contains: query,
    //                     mode: "insensitive"
    //                 }
    //             }
    //         ]
    //     },
    //     include: {
    //         images: true,
    //         operation_hour: true
    //     },
    //     take: page * AMOUNT_PER_PAGE,
    //     skip: (page - 1) * AMOUNT_PER_PAGE
    // })

    const restaurants = await prisma.restaurant.findMany({
        where: {
            AND: [
                {
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
                {
                    operation_hour: {
                        some: {
                            day: today
                        }
                    }
                }
            ]
        },
        include: {
            images: true,
            operation_hour: true,
            menu: {
                include: {
                    images: true
                }
            }
        },
        take: page * AMOUNT_PER_PAGE,
        skip: (page - 1) * AMOUNT_PER_PAGE
    })

    return {
        restaurants,
        restaurantsCount
    };
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