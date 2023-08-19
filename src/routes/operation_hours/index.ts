import { FastifyInstance } from "fastify";

import { updateRestaurantOperationHours } from "../../controllers/operation_hours/create";
import { findRestaurantHoursByRestaurantId } from "../../controllers/operation_hours/findByRestaurantId";

import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";
import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";

export async function operationHoursRoutes(app: FastifyInstance) {
    app.post('/restaurants/operation_hours', {
        preHandler: [
            isAuthenticatedMiddleware,
            isRestaurantMiddleware
        ]
    }, updateRestaurantOperationHours);

    app.get('/restaurants/operation_hours/:restaurant_id', findRestaurantHoursByRestaurantId);
}