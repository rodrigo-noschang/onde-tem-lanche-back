import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findManyHoursByRestaurantId } from "../../db/operation_hours";

export async function findRestaurantHoursByRestaurantId(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        restaurantId: z.string()
    })

    const { restaurantId } = paramsSchema.parse(params);

    const operation_hours = await findManyHoursByRestaurantId(restaurantId);

    return reply.send({
        operation_hours
    })
}