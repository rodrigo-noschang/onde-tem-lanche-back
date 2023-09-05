import { FastifyReply, FastifyRequest } from "fastify";

import {
    findManyRestaurantCoverImagesPathById,
    findManyRestaurantLogoImagesPathById,
    findUniqueImageByPath,
    saveImagePath
} from "../../db/images";

import { ImageAmountLimitError } from "../../errors/imageAmountLimit";
import { InvalidImageNameError } from "../../errors/invalidImageNameError";

export async function registerLogoImage(req: FastifyRequest, reply: FastifyReply) {
    const file = req.file;
    const restaurantId = req.user.sub;

    if (!file) {
        return reply.status(400).send({
            message: 'requisição sem imagem'
        });
    }

    try {
        const ownImages = await findManyRestaurantLogoImagesPathById(restaurantId);

        if (ownImages.length >= 1) throw new ImageAmountLimitError();

        const path = file.filename;

        const image = await findUniqueImageByPath(path);

        if (image) throw new InvalidImageNameError();

        const imageData = {
            path: file.filename,
            restaurant_id: restaurantId
        };

        await saveImagePath(imageData)

        return reply.status(201).send();

    } catch (error) {
        if (error instanceof InvalidImageNameError) {
            return reply.status(409).send({
                message: error.message
            });
        }

        if (error instanceof ImageAmountLimitError) {
            return reply.status(403).send({
                message: error.message
            })
        }

        throw error;
    }
}