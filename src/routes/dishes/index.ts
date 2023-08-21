import { FastifyInstance } from "fastify";

import { rateDish } from "../../controllers/dishes/rate";
import { registerDish } from "../../controllers/dishes/register";
import { editDishData } from "../../controllers/dishes/edit-data";
import { findDishById } from "../../controllers/dishes/find-by-id";
import { findDishesByFilter } from "../../controllers/dishes/find-by-filter";
import { findDishesByRestaurant } from "../../controllers/dishes/find-by-restaurants";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";

export async function dishesRoutes(app: FastifyInstance) {
    app.post(
        '/dishes',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        registerDish
    );

    app.put(
        '/dishes/:dishId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        editDishData
    );

    app.patch(
        '/dishes/:dishId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isCustomerMiddleware
            ]
        },
        rateDish
    );

    app.get('/dishes/:dishId', findDishById);
    app.get('/dishes/filter', findDishesByFilter);
    app.get('/dishes/restaurant_dishes/:restaurant_id', findDishesByRestaurant);
}