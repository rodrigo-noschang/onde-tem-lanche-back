import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createHour } from "../../db/operation_hours";

export async function updateRestaurantOperationHours(req: FastifyRequest, reply: FastifyReply) {
    const requestData = req.body;
    const restaurant_id = req.user.sub;

    const updateHoursSchema = z.object({
        day: z.enum(['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']),
        opens_at: z.coerce.number().min(0).max(23),
        closes_at: z.coerce.number().min(0).max(23)
    })
        .refine(schema => schema.closes_at >= schema.opens_at, {
            message: 'Horário de fechamento precisa ser maior que o de abertura'
        })
        .array();

    const data = updateHoursSchema.parse(requestData);

    const formattedData = data.map(date => {
        return {
            day: date.day,
            opens_at: date.opens_at.toString(),
            closes_at: date.closes_at.toString(),
            restaurant_id
        }
    });

    await createHour(formattedData);

    return reply.status(201).send();
}