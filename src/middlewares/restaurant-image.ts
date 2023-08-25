import { randomUUID } from 'node:crypto';
import multer from 'fastify-multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const url = './src/assets/restaurant-images/';
        cb(null, url)
    },
    filename: function (req, file, cb) {
        const fileExtension = file.mimetype.split('/').pop();

        const restaurantId = req.user.sub;
        const fileName = `${restaurantId}.${fileExtension}`;

        console.log('No middleware -> ', file);
        cb(null, fileName);
    },
})

export const uploadRestaurantImageMiddleware = multer({ storage })