import { FastifyReply, FastifyRequest } from "fastify";
import { findManyFavoritesByCustomerId } from "../../db/favorites";
import { z } from "zod";

export async function findFavoriteDishes(req: FastifyRequest, reply: FastifyReply) {
    const customerId = req.user.sub;
    const params = req.params;

    const paramsSchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = paramsSchema.parse(params);

    const { favorites, favoritesCount } = await findManyFavoritesByCustomerId(customerId, page);

    return reply.send({
        favorites,
        totalFound: favoritesCount
    });
}