import fs from 'node:fs';
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function fetchDishImage(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        imagePath: z.string()
    })

    const { imagePath } = paramsSchema.parse(params);
    const imageType = imagePath.split('.').pop();

    try {
        const image = fs.readFileSync(`src/assets/dishes-images/${imagePath}`);

        return reply.type(`image/${imageType}`).send(image);

    } catch (error) {
        console.log(error);
        return reply.status(404).send({
            message: 'imagem não encontrada'
        });
    }

}