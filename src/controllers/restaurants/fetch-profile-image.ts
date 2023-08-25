import fs from 'node:fs';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function fetchRestaurantProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const restaurantId = req.user.sub;

    try {
        const image = fs.readFileSync(`src/assets/restaurant-images/restaurant-${restaurantId}.png`);
        return reply.type('image/png')
            .send(image);

    } catch (error) {
        return reply.status(404).send({
            message: 'imagem não encontrada'
        });
    }

}