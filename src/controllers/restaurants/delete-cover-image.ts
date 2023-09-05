import fs from 'fs';
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { findUniqueImageById, removeImageById } from '../../db/images';

import { ImageNotFoundError } from '../../errors/imageNotFoundError';
import { NotImageOwnerError } from '../../errors/notImageOwnerError';
import { RESTAURANT_COVER_IMAGE_BASE_URL } from '../../static';

export async function deleteRestaurantCoverImage(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;
    const restaurantId = req.user.sub;

    const paramsSchema = z.object({
        imageId: z.string()
    })

    const { imageId } = paramsSchema.parse(params);

    try {
        const image = await findUniqueImageById(imageId);

        if (!image) throw new ImageNotFoundError();
        if (image.restaurant_id !== restaurantId) throw new NotImageOwnerError();

        await removeImageById(image.image_id);

        fs.unlinkSync(`${RESTAURANT_COVER_IMAGE_BASE_URL}/${image.path}`);

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