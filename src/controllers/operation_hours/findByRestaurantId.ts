import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { findManyHoursByRestaurantId } from "../../db/operation_hours";

interface FindRestaurantHoursParams {
    restaurant_id: string
}

export async function findRestaurantHoursByRestaurantId(req: FastifyRequest, reply: FastifyReply) {
    const params: FindRestaurantHoursParams = req.params as FindRestaurantHoursParams;

    const findRestaurantsHoursSchema = z.object({
        restaurant_id: z.string()
    })

    const data = findRestaurantsHoursSchema.parse(params);

    const operation_hours = await findManyHoursByRestaurantId(data.restaurant_id);

    return reply.send({
        operation_hours
    })
}