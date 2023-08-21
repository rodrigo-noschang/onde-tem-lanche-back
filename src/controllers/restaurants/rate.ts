import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { updateRestaurantRatings } from "../../db/restaurants";

export async function rateRestaurant(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;
    const requestData = req.body;

    const bodySchema = z.object({
        rate: z.coerce.number().min(0, 'rate deve estar entre 0 e 5').max(5, 'rate deve estar entre 0 e 5')
    });

    const paramsSchema = z.object({
        restaurantId: z.string().uuid()
    })

    const data = bodySchema.parse(requestData);
    const { restaurantId } = paramsSchema.parse(params);

    try {
        await updateRestaurantRatings(data.rate, restaurantId);

        return reply.status(204).send();

    } catch (error) {
        return reply.status(404).send({
            message: 'restaurante não encontrado'
        });
    }
}