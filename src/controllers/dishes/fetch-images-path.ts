import { FastifyRequest, FastifyReply } from 'fastify';

import { findManyDishImagesPathById } from '../../db/images';
import { z } from 'zod';

export async function fetchDishImagesPath(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const { dishId } = paramsSchema.parse(params);

    try {
        const images = await findManyDishImagesPathById(dishId);

        return reply.send({
            images
        });
    } catch (error) {
        throw error;
    }
}