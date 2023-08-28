import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { findUniqueDishById, updateDishData } from "../../db/dishes";

import { CreatorOnlyError } from "../../errors/creatorOnly";
import { DishNotFoundError } from "../../errors/dishNotFound";

export async function editDishData(req: FastifyRequest, reply: FastifyReply) {
    const restaurantId = req.user.sub;
    const requestData = req.body;
    const params = req.params;

    const bodySchema = z.object({
        name: z.string().max(40, 'name deve ter no máximo 40 caractéres').optional(),
        price: z.coerce.number().min(0, 'price não pode ser menor que zero').optional(),
        allergens: z.enum(['Soja', 'Peixe', 'Ovos', 'Mariscos', 'Nozes', 'Amendoim', 'Gluten', 'Leite', 'Não contém']).array().optional(),

        description: z.string().max(200, 'description deve ter no máximo 200 caractéres').optional(),
        specifications: z.enum(['Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose']).array().optional(),
        size: z.coerce.number().min(1, 'number deve ser pelo menos 1').max(1000, 'number deve ser no máximo 1000').optional(),
        size_unit: z.enum(['g', 'kg', 'ml', 'L', 'unidade', 'pedaços']).optional(),
        categories: z.enum(['Carnes', 'Massas', 'Pizzas', 'Lanches', 'Porções', 'Saladas', 'Confeitaria', 'Açaí/Sorvete', 'Yakisoba', 'Marmitex', 'Esfiha', 'Japonês']).array().optional()
    })

    const paramsSchema = z.object({
        dishId: z.string().uuid()
    })

    const data = bodySchema.parse(requestData);

    const { dishId } = paramsSchema.parse(params);

    try {
        const dish = await findUniqueDishById(dishId);

        if (!dish) {
            throw new DishNotFoundError();
        }

        if (dish.restaurant_id !== restaurantId) {
            throw new CreatorOnlyError();
        }

        await updateDishData(data, dishId);

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof DishNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }

        if (error instanceof CreatorOnlyError) {
            return reply.status(401).send({
                message: error.message
            })
        }

        throw error;
    }
}