import { FastifyReply, FastifyRequest } from "fastify";

export async function isRestaurantMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const { type } = req.user;

    if (type !== 'RESTAURANT') {
        return reply.status(401).send({
            message: 'Operação exclusiva para restaurantes'
        })
    }
}