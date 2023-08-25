import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { Preferences } from "../../static";
import { findManyRestaurantsByFilter } from "../../db/restaurants";

interface FindRestaurantsByFilterProps {
    preferences: Preferences[],
    page?: number
}

export async function findRestaurantsByFilter(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query as FindRestaurantsByFilterProps;
    const formattedQuery = {
        preferences: query.preferences ? Array.isArray(query.preferences) ? query.preferences : [query.preferences] : [],
        page: query.page
    }

    const querySchema = z.object({
        preferences: z.enum(['Carnes', 'Massas', 'Pizzas', 'Lanches', 'Porções', 'Saladas', 'Confeitaria', 'Açaí/Sorvete', 'Yakisoba', 'Marmitex', 'Esfiha', 'Japonês'])
            .array()
            .optional()
            .default([]),
        page: z.coerce.number().min(1).default(1)
    })

    const { preferences, page } = querySchema.parse(formattedQuery);

    const restaurants = await findManyRestaurantsByFilter({
        preferences: preferences,
        page: page
    })

    const restaurantsWithoutPassword = restaurants.map(res => {
        return {
            ...res,
            password_hash: undefined
        }
    });

    return reply.send({
        restaurants: restaurantsWithoutPassword
    });
}