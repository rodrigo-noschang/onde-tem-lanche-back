import fastify from 'fastify';
import { ZodError } from 'zod';
import fastifyJwt from '@fastify/jwt';

import { env } from './env';

import { dishesRoutes } from './routes/dishes';
import { customerRoutes } from './routes/customers';
import { restaurantsRoutes } from './routes/restaurants';
import { operationHoursRoutes } from './routes/operation_hours';

export const app = fastify();

app.register(dishesRoutes);
app.register(customerRoutes);
app.register(restaurantsRoutes);
app.register(operationHoursRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '7d'
    }
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.format()
        })
    }

    return reply.status(500).send({
        message: 'Erro interno'
    })
})