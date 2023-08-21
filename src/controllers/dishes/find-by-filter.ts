import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { Allergens, Preferences } from "../../static";
import {
    findManyDishesByAllergensAndPreferences,
    findManyDishesByPreferences,
    findManyDishesByAllergens
} from "../../db/dishes";

interface FindDishesByFilterProps {
    preferences: Preferences[],
    allergens: Allergens[],
    page?: number
}

export async function findDishesByFilter(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query as FindDishesByFilterProps;
    const formattedQuery = {
        preferences: query.preferences ? Array.isArray(query.preferences) ? query.preferences : [query.preferences] : [],
        allergens: query.allergens ? Array.isArray(query.allergens) ? query.allergens : [query.allergens] : [],
        page: query.page
    }

    const querySchema = z.object({
        preferences: z.enum(['Carnes', 'Massas', 'Pizzas', 'Lanches', 'Porções', 'Saladas', 'Confeitaria', 'Açaí/Sorvete', 'Yakisoba', 'Marmitex', 'Esfiha', 'Japonês'])
            .array()
            .optional()
            .default([]),
        allergens: z.enum(['Soja', 'Peixe', 'Ovos', 'Mariscos', 'Nozes', 'Amendoim', 'Gluten', 'Leite', 'Não contém'])
            .array()
            .optional()
            .default([]),
        page: z.coerce.number().min(1).default(1)
    })

    const { allergens, page, preferences } = querySchema.parse(formattedQuery);

    try {
        const dishes = allergens.length && preferences.length ?
            await findManyDishesByAllergensAndPreferences({ allergens, preferences, page }) :
            allergens.length ?
                await findManyDishesByAllergens(allergens) :
                preferences.length ?
                    await findManyDishesByPreferences(preferences) :
                    [];

        return reply.send({
            dishes
        })
    } catch (error) {
        throw error;
    }
}