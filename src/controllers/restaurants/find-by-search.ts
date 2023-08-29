import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findManyRestaurantsByQuery } from "../../db/restaurants";

export async function findRestaurantBySearch(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query;

    const querySchema = z.object({
        q: z.string().default(''),
        page: z.coerce.number().default(1)
    })

    const { q, page } = querySchema.parse(query);

    const formattedQuery = q.trim();

    const { restaurants, restaurantsCount } = await findManyRestaurantsByQuery(formattedQuery, page);

    const restaurantsWithoutPassword = restaurants.map(res => {
        return {
            ...res,
            password_hash: undefined
        }
    });

    return reply.send({
        restaurants: restaurantsWithoutPassword,
        totalFound: restaurantsCount
    });
}