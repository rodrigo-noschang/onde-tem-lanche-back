import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueDishById } from "../../db/dishes";

export async function findDishById(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params;

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const { dishId } = paramsSchema.parse(params);

    const dish = await findUniqueDishById(dishId);

    return reply.send({
        dish
    });
}