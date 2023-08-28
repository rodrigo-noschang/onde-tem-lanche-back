import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { findUniqueDishById } from '../../db/dishes';
import { findUniqueImageByPath, saveImagePath } from '../../db/images';

import { DishNotFoundError } from '../../errors/dishNotFoundError';
import { NotDishOwnerError } from '../../errors/notDishOwnerError';
import { InvalidImageNameError } from '../../errors/invalidImageNameError';

export async function registerDishImage(req: FastifyRequest, reply: FastifyReply) {
    const file = req.file;
    const params = req.params;
    const restaurantId = req.user.sub;

    if (!file) {
        return reply.status(400).send({
            message: 'requisição sem imagem'
        })
    }

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const { dishId } = paramsSchema.parse(params);

    try {
        const imageAlreadyRegistered = await findUniqueImageByPath(file.filename);

        if (imageAlreadyRegistered) throw new InvalidImageNameError();

        const dish = await findUniqueDishById(dishId);
        if (!dish) throw new DishNotFoundError();

        if (dish.restaurant_id !== restaurantId) throw new NotDishOwnerError();

        await saveImagePath({
            path: file.filename,
            dish_id: dishId
        })

        return reply.send('ok');
    } catch (error) {
        if (error instanceof InvalidImageNameError) {
            return reply.status(409).send({
                message: error.message
            })
        }

        if (error instanceof DishNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }

        if (error instanceof NotDishOwnerError) {
            return reply.status(403).send({
                message: error.message
            })
        }

        throw error
    }

}