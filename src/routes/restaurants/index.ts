import { FastifyInstance } from "fastify";

import { rateRestaurant } from "../../controllers/restaurants/rate";
import { deleteRestaurant } from "../../controllers/restaurants/delete";
import { loginAsRestaurant } from "../../controllers/restaurants/login";
import { registerRestaurant } from "../../controllers/restaurants/register";
import { editRestaurantData } from "../../controllers/restaurants/edit-data";
import { findRestaurantById } from "../../controllers/restaurants/find-by-id";
import { findNearByRestaurants } from "../../controllers/restaurants/find-near-by";
import { findRestaurantBySearch } from "../../controllers/restaurants/find-by-search";
import { registerLogoImage } from "../../controllers/restaurants/register-logo-image";
import { findRestaurantsByFilter } from "../../controllers/restaurants/find-by-filter";
import { registerCoverImage } from "../../controllers/restaurants/register-cover-image";
import { fetchRestaurantLogoImage } from "../../controllers/restaurants/fetch-logo-image";
import { registerProfileImage } from "../../controllers/restaurants/register-profile-image";
import { fetchRestaurantCoverImage } from "../../controllers/restaurants/fetch-cover-image";
import { fetchRestaurantImagesPath } from "../../controllers/restaurants/fetch-images-path";
import { deleteRestaurantLogoImage } from "../../controllers/restaurants/delete-logo-image";
import { deleteRestaurantCoverImage } from "../../controllers/restaurants/delete-cover-image";
import { fetchRestaurantProfileImage } from "../../controllers/restaurants/fetch-profile-image";
import { deleteRestaurantProfileImage } from "../../controllers/restaurants/delete-profile-image";

import { isCustomerMiddleware } from "../../middlewares/isCustomer";
import { isRestaurantMiddleware } from "../../middlewares/isRestaurant";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated";
import { uploadRestaurantImageMiddleware } from "../../middlewares/restaurant-profile-image";
import { uploadRestaurantLogoImageMiddleware } from "../../middlewares/restaurant-logo-image";
import { uploadRestaurantCoverImageMiddleware } from "../../middlewares/restaurant-cover-image";


export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', registerRestaurant);
    app.post('/restaurants/session', loginAsRestaurant);
    app.post(
        '/restaurants/image',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware,
                uploadRestaurantImageMiddleware.array('images')
            ]
        },
        registerProfileImage
    );
    app.post(
        '/restaurants/image/cover',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware,
                uploadRestaurantCoverImageMiddleware.single('image')
            ]
        },
        registerCoverImage
    );
    app.post(
        '/restaurants/image/logo',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware,
                uploadRestaurantLogoImageMiddleware.single('image')
            ]
        },
        registerLogoImage
    );

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
    app.get('/restaurants/images/path/:restaurantId', fetchRestaurantImagesPath);
    app.get('/restaurants/image/:imagePath', fetchRestaurantProfileImage);
    app.get('/restaurants/image/logo/:imagePath', fetchRestaurantLogoImage);
    app.get('/restaurants/image/cover/:imagePath', fetchRestaurantCoverImage);

    app.delete(
        '/restaurants',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        deleteRestaurant
    );

    app.delete(
        '/restaurants/image/:imageId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        deleteRestaurantProfileImage
    )

    app.delete(
        '/restaurants/image/cover/:imageId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        deleteRestaurantCoverImage
    )

    app.delete(
        '/restaurants/image/logo/:imageId',
        {
            preHandler: [
                isAuthenticatedMiddleware,
                isRestaurantMiddleware
            ]
        },
        deleteRestaurantLogoImage
    )
}