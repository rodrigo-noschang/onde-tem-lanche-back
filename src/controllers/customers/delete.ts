import { FastifyRequest, FastifyReply } from 'fastify';
import { findUniqueCustomerById, removeCustomerById } from '../../db/customer';
import { CustomerNotFoundError } from '../../errors/customerNotFoundError';

export async function deleteCustomer(req: FastifyRequest, reply: FastifyReply) {
    const customerId = req.user.sub;

    try {
        const customer = await findUniqueCustomerById(customerId);

        if (!customer) throw new CustomerNotFoundError();

        await removeCustomerById(customerId);

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
    }
}