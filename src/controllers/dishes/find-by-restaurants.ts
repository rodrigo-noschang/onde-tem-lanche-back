import { FastifyReply, FastifyRequest } from "fastify";
import { findManyDishesByRestaurantId } from "../../db/dishes";

interface FindDishesByRestaurantParams {
    restaurant_id: string,
}

interface FindDishesByRestaurantQuery {
    page?: number
}

export async function findDishesByRestaurant(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as FindDishesByRestaurantParams;
    const query = req.query as FindDishesByRestaurantQuery;

    try {
        const dishes = await findManyDishesByRestaurantId(params.restaurant_id, query.page ?? 1);

        return reply.send({
            dishes
        })
    } catch (error) {
        throw error;
    }
}