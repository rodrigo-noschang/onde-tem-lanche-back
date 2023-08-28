import { z } from "zod";
import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueCustomerByEmail, saveCustomer } from "../../db/customer";

import { EmailAlreadyRegisteredError } from "../../errors/emailAlreadyRegisteredError";

export async function registerCustomer(req: FastifyRequest, reply: FastifyReply) {
    const requestData = req.body;

    const bodySchema = z.object({
        name: z.string().max(40, 'name deve ter apenas 40 caractéres'),
        email: z.string().email('formato de email inválido'),
        password: z.string().min(8, 'password deve ter ao menos 8 caractéres'),
        allergens: z.enum(['Soja', 'Peixe', 'Ovos', 'Mariscos', 'Nozes', 'Amendoim', 'Gluten', 'Leite', 'Não contém']).array(),
        preferences: z.enum(['Carnes', 'Massas', 'Pizzas', 'Lanches', 'Porções', 'Saladas', 'Confeitaria', 'Açaí/Sorvete', 'Yakisoba', 'Marmitex', 'Esfiha', 'Japonês']).array().optional()
    });

    const data = bodySchema.parse(requestData);

    try {
        const existingEmail = await findUniqueCustomerByEmail(data.email);

        if (existingEmail) {
            throw new EmailAlreadyRegisteredError();
        }

        const password_hash = await bcrypt.hash(data.password, 6);

        const formattedData = {
            ...data,
            password: undefined,
            password_hash
        }

        await saveCustomer(formattedData);

        return reply.status(201).send();

    } catch (error) {
        if (error instanceof EmailAlreadyRegisteredError) {
            return reply.status(401).send({
                message: error.message
            })
        }

        throw error;
    }
}