import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { findUniqueImageById, removeImageById } from '../../db/images';

import { ImageNotFoundError } from '../../errors/imageNotFoundError';

export async function deleteRestaurantProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        path: z.string()
    })

    const { path } = paramsSchema.parse(params);

    try {
        const image = await findUniqueImageById(path);

        if (!image) throw new ImageNotFoundError();

        await removeImageById(image.image_id);

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof ImageNotFoundError) {
            return reply.status(404).send({
                message: error.message
            });
        }
    }

}