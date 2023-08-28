import { FastifyInstance } from "fastify";

import { rateDish } from "../../controllers/dishes/rate";
import { deleteDish } from "../../controllers/dishes/delete";
import { registerDish } from "../../controllers/dishes/register";
import { editDishData } from "../../controllers/dishes/edit-data";
import { findDishById } from "../../controllers/dishes/find-by-id";
import { findDishesByFilter } from "../../controllers/dishes/find-by-filter";
import { registerDishImage } from "../../controllers/dishes/register-image";
import { findDishesByRestaurant } from "../../controllers/dishes/find-by-restaurants";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { uploadDishImageMiddleware } from "../../middlewares/dish-image";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";
import { deleteDishImage } from "../../controllers/dishes/delete-image";

export async function dishesRoutes(app: FastifyInstance) {
    app.post(
        '/dishes/image/:dishId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware,
                uploadDishImageMiddleware.single('image')
            ]
        },
        registerDishImage
    );
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
    app.get('/dishes/restaurant_dishes/:restaurantId', findDishesByRestaurant);

    app.delete(
        '/dishes/:dishId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        deleteDish
    );
    app.delete(
        '/dishes/image/:imageId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        deleteDishImage
    )
}