import multer from 'fastify-multer';
import { InvalidImageFormatError } from '../errors/invalidImageFormatError';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const url = './src/assets/restaurant-images/';
        cb(null, url)
    },
    filename: function (req, file, cb) {
        const fileExtension = file.mimetype.split('/').pop();

        const restaurantId = req.user.sub;
        const fileName = `restaurant-${restaurantId}.${fileExtension}`;

        cb(null, fileName);
    }
})

export const uploadRestaurantImageMiddleware = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const extension = file.mimetype.split('/').pop();
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            return cb(new InvalidImageFormatError());
        }

        cb(null, true);
    }
})