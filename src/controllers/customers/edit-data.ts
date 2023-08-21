import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findManyCustomersByEmail, updateCustomerData } from "../../db/customer";

import { EmailAlreadyRegisteredError } from "../../errors/emailAlreadyRegistered";

export async function editCustomerData(req: FastifyRequest, reply: FastifyReply) {
    const customerId = req.user.sub;
    const requestData = req.body;

    const bodySchema = z.object({
        name: z.string().max(40, 'name deve ter no máximo 40 caractéres').optional(),
        email: z.string().email('formato de email inválido').optional(),
        allergens: z.enum(['Soja', 'Peixe', 'Ovos', 'Mariscos', 'Nozes', 'Amenoim', 'Gluten', 'Leite', 'Não contém']).array().optional(),
        preferences: z.enum(['Carnes', 'Massas', 'Pizzas', 'Lanches', 'Porções', 'Saladas', 'Confeitaria', 'Açaí/Sorvete', 'Yakisoba', 'Marmitex', 'Esfiha', 'Japonês']).array().optional()
    })

    const data = bodySchema.parse(requestData);

    try {
        if (data.email) {
            const registeredEmails = await findManyCustomersByEmail(data.email);
            console.log(registeredEmails);
            if (registeredEmails >= 1) {
                throw new EmailAlreadyRegisteredError();
            }
        }

        await updateCustomerData(data, customerId);

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof EmailAlreadyRegisteredError) {
            return reply.status(409).send({
                message: error.message
            });
        }
    }


}