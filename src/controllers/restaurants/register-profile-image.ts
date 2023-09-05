import { FastifyReply, FastifyRequest } from "fastify";

import {
    findImagesByMultiplePaths,
    findManyRestaurantImagesPathById,
    saveMultipleImagePaths
} from "../../db/images";

import { InvalidImageNameError } from "../../errors/invalidImageNameError";
import { ImageAmountLimitError } from "../../errors/imageAmountLimit";

export async function registerProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const files = req.files;
    const restaurantId = req.user.sub;

    if (!files) {
        return reply.status(400).send({
            message: 'requisição sem imagem'
        });
    }

    try {
        const ownImages = await findManyRestaurantImagesPathById(restaurantId);

        if (ownImages.length + files.length > 4) throw new ImageAmountLimitError();

        const paths = files.map((image: any) => image.filename)
        const images = await findImagesByMultiplePaths(paths);

        if (images.length > 0) throw new InvalidImageNameError();

        const imagesData = files.map((image: any) => {
            return {
                path: image.filename,
                restaurant_id: restaurantId
            }
        });

        await saveMultipleImagePaths(imagesData)

        return reply.status(201).send();

    } catch (error) {
        if (
            error instanceof InvalidImageNameError ||
            error instanceof ImageAmountLimitError
        ) {
            return reply.status(409).send({
                message: error.message
            });
        }

        throw error;
    }
}