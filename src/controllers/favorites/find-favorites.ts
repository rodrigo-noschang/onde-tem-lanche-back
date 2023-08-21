import { FastifyReply, FastifyRequest } from "fastify";
import { findManyFavoritesByCustomerId } from "../../db/favorites";

export async function findFavoriteDishes(req: FastifyRequest, reply: FastifyReply) {
    const customerId = req.user.sub;

    const favorites = await findManyFavoritesByCustomerId(customerId);

    return reply.send({
        favorites
    });
}