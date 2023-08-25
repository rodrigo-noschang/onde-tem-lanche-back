import { FastifyRequest, FastifyReply } from 'fastify';

export async function fetchRestaurantProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const imageURL = '../../assets/restaurant-images/45b92c2d-f0e0-4849-a596-25f81bcb4523.png';

    return reply.send({
        imageURL
    });
}