import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { findUniqueDishById, removeDishById } from '../../db/dishes';

import { DishNotFoundError } from '../../errors/dishNotFound';
import { NotDishOwnerError } from '../../errors/notDishOwnerError';

export async function deleteDish(req: FastifyRequest, reply: FastifyReply) {
    const restaurantId = req.user.sub;
    const params = req.params;

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    });

    const { dishId } = paramsSchema.parse(params);

    try {
        const dish = await findUniqueDishById(dishId);
        if (!dish) throw new DishNotFoundError();

        if (dish.restaurant_id !== restaurantId) throw new NotDishOwnerError();

        await removeDishById(dishId);

        return reply.status(204).send();
    } catch (error) {
        if (error instanceof DishNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }

        if (error instanceof NotDishOwnerError) {
            return reply.status(403).send({
                message: error.message
            });
        }

        throw error;
    }
}