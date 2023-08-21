import { FastifyInstance } from "fastify";

import { rateRestaurant } from "../../controllers/restaurants/rate";
import { loginAsRestaurant } from "../../controllers/restaurants/login";
import { registerRestaurant } from "../../controllers/restaurants/register";
import { editRestaurantData } from "../../controllers/restaurants/edit-data";
import { findRestaurantById } from "../../controllers/restaurants/find-by-id";
import { findNearByRestaurants } from "../../controllers/restaurants/find-near-by";
import { findRestaurantBySearch } from "../../controllers/restaurants/find-by-search";
import { findRestaurantsByFilter } from "../../controllers/restaurants/find-by-filter";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";

export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', registerRestaurant);
    app.post('/restaurants/session', loginAsRestaurant);

    app.put(
        '/restaurants',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        editRestaurantData
    );

    app.patch(
        '/restaurants/:restaurantId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isCustomerMiddleware
            ]
        },
        rateRestaurant
    );

    app.get('/restaurants', findRestaurantBySearch);
    app.get('/restaurants/nearby', findNearByRestaurants);
    app.get('/restaurants/filter', findRestaurantsByFilter);
    app.get('/restaurants/:restaurantId', findRestaurantById);
}