import { FastifyInstance } from "fastify";

import { loginAsRestaurant } from "../../controllers/restaurants/login";
import { registerRestaurant } from "../../controllers/restaurants/register";
import { editRestaurantData } from "../../controllers/restaurants/editData";

import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";

export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', registerRestaurant);
    app.post('/restaurants/session', loginAsRestaurant);
    app.put('/restaurants', {
        preHandler: [
            isAuthenticatedMiddleware,
            isRestaurantMiddleware
        ]
    }, editRestaurantData);
}