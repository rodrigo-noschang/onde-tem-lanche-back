import '@fastify/jwt';

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            type: 'RESTAURANT' | 'CUSTOMER'
        },
        user: {
            sub: string
        }
    }
}