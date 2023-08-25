import fastify from 'fastify';
import { ZodError } from 'zod';
import multer from 'fastify-multer';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
// import formbody from '@fastify/formbody';
// import fastifyMultipart from '@fastify/multipart';

import { env } from './env';

import { dishesRoutes } from './routes/dishes';
import { customerRoutes } from './routes/customers';
import { favoritesRoutes } from './routes/favorites';
import { restaurantsRoutes } from './routes/restaurants';
import { operationHoursRoutes } from './routes/operation_hours';

export const app = fastify();

app.register(cors);
app.register(multer.contentParser);
// app.register(fastifyMultipart, {
//     limits: {
//         fileSize: 100000
//     }
// });
// app.register(formbody);

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
    console.log(error);
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.format()
        })
    }

    return reply.status(500).send({
        message: 'Erro interno'
    })
})