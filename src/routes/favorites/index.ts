import { FastifyInstance } from "fastify";

import { favoriteADish } from "../../controllers/favorites/register";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";

export async function favoritesRoutes(app: FastifyInstance) {
    app.patch(
        '/favorite/dish/:dishId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isCustomerMiddleware
            ]
        },
        favoriteADish
    )
}