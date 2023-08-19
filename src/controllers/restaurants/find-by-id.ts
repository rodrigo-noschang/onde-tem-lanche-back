import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueById } from "../../db/restaurants";

interface FindByIdParams {
    restaurant_id: string
}

export async function findUniqueRestaurantById(req: FastifyRequest, reply: FastifyReply) {
    const params: FindByIdParams = req.params as FindByIdParams;

    const findByIdSchema = z.object({
        restaurant_id: z.string()
    })

    const data = findByIdSchema.parse(params);

    try {
        const restaurant = await findUniqueById(data.restaurant_id);

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