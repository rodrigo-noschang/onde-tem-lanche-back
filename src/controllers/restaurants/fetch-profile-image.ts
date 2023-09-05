import fs from 'node:fs';
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function fetchRestaurantProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        imagePath: z.string()
    })

    const { imagePath } = paramsSchema.parse(params);

    try {
        const image = fs.readFileSync(`src/assets/restaurant-profile-images/${imagePath}`);

        return reply.type('image/png')
            .send(image);

    } catch (error) {
        return reply.status(404).send({
            message: 'imagem não encontrada'
        });
    }

}