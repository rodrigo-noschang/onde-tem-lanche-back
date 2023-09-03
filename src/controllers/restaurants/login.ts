import { z } from "zod";
import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueRestaurantByEmail } from "../../db/restaurants";
import { InvalidEmailOrPassword } from "../../errors/invalidEmailOrPasswordError";

export async function loginAsRestaurant(req: FastifyRequest, reply: FastifyReply) {
    const requestData = req.body;

    const bodySchema = z.object({
        email: z.string().email('Formato de email inválido'),
        password: z.string().min(8, 'A senha deve ter no mínimo 8 caractéres')
    });

    const data = bodySchema.parse(requestData);

    try {
        const restaurant = await findUniqueRestaurantByEmail(data.email);
        if (!restaurant) {
            throw new InvalidEmailOrPassword();
        }

        const passwordMatch = await bcrypt.compare(data.password, restaurant.password_hash);

        if (!passwordMatch) {
            throw new InvalidEmailOrPassword();
        }

        const token = await reply.jwtSign(
            {
                type: 'RESTAURANT'
            },
            {
                sign: {
                    sub: restaurant.restaurant_id
                }
            }
        )

        return reply.send({
            token
        })

    } catch (error) {
        if (error instanceof InvalidEmailOrPassword) {
            return reply.status(404).send({
                message: error.message
            })
        }
    }
}