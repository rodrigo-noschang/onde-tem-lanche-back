import z from 'zod';
import { FastifyReply, FastifyRequest } from "fastify";

import { findManyDishesByRestaurantId } from "../../db/dishes";

export async function findDishesByRestaurant(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;
    const query = req.query;

    const paramsSchema = z.object({
        restaurantId: z.string().uuid()
    })

    const querySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { restaurantId } = paramsSchema.parse(params);
    const { page } = querySchema.parse(query);

    try {
        const dishes = await findManyDishesByRestaurantId(restaurantId, page);

        return reply.send({
            dishes
        })
    } catch (error) {
        throw error;
    }
}