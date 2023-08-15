import { FastifyInstance } from "fastify";

import { registerRestaurant } from "../../controllers/restaurants/register";

export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', registerRestaurant);
}