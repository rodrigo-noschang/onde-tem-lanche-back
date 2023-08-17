import { FastifyInstance } from "fastify";

import { loginAsRestaurant } from "../../controllers/restaurants/login";
import { registerRestaurant } from "../../controllers/restaurants/register";
import { editRestaurantData } from "../../controllers/restaurants/edit-data";
import { findNearByRestaurants } from "../../controllers/restaurants/find-near-by";

import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";
import { findRestaurantsByFilter } from "../../controllers/restaurants/find-by-filter";

export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', registerRestaurant);
    app.post('/restaurants/session', loginAsRestaurant);

    app.put('/restaurants', {
        preHandler: [
            isAuthenticatedMiddleware,
            isRestaurantMiddleware
        ]
    }, editRestaurantData);

    app.get('/restaurants/nearby', findNearByRestaurants);
    app.get('/restaurants/filter', findRestaurantsByFilter);
}