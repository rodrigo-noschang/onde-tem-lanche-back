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

    const restaurants = await findManyRestaurantsByQuery(formattedQuery, page);

    return reply.send({
        restaurants
    })
}