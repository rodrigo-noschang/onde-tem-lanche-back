import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { findManyRestaurantsByQuery } from "../../db/restaurants";

interface FindRestaurantBySearchParams {
    q: string,
    page?: number
}

export async function findRestaurantBySearch(req: FastifyRequest, reply: FastifyReply) {
    const query: FindRestaurantBySearchParams = req.query as FindRestaurantBySearchParams;

    const findRestaurantBySearchSchema = z.object({
        q: z.string(),
        page: z.coerce.number().default(1)
    })

    const data = findRestaurantBySearchSchema.parse(query);

    const formattedQuery = data.q.trim();

    const restaurants = await findManyRestaurantsByQuery(formattedQuery, data.page);

    return reply.send({
        restaurants
    })
}