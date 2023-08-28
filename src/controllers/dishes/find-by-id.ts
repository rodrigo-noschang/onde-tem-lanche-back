import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueDishById } from "../../db/dishes";
import { DishNotFoundError } from "../../errors/dishNotFoundError";

export async function findDishById(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const { dishId } = paramsSchema.parse(params);

    try {
        const dish = await findUniqueDishById(dishId);

        return reply.send({
            dish
        });
    } catch (error) {
        if (error instanceof DishNotFoundError) {
            return reply.status(404).send({
                message: error.message
            });
        }

        throw error;
    }
}