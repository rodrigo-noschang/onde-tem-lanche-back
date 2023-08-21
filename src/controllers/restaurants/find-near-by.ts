import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { findManyRestaurantsByLocation } from "../../db/restaurants";

export async function findNearByRestaurants(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query;

    const querySchema = z.object({
        lat: z.coerce.number().min(-90).max(90),
        lng: z.coerce.number().min(-180).max(180),
        page: z.coerce.number().min(1, 'page deve ser no mínimo 1').default(1)
    })

    const { lat, lng, page } = querySchema.parse(query);

    const restaurants = await findManyRestaurantsByLocation({
        lat,
        lng,
        page
    });

    return reply.send({
        restaurants
    });
}