import { FastifyReply, FastifyRequest } from "fastify";
import { saveRestaurantProfileImagePath } from "../../db/images";

export async function registerProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const file = req.file;
    const restaurantId = req.user.sub;

    if (!file) {
        return reply.status(400).send({
            message: 'requisicao sem imagem'
        });
    }

    try {
        await saveRestaurantProfileImagePath({
            path: file.filename,
            restaurant_id: restaurantId
        })

    } catch (error) {
        throw error;
    }

    return reply.send('ok');
}