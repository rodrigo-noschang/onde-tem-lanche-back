import fastify from 'fastify';
import { ZodError } from 'zod';
import multer from 'fastify-multer';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';

import { env } from './env';

import { dishesRoutes } from './routes/dishes';
import { customerRoutes } from './routes/customers';
import { favoritesRoutes } from './routes/favorites';
import { restaurantsRoutes } from './routes/restaurants';
import { operationHoursRoutes } from './routes/operation_hours';
import { InvalidImageFormatError } from './errors/invalidImageFormatError';

export const app = fastify();

app.register(cors);
app.register(multer.contentParser);

app.register(dishesRoutes);
app.register(customerRoutes);
app.register(favoritesRoutes);
app.register(restaurantsRoutes);
app.register(operationHoursRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '7d'
    }
})

app.setErrorHandler((error, _, reply) => {
    if (env.NODE_ENV === 'production') {
        console.log(error);
    }

    console.log(error);
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.format()
        })
    }

    if (error instanceof InvalidImageFormatError) {
        return reply.status(400).send({
            message: error.message
        })
    }

    return reply.status(500).send({
        message: 'Erro interno'
    })
})