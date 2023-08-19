import { FastifyReply, FastifyRequest } from "fastify";

export async function isCustomerMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const type = req.user.type;

    if (type !== 'CUSTOMER') {
        return reply.status(401).send({
            message: 'Operação exclusiva para customers(clientes)'
        })
    }
}