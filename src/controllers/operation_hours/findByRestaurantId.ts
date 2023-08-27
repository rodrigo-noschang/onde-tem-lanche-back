import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findManyHoursByRestaurantId } from "../../db/operation_hours";
import { findUniqueRestaurantById } from "../../db/restaurants";

import { RestaurantNotFoundError } from "../../errors/restaurantNotFoundError";

export async function findRestaurantHoursByRestaurantId(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        restaurantId: z.string()
    })

    const { restaurantId } = paramsSchema.parse(params);

    try {
        const restaurant = await findUniqueRestaurantById(restaurantId);
        if (!restaurant) throw new RestaurantNotFoundError();

        const operation_hours = await findManyHoursByRestaurantId(restaurantId);

        return reply.send({
            operation_hours
        })
    } catch (error) {
        if (error instanceof RestaurantNotFoundError) {
            return reply.status(404).send({
                message: error.message
            });
        }

        throw error;
    }

}