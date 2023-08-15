import fastify from 'fastify';
import { ZodError } from 'zod';

import { restaurantsRoutes } from './routes/restaurants';

export const app = fastify();

app.register(restaurantsRoutes);

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.format()
        })
    }

    return reply.status(500).send({
        message: 'Erro interno'
    })
})