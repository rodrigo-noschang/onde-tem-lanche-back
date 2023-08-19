import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { findUniqueDishById, updateDishRatings } from "../../db/dishes";
import { DishNotFoundError } from "../../errors/dishNotFound";

interface RateDishParams {
    dish_id: string
}

export async function rateDish(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as RateDishParams;
    const requestData = req.body;

    const rateDishSchema = z.object({
        rate: z.coerce.number().min(0, 'rate deve estar entre 0 e 5').max(5, 'rate deve estar entre 0 e 5')
    });

    const data = rateDishSchema.parse(requestData);

    try {
        const dish = await findUniqueDishById(params.dish_id);

        if (!dish) {
            throw new DishNotFoundError();
        }

        await updateDishRatings(data.rate, params.dish_id);

        return reply.status(204).send();
    } catch (error) {
        if (error instanceof DishNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
    }
}