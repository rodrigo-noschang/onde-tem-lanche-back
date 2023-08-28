import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueImageByPath, saveRestaurantProfileImagePath } from "../../db/images";

import { InvalidImageNameError } from "../../errors/invalidImageNameError";

export async function registerProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const file = req.file;
    const restaurantId = req.user.sub;

    if (!file) {
        return reply.status(400).send({
            message: 'requisicao sem imagem'
        });
    }

    try {
        const imageAlreadyRegistered = await findUniqueImageByPath(file.filename);

        if (imageAlreadyRegistered) throw new InvalidImageNameError();

        await saveRestaurantProfileImagePath({
            path: file.filename,
            restaurant_id: restaurantId
        })

        return reply.status(201).send();

    } catch (error) {
        if (error instanceof InvalidImageNameError) {
            return reply.status(409).send({
                message: error.message
            });
        }

        throw error;
    }
}