import { FastifyInstance } from "fastify";

import { favoriteADish } from "../../controllers/favorites/register";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";

export async function favoritesRoutes(app: FastifyInstance) {
    app.patch(
        'dishes/favorite/dish_id',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isCustomerMiddleware
            ]
        },
        favoriteADish
    )
}