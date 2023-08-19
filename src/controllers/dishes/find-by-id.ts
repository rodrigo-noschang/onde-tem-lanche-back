import { FastifyReply, FastifyRequest } from "fastify";
import { findUniqueDishById } from "../../db/dishes";

interface FindDishByIdParams {
    dish_id: string
}

export async function findDishById(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as FindDishByIdParams;

    console.log('Veio -> ', params);

    const dish = await findUniqueDishById(params.dish_id);

    return reply.send({
        dish
    });
}