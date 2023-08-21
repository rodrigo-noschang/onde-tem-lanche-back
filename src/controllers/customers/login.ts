import { z } from "zod";
import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueCustomerByEmail } from "../../db/customer";

import { InvalidEmailOrPassword } from "../../errors/invalidEmailOrPassword";

export async function loginAsCustomer(req: FastifyRequest, reply: FastifyReply) {
    const requestData = req.body;

    const bodySchema = z.object({
        email: z.string().email('formato de email inválido'),
        password: z.string().min(8, 'password deve ter ao menos 8 caractéres')
    });

    const data = bodySchema.parse(requestData);

    try {
        const registeredEmail = await findUniqueCustomerByEmail(data.email);

        if (!registeredEmail) {
            throw new InvalidEmailOrPassword();
        }

        const passwordMatch = await bcrypt.compare(data.password, registeredEmail.password_hash);

        if (!passwordMatch) {
            throw new InvalidEmailOrPassword();
        }

        const token = await reply.jwtSign(
            { type: 'CUSTOMER' },
            {
                sign: {
                    sub: registeredEmail.customer_id
                }
            }
        )

        return reply.send({
            token
        })

    } catch (error) {
        if (error instanceof InvalidEmailOrPassword) {
            return reply.status(401).send({
                message: error.message
            })
        }
    }
}