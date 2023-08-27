import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { registerFavoriteDish } from "../../db/favorites";

export async function favoriteADish(req: FastifyRequest, reply: FastifyReply) {
    const customerId = req.user.sub;
    const params = req.params;

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const { dishId } = paramsSchema.parse(params);

    try {
        await registerFavoriteDish({
            customer_id: customerId,
            dish_id: dishId
        })

        return reply.status(204).send()
    } catch (error) {
        throw error;
    }

}