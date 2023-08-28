import multer from 'fastify-multer';

import { InvalidImageFormatError } from '../errors/invalidImageFormatError';

import { DISH_IMAGE_BASE_URL } from '../static';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const url = DISH_IMAGE_BASE_URL;
        cb(null, url)
    },
    filename: function (req, file, cb) {
        const fileExtension = file.mimetype.split('/').pop();
        const namePrefix = file.originalname.split('.')[0].split(' ').join('-').replace('_', '-').toLocaleLowerCase();

        const restaurantId = req.user.sub;
        const fileName = `${namePrefix}-${restaurantId}-dish.${fileExtension}`;

        cb(null, fileName);
    }
})

export const uploadDishImageMiddleware = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const extension = file.mimetype.split('/').pop();
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            return cb(new InvalidImageFormatError());
        }

        cb(null, true);
    },
    limits: {
        fileSize: 100000 // 100 KB
    }
})