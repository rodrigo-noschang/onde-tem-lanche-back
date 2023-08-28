import { FastifyRequest, FastifyReply } from 'fastify';

import { findManyRestaurantImagesPathById } from '../../db/images';
import { z } from 'zod';

export async function fetchRestaurantImagesPath(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        restaurantId: z.string().uuid()
    })

    const { restaurantId } = paramsSchema.parse(params);

    try {
        const images = await findManyRestaurantImagesPathById(restaurantId);

        return reply.send({
            images
        })
    } catch (error) {
        throw error;
    }

}