import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { saveDish } from "../../db/dishes";

export async function registerDish(req: FastifyRequest, reply: FastifyReply) {
    const restaurant_id = req.user.sub;
    const requestData = req.body;

    const registerDishSchema = z.object({
        name: z.string().max(40, 'name deve ter no máximo 40 caractéres'),
        price: z.coerce.number().min(0, 'price não pode ser menor que zero'),
        allergens: z.enum(['Soja', 'Peixe', 'Ovos', 'Mariscos', 'Nozes', 'Amenoim', 'Gluten', 'Leite', 'Não contém']).array(),

        description: z.string().max(200, 'description deve ter no máximo 200 caractéres').optional(),
        specifications: z.enum(['Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose']).array().optional(),
        size: z.coerce.number().min(1, 'number deve ser pelo menos 1').optional(),
        size_unit: z.enum(['g', 'kg', 'ml', 'L', 'unidade', 'pedaços']).optional()
    })

    const data = registerDishSchema.parse(requestData);
    const formattedData = {
        ...data,
        restaurant_id
    }

    try {
        await saveDish(formattedData);

        return reply.status(201).send();
    } catch (error) {
        throw new Error();
    }
}