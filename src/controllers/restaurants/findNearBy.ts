import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { findManyByLocation } from "../../db/restaurants";

interface RequestQuery {
    lat: number,
    lng: number,
    page?: number
}

export async function FindNearByRestaurants(req: FastifyRequest, reply: FastifyReply) {
    const requestQuery: RequestQuery = req.query as RequestQuery;

    const findNearBySchema = z.object({
        lat: z.coerce.number().min(-90).max(90),
        lng: z.coerce.number().min(-180).max(180),
        page: z.coerce.number().min(1, 'page deve ser no mínimo 1').default(1)
    })

    const data = findNearBySchema.parse(requestQuery);

    const restaurants = await findManyByLocation({
        lat: data.lat,
        lng: data.lng,
        page: data.page
    });

    return reply.send({
        restaurants
    });
}