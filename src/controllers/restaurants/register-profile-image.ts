import { FastifyReply, FastifyRequest } from "fastify";

export async function registerProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const file = req.file;

    if (!file) {
        return reply.status(400).send({
            message: 'Faltou a imagem, irmão'
        })
    }

    return reply.send('ok');
}