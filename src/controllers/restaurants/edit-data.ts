import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { findManyRestaurantsByEmail, findManyRestaurantsByPhone, updateRestaurantData } from "../../db/restaurants";

import { PhoneAlreadyRegisteredError } from "../../errors/phoneAlreadyRegistered";
import { EmailAlreadyRegisteredError } from "../../errors/emailAlreadyRegistered";

export async function editRestaurantData(req: FastifyRequest, reply: FastifyReply) {
    const requestData = req.body;
    const restaurantId = req.user.sub;

    const editRestaurantSchema = z.object({
        name: z.string().max(40, 'name deve ter no máximo 40 caractéres').optional(),
        phone: z.string().length(11, 'Phone deve ter 11 caractéres').optional(),
        email: z.string().email('Formatação de email inválido').optional(),
        lat: z.coerce.number().min(-90, 'latitude deve estar entre -90 e 90').max(90, 'latitude deve estar entre -90 e 90').optional(),
        lng: z.coerce.number().min(-180, 'longitude deve estar entre -180 e 180').max(180, 'longitude deve estar entre -180 e 180').optional(),
        serves: z.enum(['Carnes', 'Massas', 'Pizzas', 'Lanches', 'Porções', 'Saladas', 'Confeitaria', 'Açaí/Sorvete', 'Yakisoba', 'Marmitex', 'Esfiha', 'Japonês']).array().optional(),
        description: z.string().max(200, 'Description deve ter no máximo 200 caractéres').optional()
    })

    const data = editRestaurantSchema.parse(requestData);
    const updateData = {
        ...data,
        updated_at: new Date()
    }

    try {
        if (data.phone) {
            const registeredPhones = await findManyRestaurantsByPhone(data.phone);

            if (registeredPhones >= 1) {
                throw new PhoneAlreadyRegisteredError();
            }
        }

        if (data.email) {
            const registeredEmails = await findManyRestaurantsByEmail(data.email);

            if (registeredEmails >= 1) {
                throw new EmailAlreadyRegisteredError();
            }
        }

        await updateRestaurantData(restaurantId, updateData);

        return reply.status(204).send();

    } catch (error) {
        if (
            error instanceof PhoneAlreadyRegisteredError ||
            error instanceof EmailAlreadyRegisteredError
        ) {
            return reply.status(409).send({
                message: error.message
            })
        }
    }
}