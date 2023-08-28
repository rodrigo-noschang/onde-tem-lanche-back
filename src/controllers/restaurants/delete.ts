import { FastifyRequest, FastifyReply } from 'fastify';

import { findUniqueRestaurantById, removeRestaurantById } from '../../db/restaurants';

import { RestaurantNotFoundError } from '../../errors/restaurantNotFoundError';

export async function deleteRestaurant(req: FastifyRequest, reply: FastifyReply) {
    const restaurantId = req.user.sub;

    try {
        const restaurant = await findUniqueRestaurantById(restaurantId);
        if (!restaurant) throw new RestaurantNotFoundError();

        await removeRestaurantById(restaurantId);

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof RestaurantNotFoundError) {
            return reply.status(404).send({
                message: error.message
            });
        }
    }

}