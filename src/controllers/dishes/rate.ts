import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueDishById, updateDishRatings } from "../../db/dishes";

import { DishNotFoundError } from "../../errors/dishNotFound";

export async function rateDish(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;
    const requestData = req.body;

    const bodySchema = z.object({
        rate: z.coerce.number().min(0, 'rate deve estar entre 0 e 5').max(5, 'rate deve estar entre 0 e 5')
    });

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const data = bodySchema.parse(requestData);
    const { dishId } = paramsSchema.parse(params);

    try {
        const dish = await findUniqueDishById(dishId);

        if (!dish) {
            throw new DishNotFoundError();
        }

        await updateDishRatings(data.rate, dishId);

        return reply.status(204).send();
    } catch (error) {
        if (error instanceof DishNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }

        throw error;
    }
}