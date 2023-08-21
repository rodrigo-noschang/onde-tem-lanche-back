import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueRestaurantById } from "../../db/restaurants";

export async function findRestaurantById(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        restaurantId: z.string().uuid()
    })

    const { restaurantId } = paramsSchema.parse(params);

    try {
        const restaurant = await findUniqueRestaurantById(restaurantId);

        if (!restaurant) {
            return reply.status(404).send({
                message: 'restaurante não foi encontrado'
            });
        }

        return reply.send({
            restaurant
        })

    } catch (error) {
        throw new Error();
    }


}   