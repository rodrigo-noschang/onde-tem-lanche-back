import { FastifyInstance } from "fastify";
import { registerDish } from "../../controllers/dishes/register";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";
import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { editDishData } from "../../controllers/dishes/edit-data";

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
        '/dishes/:dish_id',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        editDishData
    );
}