import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { findUniqueImageById, removeImageById } from '../../db/images';

import { ImageNotFoundError } from '../../errors/imageNotFoundError';
import { NotImageOwnerError } from '../../errors/notImageOwnerError';

export async function deleteRestaurantProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;
    const restaurantId = req.user.sub;

    const paramsSchema = z.object({
        path: z.string()
    })

    const { path } = paramsSchema.parse(params);

    try {
        const image = await findUniqueImageById(path);

        if (!image) throw new ImageNotFoundError();
        if (image.restaurant_id !== restaurantId) throw new NotImageOwnerError();

        await removeImageById(image.image_id);

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof ImageNotFoundError) {
            return reply.status(404).send({
                message: error.message
            });
        }

        if (error instanceof NotImageOwnerError) {
            return reply.status(403).send({
                message: error.message
            });
        }
    }

}