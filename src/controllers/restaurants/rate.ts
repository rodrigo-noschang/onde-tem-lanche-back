import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { updateRestaurantRatings } from "../../db/restaurants";

interface RateRestaurantParams {
    restaurant_id: string
}

export async function rateRestaurant(req: FastifyRequest, reply: FastifyReply) {
    const params: RateRestaurantParams = req.params as RateRestaurantParams;
    const requestData = req.body;

    const rateRestaurantsSchema = z.object({
        rate: z.coerce.number().min(0, 'rate deve estar entre 0 e 5').max(5, 'rate deve estar entre 0 e 5')
    });

    const data = rateRestaurantsSchema.parse(requestData);

    try {
        await updateRestaurantRatings(data.rate, params.restaurant_id);

        return reply.status(204).send();

    } catch (error) {
        return reply.status(404).send({
            message: 'restaurante não encontrado'
        });
    }
}