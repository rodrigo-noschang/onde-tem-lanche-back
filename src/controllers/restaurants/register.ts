import { z } from "zod";
import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueRestaurantByEmail, saveRestaurant } from "../../db/restaurants";
import { EmailAlreadyRegisteredError } from "../../errors/emailAlreadyRegistered";

export async function registerRestaurant(req: FastifyRequest, res: FastifyReply) {
    const restaurantData = req.body;

    const registerRestaurantSchema = z.object({
        name: z.string().max(40, 'Nome deve ter no máximo 40 caracteres'),
        email: z.string().email('Formato de email inválido'),
        password: z.string().min(8, 'A senha deve ter ao menos 8 caractéres')
    });

    const data = registerRestaurantSchema.parse(restaurantData);

    try {
        const restaurant = await findUniqueRestaurantByEmail(data.email);
        if (restaurant) {
            throw new EmailAlreadyRegisteredError();
        }

        const password_hash = await bcrypt.hash(data.password, 6);

        const newRestaurant = {
            name: data.name,
            email: data.email,
            password_hash
        }

        await saveRestaurant(newRestaurant);
        return res.status(201).send();

    } catch (error) {
        if (error instanceof EmailAlreadyRegisteredError) {
            return res.status(400).send({
                message: "Email já cadastrado"
            })
        }
    }
}